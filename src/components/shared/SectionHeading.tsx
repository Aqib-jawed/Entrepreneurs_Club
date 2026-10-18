import React from 'react';

export interface SectionHeadingProps {
  tag?: string;
  eyebrow?: string;
  icon?: React.ReactNode;
  title: React.ReactNode | string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  tag,
  eyebrow,
  icon,
  title,
  subtitle,
  centered = true,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${centered ? 'text-center' : ''} ${className}`}>
      {icon && (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8A33D] text-[#0B0E14] shadow-lg shadow-[#E8A33D]/20">
          {icon}
        </div>
      )}
      {eyebrow && (
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8A33D] font-semibold mb-2">
          {eyebrow}
        </div>
      )}
      {tag && <div className="section-tag-pill">✦ {tag}</div>}
      <h2 className="section-title mb-4">{title}</h2>
      {subtitle && (
        <p className="section-subtitle max-w-2xl mx-auto text-neutral-400 text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
