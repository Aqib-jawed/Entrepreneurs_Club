import React from 'react';
import { NavHeader } from '../components/ui/nav-header';
import { ParallaxComponent } from '../components/ui/parallax-scrolling';

export default function Demo() {
  return (
    <div className="app-layout">
      <NavHeader />
      <ParallaxComponent />
    </div>
  );
}
