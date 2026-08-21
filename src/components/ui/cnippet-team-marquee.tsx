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
    <section className="relative w-full bg-gradient-to-b from-[#1A1F2C] via-[#0E121A] to-[#000000] py-16 md:py-24 text-[#F5F3EE]">
      {/* Background Decorative SVG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute right-0 bottom-0 text-[#E8A33D]/5"
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

      {/* Header Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 mb-12">
        <SectionHeading
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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

      {/* FULL-WIDTH Marquee Track (edge-to-edge) */}
      <div className="relative w-full overflow-hidden my-4 no-scrollbar">
        {/* Prominent Edge Fade Gradients */}
        <div className="pointer-events-none absolute top-0 left-0 z-30 h-full w-32 md:w-44 bg-gradient-to-r from-[#141822] via-[#141822]/85 to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-30 h-full w-32 md:w-44 bg-gradient-to-l from-[#141822] via-[#141822]/85 to-transparent" />

        <Marquee className="[--gap:1.5rem]" pauseOnHover>
          {teamMembers.map((member) => (
            <div
              className="group/card flex w-80 shrink-0 flex-col transition-transform duration-300 ease-out hover:-translate-y-2"
              key={member.name}
            >
              <div className="relative h-[420px] w-full overflow-hidden rounded-2xl bg-[#141822] border border-[#F5F3EE]/10 shadow-xl group-hover/card:border-[#E8A33D]/40 group-hover/card:shadow-2xl group-hover/card:shadow-[#E8A33D]/15 transition-all duration-300">
                {/* Team member photo with smooth grayscale-to-color transition */}
                <img
                  alt={member.name}
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover/card:grayscale-0 group-hover/card:scale-105"
                  src={member.image}
                />
                
                {/* Dark Gradient Overlay at Bottom Section */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/85 to-transparent p-5 flex flex-col justify-end pointer-events-none rounded-b-2xl">
                  <h3 className="font-bold text-white text-lg leading-snug truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs text-white/90 font-mono font-semibold mt-1">
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
