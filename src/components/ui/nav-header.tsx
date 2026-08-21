import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export interface TabProps {
  id: string;
  label: string;
  href: string;
}

const DEFAULT_TABS: TabProps[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'impact', label: 'Impact', href: '#impact' },
  { id: 'events', label: 'Events', href: '#events' },
  { id: 'team', label: 'Team', href: '#team' },
  { id: 'domains', label: 'Domains', href: '#domains' },
  { id: 'join', label: 'Join', href: '#join' },
];

export function NavHeader({ tabs = DEFAULT_TABS }: { tabs?: TabProps[] }) {
  const [position, setPosition] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: TabProps) => {
    setSelectedTab(tab.id);
    setMobileMenuOpen(false);
    const target = document.querySelector(tab.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="nav-header-root">
      <div className="nav-header-bar">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="nav-header-logo"
        >
          E-CLUB<span className="logo-dot">.</span>
        </a>

        {/* Animated Sliding Cursor Tab Navigation */}
        <nav
          onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
          className="nav-header-tabs-container hidden-mobile"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              tab={tab}
              setPosition={setPosition}
              isSelected={selectedTab === tab.id}
              onClick={() => handleTabClick(tab)}
            />
          ))}

          {/* Animated White Cursor Pillow */}
          <Cursor position={position} />
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <span className="nav-header-logo">E-CLUB.</span>
              <button onClick={() => setMobileMenuOpen(false)} className="drawer-close-btn">✕</button>
            </div>
            <div className="drawer-links">
              {tabs.map((tab) => (
                <a
                  key={tab.id}
                  href={tab.href}
                  onClick={(e) => { e.preventDefault(); handleTabClick(tab); }}
                  className="drawer-link"
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
          </div>
        </div>
      )}
    </header>
  );
}

function Tab({
  tab,
  setPosition,
  isSelected,
  onClick,
}: {
  tab: TabProps;
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
  isSelected: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={onClick}
      className={`nav-tab-item ${isSelected ? 'nav-tab-item--selected' : ''}`}
    >
      {tab.label}
    </li>
  );
}

function Cursor({ position }: { position: { left: number; width: number; opacity: number } }) {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
      className="nav-header-cursor"
    />
  );
}
