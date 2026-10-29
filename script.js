const FRAME_COUNT = 96;
const FRAME_PATH = 'public/frames/frame_';
const FRAME_EXTENSION = '.webp';
const FRAME_EASING = 0.18;

const track = document.querySelector('.frame-hero');
const canvas = document.querySelector('.frame-canvas');
const context = canvas.getContext('2d', { alpha: false });
const frames = [];

let targetProgress = 0;
let currentProgress = 0;
let previousFrame = -1;
let animationId = 0;
let isDisposed = false;

function frameUrl(index) {
  return `${FRAME_PATH}${String(index + 1).padStart(3, '0')}${FRAME_EXTENSION}`;
}

async function loadFrame(index) {
  const image = new Image();
  image.src = frameUrl(index);
  if (typeof image.decode === 'function') {
    await image.decode();
  } else {
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });
  }
  return image;
}

function updateTargetProgress() {
  const scrollableDistance = Math.max(1, track.offsetHeight - window.innerHeight);
  const trackStart = track.getBoundingClientRect().top + window.scrollY;
  targetProgress = Math.max(0, Math.min(1, (window.scrollY - trackStart) / scrollableDistance));
  if (!animationId) animationId = requestAnimationFrame(animate);
}

function animate() {
  animationId = 0;
  if (isDisposed) return;

  currentProgress += (targetProgress - currentProgress) * FRAME_EASING;
  if (Math.abs(targetProgress - currentProgress) < 0.001) currentProgress = targetProgress;

  const frameIndex = Math.round(currentProgress * (FRAME_COUNT - 1));
  if (frameIndex !== previousFrame) {
    const frame = frames[frameIndex];
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(frame, 0, 0, canvas.width, canvas.height);
    previousFrame = frameIndex;
  }

  if (currentProgress !== targetProgress) animationId = requestAnimationFrame(animate);
}

function dispose() {
  isDisposed = true;
  window.removeEventListener('scroll', updateTargetProgress);
  window.removeEventListener('resize', updateTargetProgress);
  window.removeEventListener('pagehide', dispose);
  if (animationId) cancelAnimationFrame(animationId);
}

async function startFrameAnimation() {
  try {
    const loadedFrames = await Promise.all(
      Array.from({ length: FRAME_COUNT }, (_, index) => loadFrame(index)),
    );
    if (isDisposed) return;
    frames.push(...loadedFrames);
    window.addEventListener('scroll', updateTargetProgress, { passive: true });
    window.addEventListener('resize', updateTargetProgress, { passive: true });
    window.addEventListener('pagehide', dispose);
    updateTargetProgress();
  } catch (error) {
    console.error('E-Club frames failed to preload:', error);
  }
}

startFrameAnimation();
