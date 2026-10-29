"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import SectionHeading from "@/components/SectionHeading";
import { alumni, alumniVisible, type Alumni as AlumniStory } from "@/data/alumni";
import { cn } from "@/lib/utils";

type ScreenTier = "mobile" | "tablet" | "desktop";
type Dimensions = { width: number; height: number; stageHeight: number; tier: ScreenTier; scale: number };

const DEFAULT_INTERVAL = 8000;
const SPRING = { type: "spring", stiffness: 220, damping: 26, mass: 0.75 } as const;

function getInitials(name: string) {
  return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "?";
}

function getDimensions(width: number): Dimensions {
  const tier: ScreenTier = width < 640 ? "mobile" : width < 1024 ? "tablet" : "desktop";
  if (tier === "mobile") {
    return { width: Math.max(220, width - 56), height: 490, stageHeight: 520, tier, scale: 1 };
  }
  const scale = Math.min(1, width / 1240);
  const height = 513 * scale;
  return { width: 762 * scale, height, stageHeight: height + 40 * scale, tier, scale };
}

function getVisibleOffsets(count: number, tier: ScreenTier) {
  if (count <= 1) return [0];
  if (count === 2) return [0, 1];
  const slots = Math.min(2, Math.floor((count - 1) / 2));
  const radius = tier === "desktop" ? slots : Math.min(1, slots);
  return Array.from({ length: radius * 2 + 1 }, (_, index) => index - radius);
}

function getRenderOffsets(count: number, visibleOffsets: number[]) {
  if (count <= 1) return visibleOffsets;
  if (count === 2) return [-1, ...visibleOffsets, 2];
  const radius = Math.max(...visibleOffsets.map(Math.abs));
  return [-radius - 1, ...visibleOffsets, radius + 1];
}

function AlumniImage({
  story,
  active,
  firstActive,
  eager,
  focus,
}: {
  story: AlumniStory;
  active: boolean;
  firstActive: boolean;
  eager: boolean;
  focus: string;
}) {
  if (!story.image) {
    return <span className="alumni-card__initials" aria-hidden="true">{getInitials(story.name)}</span>;
  }

  return (
    <Image
      src={story.image}
      alt={active ? `Portrait of ${story.name}` : ""}
      fill
      sizes={active ? "(max-width: 639px) 44vw, 330px" : "120px"}
      preload={firstActive}
      loading={active || firstActive ? undefined : eager ? "eager" : "lazy"}
      draggable={false}
      style={{ objectFit: "cover", objectPosition: focus }}
    />
  );
}

function Notch({ side, size = "large" }: { side: "left" | "right"; size?: "large" | "small" }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("alumni-notch", `alumni-notch--${side}`, `alumni-notch--${size}`)}
      viewBox={size === "large" ? "0 0 20 38" : "0 0 16 28"}
      preserveAspectRatio="none"
    >
      <path d={size === "large"
        ? "M0 0C0 0 1.24 13.58 10 13.58S20 0 20 0V38C20 38 18.76 24.42 10 24.42S0 38 0 38V0Z"
        : "M0 0C0 0 .99 10.18 8 10.18S16 0 16 0V28C16 28 15.01 17.82 8 17.82S0 28 0 28V0Z"}
      />
    </svg>
  );
}

