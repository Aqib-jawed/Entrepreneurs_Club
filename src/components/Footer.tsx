import React from 'react';
import { ArrowUp, Mail, Globe, ExternalLink } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative w-full bg-[#000000] border-t border-white/10 text-white/70 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-2xl font-bold font-['Space_Grotesk'] text-white tracking-tight inline-block"
            >
              E-CLUB<span className="text-[#E8A33D]">.</span>
            </a>
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              Empowering students to transform breakthrough ideas into scalable, venture-backed companies.
              Leading university innovation through hackathons, incubation, and mentorship.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Aqib-jawed/Entrepreneurs_Club"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="GitHub Repository"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Twitter / X"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="mailto:contact@entrepreneursclub.org"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Email Contact"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#E8A33D] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => { e.preventDefault(); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#impact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#impact'); }}
                  className="hover:text-white transition-colors"
                >
                  Impact Metrics
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#events'); }}
                  className="hover:text-white transition-colors"
                >
                  Flagship Events
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#team'); }}
                  className="hover:text-white transition-colors"
                >
                  Core Leadership
                </a>
              </li>
              <li>
                <a
                  href="#domains"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#domains'); }}
                  className="hover:text-white transition-colors"
                >
                  12 Active Domains
                </a>
              </li>
              <li>
                <a
                  href="#join"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#join'); }}
                  className="hover:text-white transition-colors"
                >
                  Join the Club
                </a>
              </li>
            </ul>
          </div>

          {/* Domains Quick Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#E8A33D] font-bold">
              Featured Domains
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#domains"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#domains'); }}
                  className="hover:text-white transition-colors"
                >
                  Technical & Engineering
                </a>
              </li>
              <li>
                <a
                  href="#domains"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#domains'); }}
                  className="hover:text-white transition-colors"
                >
                  Fuel & MySoil (Agritech)
                </a>
              </li>
              <li>
                <a
                  href="#domains"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#domains'); }}
                  className="hover:text-white transition-colors"
                >
                  Chai Chats Firesides
                </a>
              </li>
              <li>
                <a
                  href="#domains"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#domains'); }}
                  className="hover:text-white transition-colors"
                >
                  Creative UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="#domains"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#domains'); }}
                  className="hover:text-white transition-colors"
                >
                  Event Operations
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Entrepreneurs Club. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
