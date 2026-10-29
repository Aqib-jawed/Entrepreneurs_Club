"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import SectionHeading from "@/components/SectionHeading";
import { testimonials, testimonialsVisible, type Testimonial } from "@/data/testimonials";

type SlideState = {
  index: number;
  previousIndex: number | null;
  direction: 1 | -1;
  transitionId: number;
};

const IMAGE_SIZES = "(max-width: 767px) 100vw, (max-width: 1200px) 34vw, 29vw";
const SLIDE_DURATION = 620;
const REDUCED_DURATION = 200;

function initials(name: string) {
  return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "?";
}

function portraitAlt(story: Testimonial) {
  return `Portrait of ${story.name}, ${story.affiliation}`;
}

function Portrait({ story, first = false }: { story: Testimonial; first?: boolean }) {
  return (
    <div className="testimonials__portrait">
      {story.image ? (
        <Image
          src={story.image}
          alt={portraitAlt(story)}
          fill
          sizes={IMAGE_SIZES}
          preload={first}
          style={{ objectPosition: story.focus || "50% 20%" }}
        />
      ) : (
        <span className="testimonials__initials" aria-hidden="true">{initials(story.name)}</span>
      )}
    </div>
  );
}

function StoryFigure({
  story,
  index,
  total,
  entering,
  direction,
  onPrevious,
  onNext,
}: {
  story: Testimonial;
  index: number;
  total: number;
  entering: boolean;
  direction: 1 | -1;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <figure
      className={`testimonials__story${entering ? " testimonials__story--entering" : " testimonials__story--exiting"}`}
      data-direction={direction > 0 ? "forward" : "backward"}
      aria-label={`Story ${index + 1} of ${total}`}
      aria-hidden={!entering}
      inert={!entering}
    >
      <Portrait story={story} first={entering && index === 0} />
      <div className="testimonials__story-copy" data-story-copy="">
        <blockquote className="testimonials__quote">
          <p>“{story.quote}”</p>
        </blockquote>
        <figcaption className="testimonials__caption">
          <span className="testimonials__name">{story.name}</span>
          <span className="testimonials__affiliation">{story.affiliation}</span>
        </figcaption>
        {story.verified ? null : <span className="testimonials__placeholder-ribbon">PLACEHOLDER</span>}
        {total > 1 ? (
          <div className="testimonials-controls">
            <button type="button" className="testimonials-control testimonials-control--outline" onClick={onPrevious} aria-label="Previous story">
              <ArrowIcon direction="left" />
            </button>
            <button type="button" className="testimonials-control testimonials-control--filled" onClick={onNext} aria-label="Next story">
              <ArrowIcon direction="right" />
            </button>
          </div>
        ) : null}
      </div>
    </figure>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none">
      {direction === "left" ? (
        <path d="M19 12H5m0 0 7-7m-7 7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M5 12h14m0 0-7-7m7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export default function Testimonials() {
  const verifiedStories = testimonials.filter((story) => story.verified);
  const [previewEnabled, setPreviewEnabled] = useState(false);
  const [slide, setSlide] = useState<SlideState>({ index: 0, previousIndex: null, direction: 1, transitionId: 0 });
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef(slide);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationRef = useRef<Animation[]>([]);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const preview = new URLSearchParams(window.location.search).get("preview") === "testimonials";
    setPreviewEnabled(preview);
  }, []);

  const stories = previewEnabled ? testimonials : verifiedStories;
  const isVisible = previewEnabled || (testimonialsVisible && verifiedStories.length >= 3);

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
    }, { threshold: 0.12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, [isVisible]);

  const navigate = useCallback((targetIndex: number, forcedDirection?: 1 | -1) => {
    const total = stories.length;
    if (total < 2) return;
    const current = slideRef.current;
    const nextIndex = ((targetIndex % total) + total) % total;
    if (nextIndex === current.index) return;

    const forwardDistance = (nextIndex - current.index + total) % total;
    const backwardDistance = (current.index - nextIndex + total) % total;
    const direction = forcedDirection ?? (forwardDistance <= backwardDistance ? 1 : -1);
    const nextSlide = {
      index: nextIndex,
      previousIndex: current.index,
      direction,
      transitionId: current.transitionId + 1,
    } satisfies SlideState;
    slideRef.current = nextSlide;
    setSlide(nextSlide);
    if (timerRef.current) clearTimeout(timerRef.current);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timerRef.current = setTimeout(() => {
      const settled = { ...slideRef.current, previousIndex: null };
      slideRef.current = settled;
      setSlide(settled);
    }, reducedMotion ? REDUCED_DURATION : SLIDE_DURATION);
  }, [stories.length]);

  useEffect(() => {
    const stage = sliderRef.current;
    if (!stage || slide.previousIndex === null) return;
    animationRef.current.forEach((animation) => animation.cancel());
    animationRef.current = [];

    const entering = stage.querySelector<HTMLElement>(".testimonials__story--entering");
    const exiting = stage.querySelector<HTMLElement>(".testimonials__story--exiting");
    if (!entering || !exiting || typeof entering.animate !== "function") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? REDUCED_DURATION : SLIDE_DURATION;
    const forward = slide.direction > 0;
    const portraitEnter = entering.querySelector<HTMLElement>(".testimonials__portrait");
    const portraitExit = exiting.querySelector<HTMLElement>(".testimonials__portrait");
    const copyEnter = entering.querySelector<HTMLElement>("[data-story-copy]");
    const copyExit = exiting.querySelector<HTMLElement>("[data-story-copy]");
    const motionOptions: KeyframeAnimationOptions = { duration, easing: "cubic-bezier(.4, 0, .2, 1)", fill: "both" };

    if (reducedMotion) {
      [portraitEnter, copyEnter].forEach((node) => {
        if (node) animationRef.current.push(node.animate([{ opacity: 0 }, { opacity: 1 }], { ...motionOptions, easing: "ease" }));
      });
      [portraitExit, copyExit].forEach((node) => {
        if (node) animationRef.current.push(node.animate([{ opacity: 1 }, { opacity: 0 }], { ...motionOptions, easing: "ease" }));
      });
    } else {
      if (portraitEnter) animationRef.current.push(portraitEnter.animate(
        [{ transform: `translateY(${forward ? "100%" : "-100%"})`, opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], motionOptions,
      ));
      if (portraitExit) animationRef.current.push(portraitExit.animate(
        [{ transform: "translateY(0)", opacity: 1 }, { transform: `translateY(${forward ? "-100%" : "100%"})`, opacity: 0 }], motionOptions,
      ));
      if (copyEnter) animationRef.current.push(copyEnter.animate(
        [{ transform: `translateX(${forward ? "50px" : "-50px"})`, opacity: 0 }, { transform: "translateX(0)", opacity: 1 }], motionOptions,
      ));
      if (copyExit) animationRef.current.push(copyExit.animate(
        [{ transform: "translateX(0)", opacity: 1 }, { transform: `translateX(${forward ? "-50px" : "50px"})`, opacity: 0 }], motionOptions,
      ));
    }
    return () => animationRef.current.forEach((animation) => animation.cancel());
  }, [slide.direction, slide.previousIndex, slide.transitionId]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    animationRef.current.forEach((animation) => animation.cancel());
  }, []);

  const activeIndex = Math.min(slide.index, Math.max(stories.length - 1, 0));
  const activeStory = stories[activeIndex];
  const previousStory = slide.previousIndex === null ? null : stories[slide.previousIndex];
  const nextStory = stories.length > 1 ? stories[(activeIndex + 1) % stories.length] : undefined;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      navigate(activeIndex + 1, 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigate(activeIndex - 1, -1);
    }
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
    if (Math.abs(dx) < 48 || Math.abs(dx) <= Math.abs(dy)) return;
    navigate(activeIndex + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  };

  if (!isVisible || stories.length === 0) return null;

  const thumbnails = stories.length > 1
    ? Array.from({ length: Math.min(3, stories.length - 1) }, (_, index) => (activeIndex + index + 1) % stories.length)
    : [];
  const placeholderPreview = previewEnabled;
  const renderStory = (story: Testimonial, index: number, entering: boolean) => (
    <StoryFigure
      key={`${story.id}-${entering ? "enter" : "exit"}-${slide.transitionId}`}
      story={story}
      index={index}
      total={stories.length}
      entering={entering}
      direction={slide.direction}
      onPrevious={() => navigate(activeIndex - 1, -1)}
      onNext={() => navigate(activeIndex + 1, 1)}
    />
  );

  return (
    <section ref={sectionRef} id="testimonials" className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="testimonials-container">
        <div className="testimonials-topbar">
          <a className="testimonials-wordmark" href="#testimonials" aria-label="E-Club Stories">E-CLUB <span aria-hidden="true">✳</span></a>
          <nav aria-label="Section navigation"><a href="#testimonials" aria-current="location">Stories <span aria-hidden="true">↗</span></a></nav>
        </div>

        <SectionHeading
          id="testimonials-heading"
          eyebrow="MEMBER VOICES"
          title="Stories"
          titleAccent="from the community"
          tagline="[TODO: Add an approved member-focused tagline.]"
          copy="[TODO: Add a brief introduction after member stories are approved.]"
        />

        <div className={`testimonials-reveal${revealed ? " is-revealed" : ""}`}>
          <div
            ref={sliderRef}
            className="testimonials-slider"
            role="region"
            aria-label="Member stories"
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { pointerStartRef.current = null; }}
          >
            <aside className="testimonials-meta">
              <div className="testimonials-meta__top">
                <p className="testimonials-counter">{String(activeIndex + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}</p>
                <span className="testimonials-vertical-label" aria-hidden="true">Stories</span>
              </div>
              {thumbnails.length > 0 ? (
                <div className="testimonials-thumbnails" aria-label="Other member stories">
                  {thumbnails.map((index) => {
                    const story = stories[index];
                    return (
                      <button
                        key={story.id}
                        type="button"
                        className={`testimonials-thumbnail${index === activeIndex ? " is-active" : ""}`}
                        onClick={() => navigate(index)}
                        aria-label={`Show story from ${story.name}`}
                        aria-current={index === activeIndex ? "true" : undefined}
                      >
                        {story.image ? (
                          <Image src={story.image} alt="" fill sizes="80px" style={{ objectPosition: story.focus || "50% 20%" }} />
                        ) : (
                          <span className="testimonials-thumbnail__initials" aria-hidden="true">{initials(story.name)}</span>
                        )}
                        {placeholderPreview && !story.verified ? <span className="testimonials-thumbnail__ribbon" aria-hidden="true">PLACEHOLDER</span> : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </aside>

            <div className="testimonials-story-stage" aria-live="off">
              {previousStory ? renderStory(previousStory, slide.previousIndex!, false) : null}
              {activeStory ? renderStory(activeStory, activeIndex, true) : null}
              {nextStory?.image ? (
                <Image
                  src={nextStory.image}
                  alt=""
                  width={1}
                  height={1}
                  sizes={IMAGE_SIZES}
                  loading="eager"
                  className="testimonials-next-image"
                />
              ) : null}
            </div>

            <div className="testimonials-announcer" aria-live="polite" aria-atomic="true">
              Story {activeIndex + 1} of {stories.length}: {activeStory?.name}
            </div>
          </div>

          {placeholderPreview ? <p className="testimonials-preview-note">Development preview — all stories are placeholders</p> : null}
        </div>
      </div>
    </section>
  );
}
