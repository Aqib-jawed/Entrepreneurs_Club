'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ImpactSection } from '../ImpactSection';
import { EventsSection } from '../EventsSection';
import { DomainsSection } from '../DomainsSection';
import { CoreTeamSection } from '../CoreTeamSection';
import { JoinSection } from '../JoinSection';
import { Footer } from '../Footer';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
        },
      });

      const layers = [{ layer: '1', yPercent: 70 }];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: 'none',
          },
          idx === 0 ? undefined : '<'
        );
      });
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });
    (window as any).lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (triggerElement) {
        gsap.killTweensOf(triggerElement);
      }
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      {/* Page 1: Hero Video Viewport */}
      <section className="parallax__header" id="hero">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            <div className="hero-video-wrapper" data-parallax-layer="1">
              <video
                ref={videoRef}
                src="/e-club-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="hero-video"
              />
            </div>
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>

      {/* Page 2: Content Sections */}
      <section className="parallax__content" id="page-2">
        <ImpactSection />
        <EventsSection />
        <CoreTeamSection />
        <DomainsSection />
        <JoinSection />
        <Footer />
      </section>
    </div>
  );
}





