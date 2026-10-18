'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { SectionHeading } from './shared/SectionHeading';
import { Modal } from './shared/Modal';
import ApertureCarousel, { ApertureSlide } from './ui/aperture-carousel';
import { EVENTS, ClubEvent } from '../data/events';

export function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);

  // Sort events most recent first by date
  const sortedEvents = useMemo(() => {
    return [...EVENTS].sort((a, b) => b.date.localeCompare(a.date));
  }, []);

  // Filter exactly the 6 featured events
  const featuredEvents = useMemo(() => {
    return sortedEvents.filter((ev) => ev.featured);
  }, [sortedEvents]);

  // Map to ApertureSlide format for the carousel
  const apertureSlides: ApertureSlide[] = useMemo(() => {
    return featuredEvents.map((ev) => ({
      eventId: ev.id,
      image: ev.coverImage,
      alt: ev.title,
      title: ev.title,
      date: ev.displayDate,
      outcome: ev.outcome,
      caption: ev.description,
      rawEvent: ev,
      imagePosition: ev.imagePosition,
    }));
  }, [featuredEvents]);

  const isAnyModalOpen = !!selectedEvent || isViewAllOpen;

  return (
    <section id="events" className="relative w-full bg-[#0B0E14] py-16 md:py-24 text-[#F5F3EE]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E8A33D]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header: Fixed Alignment Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 mb-10 text-center">
        <SectionHeading
          centered={true}
          icon={<Calendar size={24} />}
          eyebrow="FLAGSHIP SUMMITS & HACKATHONS"
          title={
            <>
              Campus <span className="text-[#E8A33D]">Events Showcase</span>
            </>
          }
          subtitle="Empowering student builders through high-stakes hackathons, venture summits, product sprints, and ecosystem networking."
        />

        {/* Interaction Hint */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-4 text-xs font-mono text-neutral-400">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E8A33D] animate-ping" />
          <span>Click anywhere to open the circular aperture, swipe or use arrow keys to navigate</span>
        </div>
      </div>

      {/* FULL SCREEN APERTURE CAROUSEL (Covers entire screen viewport) */}
      <div className="relative w-full overflow-hidden shadow-2xl border-y border-white/10">
        <ApertureCarousel
          slides={apertureSlides}
          height="100svh"
          autoplay={7000}
          duration={1100}
          imagePosition="center 30%"
          isModalOpen={isAnyModalOpen}
          onViewDetails={(event) => setSelectedEvent(event)}
          className="w-full min-h-[580px] lg:min-h-[640px]"
        />
      </div>

      {/* View All Events CTA Button (Outside and below the carousel root) */}
      <div className="relative z-10 text-center mt-12 px-6">
        <button
          type="button"
          onClick={() => setIsViewAllOpen(true)}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#141822] hover:bg-[#E8A33D] text-[#F5F3EE] hover:text-[#0B0E14] border border-white/15 hover:border-[#E8A33D] font-semibold text-sm transition-all duration-300 shadow-xl hover:shadow-[#E8A33D]/20 cursor-pointer group"
        >
          <span>View All {EVENTS.length} Events</span>
          <ArrowRight size={18} className="transform transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>

      {/* MODAL 1: VIEW ALL 10 EVENTS (Scrollable List View) */}
      <Modal
        isOpen={isViewAllOpen}
        onClose={() => setIsViewAllOpen(false)}
        title={`All Campus Events (${EVENTS.length})`}
      >
        <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
          {sortedEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={() => {
                setIsViewAllOpen(false);
                setSelectedEvent(ev);
              }}
              className="p-3.5 sm:p-4 rounded-xl bg-[#141822] hover:bg-[#1c2230] border border-white/10 hover:border-[#E8A33D]/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Event Thumbnail Preview */}
                <div className="relative w-20 sm:w-24 aspect-[16/10] rounded-lg overflow-hidden border border-white/10 bg-neutral-900 shrink-0">
                  <img
                    src={ev.coverImage}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ objectPosition: ev.imagePosition || 'center 35%' }}
                    loading="lazy"
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#E8A33D] font-bold">
                      {ev.displayDate}
                    </span>
                    <span className="text-neutral-600">&bull;</span>
                    <span className="text-xs text-neutral-400 font-mono truncate">{ev.domain}</span>
                  </div>
                  <h4 className="font-bold text-[#F5F3EE] text-sm sm:text-base group-hover:text-[#E8A33D] transition-colors truncate">
                    {ev.title}
                  </h4>
                </div>
              </div>

              {/* Prominent Outcome Snippet in Row */}
              <div className="sm:text-right shrink-0">
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
            {/* Main Cover Image Frame With Proper Ratio */}
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-neutral-900 border border-white/10 shadow-lg">
              <img
                src={selectedEvent.coverImage}
                alt={selectedEvent.title}
                className="h-full w-full object-cover transition-transform duration-500"
                style={{ objectPosition: selectedEvent.imagePosition || 'center 40%' }}
              />
              <div className="absolute bottom-3 left-3 bg-[#0B0E14]/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-[#E8A33D] border border-[#E8A33D]/30 shadow">
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

            {/* Gallery Thumbnails with Proper Aspect Ratio Frames */}
            {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
              <div>
                <h4 className="text-sm font-mono text-neutral-400 uppercase tracking-wider mb-3">
                  Event Gallery
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedEvent.gallery.map((imgUrl, i) => (
                    <div
                      key={i}
                      className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10 bg-neutral-900 group"
                    >
                      <img
                        src={imgUrl}
                        alt={`Gallery ${i}`}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
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

export default EventsSection;
