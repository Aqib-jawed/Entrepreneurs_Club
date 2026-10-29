"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type WheelEvent } from "react";
import { galleryItems } from "@/data/gallery";
import type { GalleryMotion } from "./gallery/types";

const GalleryCanvas = dynamic(() => import("./gallery/GalleryCanvas").then((module) => module.GalleryCanvas), {
  ssr: false,
  loading: () => null,
});

const photos = galleryItems.filter((item) => item.type === "image");
const motionDefaults: GalleryMotion = {
  velocity: 0,
  lastInteraction: Date.now(),
  hovered: false,
  focused: false,
  dragging: false,
  pointerX: null,
  pointerStartX: 0,
  pointerStartY: 0,
  dragDistance: 0,
  ignoreClickUntil: 0,
};

function supportsGalleryCanvas() {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2");
    if (!context) return false;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const motionRef = useRef<GalleryMotion>({ ...motionDefaults, lastInteraction: 0 });
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const [sceneNearViewport, setSceneNearViewport] = useState(false);
  const [sceneVisible, setSceneVisible] = useState(false);
  const speed = 1.2;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const updateSceneSupport = () => setSceneEnabled(media.matches && supportsGalleryCanvas());
    updateSceneSupport();
    media.addEventListener("change", updateSceneSupport);

    const nearObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setSceneNearViewport(true);
      nearObserver.disconnect();
    }, { rootMargin: `${window.innerHeight}px 0px` });
    const visibleObserver = new IntersectionObserver(([entry]) => setSceneVisible(entry.isIntersecting), { threshold: 0 });
    nearObserver.observe(section);
    visibleObserver.observe(section);
    const updateTabVisibility = () => setSceneVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", updateTabVisibility);
    setSceneVisible(document.visibilityState === "visible");

    return () => {
      media.removeEventListener("change", updateSceneSupport);
      nearObserver.disconnect();
      visibleObserver.disconnect();
      document.removeEventListener("visibilitychange", updateTabVisibility);
    };
  }, []);

  const rememberInteraction = useCallback(() => {
    motionRef.current.lastInteraction = Date.now();
  }, []);
  const handleSceneReady = useCallback(() => setSceneReady(true), []);

  const handleWheel = useCallback((event: WheelEvent<HTMLElement>) => {
    event.preventDefault();
    motionRef.current.velocity += event.deltaY * 0.01 * speed;
    rememberInteraction();
  }, [rememberInteraction]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    if (!["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    motionRef.current.velocity += (event.key === "ArrowUp" || event.key === "ArrowLeft" ? -2 : 2) * speed;
    rememberInteraction();
  }, [rememberInteraction]);

  const images = photos.map((photo) => ({ src: photo.src, alt: photo.alt }));

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="gallery-infinite"
      aria-label="E-Cell photo gallery"
      tabIndex={0}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      onPointerDown={(event) => {
        if (event.pointerType !== "touch") return;
        motionRef.current.dragging = true;
        motionRef.current.pointerX = event.clientX;
        rememberInteraction();
      }}
      onPointerMove={(event) => {
        const motion = motionRef.current;
        if (!motion.dragging || motion.pointerX === null) return;
        motion.velocity += (motion.pointerX - event.clientX) * 0.01 * speed;
        motion.pointerX = event.clientX;
        rememberInteraction();
      }}
      onPointerUp={() => {
        motionRef.current.dragging = false;
        motionRef.current.pointerX = null;
        rememberInteraction();
      }}
      onPointerCancel={() => {
        motionRef.current.dragging = false;
        motionRef.current.pointerX = null;
        rememberInteraction();
      }}
      onFocus={() => { motionRef.current.focused = true; rememberInteraction(); }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          motionRef.current.focused = false;
          rememberInteraction();
        }
      }}
    >
      {sceneEnabled && sceneNearViewport ? (
        <div className="gallery-infinite__canvas" aria-hidden="true">
          <GalleryCanvas
            images={images}
            motionRef={motionRef}
            frameloop={sceneVisible ? "always" : "never"}
            speed={speed}
            visibleCount={12}
            onReady={handleSceneReady}
          />
        </div>
      ) : null}
      {!sceneEnabled || !sceneReady ? (
        <div className="gallery-infinite__fallback" aria-hidden="true">
          {images.map((image, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={image.src} src={image.src} alt={image.alt} style={{ "--photo-index": index } as CSSProperties} />
          ))}
        </div>
      ) : null}

      <div className="gallery-infinite__title">
        <h2><span>Shadway</span></h2>
      </div>
      <div className="gallery-infinite__instructions" aria-hidden="true">
        <p>Use mouse wheel, arrow keys, or touch to navigate</p>
        <p>Auto-play resumes after 3 seconds of inactivity</p>
      </div>
    </section>
  );
}
