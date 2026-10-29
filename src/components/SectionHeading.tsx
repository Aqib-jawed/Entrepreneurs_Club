"use client";

import { useEffect, useRef } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  tagline: string;
  copy: string;
};

export default function SectionHeading({
  id,
  eyebrow,
  title,
  titleAccent,
  tagline,
  copy,
}: SectionHeadingProps) {
  const headingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    if (!("IntersectionObserver" in window)) {
      heading.classList.add("is-revealed");
      return;
    }

    heading.classList.add("is-pending");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      heading.classList.add("is-revealed");
      observer.disconnect();
    }, { threshold: 0.15 });

    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={headingRef} className="section-heading faculty-heading">
      <p className="section-heading__eyebrow">{eyebrow}</p>
      <h2 id={id}>
        {title} <em>{titleAccent}</em>
      </h2>
      <p className="section-heading__tagline">{tagline}</p>
      <p className="section-heading__copy">{copy}</p>
    </header>
  );
}