function AlumniCard({
  story,
  offset,
  virtualIndex,
  active,
  visible,
  dimensions,
  firstActive,
  reducedMotion,
  placeholderPreview,
  onSelect,
}: {
  story: AlumniStory;
  offset: number;
  virtualIndex: number;
  active: boolean;
  visible: boolean;
  dimensions: Dimensions;
  firstActive: boolean;
  reducedMotion: boolean;
  placeholderPreview: boolean;
  onSelect: () => void;
}) {
  const distance = Math.abs(offset);
  const side = offset < 0 ? "left" : "right";
  const mobile = dimensions.tier === "mobile";
  const scale = dimensions.scale;
  let cardWidth = dimensions.width;
  let cardHeight = dimensions.height;
  let x = 0;

  if (distance === 1) {
    cardWidth = mobile ? 60 : 105 * scale;
    cardHeight = mobile ? 410 : 344 * scale;
    x = side === "left"
      ? -(dimensions.width / 2 + (mobile ? 20 : 125 * scale))
      : dimensions.width / 2 + (mobile ? 20 : 125 * scale);
  } else if (distance === 2) {
    cardWidth = mobile ? 60 : 74 * scale;
    cardHeight = mobile ? 410 : 205 * scale;
    x = side === "left"
      ? -(dimensions.width / 2 + (mobile ? 220 : 215 * scale))
      : dimensions.width / 2 + (mobile ? 220 : 215 * scale);
  } else if (distance > 2) {
    cardWidth = mobile ? 60 : 74 * scale;
    cardHeight = mobile ? 410 : 205 * scale;
    x = side === "left"
      ? -(dimensions.width / 2 + 350 * scale)
      : dimensions.width / 2 + 350 * scale;
  }

  const transition = reducedMotion
    ? { x: { duration: 0 }, y: { duration: 0 }, width: { duration: 0 }, height: { duration: 0 }, opacity: { duration: 0.2 } }
    : SPRING;
  const hidden = !active;
  const focus = story.focus || "50% 20%";
  const notchSize = distance === 2 ? "small" : "large";

  return (
    <motion.div
      key={virtualIndex}
      className={cn("alumni-card", active && "alumni-card--active", hidden && "alumni-card--side", !visible && "alumni-card--hidden")}
      data-offset={offset}
      aria-hidden={hidden ? true : undefined}
      inert={hidden}
      onClick={visible && !active ? onSelect : undefined}
      initial={false}
      animate={{ x, y: 0, width: cardWidth, height: cardHeight, opacity: visible ? 1 : 0 }}
      exit={{ opacity: 0, x: side === "left" ? -900 * scale : 900 * scale }}
      transition={transition}
      style={{
        left: `calc(50% - ${cardWidth / 2}px)`,
        top: `calc(50% - ${cardHeight / 2}px)`,
        zIndex: active ? 1 : visible ? (distance === 1 ? 4 : 3) : 0,
        pointerEvents: visible && !active ? "auto" : "none",
      }}
    >
      {visible && (distance === 1 || (distance === 2 && dimensions.tier === "desktop")) ? <Notch side={side} size={notchSize} /> : null}
      <div className="alumni-card__surface">
        {active ? (
          <motion.div
            className="alumni-card__active-content"
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.2 }}
          >
            <div className="alumni-card__copy">
              <span className="alumni-card__batch">{story.batch}</span>
              <h3 className="alumni-card__outcome" title={story.outcome}>{story.outcome}</h3>
              {story.quote ? <blockquote className="alumni-card__quote">“{story.quote}”</blockquote> : null}
              <div className="alumni-card__chips">
                <span className="alumni-chip alumni-chip--name">{story.name}</span>
                <span className="alumni-chip alumni-chip--role" title={story.role}>{story.role}</span>
              </div>
            </div>
            <div className="alumni-card__portrait">
              <AlumniImage story={story} active firstActive={firstActive} eager={false} focus={focus} />
            </div>
          </motion.div>
        ) : (
          <div className="alumni-card__sliver-image">
            <AlumniImage story={story} active={false} firstActive={false} eager={visible && distance === 1} focus={focus} />
          </div>
        )}
        {placeholderPreview ? <span className="alumni-placeholder-ribbon">PLACEHOLDER</span> : null}
      </div>
    </motion.div>
  );
}

