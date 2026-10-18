'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Modal } from './shared/Modal';
import { EVENTS, ClubEvent } from '../data/events';
import { cn } from '../lib/utils';
import {
  Award,
  Sprout,
  Coffee,
  Palette,
  Code,
  Megaphone,
  Calendar,
  Briefcase,
  ArrowRight
} from 'lucide-react';

// Helper to map Lucide Icons to domain
const getEventIcon = (domain: string) => {
  const dom = domain.toLowerCase();
  if (dom.includes('venture') || dom.includes('strategy') || dom.includes('creation')) {
    return <Award size={24} className="text-[#E8A33D]" />;
  }
  if (dom.includes('agri') || dom.includes('sprout') || dom.includes('soil')) {
    return <Sprout size={24} className="text-[#E8A33D]" />;
  }
  if (dom.includes('chai') || dom.includes('chats') || dom.includes('coffee')) {
    return <Coffee size={24} className="text-[#E8A33D]" />;
  }
  if (dom.includes('design') || dom.includes('ui') || dom.includes('ux')) {
    return <Palette size={24} className="text-[#E8A33D]" />;
  }
  if (dom.includes('tech') || dom.includes('code') || dom.includes('dev') || dom.includes('bootcamp')) {
    return <Code size={24} className="text-[#E8A33D]" />;
  }
  if (dom.includes('market') || dom.includes('growth')) {
    return <Megaphone size={24} className="text-[#E8A33D]" />;
  }
  if (dom.includes('sponsor')) {
    return <Briefcase size={24} className="text-[#E8A33D]" />;
  }
  return <Calendar size={24} className="text-[#E8A33D]" />;
};

interface SlideProps {
  slide: ClubEvent;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  onViewDetails: (event: ClubEvent) => void;
  prefersReducedMotion: boolean;
}

