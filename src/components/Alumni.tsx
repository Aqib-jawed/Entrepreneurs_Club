"use client";

import SectionHeading from "@/components/SectionHeading";
import { CalendlyCarousel, type CarouselItem } from "@/components/ui/connected-carousel";
import { alumni, alumniVisible } from "@/data/alumni";

const previewEnabled = process.env.NODE_ENV === "development";

export default function Alumni() {
  const verifiedStories = alumni.filter((person) => person.verified);
  const stories = previewEnabled ? alumni : verifiedStories;
  const isVisible = previewEnabled || (alumniVisible && verifiedStories.length >= 3);

  if (!isVisible || stories.length === 0) return null;

  const items: CarouselItem[] = stories.map((story) => ({
    id: story.id,
    stat: story.outcome,
    quote: story.quote,
    author: story.name,
    role: story.role,
    defaultImage: story.image ?? "/faculty/placeholder.svg",
    selectedImage: story.image ?? "/faculty/placeholder.svg",
    alt: `Portrait of ${story.name}`,
  }));

  return (
    <section id="alumni" className="alumni-section" aria-labelledby="alumni-heading">
      <div className="alumni-container">
        <div className="alumni-topbar">
          <a className="alumni-wordmark" href="#alumni" aria-label="E-Club Alumni">
            E-CLUB <span aria-hidden="true">✳</span>
          </a>
          <nav aria-label="Section navigation">
            <a href="#alumni" aria-current="location">Alumni <span aria-hidden="true">↗</span></a>
          </nav>
        </div>

        <SectionHeading
          id="alumni-heading"
          eyebrow="LONG-GAME PROOF"
          title="Where the club"
          titleAccent="leads"
          tagline="Real people. Real outcomes."
          copy="Explore alumni profiles from the E-Club community."
        />

        <CalendlyCarousel items={items} autoPlayInterval={6000} pauseOnHover={false} />

        {previewEnabled ? (
          <p className="alumni-preview-note">Development preview · placeholder story details</p>
        ) : null}
      </div>
    </section>
  );
}
