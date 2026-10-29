"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Modal from "@/components/Modal";
import { events, EVENT_DATE_TODO, featuredEvents, type EventRecord } from "@/data/events";
import { gsap, ScrollTrigger, isWindowScroller, observeWindowResize, useGSAP, waitForScrollerReady } from "@/lib/gsap";

const INITIAL_DELAY_VH = 40;
const FINAL_DELAY_VH = 40;
const SCROLL_PER_TRANSITION_VH = 115;
const TOTAL_SCROLL_VH = INITIAL_DELAY_VH + FINAL_DELAY_VH + Math.max(0, featuredEvents.length - 1) * SCROLL_PER_TRANSITION_VH;

function formatEventDate(date: string) {
  if (date === EVENT_DATE_TODO) return "DATE TO CONFIRM";
  return new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function stripMask(progress: number, count: number) {
  if (progress <= 0) return "linear-gradient(to bottom, transparent 0%, transparent 100%)";
  if (progress >= 1) return "linear-gradient(to bottom, black 0%, black 100%)";
  const step = 100 / count;
  const stagger = 0.48;
  const spans = Array.from({ length: count }, (_, index) => {
    const local = clamp((progress - index / count * stagger) / (1 - stagger), 0, 1);
    return { start: index * step, end: index * step + local * step };
  }).filter((span) => span.end > span.start);
  const stops: string[] = [];
  let cursor = 0;
  for (const span of spans) {
    if (span.start > cursor) stops.push(`transparent ${cursor}%`, `transparent ${span.start}%`);
    stops.push(`black ${span.start}%`, `black ${span.end}%`);
    cursor = Math.max(cursor, span.end);
  }
  if (cursor < 100) stops.push(`transparent ${cursor}%`, "transparent 100%");
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

export default function Events() {
  const galleryRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalView, setModalView] = useState<"all" | "details" | null>(null);
  const [showModalBack, setShowModalBack] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(featuredEvents[0]?.id ?? events[0].id);
  const selectedEvent = events.find((event) => event.id === selectedId) ?? events[0];
  const activeEvent = featuredEvents[activeIndex] ?? featuredEvents[0];

  useGSAP(() => {
    const section = galleryRef.current;
    const stage = stageRef.current;
    if (!section || !stage || featuredEvents.length < 1) return;

    let disposed = false;
    let progress = 0;
    let activeTitleIndex = 0;
    let queuedTitleIndex: number | null = null;
    let titleAnimating = false;
    const decoded = new Set<number>();
    const decodeJobs = new Map<number, Promise<void>>();
    const cancelDecodeWaits = new Set<() => void>();
    const smallScreen = window.matchMedia("(max-width: 599px)");
    const stripCount = () => smallScreen.matches ? 10 : 20;
    let refreshUnsubscribe = () => {};

    const paintLayers = () => {
      const timelineProgress = clamp((progress * TOTAL_SCROLL_VH - INITIAL_DELAY_VH) / SCROLL_PER_TRANSITION_VH, 0, featuredEvents.length - 1);
      layerRefs.current.forEach((layer, index) => {
        if (!layer) return;
        const img = layer.querySelector("img");
        const scaleStart = Math.max(0, index - 1);
        const scaleProgress = clamp(timelineProgress - scaleStart, 0, 1);
        if (img) img.style.transform = `translate3d(0,0,0) scale(${1.12 - scaleProgress * 0.12})`;

        if (smallScreen.matches) {
          const floor = Math.floor(timelineProgress);
          const fraction = timelineProgress >= featuredEvents.length - 1 ? 0 : timelineProgress - floor;
          layer.style.maskImage = "none";
          layer.style.webkitMaskImage = "none";
          layer.style.opacity = index === floor ? String(1 - fraction) : index === floor + 1 ? String(fraction) : index < floor ? "0" : "0";
        } else if (index === 0) {
          layer.style.opacity = "1";
        } else {
          const reveal = clamp(timelineProgress - (index - 1), 0, 1);
          const mask = decoded.has(index) ? stripMask(reveal, stripCount()) : stripMask(0, stripCount());
          layer.style.opacity = "1";
          layer.style.maskImage = mask;
          layer.style.webkitMaskImage = mask;
        }
      });
    };

    const preloadImage = (index: number): Promise<void> => {
      if (index < 0 || index >= featuredEvents.length || decoded.has(index)) return Promise.resolve();
      const existing = decodeJobs.get(index);
      if (existing) return existing;
      const job = new Promise<void>((resolve, reject) => {
        const image = layerRefs.current[index]?.querySelector("img");
        if (!image) {
          reject(new Error(`Event image layer ${index} has not mounted`));
          return;
        }
        let settled = false;
        const cleanup = () => {
          image.removeEventListener("load", onLoad);
          image.removeEventListener("error", onError);
          cancelDecodeWaits.delete(cleanup);
        };
        const finish = async () => {
          if (settled) return;
          settled = true;
          cleanup();
          try {
            if (!image.naturalWidth) throw new Error(`Unable to load event image ${featuredEvents[index].cover}`);
            if (image.decode) await image.decode();
            decoded.add(index);
            paintLayers();
            resolve();
          } catch (error) { reject(error); }
        };
        const onLoad = () => { void finish(); };
        const onError = () => {
          if (settled) return;
          settled = true;
          cleanup();
          reject(new Error(`Unable to decode event image ${featuredEvents[index].cover}`));
        };
        cancelDecodeWaits.add(cleanup);
        image.decoding = "async";
        image.loading = "eager";
        if (image.complete) void finish();
        else {
          image.addEventListener("load", onLoad, { once: true });
          image.addEventListener("error", onError, { once: true });
          if (image.complete) void finish();
        }
      }).catch((error) => {
        console.error("Event gallery image failed to load:", error);
        // Keep the transition safe and allow the matching placeholder slide to remain visible.
      });
      decodeJobs.set(index, job);
      return job;
    };

    const setTitle = (nextIndex: number) => {
      if (nextIndex === activeTitleIndex) return;
      if (titleAnimating) {
        queuedTitleIndex = nextIndex;
        return;
      }
      const info = infoRef.current;
      if (!info) {
        activeTitleIndex = nextIndex;
        setActiveIndex(nextIndex);
        return;
      }
      titleAnimating = true;
      gsap.killTweensOf(info);
      gsap.to(info, {
        yPercent: -105,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          activeTitleIndex = nextIndex;
          setActiveIndex(nextIndex);
          gsap.fromTo(info, { yPercent: 105, autoAlpha: 0 }, {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.32,
            ease: "power2.out",
            onComplete: () => {
              titleAnimating = false;
              if (queuedTitleIndex !== null && queuedTitleIndex !== activeTitleIndex) {
                const queued = queuedTitleIndex;
                queuedTitleIndex = null;
                setTitle(queued);
              }
            },
          });
        },
      });
    };

    const mountGallery = async () => {
      await waitForScrollerReady(window);
      await preloadImage(0);
      if (disposed) return;

      const media = gsap.matchMedia();
      media.add({
        desktop: "(min-width: 600px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 599px) and (prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      }, (context) => {
        const conditions = context.conditions as { desktop: boolean; mobile: boolean; reduced: boolean };
        if (conditions.reduced) return;
        const scroller: Element | Window = window;
        if (!isWindowScroller(scroller)) return;
        const totalScroll = `${TOTAL_SCROLL_VH}vh`;
        triggerRef.current = ScrollTrigger.create({
          id: "events-featured-gallery",
          trigger: section,
          scroller,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: stage,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onUpdate: (self) => {
            progress = self.progress;
            const slideProgress = clamp((progress * TOTAL_SCROLL_VH - INITIAL_DELAY_VH) / SCROLL_PER_TRANSITION_VH, 0, featuredEvents.length - 1);
            const nextIndex = clamp(Math.round(slideProgress), 0, featuredEvents.length - 1);
            if (nextIndex !== activeTitleIndex || titleAnimating) {
              setTitle(nextIndex);
            }
            void preloadImage(Math.floor(slideProgress) + 1);
            void preloadImage(Math.floor(slideProgress) + 2);
            paintLayers();
          },
        });
        refreshUnsubscribe = observeWindowResize(() => ScrollTrigger.refresh());
        void Promise.all([preloadImage(1), preloadImage(2)]).then(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
        paintLayers();
        return () => {
          refreshUnsubscribe();
          triggerRef.current?.kill();
          triggerRef.current = null;
        };
      });

      ScrollTrigger.refresh();
      return () => media.revert();
    };

    let mediaCleanup: (() => void) | undefined;
    void mountGallery().then((cleanup) => { mediaCleanup = cleanup; });
    return () => {
      disposed = true;
      mediaCleanup?.();
      refreshUnsubscribe();
      triggerRef.current?.kill();
      triggerRef.current = null;
      if (infoRef.current) gsap.killTweensOf(infoRef.current);
      cancelDecodeWaits.forEach((cancel) => cancel());
      cancelDecodeWaits.clear();
      decodeJobs.clear();
    };
  }, { scope: galleryRef, dependencies: [] });

  const goToSlide = (index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const safeIndex = clamp(index, 0, featuredEvents.length - 1);
    const transitionOffset = safeIndex === 0 ? 0 : INITIAL_DELAY_VH + (safeIndex - 0.5) * SCROLL_PER_TRANSITION_VH;
    const progress = transitionOffset / TOTAL_SCROLL_VH;
    trigger.scroll(trigger.start + (trigger.end - trigger.start) * progress);
  };

  const openDetails = (event: EventRecord, returnToAll = false) => {
    setSelectedId(event.id);
    setShowModalBack(returnToAll);
    setModalView("details");
  };

  const closeModal = () => {
    setModalView(null);
    setShowModalBack(false);
  };

  return (
    <section id="events" className="events-section" aria-label="E-Club events and outcomes">
      <header className="events-intro">
        <div className="events-intro-top">
          <span className="events-wordmark">E-CLUB <b>✳</b></span>
          <nav aria-label="Section navigation"><a href="#events">Events <span aria-hidden="true">↗</span></a></nav>
        </div>
        <p className="events-eyebrow"><span /> THE RECEIPTS</p>
        <h2>Ideas become <em>outcomes.</em></h2>
        {/* TODO: Replace this copy with a verified summary of E-Club's events and results. */}
        <p className="events-intro-copy">[TODO: Add a short, verified introduction to E-Club events and the results they create.]</p>
        <span className="events-intro-index" aria-hidden="true">03 / EVENTS</span>
      </header>

      <section ref={galleryRef} className="events-gallery" aria-label="Featured events">
        <div ref={stageRef} className="events-stage">
          <div className="events-image-stack" aria-hidden="true">
            {featuredEvents.map((event, index) => (
              <div
                key={event.id}
                ref={(node) => { layerRefs.current[index] = node; }}
                className={`events-image-layer ${index === 0 ? "is-first" : ""}`}
              >
                <Image
                  src={event.cover}
                  alt={event.title}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "center 20%", transform: "translate3d(0,0,0) scale(1.12)" }}
                  onLoad={(loadEvent) => { void loadEvent.currentTarget.decode?.().catch(() => undefined); }}
                />
              </div>
            ))}
          </div>
          <div className="events-scrim" aria-hidden="true" />
          <div className="events-stage-top"><span>SELECTED EVENTS</span><span>SCROLL TO EXPLORE</span></div>
          <div ref={infoRef} className="events-info" aria-live="polite" aria-atomic="true">
            <p className="events-date">{formatEventDate(activeEvent.date)}</p>
            <span className="events-badge">{activeEvent.domain}</span>
            <h3>{activeEvent.title}</h3>
            <p className="events-outcome">{activeEvent.outcome}</p>
            <button className="events-detail-button" type="button" onClick={() => openDetails(activeEvent)}>
              View Details <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div className="events-controls">
            <p className="events-counter" aria-label={`Featured event ${activeIndex + 1} of ${featuredEvents.length}`}><span>{String(activeIndex + 1).padStart(2, "0")}</span> / {String(featuredEvents.length).padStart(2, "0")}</p>
            <div className="events-control-buttons">
              <button type="button" aria-label="Previous featured event" onClick={() => goToSlide(activeIndex - 1)} disabled={activeIndex === 0}>←</button>
              <button type="button" aria-label="Next featured event" onClick={() => goToSlide(activeIndex + 1)} disabled={activeIndex === featuredEvents.length - 1}>→</button>
            </div>
          </div>
        </div>
        <div className="events-reduced-list">
          {featuredEvents.map((event) => (
            <article className="events-reduced-card" key={event.id}>
              <div className="events-reduced-image"><Image src={event.cover} alt={event.title} fill sizes="(max-width: 700px) 100vw, 40vw" style={{ objectFit: "cover", objectPosition: "center 20%" }} /></div>
              <div className="events-reduced-copy">
                <p className="events-date">{formatEventDate(event.date)}</p>
                <span className="events-badge">{event.domain}</span>
                <h3>{event.title}</h3>
                <p className="events-outcome">{event.outcome}</p>
                <button className="events-detail-button" type="button" onClick={() => openDetails(event)}>View Details <span aria-hidden="true">↗</span></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="events-after">
        {/* TODO: Replace this line with a verified closing message. */}
        <p>[TODO: Replace with a verified closing line about the community's work.]</p>
        <button className="events-view-all" type="button" onClick={() => setModalView("all")}>
          View All {events.length} Events <span aria-hidden="true">↗</span>
        </button>
      </div>

      <Modal
        open={modalView !== null}
        title={modalView === "all" ? `All ${events.length} Events` : selectedEvent.title}
        onClose={closeModal}
      >
        {modalView === "all" ? (
          <div className="events-modal-list">
            {events.map((event) => (
              <button className="events-modal-row" key={event.id} type="button" onClick={() => openDetails(event, true)}>
                <Image src={event.cover} alt={event.title} width={144} height={96} />
                <span className="events-modal-row-copy"><small>{formatEventDate(event.date)}</small><strong>{event.title}</strong><span>{event.outcome}</span></span>
                <span className="events-modal-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="events-modal-detail">
            {modalView === "details" && showModalBack && (
              <button className="events-back-button" type="button" onClick={() => { setShowModalBack(false); setModalView("all"); }}>← Back to all events</button>
            )}
            <p className="events-date">{formatEventDate(selectedEvent.date)}</p>
            <span className="events-badge">{selectedEvent.domain}</span>
            <h3>{selectedEvent.title}</h3>
            <div className="events-detail-facts">
              <p><span>Attendance</span><strong>{selectedEvent.attendance}</strong></p>
              <p><span>Outcome</span><strong>{selectedEvent.outcome}</strong></p>
            </div>
            <p className="events-modal-description">{selectedEvent.description}</p>
            <div className="events-thumbnails" aria-label="Event photo gallery">
              {selectedEvent.gallery.map((image, index) => (
                <Image key={`${image}-${index}`} src={image} alt={`${selectedEvent.title}, photo ${index + 1}`} width={240} height={160} />
              ))}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
