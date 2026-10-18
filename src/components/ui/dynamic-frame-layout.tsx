'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Domain } from '../../data/domains';

interface DynamicFrameLayoutProps {
  domains: Domain[];
  onSelectDomain: (domain: Domain) => void;
  className?: string;
  colHoverSize?: number;
  rowHoverSize?: number;
  gapSize?: number;
}

interface DomainTileProps {
  domain: Domain;
  index: number;
  isExpanded: boolean;
  isMobile: boolean;
  isReducedMotion: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

function DomainTile({
  domain,
  index,
  isExpanded,
  isMobile,
  isReducedMotion,
  onHover,
  onLeave,
  onClick,
}: DomainTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video on desktop hover if video exists, reset on leave
  useEffect(() => {
    if (isReducedMotion || isMobile) return;
    const video = videoRef.current;
    if (!video) return;

    if (isExpanded) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore interruption or browser policy rejects
        });
      }
    } else {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // Ignore seek error if video not loaded yet
      }
    }
  }, [isExpanded, isReducedMotion, isMobile]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Domain: ${domain.name}. Click to view details.`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className={`group relative h-full w-full overflow-hidden rounded-2xl cursor-pointer text-left select-none transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D] ${
        isExpanded
          ? 'border border-[#E8A33D]/60 shadow-xl shadow-[#E8A33D]/10 ring-1 ring-[#E8A33D]/30'
          : 'border border-[#F5F3EE]/[0.08] hover:border-[#F5F3EE]/20'
      }`}
    >
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0 bg-[#141822] overflow-hidden">
        {/* Still Image Poster */}
        <img
          src={domain.image}
          alt={domain.name}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
            isExpanded ? 'scale-110' : 'scale-100 opacity-90'
          }`}
          loading="lazy"
        />

        {/* Video layer if present (desktop only) */}
        {!isMobile && domain.video && (
          <video
            ref={videoRef}
            src={domain.video}
            poster={domain.image}
            preload="none"
            muted
            loop
            playsInline
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 pointer-events-none ${
              isExpanded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Bottom Scrim & Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/75 to-transparent transition-opacity duration-300" />
        <div
          className={`absolute inset-0 bg-[#E8A33D]/5 transition-opacity duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex h-full w-full flex-col justify-end p-2.5 sm:p-3 md:p-3.5">
        {/* Domain Name - Always Visible, Space Grotesk Font */}
        <h3 className="font-['Space_Grotesk',sans-serif] text-xs sm:text-sm lg:text-base font-bold tracking-tight text-[#F5F3EE] drop-shadow transition-colors duration-200 group-hover:text-[#E8A33D] truncate">
          {domain.name}
        </h3>

        {/* Expanded Content (Desktop) */}
        {!isMobile ? (
          <div
            className={`transition-all duration-300 ease-out overflow-hidden ${
              isExpanded
                ? 'max-h-24 opacity-100 mt-1'
                : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          >
            <p className="text-[11px] lg:text-xs text-[#F5F3EE]/85 line-clamp-2 leading-snug font-sans">
              {domain.tagline}
            </p>
            <div className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-[#E8A33D]">
              <span>Know more</span>
              <svg
                className="w-3 h-3 transform transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ) : (
          /* Mobile Static Content: Subtitle & Tap Prompt */
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[11px] text-[#F5F3EE]/70 font-mono">
              {domain.memberCount} members
            </span>
            <span className="text-[11px] font-semibold text-[#E8A33D] flex items-center gap-0.5">
              <span>View</span> &rarr;
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function DynamicFrameLayout({
  domains,
  onSelectDomain,
  className = '',
  colHoverSize = 1.84,
  rowHoverSize = 1.6,
  gapSize = 8,
}: DynamicFrameLayoutProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Screen width and reduced motion detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Generalized track calculation for arbitrary track counts
  const getColSizes = () => {
    const totalCols = 4;
    if (hoveredIndex === null) {
      return Array(totalCols).fill('1fr').join(' ');
    }
    const hoveredCol = hoveredIndex % totalCols;
    const safeHoverSize = Math.min(colHoverSize, totalCols - 0.5);
    const nonHoveredSize = (totalCols - safeHoverSize) / (totalCols - 1);

    return Array.from({ length: totalCols }, (_, c) =>
      c === hoveredCol ? `${safeHoverSize.toFixed(2)}fr` : `${nonHoveredSize.toFixed(2)}fr`
    ).join(' ');
  };

  const getRowSizes = () => {
    const totalRows = 3;
    if (hoveredIndex === null) {
      return Array(totalRows).fill('1fr').join(' ');
    }
    const hoveredRow = Math.floor(hoveredIndex / 4);
    const safeHoverSize = Math.min(rowHoverSize, totalRows - 0.5);
    const nonHoveredSize = (totalRows - safeHoverSize) / (totalRows - 1);

    return Array.from({ length: totalRows }, (_, r) =>
      r === hoveredRow ? `${safeHoverSize.toFixed(2)}fr` : `${nonHoveredSize.toFixed(2)}fr`
    ).join(' ');
  };

  // Mobile Render: Simple 2-column grid without hover-expand
  if (isMobile) {
    return (
      <div className={`grid grid-cols-2 gap-3.5 w-full ${className}`}>
        {domains.map((domain, index) => (
          <div key={domain.id} className="h-40 w-full">
            <DomainTile
              domain={domain}
              index={index}
              isExpanded={false}
              isMobile={true}
              isReducedMotion={isReducedMotion}
              onHover={() => {}}
              onLeave={() => {}}
              onClick={() => onSelectDomain(domain)}
            />
          </div>
        ))}
      </div>
    );
  }

  // Desktop Render: 4-Column x 3-Row Dynamic Expand Grid
  return (
    <div
      className={`relative w-full h-full min-h-0 ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: getColSizes(),
        gridTemplateRows: getRowSizes(),
        gap: `${gapSize}px`,
        transition: isReducedMotion
          ? 'none'
          : 'grid-template-columns 0.4s ease, grid-template-rows 0.4s ease',
      }}
    >
      {domains.map((domain, index) => {
        const isExpanded = hoveredIndex === index;

        return (
          <div key={domain.id} className="relative h-full w-full overflow-hidden">
            <DomainTile
              domain={domain}
              index={index}
              isExpanded={isExpanded}
              isMobile={false}
              isReducedMotion={isReducedMotion}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              onClick={() => onSelectDomain(domain)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default DynamicFrameLayout;