const Slide = ({ slide, index, current, handleSlideClick, onViewDetails, prefersReducedMotion }: SlideProps) => {
  const slideRef = React.useRef<HTMLLIElement>(null);

  const xRef = React.useRef(0);
  const yRef = React.useRef(0);
  const currentXRef = React.useRef(0);
  const currentYRef = React.useRef(0);
  const frameRef = React.useRef<number>();
  const isAnimatingRef = React.useRef(false);

  const isActive = current === index;

  const startAnimation = React.useCallback(() => {
    if (isAnimatingRef.current || prefersReducedMotion || !isActive) return;
    isAnimatingRef.current = true;

    const animate = () => {
      if (!slideRef.current) {
        isAnimatingRef.current = false;
        return;
      }

      const targetX = xRef.current;
      const targetY = yRef.current;

      currentXRef.current += (targetX - currentXRef.current) * 0.1;
      currentYRef.current += (targetY - currentYRef.current) * 0.1;

      slideRef.current.style.setProperty("--x", `${currentXRef.current.toFixed(2)}px`);
      slideRef.current.style.setProperty("--y", `${currentYRef.current.toFixed(2)}px`);

      const deltaX = Math.abs(targetX - currentXRef.current);
      const deltaY = Math.abs(targetY - currentYRef.current);

      if (deltaX < 0.1 && deltaY < 0.1 && targetX === 0 && targetY === 0) {
        currentXRef.current = 0;
        currentYRef.current = 0;
        slideRef.current.style.setProperty("--x", "0px");
        slideRef.current.style.setProperty("--y", "0px");
        isAnimatingRef.current = false;
        return;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [isActive, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      isAnimatingRef.current = false;
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (prefersReducedMotion || !isActive) return;
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
    startAnimation();
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
    startAnimation();
  };

  const { coverImage, outcome, title, displayDate } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        data-event-slide
        data-active={isActive ? 'true' : 'false'}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[78vmin] max-w-[900px] h-[43.875vmin] max-h-[506px] min-h-[260px] mx-[4vmin] z-10 cursor-pointer"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: !isActive
            ? (prefersReducedMotion ? "scale(0.98)" : "scale(0.98) rotateX(8deg)")
            : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#141822] rounded-xl border border-white/10 overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform: isActive && !prefersReducedMotion
              ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
              : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[120%] h-[120%] object-cover object-[center_top] transition-opacity duration-600 ease-in-out"
            style={{
              opacity: isActive ? 1 : 0.5,
            }}
            alt={title}
            src={coverImage}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-all duration-1000",
              isActive ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        <article
          data-event-slide-content
          className={cn(
            "relative p-6 sm:p-8 flex flex-col justify-end h-full w-full transition-opacity duration-1000 ease-in-out text-left",
            isActive ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          )}
        >
          <div className="mb-2">
            <span className="text-xs font-mono text-[#E8A33D] uppercase tracking-wider">{displayDate}</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#F5F3EE] mb-3 drop-shadow-md">
            {title}
          </h2>
          <div className="p-3 rounded-lg bg-[#E8A33D]/10 border-l-4 border-[#E8A33D] mb-4 w-fit max-w-xl backdrop-blur-sm shadow-xl">
            <p className="text-sm md:text-base font-semibold text-[#E8A33D]">
              {outcome}
            </p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (isActive) onViewDetails(slide);
            }}
            className={cn(
              "mt-auto px-6 py-2.5 w-fit text-sm font-semibold text-[#0B0E14] bg-[#E8A33D] hover:bg-[#F5F3EE] transition-colors duration-300 rounded-lg shadow-lg hover:shadow-[#E8A33D]/20 flex items-center gap-2 group",
              !isActive && "pointer-events-none"
            )}
            tabIndex={isActive ? 0 : -1}
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: "previous" | "next";
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={cn(
        "w-12 h-12 flex items-center mx-2 justify-center bg-[#141822] border-2 border-white/10 rounded-full focus:border-[#E8A33D] focus:outline-none hover:-translate-y-0.5 hover:border-[#E8A33D]/50 active:translate-y-0.5 transition duration-200 group shadow-lg cursor-pointer",
        type === "previous" ? "rotate-180" : ""
      )}
      title={title}
      onClick={handleClick}
    >
      <ArrowRight className="text-[#F5F3EE] group-hover:text-[#E8A33D] transition-colors" />
    </button>
  );
};

interface CarouselProps {
  slides: ClubEvent[];
  onViewDetails: (event: ClubEvent) => void;
  prefersReducedMotion: boolean;
}

export function Carousel({ slides, onViewDetails, prefersReducedMotion }: CarouselProps) {
  const [current, setCurrent] = React.useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = React.useId();

  return (
    <div
      className="relative flex flex-col items-center w-full"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <div className="relative w-[78vmin] max-w-[900px] h-[43.875vmin] max-h-[506px] min-h-[260px] mx-auto">
        <ul
          data-event-carousel-track
          className="absolute top-0 left-0 flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${current * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <Slide
              key={slide.id}
              slide={slide}
              index={index}
              current={current}
              handleSlideClick={handleSlideClick}
              onViewDetails={onViewDetails}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </ul>
      </div>

      <div className="flex justify-center w-full mt-6 md:mt-10 z-20">
        <CarouselControl
          type="previous"
          title="Go to previous event"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Go to next event"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}

export function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Sort events most recent first by date
  const sortedEvents = useMemo(() => {
    return [...EVENTS].sort((a, b) => b.date.localeCompare(a.date));
  }, []);

  // Filter exactly the 6 featured events
  const featuredEvents = useMemo(() => {
    return sortedEvents.filter((ev) => ev.featured);
  }, [sortedEvents]);

  // Handle media queries and resize listeners
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionHandler);

    return () => {
      mediaQuery.removeEventListener('change', motionHandler);
    };
  }, []);

  return (
    <section id="events" className="relative w-full bg-[#0B0E14] py-20 md:py-28 text-[#F5F3EE]">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E8A33D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8A33D] text-[#0B0E14] shadow-lg shadow-[#E8A33D]/20">
            <Calendar size={24} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#F5F3EE] tracking-tight mb-4 font-sans">
            Flagship <span className="text-[#E8A33D]">Campus Events</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg">
            Empowering student builders through hackathons, venture summits, product sprints, and ecosystem networking.
          </p>
        </div>

        {/* 3D Carousel Layout for the 6 Featured Events */}
        <div className="w-full mb-16 pt-8 pb-12 overflow-x-hidden">
          <Carousel 
            slides={featuredEvents} 
            onViewDetails={setSelectedEvent} 
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* View All Events CTA Button */}
        <div className="text-center">
          <button
            onClick={() => setIsViewAllOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 hover:bg-[#E8A33D] text-[#F5F3EE] hover:text-[#0B0E14] border border-white/15 hover:border-[#E8A33D] font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-[#E8A33D]/20 cursor-pointer"
          >
            <span>View All {EVENTS.length} Events</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* MODAL 1: VIEW ALL 10 EVENTS (Scrollable List View) */}
      <Modal
        isOpen={isViewAllOpen}
        onClose={() => setIsViewAllOpen(false)}
        title={`All Campus Events (${EVENTS.length})`}
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {sortedEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={() => {
                setIsViewAllOpen(false);
                setSelectedEvent(ev);
              }}
              className="p-4 rounded-xl bg-[#141822] hover:bg-[#1c2230] border border-white/10 hover:border-[#E8A33D]/40 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#E8A33D] font-bold">
                    {ev.displayDate}
                  </span>
                  <span className="text-neutral-600">&bull;</span>
                  <span className="text-xs text-neutral-400 font-mono">{ev.domain}</span>
                </div>
                <h4 className="font-bold text-[#F5F3EE] text-base group-hover:text-[#E8A33D] transition-colors">
                  {ev.title}
                </h4>
              </div>

              {/* Prominent Outcome Snippet in Row */}
              <div className="md:text-right">
                <span className="inline-block text-xs font-semibold text-[#E8A33D] bg-[#E8A33D]/10 border border-[#E8A33D]/30 px-3 py-1 rounded-full">
                  {ev.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* MODAL 2: INDIVIDUAL EVENT DETAIL VIEW */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title}
      >
        {selectedEvent && (
          <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1 text-[#F5F3EE]">
            {/* Main Cover Image */}
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-neutral-900 border border-white/10">
              <img
                src={selectedEvent.coverImage}
                alt={selectedEvent.title}
                className="h-full w-full object-cover object-[center_top]"
              />
              <div className="absolute bottom-3 left-3 bg-[#0B0E14]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-[#E8A33D] border border-[#E8A33D]/30">
                {selectedEvent.domain}
              </div>
            </div>

            {/* Meta Tags Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 border-b border-white/10 pb-4">
              <div>🗓️ <span className="text-[#F5F3EE]">{selectedEvent.displayDate}</span></div>
              <div>👥 <span className="text-[#F5F3EE]">{selectedEvent.attendance}</span></div>
            </div>

            {/* PROMINENT OUTCOME BOX */}
            <div className="p-4 rounded-xl bg-[#E8A33D]/10 border border-[#E8A33D]/40">
              <p className="text-xs font-mono text-[#E8A33D] uppercase tracking-wider mb-1 font-bold">
                Key Event Outcome
              </p>
              <p className="text-base md:text-lg font-semibold text-[#E8A33D]">
                {selectedEvent.outcome}
              </p>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-mono text-neutral-400 uppercase tracking-wider mb-2">
                About the Event
              </h4>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {/* Gallery Thumbnails */}
            {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
              <div>
                <h4 className="text-sm font-mono text-neutral-400 uppercase tracking-wider mb-3">
                  Event Gallery
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedEvent.gallery.map((imgUrl, i) => (
                    <div
                      key={i}
                      className="h-28 rounded-lg overflow-hidden border border-white/10 bg-neutral-900"
                    >
                      <img
                        src={imgUrl}
                        alt={`Gallery ${i}`}
                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
