"use client";

import SectionHeading from "@/components/SectionHeading";
import { CalendlyCarousel, type CarouselItem } from "@/components/ui/connected-carousel";
import { alumni } from "@/data/alumni";

export default function Alumni() {
  if (alumni.length === 0) return null;

  const items: CarouselItem[] = alumni.map((story) => ({
    id: story.id,
    stat: "E-Club Alumni",
    author: story.name,
    role: "Alumni community",
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

      </div>
    </section>
  );
}
