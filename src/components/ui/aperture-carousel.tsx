'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../shared/Button';

export interface ApertureSlide {
  eventId: string;
  image: string;
  alt?: string;
  title: string;
  date: string;
  outcome: string;
  caption?: string;
  rawEvent: any;
  imagePosition?: string;
}

export interface ApertureCarouselProps {
  slides: ApertureSlide[];
  height?: number | string;
  autoplay?: number;
  duration?: number;
  ink?: string;
  accent?: string;
  plainCursor?: boolean;
  imagePosition?: string;
  isModalOpen?: boolean;
  onChange?: (index: number) => void;
  onViewDetails: (event: any) => void;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

// Logic utilities
export function coverRadius(x: number, y: number, w: number, h: number): number {
  return Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
}

export function wrap(i: number, n: number): number {
  return n ? ((i % n) + n) % n : 0;
}

export function sideOf(x: number, w: number): 1 | -1 {
  return x >= w / 2 ? 1 : -1;
}

export function pad2(n: number): string {
  return n < 10 ? '0' + n : String(n);
}

const AP_CSS = `
.ap-root {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #0B0E14;
  color: var(--ap-ink, #F5F3EE);
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y;
  outline: none;
}
.ap-root:focus-visible {
  box-shadow: inset 0 0 0 2px var(--ap-accent, #E8A33D);
}
@media (hover: hover) and (pointer: fine) {
  .ap-root[data-lens='1'] {
    cursor: none;
  }
}
.ap-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.ap-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  display: block;
  pointer-events: none;
}
.ap-ring {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 50%;
  border: 1px solid var(--ap-accent, #E8A33D);
  pointer-events: none;
  opacity: 0;
}
.ap-shade {
  position: absolute;
  inset: auto 0 0 0;
  height: 65%;
  background: linear-gradient(
    to top,
    rgba(11, 14, 20, 0.96) 0%,
    rgba(11, 14, 20, 0.82) 35%,
    rgba(11, 14, 20, 0.45) 70%,
    transparent 100%
  );
  pointer-events: none;
}
.ap-top-shade {
  position: absolute;
  inset: 0 0 auto 0;
  height: 25%;
  background: linear-gradient(to bottom, rgba(11, 14, 20, 0.6) 0%, transparent 100%);
  pointer-events: none;
}
.ap-text {
  position: absolute;
  left: clamp(24px, 5vw, 72px);
  bottom: clamp(48px, 9vh, 92px);
  right: clamp(24px, 5vw, 72px);
  max-width: 860px;
  pointer-events: none;
  z-index: 20;
}
.ap-line {
  display: block;
  overflow: hidden;
}
.ap-line > span {
  display: block;
  animation: ap-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.ap-date {
  font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--ap-accent, #E8A33D);
  text-transform: uppercase;
  margin-bottom: 8px;
}
.ap-date > span {
  animation-delay: 0s;
}
.ap-title {
  font-family: 'Fraunces', Georgia, 'Times New Roman', serif;
  font-size: clamp(34px, 5.5vw, 68px);
  line-height: 1.05;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--ap-ink, #F5F3EE);
  margin-bottom: 12px;
}
.ap-title > span {
  animation-delay: 0.06s;
}
.ap-outcome {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: clamp(15px, 1.6vw, 20px);
  font-weight: 500;
  line-height: 1.35;
  color: var(--ap-accent, #E8A33D);
  margin-bottom: 12px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
}
.ap-outcome > span {
  animation-delay: 0.12s;
}
.ap-cap {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: clamp(13px, 1.3vw, 15px);
  line-height: 1.5;
  color: rgba(245, 243, 238, 0.8);
  max-width: 60ch;
  margin-bottom: 20px;
}
.ap-cap > span {
  animation-delay: 0.18s;
}
.ap-cta {
  pointer-events: auto;
  display: inline-block;
  margin-top: 4px;
}
.ap-cta > span {
  display: inline-block;
  animation-delay: 0.24s;
}
.ap-count {
  position: absolute;
  right: clamp(24px, 5vw, 72px);
  bottom: clamp(48px, 9vh, 92px);
  font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--ap-accent, #E8A33D);
  pointer-events: none;
  z-index: 20;
}
.ap-track {
  position: absolute;
  left: clamp(24px, 5vw, 72px);
  right: clamp(24px, 5vw, 72px);
  bottom: clamp(24px, 4vh, 40px);
  height: 2px;
  background: rgba(245, 243, 238, 0.15);
  pointer-events: none;
  z-index: 20;
}
.ap-fill {
  height: 100%;
  background: var(--ap-accent, #E8A33D);
  transform-origin: left;
  transform: scaleX(0);
}
.ap-fill[data-run='1'] {
  animation: ap-fill var(--ap-dur) linear forwards;
}
.ap-root[data-paused='1'] .ap-fill {
  animation-play-state: paused;
}
.ap-lens {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  height: 80px;
  margin: -40px 0 0 -40px;
  border-radius: 50%;
  border: 1.5px solid var(--ap-accent, #E8A33D);
  display: grid;
  place-items: center;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #F5F3EE;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.05s linear;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: rgba(11, 14, 20, 0.4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  z-index: 40;
}
.ap-lens[data-on='1'] {
  opacity: 1;
}
.ap-touch-controls {
  display: none;
  position: absolute;
  right: clamp(20px, 4vw, 40px);
  bottom: clamp(20px, 4vh, 36px);
  z-index: 30;
  gap: 10px;
}
@media (hover: none) or (pointer: coarse) {
  .ap-touch-controls {
    display: flex;
  }
}
.ap-touch-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #141822;
  border: 1px solid rgba(232, 163, 61, 0.5);
  color: #F5F3EE;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.2s;
}
.ap-touch-btn:active {
  transform: scale(0.92);
  background: #E8A33D;
  color: #0B0E14;
}
.ap-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@keyframes ap-rise {
  from {
    transform: translateY(105%);
  }
  to {
    transform: none;
  }
}
@keyframes ap-fill {
  to {
    transform: scaleX(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .ap-line > span {
    animation: none !important;
  }
}
`;

export default function ApertureCarousel({
  slides,
  height = '100svh',
  autoplay = 7000,
  duration = 1100,
  ink = '#F5F3EE',
  accent = '#E8A33D',
  plainCursor = false,
  imagePosition = 'center 30%',
  isModalOpen = false,
  onChange,
  onViewDetails,
  className = '',
  style,
  ariaLabel = 'Featured Events Carousel',
}: ApertureCarouselProps) {
  const n = slides.length;
  const srcs = React.useMemo(() => slides.map((s) => s.image), [slides]);
  const [index, setIndex] = React.useState(0);
  const [incoming, setIncoming] = React.useState<null | {
    to: number;
    x: number;
    y: number;
    id: number;
  }>(null);

  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isLensSuppressed, setIsLensSuppressed] = React.useState(false);
  const [lensOn, setLensOn] = React.useState(false);
  const [lensLabel, setLensLabel] = React.useState('Next');
  const [isOffscreen, setIsOffscreen] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const layerRef = React.useRef<HTMLDivElement | null>(null);
  const ringRef = React.useRef<HTMLDivElement | null>(null);
  const lensRef = React.useRef<HTMLDivElement | null>(null);
  const busy = React.useRef(false);
  const down = React.useRef<null | { x: number; y: number }>(null);

