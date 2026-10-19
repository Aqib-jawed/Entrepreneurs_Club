'use client';

import React from 'react';
import { Marquee } from './marquee';
import { SectionHeading } from '../shared/SectionHeading';

interface TeamMember {
  image: string;
  name: string;
  role: string;
  whatTheyOwn: string;
}

const teamMembers: TeamMember[] = [
  {
    image: '/president.jpg',
    name: 'Devamanaya',
    role: 'President',
    whatTheyOwn: 'Directing strategic vision, university partnerships, and overall club trajectory.',
  },
  {
    image: '/vp-backend.jpg',
    name: 'Bhavya',
    role: 'Backend Lead',
    whatTheyOwn: 'Architecting server infrastructure, database models, and API integrations.',
  },
  {
    image: '/frontend-lead.jpg',
    name: 'Ritisha',
    role: 'Frontend Lead',
    whatTheyOwn: 'Building intuitive user interfaces, responsive layouts, and web experiences.',
  },
  {
    image: '/secretary.png',
    name: 'Kavya',
    role: 'Secretary',
    whatTheyOwn: 'Managing club communications, documentation, meeting schedules, and compliance.',
  },
  {
    image: '/wise-lead.jpg',
    name: 'Sampurna',
    role: 'Wise Fuel & MySoil Lead',
    whatTheyOwn: 'Leading Wise Fuel & MySoil domain initiatives and sustainability projects.',
  },
  {
    image: '/workshops-lead.jpg',
    name: 'Pavan',
    role: 'Workshops & Bootcamps Lead',
    whatTheyOwn: 'Organizing technical workshops, hands-on bootcamps, and skill sessions.',
  },
  {
    image: '/marketing-leads.jpg',
    name: 'Aurodruthi & Homamrutha',
    role: 'Marketing Leads',
    whatTheyOwn: 'Driving brand awareness, social media campaigns, and marketing strategies.',
  },
  {
    image: '/content-lead.jpg',
    name: 'Chaitraya',
    role: 'Content Writing Lead',
    whatTheyOwn: 'Crafting compelling newsletter content, event copy, and brand editorial.',
  },
  {
    image: '/event-management-leads.jpg',
    name: 'Vishal & Sanjith',
    role: 'Event Management Leads',
    whatTheyOwn: 'Executing seamless event logistics, venue setup, and stage management.',
  },
  {
    image: '/design-lead.jpg',
    name: 'Charan',
    role: 'Creative Design Lead',
    whatTheyOwn: 'Designing visual identity, posters, creative assets, and UI design systems.',
  },
  {
    image: '/sponsorship-lead.jpg',
    name: 'Satwik',
    role: 'Sponsorship Lead',
    whatTheyOwn: 'Securing corporate sponsorships, sponsor relations, and funding partnerships.',
  },
];

export function CnippetTeamMarquee() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0B0E14] min-h-[90vh] md:min-h-screen flex flex-col justify-between py-5 md:py-7 text-[#F5F3EE]">
      {/* Background Group Photo with Low Transparency showing standing and sitting members */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <img
          src="/club-gp.jpg"
          alt="E-Club Full Team Background"
          className="w-full h-full object-cover object-[center_48%] filter brightness-110 contrast-105"
        />
        {/* Balanced tint overlay keeping group photo members clearly visible */}
        <div className="absolute inset-0 bg-[#0B0E14]/35" />
        {/* Soft edge blending gradients for smooth transition between sections */}
        <div className="absolute top-0 inset-x-0 h-16 md:h-20 bg-gradient-to-b from-[#0B0E14] via-[#0B0E14]/70 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-16 md:h-20 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/80 to-transparent" />
      </div>

      {/* Background Decorative SVG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <svg
          className="absolute right-0 bottom-0 text-[#E8A33D]/10"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_494_1104)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="clip0_494_1104">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Top Header Container */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 mb-1">
        <div className="backdrop-blur-[2px] rounded-2xl py-1 text-center">
          <SectionHeading
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-star"
              >
                <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
                <path d="M8 15H7a4 4 0 0 0-4 4v2" />
                <circle cx="10" cy="7" r="4" />
              </svg>
            }
            eyebrow="THE PEOPLE BEHIND E-CLUB"
            title={
              <>
                Meet the <span className="text-[#E8A33D]">Core Leadership</span>
              </>
            }
            subtitle="The driving force powering innovation, hands-on workshops, venture creation, and student leadership."
          />
        </div>
      </div>

      {/* Middle Open Stage: standing & sitting members are positioned here in clear view */}
      <div className="relative z-10 flex-1 min-h-[90px] pointer-events-none" />

      {/* Bottom Dock: FULL-WIDTH Marquee Track with Highlighting Runway Frame */}
      <div className="relative z-10 w-full overflow-hidden mt-auto py-2 bg-[#0B0E14]/45 backdrop-blur-[3px] border-y border-[#E8A33D]/20 no-scrollbar">
        {/* Edge Fade Gradients */}
        <div className="pointer-events-none absolute top-0 left-0 z-30 h-full w-20 md:w-36 bg-gradient-to-r from-[#0B0E14] to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-30 h-full w-20 md:w-36 bg-gradient-to-l from-[#0B0E14] to-transparent" />

        <Marquee className="[--gap:1.25rem] md:[--gap:1.5rem]" pauseOnHover>
          {teamMembers.map((member) => (
            <div
              className="group/card flex w-44 md:w-52 shrink-0 flex-col transition-transform duration-300 ease-out hover:-translate-y-2 [transform:translateZ(0)]"
              key={member.name}
            >
              <div className="relative h-[200px] md:h-[220px] w-full overflow-hidden rounded-2xl bg-[#121622]/85 backdrop-blur-md border-2 border-[#E8A33D]/30 shadow-[0_8px_24px_rgba(0,0,0,0.85),0_0_16px_rgba(232,163,61,0.15)] group-hover/card:border-[#E8A33D] group-hover/card:shadow-[0_14px_32px_rgba(0,0,0,0.95),0_0_24px_rgba(232,163,61,0.35)] transition-all duration-300">
                {/* Glowing Top Amber Highlight Accent Line */}
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#E8A33D] to-transparent opacity-80 group-hover/card:opacity-100 transition-opacity z-20" />

                {/* Team member photo with smooth grayscale-to-color transition */}
                <img
                  alt={member.name}
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover/card:grayscale-0 group-hover/card:scale-105"
                  src={member.image}
                  loading="lazy"
                  decoding="async"
                  width="208"
                  height="220"
                />
                
                {/* Dark Gradient Overlay at Bottom Section */}
                <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/90 to-transparent p-2.5 md:p-3 flex flex-col justify-end pointer-events-none rounded-b-2xl z-10">
                  <h3 className="font-bold text-white text-xs md:text-sm leading-tight truncate">
                    {member.name}
                  </h3>
                  <p className="text-[10px] md:text-[11px] text-[#E8A33D] font-mono font-medium mt-0.5 truncate">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
