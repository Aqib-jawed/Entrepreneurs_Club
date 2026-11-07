// --- Component ---
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import type { HTMLAttributes, MouseEvent, KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string | number;
  stat: string;
  quote?: string;
  author: string;
  role: string;
  defaultImage: string;
  selectedImage: string;
  alt?: string;
}

export interface CalendlyCarouselProps extends HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
}

type ScreenTier = "mobile" | "tablet" | "desktop";

const VISIBLE_OFFSETS = [-4, -3, -2, -1, 0, 1, 2, 3, 4] as const;

const TRANSITION_SPRING = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.75,
} as const;

export function CalendlyCarousel({
  items,
  autoPlayInterval = 6000,
  pauseOnHover = false,
  className,
  ...props
}: CalendlyCarouselProps) {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const elapsedRef = useRef<number>(0);

  // State
  const [page, setPage] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [tier, setTier] = useState<ScreenTier>("desktop");
  const [viewportWidth, setViewportWidth] = useState<number>(1200);

  // Global State/Hooks
  const total = items.length;
  const activeIndex = ((page % total) + total) % total;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportWidth(width);

      if (width < 768) {
        setTier("mobile");
      } else if (width < 1120) {
        setTier("tablet");
      } else {
        setTier("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (pauseOnHover && isHovered) {
      lastTimeRef.current = null;
      return;
    }

    const step = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      elapsedRef.current += delta;

      if (elapsedRef.current >= autoPlayInterval) {
        elapsedRef.current = 0;
        lastTimeRef.current = null;
        setProgress(0);
        setPage((curr) => curr + 1);
        return;
      }

      setProgress(Math.min((elapsedRef.current / autoPlayInterval) * 100, 100));
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      lastTimeRef.current = null;
    };
  }, [page, pauseOnHover, isHovered, autoPlayInterval]);

  // Handlers
  const handlePrev = useCallback(() => {
    elapsedRef.current = 0;
    lastTimeRef.current = null;
    setProgress(0);
    setPage((curr) => curr - 1);
  }, []);

  const handleNext = useCallback(() => {
    elapsedRef.current = 0;
    lastTimeRef.current = null;
    setProgress(0);
    setPage((curr) => curr + 1);
  }, []);

  const handleSelectTab = (event: MouseEvent<HTMLButtonElement>) => {
    const indexStr = event.currentTarget.dataset.index;

    if (indexStr !== undefined) {
      const targetIdx = Number.parseInt(indexStr, 10);
      let diff = targetIdx - activeIndex;

      if (diff > total / 2) {
        diff -= total;
      } else if (diff < -total / 2) {
        diff += total;
      }

      elapsedRef.current = 0;
      lastTimeRef.current = null;
      setProgress(0);
      setPage((curr) => curr + diff);
    }
  };

  const handleSelectCard = (event: MouseEvent<HTMLDivElement>) => {
    const offsetStr = event.currentTarget.dataset.offset;

    if (offsetStr !== undefined) {
      const offset = Number.parseInt(offsetStr, 10);

      if (offset !== 0) {
        elapsedRef.current = 0;
        lastTimeRef.current = null;
        setProgress(0);
        setPage((curr) => curr + offset);
      }
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      handlePrev();
    } else if (event.key === "ArrowRight") {
      handleNext();
    }
  };

  const activeDimensions = {
    desktop: { width: 762, height: 513 },
    tablet: { width: 560, height: 440 },
    mobile: { width: Math.min(340, viewportWidth - 56), height: 490 },
  }[tier];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Alumni stories"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full max-w-[1240px] mx-auto flex flex-col items-center select-none outline-none py-4 overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        id="carousel-view-panel"
        role="tabpanel"
        aria-live="polite"
        className="relative w-full flex items-center justify-center"
        style={{ height: activeDimensions.height }}
      >
        {VISIBLE_OFFSETS.map((offset) => {
          const virtualIndex = page + offset;
          const itemIndex = ((virtualIndex % total) + total) % total;
          const item = items[itemIndex];
          const isActive = offset === 0;

          const getVariant = () => {
            if (tier === "mobile") {
              const activeW = activeDimensions.width;
              const activeH = activeDimensions.height;
              const gap = 16;
              const peekW = 60;
              const peekH = 410;

              if (offset === 0) {
                return {
                  x: -activeW / 2,
                  y: -activeH / 2,
                  width: activeW,
                  height: activeH,
                  opacity: 1,
                  zIndex: 0,
                  pointerEvents: "auto" as const,
                };
              }

              if (offset === -1) {
                return {
                  x: -activeW / 2 - gap - peekW,
                  y: -peekH / 2,
                  width: peekW,
                  height: peekH,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              }

              if (offset === 1) {
                return {
                  x: activeW / 2 + gap,
                  y: -peekH / 2,
                  width: peekW,
                  height: peekH,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              }

              return {
                x: offset < 0 ? -activeW / 2 - 220 : activeW / 2 + 220,
                y: -peekH / 2,
                width: peekW,
                height: peekH,
                opacity: 0,
                zIndex: 0,
                pointerEvents: "none" as const,
              };
            }

            if (tier === "tablet") {
              const activeW = 560;
              const activeH = 440;
              const gap = 18;
              const sideW = 100;
              const sideH = 340;

              if (offset === 0) {
                return {
                  x: -activeW / 2,
                  y: -activeH / 2,
                  width: activeW,
                  height: activeH,
                  opacity: 1,
                  zIndex: 0,
                  pointerEvents: "auto" as const,
                };
              }

              if (offset === -1) {
                return {
                  x: -activeW / 2 - gap - sideW,
                  y: -sideH / 2,
                  width: sideW,
                  height: sideH,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              }

              if (offset === 1) {
                return {
                  x: activeW / 2 + gap,
                  y: -sideH / 2,
                  width: sideW,
                  height: sideH,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              }

              return {
                x: offset < 0 ? -activeW / 2 - 240 : activeW / 2 + 240,
                y: -sideH / 2,
                width: 74,
                height: 205,
                opacity: 0,
                zIndex: 0,
                pointerEvents: "none" as const,
              };
            }

            switch (offset) {
              case 0:
                return {
                  x: -381,
                  y: -256.5,
                  width: 762,
                  height: 513,
                  opacity: 1,
                  zIndex: 0,
                  pointerEvents: "auto" as const,
                };
              case -1:
                return {
                  x: -506,
                  y: -172,
                  width: 105,
                  height: 344,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              case 1:
                return {
                  x: 401,
                  y: -172,
                  width: 105,
                  height: 344,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              case -2:
                return {
                  x: -596,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              case 2:
                return {
                  x: 522,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                };
              case -3:
                return {
                  x: -720,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 0,
                  zIndex: 0,
                  pointerEvents: "none" as const,
                };
              case 3:
                return {
                  x: 646,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 0,
                  zIndex: 0,
                  pointerEvents: "none" as const,
                };
              default:
                return {
                  x: offset < 0 ? -860 : 860,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 0,
                  zIndex: 0,
                  pointerEvents: "none" as const,
                };
            }
          };

          return (
            <motion.div
              key={virtualIndex}
              data-offset={offset}
              onClick={handleSelectCard}
              initial={false}
              animate={getVariant()}
              transition={TRANSITION_SPRING}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                willChange: "transform",
              }}
              className={cn(
                "rounded-[28px] sm:rounded-[32px] bg-card text-card-foreground shadow-[0_10px_30px_rgba(95,109,119,0.08),0_4px_12px_rgba(95,109,119,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4)] overflow-visible",
                !isActive && "cursor-pointer"
              )}
            >
              {offset === -1 && (
                <div
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 flex items-center text-card pointer-events-none z-[100]"
                  style={{
                    width: 22,
                    height: 42,
                    margin: "auto 0",
                    left: "calc(100% - 1px)",
                  }}
                >
                  <svg
                    viewBox="0 0 20 37.3338"
                    preserveAspectRatio="none"
                    className="size-full fill-current overflow-visible block"
                  >
                    <path d="M0 0C0 0 1.2422 13.5759 10 13.5759C18.7578 13.5759 20 0 20 0V37.3338C20 37.3338 18.7578 23.7578 10 23.7578C1.2422 23.7578 0 37.3338 0 37.3338V0Z" />
                  </svg>
                </div>
              )}

              {offset === 1 && (
                <div
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 flex items-center text-card pointer-events-none z-[100]"
                  style={{
                    width: 22,
                    height: 42,
                    margin: "auto 0",
                    right: "calc(100% - 1px)",
                  }}
                >
                  <svg
                    viewBox="0 0 20 37.3338"
                    preserveAspectRatio="none"
                    className="size-full fill-current overflow-visible block"
                  >
                    <path d="M0 0C0 0 1.2422 13.5759 10 13.5759C18.7578 13.5759 20 0 20 0V37.3338C20 37.3338 18.7578 23.7578 10 23.7578C1.2422 23.7578 0 37.3338 0 37.3338V0Z" />
                  </svg>
                </div>
              )}

              {offset === -2 && tier === "desktop" && (
                <div
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 flex items-center text-card pointer-events-none z-[100]"
                  style={{
                    width: 18,
                    height: 28,
                    margin: "auto 0",
                    left: "calc(100% - 1px)",
                  }}
                >
                  <svg
                    viewBox="0 0 16 28"
                    preserveAspectRatio="none"
                    className="size-full fill-current overflow-visible block"
                  >
                    <path d="M0 0C0 0 0.993759 10.1818 8 10.1818C15.0062 10.1818 16 0 16 0V28C16 28 15.0062 17.8182 8 17.8182C0.993759 17.8182 0 28 0 28V0Z" />
                  </svg>
                </div>
              )}

              {offset === 2 && tier === "desktop" && (
                <div
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 flex items-center text-card pointer-events-none z-[100]"
                  style={{
                    width: 18,
                    height: 28,
                    margin: "auto 0",
                    right: "calc(100% - 1px)",
                  }}
                >
                  <svg
                    viewBox="0 0 16 28"
                    preserveAspectRatio="none"
                    className="size-full fill-current overflow-visible block"
                  >
                    <path d="M0 0C0 0 0.993759 10.1818 8 10.1818C15.0062 10.1818 16 0 16 0V28C16 28 15.0062 17.8182 8 17.8182C0.993759 17.8182 0 28 0 28V0Z" />
                  </svg>
                </div>
              )}

              <div
                className="size-full overflow-hidden relative"
                style={{ borderRadius: "inherit" }}
              >
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className={cn(
                    "absolute inset-0 p-2",
                    isActive && "pointer-events-none"
                  )}
                >
                  <div className="size-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-muted relative">
                    <Image
                      alt={item.alt || item.author}
                      src={item.defaultImage}
                      fill
                      unoptimized
                      draggable={false}
                      style={{ objectFit: "cover" }}
                      className="size-full object-cover"
                    />
                  </div>
                </motion.div>

                <div
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: activeDimensions.width,
                    height: activeDimensions.height,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : offset < 0 ? -822 : 822,
                    }}
                    transition={TRANSITION_SPRING}
                    className={cn(
                      "size-full flex flex-col md:flex-row p-4 sm:p-5 md:p-6 lg:p-7 gap-3 sm:gap-4 md:gap-6",
                      !isActive && "pointer-events-none"
                    )}
                  >
                    <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left justify-between py-1 gap-2 sm:gap-3">
                      <h3
                        title={item.stat}
                        className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight w-full"
                      >
                        {item.stat}
                      </h3>

                      <div className="relative w-full min-w-0 my-auto py-1">
                        <span
                          aria-hidden="true"
                          className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground/40 absolute right-full top-0 pr-1 select-none pointer-events-none hidden md:inline"
                        >
                          “
                        </span>

                        {item.quote ? (
                          <p className="font-serif text-xs sm:text-base md:text-lg text-foreground/85 leading-snug">
                            “{item.quote}”
                          </p>
                        ) : null}
                      </div>

                      <div className="flex min-w-0 w-full max-w-full overflow-hidden items-center md:items-start justify-center md:justify-start">
                        <div className="flex flex-col items-center md:items-start min-w-0 max-w-full">
                          <span className="w-fit inline-flex items-center justify-center rounded-[4px] font-medium py-1 px-2.5 text-[11px] sm:text-xs bg-secondary text-secondary-foreground shrink-0 select-none">
                            <span className="whitespace-nowrap font-semibold">
                              {item.author}
                            </span>
                          </span>

                          <div className="shrink-0 flex items-center justify-center md:justify-start px-3 h-[6px] -my-[1px] text-secondary relative z-10">
                            <svg
                              className="block shrink-0 fill-current overflow-visible"
                              preserveAspectRatio="none"
                              viewBox="0 -2 14 12"
                              width="14"
                              height="10"
                            >
                              <path d="M0 -2 V0 C0 0 5.09091 0.49688 5.09091 4 C5.09091 7.50312 0 8 0 8 V10 H14 V8 C14 8 8.90909 7.50312 8.90909 4 C8.90909 0.49688 14 0 14 0 V-2 Z" />
                            </svg>
                          </div>

                          <span className="w-fit inline-flex items-center justify-center rounded-[4px] font-medium py-1 px-2.5 text-[10px] sm:text-xs bg-secondary text-muted-foreground max-w-full select-none">
                            <span
                              title={item.role}
                              className="truncate"
                            >
                              {item.role}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative shrink-0 overflow-hidden rounded-[18px] sm:rounded-[22px] bg-muted w-full md:w-[clamp(180px,44%,330px)] flex-1 md:flex-initial md:h-full max-h-[220px] md:max-h-none">
                      <Image
                        alt={item.alt || item.author}
                        src={item.selectedImage}
                        fill
                        unoptimized
                        draggable={false}
                        style={{ objectFit: "cover" }}
                        className="size-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div
        role="tablist"
        aria-label="Choose an alumnus"
        className="flex items-center gap-1.5 mt-5"
      >
        {items.map((item, idx) => {
          const isSelected = idx === activeIndex;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              data-index={idx}
              id={`carousel-tab-${idx}`}
              aria-controls="carousel-view-panel"
              onClick={handleSelectTab}
              aria-selected={isSelected}
              aria-label={`Show ${item.author}`}
              tabIndex={isSelected ? 0 : -1}
              className={cn(
                "h-[8px] rounded-[3px] overflow-hidden border-0 p-0 cursor-pointer transition-[width] duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected
                  ? "w-[80px] bg-secondary"
                  : "w-[8px] bg-secondary hover:bg-muted-foreground/30"
              )}
            >
              {isSelected && (
                <div
                  className="h-full rounded-[3px] bg-blue-600 dark:bg-blue-500"
                  style={{
                    transformOrigin: "0% 50%",
                    transform: `scaleX(${progress / 100})`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
