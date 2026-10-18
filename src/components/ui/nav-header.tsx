import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TabProps {
  id: string;
  label: string;
  href: string;
}

const DEFAULT_TABS: TabProps[] = [
  { id: 'impact', label: 'Impact', href: '#impact' },
  { id: 'events', label: 'Events', href: '#events' },
  { id: 'team', label: 'Team', href: '#team' },
  { id: 'domains', label: 'Domains', href: '#domains' },
  { id: 'join', label: 'Join', href: '#join' },
];

export function NavHeader({ tabs = DEFAULT_TABS }: { tabs?: TabProps[] }) {
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth IntersectionObserver for scroll spy without layout thrashing
  useEffect(() => {
    let ticking = false;
    const sectionEls = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 200) {
            setSelectedTab((prev) => (prev !== entry.target.id ? entry.target.id : prev));
          }
        });
      },
      {
        rootMargin: '-15% 0px -65% 0px',
        threshold: 0,
      }
    );

    sectionEls.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (window.scrollY < 200) {
            setSelectedTab((prev) => (prev !== '' ? '' : prev));
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tabs]);

  const handleTabClick = (tab: TabProps) => {
    setSelectedTab(tab.id);
    setMobileMenuOpen(false);
    const target = document.querySelector(tab.href);
    if (target) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(target, { offset: -80 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="nav-header-root">
      <div className="nav-header-bar">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          onClick={(e) => {
            e.preventDefault();
            setSelectedTab('');
            if ((window as any).lenis) {
              (window as any).lenis.scrollTo(0);
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="nav-header-logo"
        >
          E-CLUB<span className="logo-dot">.</span>
        </a>

        {/* Animated Sliding Cursor Tab Navigation */}
        <nav className="nav-header-tabs-container hidden-mobile">
          {tabs.map((tab) => {
            const isSelected = selectedTab === tab.id;
            return (
              <li
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className="nav-tab-item"
              >
                {isSelected && (
                  <motion.span
                    layoutId="active-tab-pillow"
                    className="nav-header-cursor"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 32,
                    }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${isSelected ? 'text-black font-bold' : 'text-white/70 hover:text-white'}`}>
                  {tab.label}
                </span>
              </li>
            );
          })}
        </nav>

        {/* Action CTA & Mobile Trigger */}
        <div className="nav-header-actions">
          <a
            href="#join"
            onClick={(e) => { e.preventDefault(); handleTabClick({ id: 'join', label: 'Join', href: '#join' }); }}
            className="nav-header-cta-btn hidden-mobile"
          >
            Join the Club
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger"
            aria-label="Toggle menu"
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open-1' : ''}`} />
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-drawer-overlay"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="mobile-drawer-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-header">
                <span className="nav-header-logo">E-CLUB.</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="drawer-close-btn"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              <div className="drawer-links">
                {tabs.map((tab) => (
                  <a
                    key={tab.id}
                    href={tab.href}
                    onClick={(e) => { e.preventDefault(); handleTabClick(tab); }}
                    className={`drawer-link ${selectedTab === tab.id ? 'text-[#E8A33D] font-bold' : ''}`}
                  >
                    {tab.label}
                  </a>
                ))}
              </div>
              <div className="drawer-cta-wrapper">
                <a
                  href="#join"
                  onClick={(e) => { e.preventDefault(); handleTabClick({ id: 'join', label: 'Join', href: '#join' }); }}
                  className="nav-header-cta-btn w-full text-center"
                >
                  Join the Club
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
