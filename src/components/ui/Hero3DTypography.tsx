import React from 'react';

export function Hero3DTypography() {
  return (
    <div className="hero-3d-container" data-parallax-layer="1">
      {/* Ambient warm glow behind headline */}
      <div className="absolute inset-0 -top-8 flex items-center justify-center pointer-events-none">
        <div className="w-[85%] h-36 bg-[#E8A33D]/20 blur-3xl rounded-full" />
      </div>

      {/* Main Dominant Headline: ENTREPRENEURS CLUB */}
      <div className="hero-3d-title-wrapper">
        {/* Base Extruded 3D Shadow Layer */}
        <h1 className="hero-3d-headline hero-3d-extrusion" aria-hidden="true">
          ENTREPRENEURS CLUB
        </h1>
        {/* Metallic Warm Ivory-White Front Face */}
        <h1 className="hero-3d-headline hero-3d-face">
          ENTREPRENEURS CLUB
        </h1>
      </div>

      {/* Centered Subtitle: GITAM with Thin Orange Horizontal Accent Lines */}
      <div className="hero-3d-sub-wrapper">
        <div className="hero-3d-line-left" />

        <div className="relative inline-block">
          <span className="hero-3d-gitam hero-3d-gitam-extrusion" aria-hidden="true">
            GITAM
          </span>
          <span className="hero-3d-gitam hero-3d-gitam-face">
            GITAM
          </span>
        </div>

        <div className="hero-3d-line-right" />
      </div>
    </div>
  );
}
