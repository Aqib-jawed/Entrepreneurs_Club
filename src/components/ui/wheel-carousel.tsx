"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

export interface WheelCarouselItem {
  label: string;
  image: string;
  imageAlt?: string;
  role?: string;
  whatTheyOwn?: string;
}

export type WheelCarouselMode = "system" | "light" | "dark" | "custom";

export interface WheelCarouselProps {
  items?: WheelCarouselItem[];
  mode?: WheelCarouselMode;
  photoSide?: "left" | "right";
  photoWidth?: number;
  photoAspect?: "3/4" | "1/1" | "4/3" | "3/2";
  contentWidth?: number;
  gap?: number;
  photoRadius?: number;
  crossfadeDuration?: number;
  radius?: number;
  spacing?: number;
  visibleItems?: number;
  apexInset?: number;
  textColor?: string;
  selectedColor?: string;
  showMarker?: boolean;
  markerColor?: string;
  markerSize?: number;
  markerGap?: number;
  background?: string;
  panelColor?: string;
  scrollSpeed?: number;
  dragSpeed?: number;
  snap?: boolean;
  momentum?: boolean;
  appear?: boolean;
  edgeFade?: boolean;
  edgeFadeSize?: number;
  initialIndex?: number;
  activeIndex?: number;
  loop?: boolean;
  onActiveChange?: (item: WheelCarouselItem, index: number) => void;
  className?: string;
  photoClassName?: string;
  itemClassName?: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

export const wheelCarouselDefaultItems: WheelCarouselItem[] = [
  { label: "Halcyon Fields", image: unsplash("1520529890308-f503006340b4") },
  { label: "Meridian House", image: unsplash("1483366774565-c783b9f70e2c") },
  { label: "Norlight Pavilion", image: unsplash("1496865534669-25ec2a3a0fd3") },
  { label: "Aperture Studio", image: unsplash("1549791084-5f78368b208b") },
  { label: "Solene Tower", image: unsplash("1534094830444-3a1e21f7e3e7") },
  { label: "Verdant Mile", image: unsplash("1622396481322-3b83d186701b") },
  { label: "Cobalt Works", image: unsplash("1602128110234-2d11c0aaadfe") },
  { label: "Lumen Atrium", image: unsplash("1522404419647-18cb51cc5c7a") },
  { label: "Marlowe Residence", image: unsplash("1576831371356-d6e9411ae501") },
  { label: "Ostara Gallery", image: unsplash("1738844153732-a485f0e78382") },
  { label: "Quill & Stone", image: unsplash("1548248823-ce16a73b6d49") },
  { label: "Everest Loft", image: unsplash("1665779736808-047a6bbf43a0") },
  { label: "Sable Courtyard", image: unsplash("1543067361-9bf996edf6ff") },
  { label: "Ridgeline Retreat", image: unsplash("1592274951725-1688461e2019") },
  { label: "Aurelia Plaza", image: unsplash("1599669846660-945c5c775181") },
  { label: "Northwind Cabin", image: unsplash("1491406213019-05b162a72c20") },
  { label: "Onyx Terrace", image: unsplash("1611570885483-095b1b449aa3") },
  { label: "Palladium Hall", image: unsplash("1564566698730-9903b9e4a08c") },
  { label: "Cirrus Offices", image: unsplash("1676144844767-b25cb5e6c896") },
  { label: "Bramble Cottage", image: unsplash("1522743791393-522312deeebf") },
  { label: "Vellum Library", image: unsplash("1628270680011-41792b21de87") },
  { label: "Halden Bridge", image: unsplash("1478979464727-af7d24e18554") },
  { label: "Ember & Ash", image: unsplash("1586073054612-fdd6537fc6d4") },
  { label: "Slate Meridian", image: unsplash("1567505477286-9c7269119db7") },
];

const aspectRatios = {
  "3/4": "3 / 4",
  "1/1": "1 / 1",
  "4/3": "4 / 3",
  "3/2": "3 / 2",
} as const;

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function computeOffset(index: number, rotation: number, length: number, loop: boolean) {
  if (!loop) {
    return index - rotation;
  }
  let offset = index - rotation;
  while (offset > length / 2) offset -= length;
  while (offset < -length / 2) offset += length;
  return offset;
}

export function WheelCarousel({
  items = wheelCarouselDefaultItems,
  mode = "system",
  photoSide = "left",
  photoWidth = 28,
  photoAspect = "3/4",
  contentWidth = 980,
  gap = 0,
  photoRadius = 16,
  crossfadeDuration = 0.45,
  radius = 320,
  spacing = 14,
  visibleItems = 7,
  apexInset = 34,
  textColor = "rgba(180, 90, 20, 0.45)",
  selectedColor = "rgb(180, 84, 30)",
  showMarker = true,
  markerColor = "rgb(232, 121, 46)",
  markerSize = 16,
  markerGap = 20,
  background = "rgb(255, 246, 236)",
  panelColor,
  scrollSpeed = 0.008,
  dragSpeed = 0.02,
  snap = true,
  momentum = true,
  appear = true,
  edgeFade = true,
  edgeFadeSize = 30,
  initialIndex = 0,
  activeIndex,
  loop = false,
  onActiveChange,
  className,
  photoClassName,
  itemClassName,
}: WheelCarouselProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const instanceId = useId();
  let resolvedTheme = "dark";
  try {
    const themeContext = useTheme();
    if (themeContext?.resolvedTheme) {
      resolvedTheme = themeContext.resolvedTheme;
    }
  } catch {
    resolvedTheme = "dark";
  }

  const [themeReady, setThemeReady] = useState(false);
  const resolvedMode =
    mode === "system"
      ? themeReady && resolvedTheme === "dark"
        ? "dark"
        : "light"
      : mode;
  const carouselItems = items.length ? items : wheelCarouselDefaultItems;
  const itemCount = carouselItems.length;
  const startingIndex = loop
    ? wrapIndex(activeIndex ?? initialIndex, itemCount)
    : Math.max(0, Math.min(itemCount - 1, activeIndex ?? initialIndex));
  const [rotation, setRotation] = useState(startingIndex);
  const [selectedIndex, setSelectedIndex] = useState(startingIndex);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(startingIndex);
  const selectedRef = useRef(startingIndex);
  const appliedActiveIndexRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const dragOriginRef = useRef({ y: 0, rotation: startingIndex });
  const previousDragRotationRef = useRef(startingIndex);
  const frameRef = useRef<number | null>(null);
  const boundaryPassCountRef = useRef({ top: 0, bottom: 0 });

  useEffect(() => setThemeReady(true), []);

  useEffect(() => {
    const normalizedIndex = loop
      ? wrapIndex(selectedRef.current, itemCount)
      : Math.max(0, Math.min(itemCount - 1, selectedRef.current));

    if (normalizedIndex === selectedRef.current) return;

    selectedRef.current = normalizedIndex;
    rotationRef.current = normalizedIndex;
    setSelectedIndex(normalizedIndex);
    setRotation(normalizedIndex);
  }, [itemCount, loop]);

  const palette = useMemo(() => {
    if (resolvedMode === "dark") {
      return {
        background: background === "rgb(255, 246, 236)" ? "#0B0E14" : background,
        text: "rgba(255, 255, 255, 0.45)",
        selected: "#ffffff",
        marker: markerColor || "#E8A33D",
        panel: panelColor ?? "#141822",
      };
    }
    if (resolvedMode === "light") {
      return {
        background: "#ffffff",
        text: "rgba(0, 0, 0, 0.32)",
        selected: "#0a0a0a",
        marker: markerColor || "#2c6bff",
        panel: "#ededed",
      };
    }
    return {
      background,
      text: textColor,
      selected: selectedColor,
      marker: markerColor,
      panel: panelColor ?? background,
    };
  }, [
    background,
    markerColor,
    panelColor,
    resolvedMode,
    selectedColor,
    textColor,
  ]);

  const commitRotation = useCallback(
    (nextRotation: number) => {
      const clampedRotation = loop
        ? nextRotation
        : Math.max(0, Math.min(itemCount - 1, nextRotation));
      rotationRef.current = clampedRotation;
      setRotation(clampedRotation);
      const nextIndex = loop
        ? wrapIndex(Math.round(clampedRotation), itemCount)
        : Math.max(0, Math.min(itemCount - 1, Math.round(clampedRotation)));
      if (nextIndex !== selectedRef.current) {
        selectedRef.current = nextIndex;
        setSelectedIndex(nextIndex);
        onActiveChange?.(carouselItems[nextIndex]!, nextIndex);
      }
    },
    [carouselItems, itemCount, loop, onActiveChange],
  );

  const commitRotationRef = useRef(commitRotation);
  commitRotationRef.current = commitRotation;

  const runAnimation = useCallback(() => {
    if (frameRef.current !== null) return;

    const tick = () => {
      let keepAnimating = false;

      if (!draggingRef.current && Math.abs(velocityRef.current) > 0.0008) {
        commitRotation(rotationRef.current + velocityRef.current);
        velocityRef.current *=
          momentum && !reduceMotion ? (snap ? 0.88 : 0.94) : 0.8;
        keepAnimating = true;
      } else if (!draggingRef.current && snap) {
        velocityRef.current = 0;
        const target = loop
          ? Math.round(rotationRef.current)
          : Math.max(0, Math.min(itemCount - 1, Math.round(rotationRef.current)));
        const delta = target - rotationRef.current;
        if (Math.abs(delta) > 0.001 && !reduceMotion) {
          commitRotation(rotationRef.current + delta * 0.25);
          keepAnimating = true;
        } else {
          commitRotation(target);
        }
      } else if (!draggingRef.current) {
        velocityRef.current = 0;
      }

      if (keepAnimating) frameRef.current = requestAnimationFrame(tick);
      else frameRef.current = null;
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [commitRotation, loop, itemCount, momentum, reduceMotion, snap]);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  // Wheel handling: locks dashboard and only moves wheel until all photos have moved
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (event: globalThis.WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return; // don't hijack pinch-zoom

      const deltaY = event.deltaY;
      const isScrollingDown = deltaY > 0;
      const isScrollingUp = deltaY < 0;
      const currentRot = rotationRef.current;
      const atStart = currentRot <= 0.05;
      const atEnd = currentRot >= itemCount - 1 - 0.05;

      // If at the end and scrolling down, all photos have moved! Allow cursor and dashboard to scroll down.
      if (!loop && atEnd && isScrollingDown) {
        boundaryPassCountRef.current.bottom += 1;
        // Require two intent ticks before releasing to page scroll, ensuring last photo is fully seen
        if (boundaryPassCountRef.current.bottom >= 2) {
          const lenis = (window as any).lenis;
          if (lenis) {
            lenis.scrollTo(lenis.scroll + deltaY * 1.2, { immediate: false });
          } else {
            window.scrollBy({ top: deltaY, behavior: "auto" });
          }
        }
        return;
      } else {
        boundaryPassCountRef.current.bottom = 0;
      }

      // If at the start and scrolling up, allow cursor and dashboard to scroll up.
      if (!loop && atStart && isScrollingUp) {
        boundaryPassCountRef.current.top += 1;
        if (boundaryPassCountRef.current.top >= 2) {
          const lenis = (window as any).lenis;
          if (lenis) {
            lenis.scrollTo(lenis.scroll + deltaY * 1.2, { immediate: false });
          } else {
            window.scrollBy({ top: deltaY, behavior: "auto" });
          }
        }
        return;
      } else {
        boundaryPassCountRef.current.top = 0;
      }

      // Otherwise, ONLY the wheel moves! The website dashboard does NOT move.
      event.preventDefault();
      event.stopPropagation();

      const delta = deltaY * scrollSpeed;
      const nextRotation = loop
        ? currentRot + delta
        : Math.max(0, Math.min(itemCount - 1, currentRot + delta));
      commitRotation(nextRotation);
      velocityRef.current = delta * 0.2;
      runAnimation();
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [commitRotation, itemCount, loop, runAnimation, scrollSpeed]);

  useEffect(() => {
    if (activeIndex === undefined) return;
    const controlledIndex = loop
      ? wrapIndex(activeIndex, itemCount)
      : Math.max(0, Math.min(itemCount - 1, activeIndex));
    if (appliedActiveIndexRef.current === controlledIndex) return;
    appliedActiveIndexRef.current = controlledIndex;
    const currentIndex = loop
      ? wrapIndex(Math.round(rotationRef.current), itemCount)
      : Math.round(rotationRef.current);
    let delta = controlledIndex - currentIndex;
    if (loop) {
      if (delta > itemCount / 2) delta -= itemCount;
      if (delta < -itemCount / 2) delta += itemCount;
    }
    selectedRef.current = controlledIndex;
    setSelectedIndex(controlledIndex);
    commitRotationRef.current(rotationRef.current + delta);
  }, [activeIndex, itemCount, loop]);

  const moveBy = (amount: number) => {
    velocityRef.current = 0;
    const nextRotation = loop
      ? rotationRef.current + amount
      : Math.max(0, Math.min(itemCount - 1, rotationRef.current + amount));
    commitRotation(nextRotation);
    runAnimation();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    draggingRef.current = true;
    setIsDragging(true);
    velocityRef.current = 0;
    dragOriginRef.current = { y: event.clientY, rotation: rotationRef.current };
    previousDragRotationRef.current = rotationRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const distance = event.clientY - dragOriginRef.current.y;
    const rawRotation = dragOriginRef.current.rotation - distance * dragSpeed;
    const nextRotation = loop
      ? rawRotation
      : Math.max(0, Math.min(itemCount - 1, rawRotation));
    velocityRef.current = nextRotation - previousDragRotationRef.current;
    previousDragRotationRef.current = nextRotation;
    commitRotation(nextRotation);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    runAnimation();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      moveBy(1);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      moveBy(-1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      velocityRef.current = 0;
      commitRotation(0);
      runAnimation();
    }
    if (event.key === "End") {
      event.preventDefault();
      velocityRef.current = 0;
      const lastIndex = itemCount - 1;
      commitRotation(lastIndex);
      runAnimation();
    }
  };

  const safeSelectedIndex = loop
    ? wrapIndex(selectedIndex, itemCount)
    : Math.max(0, Math.min(itemCount - 1, selectedIndex));
  const selectedItem = carouselItems[safeSelectedIndex]!;
  const mask = edgeFade
    ? `linear-gradient(to bottom, transparent 0%, black ${edgeFadeSize}%, black ${100 - edgeFadeSize}%, transparent 100%)`
    : undefined;

  const allPhotosMoved = safeSelectedIndex === itemCount - 1;
  const atStartPhoto = safeSelectedIndex === 0;

  return (
    <motion.div
      initial={appear && !reduceMotion ? { opacity: 0, y: 18 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      data-lenis-prevent="true"
      className={cn(
        "flex flex-col h-full min-h-[440px] w-full items-center justify-between overflow-hidden relative",
        className,
      )}
      style={{ backgroundColor: palette.background }}
    >
      {/* Top Progress & Step Status Bar */}
      <div className="w-full max-w-5xl px-6 pt-5 pb-2 flex items-center justify-between z-20 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#E8A33D] px-2 py-0.5 rounded bg-[#E8A33D]/10 border border-[#E8A33D]/25">
            {String(safeSelectedIndex + 1).padStart(2, "0")} / {String(itemCount).padStart(2, "0")}
          </span>
          <span className="text-xs text-white/50 font-mono hidden sm:inline">
            Leadership Showcase
          </span>
        </div>

        {/* Scroll State Indicator Message */}
        <div className="flex items-center gap-2">
          {allPhotosMoved ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#E8A33D] animate-pulse">
              <span>All {itemCount} leaders explored • Scroll down to continue</span>
              <span>↓</span>
            </span>
          ) : atStartPhoto ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50">
              <span>Scroll down to explore leaders</span>
              <span>↓</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-white/60">
              <span>{itemCount - 1 - safeSelectedIndex} more leaders remaining</span>
              <span>↓</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Wheel Carousel Stage */}
      <div
        ref={stageRef}
        role="listbox"
        data-lenis-prevent="true"
        aria-label="Wheel carousel"
        aria-activedescendant={`${instanceId}-item-${safeSelectedIndex}`}
        tabIndex={0}
        className={cn(
          "flex h-full w-full touch-none select-none items-stretch overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E8A33D]",
          photoSide === "right" && "flex-row-reverse",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        style={{ maxWidth: contentWidth, gap }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={handleKeyDown}
      >
        {/* Photo Container */}
        <div
          className="flex h-full shrink-0 items-center justify-center py-2"
          style={{
            width: `${photoWidth}%`,
            backgroundColor: palette.background,
          }}
        >
          <div
            className={cn(
              "relative w-full max-h-full overflow-hidden border border-white/10 shadow-2xl group",
              photoClassName,
            )}
            style={{
              aspectRatio: aspectRatios[photoAspect],
              borderRadius: photoRadius,
              backgroundColor: palette.panel,
            }}
          >
            <AnimatePresence initial={false} mode="sync">
              <motion.img
                key={`${safeSelectedIndex}-${selectedItem.image}`}
                src={selectedItem.image}
                alt={selectedItem.imageAlt ?? selectedItem.label}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : crossfadeDuration }}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
            </AnimatePresence>

            {/* Bottom Overlay confirming exact person's name and role */}
            <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 md:p-5 pt-12 flex flex-col justify-end pointer-events-none">
              {selectedItem.role && (
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#E8A33D] animate-pulse" />
                  <span className="text-[11px] md:text-xs font-mono font-bold uppercase tracking-wider text-[#E8A33D]">
                    {selectedItem.role}
                  </span>
                </div>
              )}
              <h3 className="font-bold text-white text-base md:text-xl leading-tight truncate drop-shadow-md">
                {selectedItem.label}
              </h3>
              {selectedItem.whatTheyOwn && (
                <p className="text-[11px] md:text-xs text-white/70 mt-1 line-clamp-2 leading-relaxed">
                  {selectedItem.whatTheyOwn}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Wheel items list */}
        <div
          className="relative h-full min-w-0 flex-1 overflow-hidden"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        >
          {showMarker && (
            <span
              aria-hidden="true"
              className="absolute top-1/2 z-10 -translate-y-1/2 rounded-full shadow-lg shadow-[#E8A33D]/40"
              style={{
                left: `calc(${apexInset}% - ${markerGap}px)`,
                width: markerSize,
                height: markerSize,
                marginLeft: -markerSize,
                backgroundColor: palette.marker,
              }}
            />
          )}

          {carouselItems.map((item, index) => {
            const offset = computeOffset(index, rotation, itemCount, loop);
            if (Math.abs(offset) > visibleItems + 1) return null;

            const angle = offset * spacing;
            const radians = (angle * Math.PI) / 180;
            const x = -radius * (1 - Math.cos(radians));
            const y = radius * Math.sin(radians);
            const distance = Math.min(Math.abs(offset) / visibleItems, 1);
            const opacity = Math.cos((distance * Math.PI) / 2);
            const scale = 1 - Math.min(Math.abs(offset) * 0.04, 0.45);
            const selected = Math.abs(offset) < 0.5;

            return (
              <div
                id={`${instanceId}-item-${index}`}
                key={`${item.label}-${index}`}
                role="option"
                aria-selected={selected}
                onClick={(e) => {
                  e.stopPropagation();
                  moveBy(offset);
                }}
                className={cn(
                  "cursor-pointer pointer-events-auto absolute top-1/2 origin-left whitespace-nowrap text-[clamp(1rem,2.2vw,1.6rem)] font-medium leading-none tracking-[-0.01em] transition-colors duration-150 flex items-center gap-3",
                  itemClassName,
                )}
                style={{
                  left: `${apexInset}%`,
                  color: selected ? palette.selected : palette.text,
                  opacity,
                  transform: `translate(${x}px, ${y}px) translateY(-50%) rotate(${angle}deg) scale(${scale})`,
                }}
              >
                <span className={cn("font-semibold", selected && "text-white drop-shadow-sm")}>
                  {item.label}
                </span>
                {item.role && (
                  <span
                    className={cn(
                      "text-[10px] md:text-xs font-mono font-medium tracking-wide uppercase px-2 py-0.5 rounded-full border transition-all duration-200",
                      selected
                        ? "text-[#E8A33D] border-[#E8A33D]/40 bg-[#E8A33D]/10 opacity-100"
                        : "text-white/40 border-white/5 opacity-50"
                    )}
                  >
                    {item.role}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Segmented Progress Track */}
      <div className="w-full max-w-5xl px-6 pb-4 pt-1 flex items-center gap-1.5 z-20 pointer-events-none select-none">
        {carouselItems.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              idx === safeSelectedIndex
                ? "bg-[#E8A33D] shadow-sm shadow-[#E8A33D]"
                : idx < safeSelectedIndex
                ? "bg-white/30"
                : "bg-white/10"
            )}
          />
        ))}
      </div>

      <span className="sr-only" aria-live="polite">
        {selectedItem.label}, item {safeSelectedIndex + 1} of {itemCount}
      </span>
    </motion.div>
  );
}

export function WheelCarouselDemo() {
  return (
    <div className="h-screen w-full">
      <WheelCarousel />
    </div>
  );
}

export default WheelCarousel;
