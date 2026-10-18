import React, { useState } from 'react';

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Accordion({
  title,
  children,
  defaultOpen = false,
  className = '',
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`border border-[#F5F3EE]/10 rounded-xl overflow-hidden bg-[#141822]/60 transition-colors ${
        isOpen ? 'border-[#E8A33D]/30 bg-[#141822]/90' : ''
      } ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold text-[#F5F3EE] hover:text-[#E8A33D] transition-colors focus:outline-none focus:ring-1 focus:ring-[#E8A33D]"
      >
        <span className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E8A33D]" />
          {title}
        </span>
        <svg
          className={`w-4 h-4 text-[#F5F3EE]/70 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[#E8A33D]' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[800px] opacity-100 px-4 pb-4 pt-1' : 'max-h-0 opacity-0 px-4 py-0'
        }`}
      >
        <div className="text-xs sm:text-sm text-[#F5F3EE]/80 leading-relaxed border-t border-[#F5F3EE]/10 pt-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