export default function Alumni() {
  const verifiedAlumni = useMemo(() => alumni.filter((person) => person.verified), []);
  const [previewEnabled, setPreviewEnabled] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [playRequested, setPlayRequested] = useState(true);
  const [userStoppedAutoplay, setUserStoppedAutoplay] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const stories = previewEnabled ? alumni : verifiedAlumni;
  const isVisible = previewEnabled || (alumniVisible && verifiedAlumni.length >= 3);
  const total = stories.length;
  const activeIndex = total ? ((page % total) + total) % total : 0;
  const dimensions = containerWidth === null ? null : getDimensions(containerWidth);
  const autoPlayInterval = DEFAULT_INTERVAL;
  const autoplayRunning = Boolean(total > 1 && playRequested && !userStoppedAutoplay && !hovered && !focusWithin && inViewport && tabVisible && !reducedMotion);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    setPreviewEnabled(new URLSearchParams(window.location.search).get("preview") === "alumni");
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const carousel = carouselRef.current;
    if (!carousel || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const width = Math.round(entries[0]?.contentRect.width ?? 0);
      if (width > 0) setContainerWidth((current) => current === width ? current : width);
    });
    observer.observe(carousel);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!isVisible || !carousel) return;
    const observer = new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(carousel);
    const updateVisibility = () => setTabVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [isVisible]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!isVisible || !section) return;
    if (!("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setRevealed(true);
      observer.disconnect();
    }, { threshold: 0.08 });
    observer.observe(section);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const stopAutoplay = useCallback(() => {
    setUserStoppedAutoplay(true);
    setPlayRequested(false);
  }, []);

  const announceStory = useCallback((nextPage: number) => {
    if (!total) return;
    const index = ((nextPage % total) + total) % total;
    const story = stories[index];
    setAnnouncement(`Alumni ${index + 1} of ${total}: ${story.name}, ${story.outcome}`);
  }, [stories, total]);

  const moveTo = useCallback((nextPage: number, userInitiated: boolean) => {
    if (!total || total === 1) return;
    setPage(nextPage);
    if (userInitiated) {
      stopAutoplay();
      announceStory(nextPage);
    }
  }, [announceStory, stopAutoplay, total]);

  const next = useCallback((userInitiated = true) => moveTo(page + 1, userInitiated), [moveTo, page]);
  const previous = useCallback((userInitiated = true) => moveTo(page - 1, userInitiated), [moveTo, page]);

  const selectTab = (index: number) => {
    if (index === activeIndex) {
      stopAutoplay();
      return;
    }
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    else if (diff < -total / 2) diff += total;
    moveTo(page + diff, true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const focusedTab = (event.target as HTMLElement).closest<HTMLElement>("[role='tab']");
    let destination: number | null = null;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
      if (focusedTab) destination = (activeIndex - 1 + total) % total;
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
      if (focusedTab) destination = (activeIndex + 1) % total;
    }
    if (destination !== null) requestAnimationFrame(() => carouselRef.current?.querySelector<HTMLElement>(`#alumni-tab-${destination}`)?.focus());
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") return;
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (event.pointerType !== "touch" || !start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;
    if (dx < 0) next();
    else previous();
  };

  const toggleAutoplay = () => {
    if (playRequested && !userStoppedAutoplay) {
      setPlayRequested(false);
      setUserStoppedAutoplay(true);
    } else {
      setUserStoppedAutoplay(false);
      setPlayRequested(true);
    }
  };

  if (!isVisible || total === 0) return null;

  const tier = dimensions?.tier;
  const visibleOffsets = tier ? getVisibleOffsets(total, tier) : [];
  const renderOffsets = tier ? getRenderOffsets(total, visibleOffsets) : [];
  const activeTabId = `alumni-tab-${activeIndex}`;

  return (
    <section ref={sectionRef} id="alumni" className="alumni-section" aria-labelledby="alumni-heading">
      <div className="alumni-container">
        <div className="alumni-topbar">
          <a className="alumni-wordmark" href="#alumni" aria-label="E-Club Alumni">E-CLUB <span aria-hidden="true">✳</span></a>
          <nav aria-label="Section navigation"><a href="#alumni" aria-current="location">Alumni <span aria-hidden="true">↗</span></a></nav>
        </div>

        <SectionHeading
          id="alumni-heading"
          eyebrow="LONG-GAME PROOF"
          title="Where the club"
          titleAccent="leads"
          tagline="Real people. Real outcomes."
          copy="[TODO: Add an approved introduction to alumni stories.]"
        />

        <div className={cn("alumni-reveal", revealed && "is-revealed")}>
          <div
            ref={carouselRef}
            className={cn("alumni-carousel", dimensions ? `alumni-carousel--${dimensions.tier}` : "alumni-carousel--reserved")}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setFocusWithin(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false);
            }}
            onClickCapture={(event) => {
              if (!(event.target as HTMLElement).closest("[data-alumni-play-toggle]")) stopAutoplay();
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { pointerStartRef.current = null; }}
            role="region"
            aria-label="Alumni stories"
            aria-roledescription="carousel"
            tabIndex={0}
          >
            {dimensions ? (
              <>
                <div className="alumni-toolbar">
                  <span className="alumni-counter">{String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                  <button
                    type="button"
                    className="alumni-autoplay-button"
                    data-alumni-play-toggle=""
                    onClick={toggleAutoplay}
                    aria-label={playRequested && !userStoppedAutoplay ? "Pause alumni autoplay" : "Play alumni autoplay"}
                    aria-pressed={playRequested && !userStoppedAutoplay}
                    disabled={reducedMotion}
                    title={reducedMotion ? "Autoplay is off because reduced motion is enabled" : undefined}
                  >
                    <span aria-hidden="true" className={playRequested && !userStoppedAutoplay ? "alumni-pause-icon" : "alumni-play-icon"} />
                    {playRequested && !userStoppedAutoplay ? "Pause" : "Play"}
                  </button>
                </div>

                <div className="alumni-stage" role="tabpanel" id="alumni-panel" aria-labelledby={activeTabId} style={{ height: dimensions.stageHeight }}>
                  <AnimatePresence initial={false}>
                    {renderOffsets.map((offset) => {
                      const virtualIndex = page + offset;
                      const index = ((virtualIndex % total) + total) % total;
                      const story = stories[index];
                      const active = offset === 0;
                      const visible = visibleOffsets.includes(offset);
                      return (
                        <AlumniCard
                          key={virtualIndex}
                          story={story}
                          offset={offset}
                          virtualIndex={virtualIndex}
                          active={active}
                          visible={visible}
                          dimensions={dimensions}
                          firstActive={active && page === 0}
                          reducedMotion={reducedMotion}
                          placeholderPreview={previewEnabled}
                          onSelect={() => moveTo(virtualIndex, true)}
                        />
                      );
                    })}
                  </AnimatePresence>
                </div>

                {total > 1 ? (
                  <div className="alumni-progress-controls">
                    <div className="alumni-tabs" role="tablist" aria-label="Choose an alumnus">
                      {stories.map((story, index) => {
                        const selected = index === activeIndex;
                        return (
                          <button
                            key={story.id}
                            type="button"
                            role="tab"
                            id={`alumni-tab-${index}`}
                            aria-controls="alumni-panel"
                            aria-label={`Show ${story.name}`}
                            aria-selected={selected}
                            tabIndex={selected ? 0 : -1}
                            className={cn("alumni-tab", selected && "is-selected")}
                            onClick={() => selectTab(index)}
                          >
                            <span className="alumni-tab-track" aria-hidden="true">
                              {selected ? (
                                <span
                                  key={activeIndex}
                                  className="alumni-tab-fill"
                                  style={{
                                    "--alumni-interval": `${autoPlayInterval}ms`,
                                    animationPlayState: autoplayRunning ? "running" : "paused",
                                  } as CSSProperties}
                                  onAnimationEnd={() => { if (autoplayRunning) next(false); }}
                                />
                              ) : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="alumni-reserved" aria-hidden="true" />
            )}
            <p className="alumni-sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
          </div>
          {previewEnabled ? <p className="alumni-preview-note">Development preview · placeholder alumni stories</p> : null}
        </div>
      </div>
    </section>
  );
}
