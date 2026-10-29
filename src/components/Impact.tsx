"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, observeWindowResize, useGSAP } from "@/lib/gsap";
import { impactMilestones } from "@/data/impact";

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!section || !stage || !track) return;

    const media = gsap.matchMedia();
    const splits: InstanceType<typeof SplitText>[] = [];
    const unbindResize = observeWindowResize(() => ScrollTrigger.refresh());

    media.add("(min-width: 600px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-milestone]"));
      const travel = () => Math.max(0, track.scrollWidth - stage.clientWidth);
      const horizontalTween = gsap.to(track, {
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: stage,
          start: "top top",
          end: () => `+=${travel()}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          refreshPriority: 2,
        },
      });

      cards.forEach((card) => {
        const title = card.querySelector<HTMLElement>("[data-split-title]");
        const description = card.querySelector<HTMLElement>("[data-split-description]");
        const titleSplit = title ? SplitText.create(title, { type: "lines", mask: "lines", aria: "auto" }) : null;
        const descriptionSplit = description ? SplitText.create(description, { type: "lines", mask: "lines", aria: "auto" }) : null;
        if (titleSplit) splits.push(titleSplit);
        if (descriptionSplit) splits.push(descriptionSplit);

        [titleSplit, descriptionSplit].forEach((split) => {
          if (!split?.lines.length) return;
          gsap.fromTo(split.lines, { yPercent: 110 }, {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 88%",
              end: "left 58%",
              scrub: true,
            },
          });
        });
      });

      return () => {
        splits.splice(0).forEach((split) => split.revert());
      };
    });

    // Mobile is a readable vertical timeline; reveal cards once as they enter view.
    const mobileQuery = window.matchMedia("(max-width: 599px) and (prefers-reduced-motion: no-preference)");
    let observer: IntersectionObserver | undefined;
    const setupMobileReveal = () => {
      observer?.disconnect();
      observer = undefined;
      if (!mobileQuery.matches) return;
      if (!("IntersectionObserver" in window)) {
        section.querySelectorAll(".impact-mobile-card").forEach((card) => card.classList.add("is-visible"));
        return;
      }
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      section.querySelectorAll(".impact-mobile-card").forEach((card) => observer?.observe(card));
    };
    mobileQuery.addEventListener("change", setupMobileReveal);
    setupMobileReveal();

    return () => {
      unbindResize();
      mobileQuery.removeEventListener("change", setupMobileReveal);
      observer?.disconnect();
      media.revert();
      splits.splice(0).forEach((split) => split.revert());
    };
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section ref={sectionRef} id="impact" className="impact-section" aria-label="Our Journey: E-Club milestones from founding to today">
      <div ref={stageRef} className="impact-stage">
        <div className="impact-topbar">
          <a className="impact-wordmark" href="#impact" aria-label="E-Club Our Journey">E-CLUB <span>✳</span></a>
          <nav aria-label="Main navigation"><a href="#impact">Our Journey <span aria-hidden="true">↗</span></a></nav>
        </div>
        <header className="impact-heading">
          <p className="impact-eyebrow"><span /> THE STORY SO FAR</p>
          <h2>Our <em>Journey</em></h2>
          <p className="impact-intro">A community built one idea, one experiment, one milestone at a time.</p>
        </header>
        <div className="impact-desktop">
          <div ref={trackRef} className="impact-track">
            <div className="impact-photo">
              {/* TODO: Replace this local artwork with an approved E-Club team or event photograph. */}
              <Image src="/team-event-placeholder.svg" alt="Placeholder for an E-Club team or event photo" width={360} height={450} priority />
              <span className="impact-photo-caption">BUILT TOGETHER <i>✳</i></span>
            </div>
            <div className="impact-axis" aria-hidden="true"><span /><span /></div>
            {impactMilestones.map((milestone, index) => (
              <article className={`impact-card ${index % 2 === 0 ? "is-top" : "is-bottom"}`} data-milestone key={milestone.id}>
                <span className="impact-stem" aria-hidden="true" />
                <span className="impact-node" aria-hidden="true" />
                <div className="impact-card-copy">
                  <p className="impact-date">{milestone.month ? `${milestone.month} ` : ""}{milestone.year}</p>
                  <h3 data-split-title>{milestone.title}</h3>
                  <p className="impact-description" data-split-description>{milestone.description}</p>
                  {milestone.metric && <p className="impact-metric"><strong>{milestone.metric.value}</strong><span>{milestone.metric.label}</span></p>}
                </div>
              </article>
            ))}
          </div>
          <p className="impact-scroll-note"><span>SCROLL TO MOVE THROUGH THE YEARS</span><i aria-hidden="true">↓</i></p>
        </div>
      </div>

      <div className="impact-mobile-list" aria-label="E-Club milestones">
        <div className="impact-mobile-photo">
          {/* TODO: Replace this local artwork with an approved E-Club team or event photograph. */}
          <Image src="/team-event-placeholder.svg" alt="Placeholder for an E-Club team or event photo" width={720} height={900} />
        </div>
        <ol>
          {impactMilestones.map((milestone) => (
            <li className="impact-mobile-card" key={milestone.id}>
              <p className="impact-date">{milestone.month ? `${milestone.month} ` : ""}{milestone.year}</p>
              <h3>{milestone.title}</h3>
              <p className="impact-description">{milestone.description}</p>
              {milestone.metric && <p className="impact-metric"><strong>{milestone.metric.value}</strong><span>{milestone.metric.label}</span></p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
