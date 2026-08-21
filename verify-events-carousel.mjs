import { writeFile } from 'node:fs/promises';

const cdpHost = 'http://127.0.0.1:9555';
const appUrl = 'http://127.0.0.1:4173/';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(path, options = {}) {
  const response = await fetch(`${cdpHost}${path}`, options);
  if (!response.ok) {
    throw new Error(`CDP request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function connect() {
  const tabs = await getJson('/json/list');
  const tab = tabs.find((item) => item.type === 'page' && item.url.startsWith(appUrl) && item.title === 'Osmo Parallax Scroll')
    || tabs.find((item) => item.type === 'page' && item.url.startsWith(appUrl))
    || await getJson(`/json/new?${encodeURIComponent(appUrl)}`, { method: 'PUT' });

  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  const events = [];

  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) {
      if (message.method) events.push(message);
      return;
    }
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const messageId = ++id;
    const timer = setTimeout(() => {
      pending.delete(messageId);
      reject(new Error(`CDP timeout: ${method}`));
    }, 10000);
    pending.set(messageId, {
      resolve: (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      reject: (error) => {
        clearTimeout(timer);
        reject(error);
      },
    });
    ws.send(JSON.stringify({ id: messageId, method, params }));
  });

  return { send, events, close: () => ws.close() };
}

const browser = await connect();
const { send } = browser;

await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
await send('Network.enable');
await send('Page.navigate', { url: appUrl });
await sleep(3000);

const evalJs = async (expression) => {
  const result = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(JSON.stringify(result.exceptionDetails, null, 2));
  }
  return result.result.value;
};

const waitFor = async (expression, timeout = 8000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const value = await evalJs(expression);
    if (value) return value;
    await sleep(200);
  }
  const debug = await evalJs(`({
    href: location.href,
    title: document.title,
    readyState: document.readyState,
    bodyText: document.body?.innerText?.slice(0, 1000) ?? null,
    bodyHtml: document.body?.innerHTML?.slice(0, 1000) ?? null
  })`);
  debug.protocolEvents = browser.events.filter((event) => (
    event.method === 'Log.entryAdded'
    || event.method === 'Runtime.exceptionThrown'
    || event.method === 'Network.loadingFailed'
    || event.method === 'Network.responseReceived'
  )).slice(-30);
  throw new Error(`Timed out waiting for ${expression}\n${JSON.stringify(debug, null, 2)}`);
};

await waitFor(`document.readyState === 'complete' || document.readyState === 'interactive'`);
await waitFor(`Boolean(document.querySelector('#events'))`, 30000);
await waitFor(`Boolean(document.querySelector('[data-event-carousel-track]'))`, 30000);
await evalJs(`document.querySelector('#events').scrollIntoView({ block: 'center' })`);
await sleep(600);

const before = await evalJs(`(() => {
  const slides = [...document.querySelectorAll('[data-event-slide]')];
  const activeIndex = slides.findIndex((slide) => slide.dataset.active === 'true');
  const track = document.querySelector('[data-event-carousel-track]');
  return {
    activeIndex,
    activeCount: slides.filter((slide) => slide.dataset.active === 'true').length,
    controls: document.querySelectorAll('#events button[title^="Go to"]').length,
    trackTransform: track.style.transform,
    slides: slides.slice(0, 3).map((slide) => {
      const image = slide.querySelector('img');
      const article = slide.querySelector('[data-event-slide-content]');
      const rect = slide.getBoundingClientRect();
      return {
        active: slide.dataset.active,
        transform: getComputedStyle(slide).transform,
        imageOpacity: getComputedStyle(image).opacity,
        articleVisibility: getComputedStyle(article).visibility,
        articleOpacity: getComputedStyle(article).opacity,
        rect: { left: Math.round(rect.left), right: Math.round(rect.right), top: Math.round(rect.top), bottom: Math.round(rect.bottom) },
      };
    }),
  };
})()`);

const nextButton = await evalJs(`(() => {
  const button = document.querySelector('#events button[title="Go to next event"]');
  const rect = button.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
})()`);

await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: nextButton.x, y: nextButton.y });
await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: nextButton.x, y: nextButton.y, button: 'left', clickCount: 1 });
await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: nextButton.x, y: nextButton.y, button: 'left', clickCount: 1 });
await sleep(1200);

const afterNext = await evalJs(`(() => {
  const slides = [...document.querySelectorAll('[data-event-slide]')];
  const track = document.querySelector('[data-event-carousel-track]');
  return {
    href: location.href,
    title: document.title,
    hasEvents: Boolean(document.querySelector('#events')),
    hasTrack: Boolean(track),
    activeIndex: slides.findIndex((slide) => slide.dataset.active === 'true'),
    activeCount: slides.filter((slide) => slide.dataset.active === 'true').length,
    trackTransform: track?.style.transform ?? null,
  };
})()`);

const sidePoint = await evalJs(`(() => {
  const slides = [...document.querySelectorAll('[data-event-slide]')];
  const current = slides.findIndex((slide) => slide.dataset.active === 'true');
  const target = slides[current + 1] || slides[0];
  const rect = target.getBoundingClientRect();
  const visibleLeft = Math.max(0, rect.left);
  const visibleRight = Math.min(window.innerWidth, rect.right);
  const x = visibleLeft + (visibleRight - visibleLeft) / 2;
  const y = Math.max(12, Math.min(window.innerHeight - 12, rect.top + rect.height / 2));
  const hit = document.elementFromPoint(x, y);
  return {
    x,
    y,
    targetIndex: slides.indexOf(target),
    hitTag: hit?.tagName ?? null,
    hitSlideIndex: hit?.closest('[data-event-slide]') ? slides.indexOf(hit.closest('[data-event-slide]')) : -1,
    hitClasses: hit?.className ?? null,
  };
})()`);

await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: sidePoint.x, y: sidePoint.y });
await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: sidePoint.x, y: sidePoint.y, button: 'left', clickCount: 1 });
await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: sidePoint.x, y: sidePoint.y, button: 'left', clickCount: 1 });
await sleep(1200);

const afterSideClick = await evalJs(`(() => {
  const slides = [...document.querySelectorAll('[data-event-slide]')];
  const track = document.querySelector('[data-event-carousel-track]');
  return {
    activeIndex: slides.findIndex((slide) => slide.dataset.active === 'true'),
    activeCount: slides.filter((slide) => slide.dataset.active === 'true').length,
    trackTransform: track.style.transform,
  };
})()`);

const hoverPoint = await evalJs(`(() => {
  const active = document.querySelector('[data-event-slide][data-active="true"]');
  const rect = active.getBoundingClientRect();
  return { x: rect.left + rect.width * 0.72, y: rect.top + rect.height * 0.35 };
})()`);

await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: hoverPoint.x, y: hoverPoint.y });
await sleep(350);

const afterHover = await evalJs(`(() => {
  const active = document.querySelector('[data-event-slide][data-active="true"]');
  const layer = active.querySelector('div');
  return {
    cssX: getComputedStyle(active).getPropertyValue('--x').trim(),
    cssY: getComputedStyle(active).getPropertyValue('--y').trim(),
    layerTransform: getComputedStyle(layer).transform,
  };
})()`);

const clip = await evalJs(`(() => {
  const track = document.querySelector('[data-event-carousel-track]');
  const controls = document.querySelector('#events button[title="Go to previous event"]').parentElement;
  const carousel = track.parentElement;
  const a = carousel.getBoundingClientRect();
  const b = controls.getBoundingClientRect();
  const top = Math.max(0, Math.min(a.top, b.top) - 36);
  const bottom = Math.min(window.innerHeight, Math.max(a.bottom, b.bottom) + 36);
  return { x: 0, y: top, width: window.innerWidth, height: bottom - top, scale: 1 };
})()`);

const screenshot = await send('Page.captureScreenshot', {
  format: 'png',
  fromSurface: true,
  captureBeyondViewport: false,
  clip,
});

const screenshotPath = 'C:/Users/aqib7/Desktop/E-Club/events-carousel-verification.png';
await writeFile(screenshotPath, Buffer.from(screenshot.data, 'base64'));

browser.close();

console.log(JSON.stringify({
  screenshotPath,
  before,
  afterNext,
  sideClickTarget: sidePoint.targetIndex,
  afterSideClick,
  afterHover,
}, null, 2));
