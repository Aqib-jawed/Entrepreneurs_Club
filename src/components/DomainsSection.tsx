'use client';

import React, { useState } from 'react';
import { SectionHeading } from './shared/SectionHeading';
import { DynamicFrameLayout } from './ui/dynamic-frame-layout';
import { Modal } from './shared/Modal';
import { Accordion } from './shared/Accordion';
import { DOMAINS, Domain } from '../data/domains';

export function DomainsSection() {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);

  return (
    <section
      id="domains"
      className="relative w-full min-h-screen md:h-screen md:max-h-screen bg-[#0B0E14] text-[#F5F3EE] overflow-hidden flex flex-col justify-between py-4 sm:py-5 md:py-6 px-2 sm:px-4 md:px-6"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E8A33D]/5 rounded-full blur-[140px]" />
      </div>

      {/* Header Container - Compact and perfectly centered so all 3 rows fit on screen */}
      <div className="relative z-10 w-full mb-2 text-center shrink-0 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8A33D]/10 border border-[#E8A33D]/25 font-mono text-[11px] uppercase tracking-wider text-[#E8A33D] font-semibold mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D] animate-pulse" />
          <span>DISCIPLINARY HUBS</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#F5F3EE]">
          Explore Our <span className="text-[#E8A33D]">Club Domains</span>
        </h2>
        <p className="text-[11px] sm:text-xs md:text-sm text-neutral-400 max-w-xl mx-auto mt-0.5 line-clamp-1">
          12 specialized tracks spanning deep tech, climate ventures, venture financing, and design.
        </p>
      </div>

      {/* 4x3 Dynamic Frame Layout Grid - Fills the entire remaining screen */}
      <div className="relative z-10 w-full flex-1 min-h-0 overflow-hidden flex flex-col">
        <DynamicFrameLayout
          domains={DOMAINS}
          onSelectDomain={(domain) => setSelectedDomain(domain)}
          gapSize={8}
          className="w-full h-full flex-1"
        />
      </div>

      {/* Shared Detail Modal */}
      {selectedDomain && (
        <Modal
          isOpen={!!selectedDomain}
          onClose={() => setSelectedDomain(null)}
          title={
            <div className="flex items-center gap-3">
              <span className="font-['Space_Grotesk',sans-serif] text-xl md:text-2xl font-bold text-[#F5F3EE]">
                {selectedDomain.name}
              </span>
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#E8A33D]/15 text-[#E8A33D] border border-[#E8A33D]/30">
                {selectedDomain.memberCount} Members
              </span>
            </div>
          }
        >
          <div className="flex flex-col gap-6 text-[#F5F3EE] max-w-2xl">
            {/* Tagline & Lead Badge */}
            <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-[#141822]/80 border border-[#F5F3EE]/10 flex-wrap">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDomain.lead.photo}
                  alt={selectedDomain.lead.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#E8A33D]/40 shadow"
                />
                <div>
                  <div className="text-sm font-semibold text-[#F5F3EE]">
                    {selectedDomain.lead.name}
                  </div>
                  <div className="text-xs font-mono text-[#E8A33D]">
                    {selectedDomain.lead.role || 'Domain Lead'}
                  </div>
                </div>
              </div>
              <span className="text-xs text-[#F5F3EE]/60 font-sans italic">
                Active Chapter 2026
              </span>
            </div>

            {/* 1. Description */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E8A33D] mb-1.5">
                Overview
              </h4>
              <p className="text-sm md:text-base leading-relaxed text-[#F5F3EE]/90">
                {selectedDomain.description}
              </p>
            </div>

            {/* 2. "Know More" Expandable Section (Accordion) */}
            <Accordion title="Know More & Key Deliverables" defaultOpen={true}>
              <div className="space-y-3">
                <p className="text-xs text-[#F5F3EE]/70">
                  Members in {selectedDomain.name} collaborate weekly on cross-functional project deliverables and venture pilots:
                </p>
                <ul className="space-y-2">
                  {selectedDomain.exampleOutputs.map((output, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                      <span className="text-[#E8A33D] mt-0.5">✦</span>
                      <span className="text-[#F5F3EE]/90">{output}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Accordion>

            {/* 3. Mission / Vision (Two Compact Blocks) */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E8A33D] mb-2.5">
                Mission & Vision
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#141822]/70 border border-[#F5F3EE]/10">
                  <div className="text-xs font-mono font-bold text-[#F5F3EE] mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]" />
                    MISSION
                  </div>
                  <p className="text-xs text-[#F5F3EE]/80 leading-relaxed">
                    {selectedDomain.mission}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#141822]/70 border border-[#E8A33D]/20">
                  <div className="text-xs font-mono font-bold text-[#E8A33D] mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]" />
                    VISION
                  </div>
                  <p className="text-xs text-[#F5F3EE]/80 leading-relaxed">
                    {selectedDomain.vision}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. "What We're Looking For" (Short list or chips) */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E8A33D] mb-2.5">
                What We&apos;re Looking For
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDomain.lookingFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#141822] text-[#F5F3EE]/90 border border-[#F5F3EE]/15 hover:border-[#E8A33D]/40 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Swipeable Row of 3-5 Event Photos */}
            {selectedDomain.eventPhotos && selectedDomain.eventPhotos.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E8A33D]">
                    Domain in Action ({selectedDomain.eventPhotos.length} Photos)
                  </h4>
                  <span className="text-[11px] text-[#F5F3EE]/50 font-mono">
                    Swipe &rarr;
                  </span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 snap-x">
                  {selectedDomain.eventPhotos.map((photoUrl, i) => (
                    <div
                      key={i}
                      className="w-48 h-32 shrink-0 snap-start rounded-xl overflow-hidden border border-white/10 bg-[#141822] relative group/photo"
                    >
                      <img
                        src={photoUrl}
                        alt={`${selectedDomain.name} activity ${i + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover/photo:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
}

export default DomainsSection;
