import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './shared/Button';
import { Badge } from './shared/Badge';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.7;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (anchor: string) => {
    setMobileOpen(false);
    const target = document.querySelector(anchor);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`main-navbar ${isScrolled ? 'main-navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar-container">
          {/* Left: Brand Logo & Optional Badge */}
          <div className="navbar-left">
            <a href="#hero" className="navbar-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              E-CLUB<span className="logo-dot">.</span>
            </a>
            <div className="navbar-badge-wrapper hidden-mobile">
              <Badge />
            </div>
          </div>

          {/* Right Desktop Nav Links & CTA */}
          <div className="navbar-right hidden-mobile">
            <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }}>
              About
            </a>
            <a href="#impact" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('#impact'); }}>
              Impact
            </a>
            <a href="#events" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('#events'); }}>
              Events
            </a>
            <a href="#team" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('#team'); }}>
              Team
            </a>
            <a href="#domains" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('#domains'); }}>
              Domains
            </a>
            <a href="#join" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('#join'); }}>
              Join
            </a>
            <Button size="sm" onClick={() => handleNavClick('#join')}>
              Join the Club
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className={`hamburger-bar ${mobileOpen ? 'open-1' : ''}`} />
            <span className={`hamburger-bar ${mobileOpen ? 'open-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="mobile-drawer-content"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-header">
                <span className="navbar-logo">E-CLUB.</span>
                <button className="drawer-close-btn" onClick={() => setMobileOpen(false)}>✕</button>
              </div>

              <div className="drawer-badge-container">
                <Badge />
              </div>

              <div className="drawer-links">
                <a href="#about" className="drawer-link" onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }}>
                  About
                </a>
                <a href="#impact" className="drawer-link" onClick={(e) => { e.preventDefault(); handleNavClick('#impact'); }}>
                  Impact
                </a>
                <a href="#events" className="drawer-link" onClick={(e) => { e.preventDefault(); handleNavClick('#events'); }}>
                  Events
                </a>
                <a href="#team" className="drawer-link" onClick={(e) => { e.preventDefault(); handleNavClick('#team'); }}>
                  Team
                </a>
                <a href="#domains" className="drawer-link" onClick={(e) => { e.preventDefault(); handleNavClick('#domains'); }}>
                  Domains
                </a>
                <a href="#join" className="drawer-link" onClick={(e) => { e.preventDefault(); handleNavClick('#join'); }}>
                  Join
                </a>
              </div>

              <div className="drawer-cta-wrapper">
                <Button size="lg" className="w-full" onClick={() => handleNavClick('#join')}>
                  Join the Club
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
