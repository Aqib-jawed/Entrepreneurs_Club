"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DomainItem } from "@/data/domains";
import { Card } from "@/components/shared/Card";

export interface StackedCarouselProps {
  items: DomainItem[];
  onSelectDomain: (domain: DomainItem) => void;
}

export function StackedCarousel({ items, onSelectDomain }: StackedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) {
    return (
      <div className="no-results-box">
        <p className="no-results-text">No domains found.</p>
      </div>
    );
  }

  // Ensure currentIndex stays within bounds if filtered items change
  const activeIdx = Math.min(currentIndex, items.length - 1);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="stacked-carousel-root">
      {/* Carousel Main 3D Card Stack Stage */}
      <div className="stacked-carousel-viewport">
        <div className="stacked-carousel-stage">
          {items.map((item, index) => {
            const count = items.length;
            let offset = index - activeIdx;

            // Circular offset normalization for carousel wrap-around
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const isVisible = Math.abs(offset) <= 2;
            if (!isVisible) return null;

            const isCenter = offset === 0;

            const xOffset = offset * 110;
            const rotateDeg = offset * 6;
            const scaleVal = 1 - Math.abs(offset) * 0.08;
            const opacityVal = 1 - Math.abs(offset) * 0.35;
            const zIndexVal = 20 - Math.abs(offset) * 5;

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: xOffset,
                  scale: scaleVal,
                  rotate: rotateDeg,
                  opacity: opacityVal,
                  zIndex: zIndexVal,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className={`stacked-card-wrapper ${isCenter ? "is-center" : ""}`}
                onClick={() => {
                  if (isCenter) {
                    onSelectDomain(item);
                  } else {
                    setCurrentIndex(index);
                  }
                }}
              >
                <Card className="stacked-card-content">
                  {/* Top Badge */}
                  <div className="stacked-card-header">
                    <span className="stacked-card-icon">{item.icon}</span>
                    <span className="stacked-card-badge">
                      {item.memberCount} Members
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="stacked-card-title">{item.name}</h3>
                  <p className="stacked-card-tagline">{item.tagline}</p>

                  {/* Footer Action Button */}
                  <div className="stacked-card-footer">
                    <span className="stacked-card-btn">
                      {isCenter ? "Explore Domain Details →" : "Select Domain"}
                    </span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls: Left/Right Arrows & Dots */}
      <div className="stacked-carousel-controls">
        <button
          onClick={handlePrev}
          className="stacked-nav-arrow"
          aria-label="Previous domain"
        >
          ←
        </button>

        {/* Dot Indicators */}
        <div className="stacked-dots">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`stacked-dot ${idx === activeIdx ? "active" : ""}`}
              aria-label={`Go to domain ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="stacked-nav-arrow"
          aria-label="Next domain"
        >
          →
        </button>
      </div>
    </div>
  );
}
