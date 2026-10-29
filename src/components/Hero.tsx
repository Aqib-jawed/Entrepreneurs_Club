"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 96;
const FRAME_EASING = 0.18;

export default function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!track || !canvas || !context) return;

    let disposed = false;
    let frameRequest = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let previousFrame = -1;
    const frames: HTMLImageElement[] = [];

    const updateTarget = () => {
      const distance = Math.max(1, track.offsetHeight - window.innerHeight);
      const start = track.getBoundingClientRect().top + window.scrollY;
      targetProgress = Math.max(0, Math.min(1, (window.scrollY - start) / distance));
      if (!frameRequest) frameRequest = requestAnimationFrame(drawFrame);
    };

    const drawFrame = () => {
      frameRequest = 0;
      if (disposed || frames.length !== FRAME_COUNT) return;
      currentProgress += (targetProgress - currentProgress) * FRAME_EASING;
      if (Math.abs(targetProgress - currentProgress) < 0.001) currentProgress = targetProgress;
      const index = Math.round(currentProgress * (FRAME_COUNT - 1));
      if (index !== previousFrame) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(frames[index], 0, 0, canvas.width, canvas.height);
        previousFrame = index;
      }
      if (currentProgress !== targetProgress) frameRequest = requestAnimationFrame(drawFrame);
    };

    const load = async () => {
      try {
        const images = await Promise.all(Array.from({ length: FRAME_COUNT }, async (_, index) => {
          const image = new Image();
          image.src = `/frames/frame_${String(index + 1).padStart(3, "0")}.webp`;
          if (image.decode) await image.decode();
          else await new Promise<void>((resolve, reject) => {
            image.onload = () => resolve();
            image.onerror = () => reject(new Error(`Could not load frame ${index + 1}`));
          });
          return image;
        }));
        if (disposed) return;
        frames.push(...images);
        updateTarget();
      } catch (error) {
        console.error("E-Club frames failed to preload:", error);
      }
    };

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });
    void load();
    return () => {
      disposed = true;
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      if (frameRequest) cancelAnimationFrame(frameRequest);
    };
  }, []);

  return (
    <section ref={trackRef} className="frame-hero" aria-label="E-Club logo animation">
      <div className="frame-stage">
        <canvas ref={canvasRef} className="frame-canvas" width={480} height={300} aria-label="E-Club logo draws itself as you scroll" />
        <a className="frame-hero__cta" href="#domains">Explore Domains <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
