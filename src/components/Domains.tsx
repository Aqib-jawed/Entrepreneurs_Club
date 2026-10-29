"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { domains, type DomainRecord } from "@/data/domains";
import { events } from "@/data/events";

const COLS = 4;
const ROWS = 3;

type DomainTileProps = {
  domain: DomainRecord;
  index: number;
  active: boolean;
  desktopHover: boolean;
  videoReady: boolean;
  onFirstHover: (id: string) => void;
  onActivate: (index: number) => void;
  onOpen: (domain: DomainRecord) => void;
};

function DomainTile({ domain, index, active, desktopHover, videoReady, onFirstHover, onActivate, onOpen }: DomainTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const row = Math.floor(index / COLS);
  const col = index % COLS;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active && desktopHover) void video.play().catch(() => {});
    else video.pause();
  }, [active, desktopHover, videoReady]);

  useEffect(() => () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
  }, []);

  return (
    <button
      className={`domain-tile${active ? " is-active" : ""}`}
      type="button"
      data-domain-index={index}
      aria-label={`${domain.name}, learn more`}
      aria-haspopup="dialog"
      onMouseEnter={() => {
        onActivate(index);
        if (domain.video) onFirstHover(domain.id);
      }}
      onFocus={() => onActivate(index)}
      onClick={() => onOpen(domain)}
      style={{ "--domain-row": row, "--domain-col": col } as React.CSSProperties}
    >
      <span className="domain-tile-media" aria-hidden="true">
        <Image
          src={domain.image}
          alt=""
          fill
          priority={index < COLS}
          loading={index < COLS ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
        {desktopHover && domain.video && videoReady && (
          <video ref={videoRef} src={domain.video} preload="none" poster={domain.image} muted playsInline loop />
        )}
        <span className="domain-tile-scrim" />
      </span>
      <span className="domain-tile-copy">
        <span className="domain-tile-name">{domain.name}</span>
        <span className="domain-tile-tagline">{domain.tagline}</span>
        <span className="domain-tile-cue">Know more <span aria-hidden="true">↗</span></span>
      </span>
    </button>
  );
}

export default function Domains() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [desktopHover, setDesktopHover] = useState(false);
  const [videoIds, setVideoIds] = useState<Set<string>>(() => new Set());
  const [selectedDomain, setSelectedDomain] = useState<DomainRecord | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setDesktopHover(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        grid.classList.add("is-revealed");
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const setVideoReady = (id: string) => {
    setVideoIds((current) => {
      if (current.has(id)) return current;
      const next = new Set(current);
      next.add(id);
      return next;
    });
  };

  const activeRow = activeIndex === null ? null : Math.floor(activeIndex / COLS);
  const activeCol = activeIndex === null ? null : activeIndex % COLS;
  const gridStyle = activeIndex === null ? undefined : {
    gridTemplateColumns: Array.from({ length: COLS }, (_, col) => col === activeCol ? "1.8fr" : "1fr").join(" "),
    gridTemplateRows: Array.from({ length: ROWS }, (_, row) => row === activeRow ? "1.8fr" : "1fr").join(" "),
  };
  const matchingEvents = selectedDomain ? events.filter((event) => event.domain === selectedDomain.id).slice(0, 4) : [];

  return (
    <section id="domains" className="domains-section" aria-label="Explore the E-Club domains">
      <div className="domains-container">
        <div className="domains-topbar">
          <a className="domains-wordmark" href="#domains" aria-label="E-Club Domains">E-CLUB <span>✳</span></a>
          <nav aria-label="Section navigation"><a href="#domains" aria-current="location">Domains <span aria-hidden="true">↗</span></a></nav>
        </div>
        <header className="domains-heading">
          <p className="domains-eyebrow"><span aria-hidden="true" /> FIND YOUR PLACE</p>
          <h2>Explore <em>Domains</em></h2>
          <p className="domains-intro-copy">[TODO: Add a verified introduction to E-Club domains and how visitors can get involved.]</p>
        </header>

        <div
          ref={gridRef}
          className="domains-grid"
          style={desktopHover ? gridStyle : undefined}
          onMouseLeave={() => setActiveIndex(null)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveIndex(null);
          }}
          onFocusCapture={(event) => {
            const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-domain-index]") : null;
            const index = target?.dataset.domainIndex;
            if (index !== undefined) setActiveIndex(Number(index));
          }}
        >
          {domains.map((domain, index) => (
            <DomainTile
              key={domain.id}
              domain={domain}
              index={index}
              active={desktopHover && activeIndex === index}
              desktopHover={desktopHover}
              videoReady={videoIds.has(domain.id)}
              onFirstHover={setVideoReady}
              onActivate={setActiveIndex}
              onOpen={setSelectedDomain}
            />
          ))}
        </div>
      </div>

      <Modal
        open={selectedDomain !== null}
        title={selectedDomain?.name ?? "Domain details"}
        onClose={() => setSelectedDomain(null)}
      >
        {selectedDomain && (
          <div className="domains-modal">
            <p className="domains-modal-tagline">{selectedDomain.tagline}</p>
            <p className="domains-modal-description">{selectedDomain.description}</p>
            {selectedDomain.confirmed ? (
              <>
                <details className="domains-accordion">
                  <summary>Know more <span aria-hidden="true">＋</span></summary>
                  <p>{selectedDomain.knowMore}</p>
                </details>
                <div className="domains-mission-grid">
                  <div><h3>Mission</h3><p>{selectedDomain.mission}</p></div>
                  <div><h3>Vision</h3><p>{selectedDomain.vision}</p></div>
                </div>
                <div className="domains-looking-for"><h3>What we look for</h3><ul>{selectedDomain.lookingFor.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </>
            ) : (
              <p className="domains-coming-soon">Details coming soon</p>
            )}
            {matchingEvents.length > 0 && (
              <div className="domains-event-photos">
                <h3>From this domain</h3>
                <div className="domains-event-grid">
                  {matchingEvents.map((event) => (
                    <figure key={event.id}>
                      <Image src={event.cover} alt={event.title} width={480} height={320} sizes="(max-width: 599px) 80vw, 240px" />
                      <figcaption>{event.title}</figcaption>
                    </figure>
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