  // Check prefers-reduced-motion
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Preload all slide images on mount using requestIdleCallback
  React.useEffect(() => {
    const preload = () => {
      srcs.forEach((src) => {
        if (!src) return;
        const img = new Image();
        img.src = src;
      });
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preload);
    } else {
      setTimeout(preload, 300);
    }
  }, [srcs]);

  // Navigate with decode() guard so the aperture never reveals a blank frame
  const go = React.useCallback(
    async (dir: number, x?: number, y?: number) => {
      const root = rootRef.current;
      if (!root || busy.current || n < 2) return;
      busy.current = true;

      const w = root.clientWidth;
      const h = root.clientHeight;
      const targetIdx = wrap(index + dir, n);
      const targetSrc = srcs[targetIdx];

      // Await image decode before opening iris
      if (targetSrc) {
        const img = new Image();
        img.src = targetSrc;
        try {
          await Promise.race([
            img.decode(),
            new Promise((resolve) => setTimeout(resolve, 300)),
          ]);
        } catch {
          // If decode fails or is cancelled, proceed anyway
        }
      }

      setIncoming({
        to: targetIdx,
        x: x ?? (dir > 0 ? w * 0.85 : w * 0.15),
        y: y ?? h * 0.5,
        id: Date.now(),
      });
    },
    [index, n, srcs]
  );

  // Open the iris once incoming layer is mounted
  React.useLayoutEffect(() => {
    const root = rootRef.current;
    const layer = layerRef.current;
    const ring = ringRef.current;
    if (!incoming || !root || !layer) return;

    const w = root.clientWidth;
    const h = root.clientHeight;
    const R = coverRadius(incoming.x, incoming.y, w, h);
    const at = ' at ' + incoming.x + 'px ' + incoming.y + 'px)';
    const ease = 'cubic-bezier(.7,0,.2,1)';
    const anims: Animation[] = [];

    if (prefersReducedMotion) {
      anims.push(
        layer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: 'both' })
      );
    } else {
      anims.push(
        layer.animate(
          [{ clipPath: 'circle(0px' + at }, { clipPath: 'circle(' + R + 'px' + at }],
          { duration, easing: ease, fill: 'both' }
        )
      );

      const img = layer.firstElementChild as HTMLElement | null;
      if (img) {
        anims.push(
          img.animate([{ transform: 'scale(1.18)' }, { transform: 'scale(1)' }], {
            duration: duration * 1.25,
            easing: 'cubic-bezier(.2,.7,.2,1)',
            fill: 'both',
          })
        );
      }

      if (ring) {
        ring.style.width = ring.style.height = R * 2 + 'px';
        anims.push(
          ring.animate(
            [
              {
                transform:
                  'translate(' + (incoming.x - R) + 'px,' + (incoming.y - R) + 'px) scale(0)',
                opacity: 1,
              },
              { opacity: 1, offset: 0.7 },
              {
                transform:
                  'translate(' + (incoming.x - R) + 'px,' + (incoming.y - R) + 'px) scale(1)',
                opacity: 0,
              },
            ],
            { duration, easing: ease, fill: 'both' }
          )
        );
      }
    }

    let done = false;
    anims[0].onfinish = () => {
      done = true;
      setIndex(incoming.to);
      setIncoming(null);
      busy.current = false;
    };

    return () => {
      if (!done) busy.current = false;
      anims.forEach((a) => a.cancel());
    };
  }, [incoming, duration, prefersReducedMotion]);

  React.useEffect(() => {
    onChange?.(index);
  }, [index, onChange]);

  // Pause tracking: IntersectionObserver & Document visibility
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setIsOffscreen(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    io.observe(root);

    return () => io.disconnect();
  }, []);

  const local = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, w: r.width };
  };

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || plainCursor || isLensSuppressed) return;
    const p = local(e);
    const lens = lensRef.current;
    if (lens) lens.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)';
    const label = sideOf(p.x, p.w) > 0 ? 'Next' : 'Prev';
    if (label !== lensLabel) setLensLabel(label);
    if (!lensOn) setLensOn(true);
  };

  const onDown = (e: React.PointerEvent) => {
    down.current = { x: e.clientX, y: e.clientY };
  };

  const onUp = (e: React.PointerEvent) => {
    const start = down.current;
    down.current = null;
    if (!start) return;
    const p = local(e);
    const dx = e.clientX - start.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - start.y)) {
      go(dx < 0 ? 1 : -1, p.x, p.y);
    } else if (Math.abs(dx) < 8) {
      go(sideOf(p.x, p.w), p.x, p.y);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
    else return;
    e.preventDefault();
  };

  const shown = incoming ? incoming.to : index;
  const s = slides[shown] || {};

  // Autoplay pause conditions
  const isPaused =
    isHovered ||
    isFocused ||
    isModalOpen ||
    isOffscreen ||
    (typeof document !== 'undefined' && document.hidden);

  const effectiveAutoplay = prefersReducedMotion ? 0 : autoplay;
  const runFill = effectiveAutoplay > 0 && n > 1 && !incoming;

  return (
    <div
      ref={rootRef}
      className={['ap-root', className].filter(Boolean).join(' ')}
      style={{
        height,
        ['--ap-ink' as string]: ink,
        ['--ap-accent' as string]: accent,
        ['--ap-dur' as string]: effectiveAutoplay + 'ms',
        ...style,
      }}
      data-paused={isPaused ? '1' : '0'}
      data-lens={plainCursor || isLensSuppressed ? '0' : '1'}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerMove={onMove}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        setLensOn(false);
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <style>{AP_CSS}</style>

      {/* Slide Layers */}
      <div className="ap-layer">
        {srcs[index] ? (
          <img
            className="ap-img"
            src={srcs[index]}
            alt={slides[index]?.alt || slides[index]?.title || ''}
            style={{ objectPosition: slides[index]?.imagePosition || imagePosition }}
            draggable={false}
          />
        ) : null}
      </div>

      {incoming ? (
        <div
          ref={layerRef}
          className="ap-layer"
          key={incoming.id}
          style={{ clipPath: 'circle(0px at 0 0)' }}
        >
          {srcs[incoming.to] ? (
            <img
              className="ap-img"
              src={srcs[incoming.to]}
              alt=""
              style={{ objectPosition: slides[incoming.to]?.imagePosition || imagePosition }}
              draggable={false}
            />
          ) : null}
        </div>
      ) : null}

      <div ref={ringRef} className="ap-ring" aria-hidden="true" />
      <div className="ap-top-shade" aria-hidden="true" />
      <div className="ap-shade" aria-hidden="true" />

      {/* Text Hierarchy Container */}
      <div className="ap-text" key={'t' + shown} aria-hidden="true">
        {s.date ? (
          <span className="ap-line ap-date">
            <span>{s.date}</span>
          </span>
        ) : null}

        {s.title ? (
          <span className="ap-line ap-title">
            <span>{s.title}</span>
          </span>
        ) : null}

        {s.outcome ? (
          <span className="ap-line ap-outcome">
            <span>{s.outcome}</span>
          </span>
        ) : null}

        {s.caption ? (
          <span className="ap-line ap-cap">
            <span>{s.caption}</span>
          </span>
        ) : null}

        {/* View Details CTA Button */}
        <div className="ap-line">
          <span className="ap-cta">
            <Button
              variant="outline"
              size="md"
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onMouseEnter={() => setIsLensSuppressed(true)}
              onMouseLeave={() => setIsLensSuppressed(false)}
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(s.rawEvent);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter' || e.key === ' ') {
                  onViewDetails(s.rawEvent);
                }
              }}
              className="pointer-events-auto border-[#E8A33D] text-[#E8A33D] hover:bg-[#E8A33D] hover:text-[#0B0E14] font-medium"
            >
              <span>View Details</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          </span>
        </div>
      </div>

      {/* Slide Counter */}
      <div className="ap-count" aria-hidden="true">
        {pad2(shown + 1)} — {pad2(n)}
      </div>

      {/* Progress Hairline Track */}
      <div className="ap-track" aria-hidden="true">
        <div
          key={'f' + index}
          className="ap-fill"
          data-run={runFill ? '1' : '0'}
          onAnimationEnd={() => go(1)}
        />
      </div>

      {/* Mouse Cursor Lens */}
      {!plainCursor && !isLensSuppressed ? (
        <div
          ref={lensRef}
          className="ap-lens"
          data-on={lensOn ? '1' : '0'}
          aria-hidden="true"
        >
          {lensLabel}
        </div>
      ) : null}

      {/* Touch Fallback Controls for Mobile / Tablets */}
      <div
        className="ap-touch-controls"
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Previous event slide"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          className="ap-touch-btn"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          aria-label="Next event slide"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          className="ap-touch-btn"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="ap-sr" aria-live="polite">
        {'Slide ' + (shown + 1) + ' of ' + n + (s.title ? ': ' + s.title : '')}
      </div>
    </div>
  );
}
