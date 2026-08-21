export interface ClubEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD for sorting
  displayDate: string;
  coverImage: string;
  domain: string;
  attendance: string;
  outcome: string; // Prominent ember accent line
  gallery: string[];
  description: string;
  featured: boolean;
}

export const EVENTS: ClubEvent[] = [
  // TODO: replace placeholder event details
  {
    id: '01',
    title: 'E-Summit Innovation Pitch',
    date: '2026-03-15',
    displayDate: 'MARCH 15, 2026',
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1600&auto=format&fit=crop',
    domain: 'Venture & Strategy',
    attendance: '350+ Participants',
    outcome: '🏆 35 Startup ideas pitched, ₹2.5L in seed grants awarded.',
    gallery: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop',
    ],
    description: 'Annual flagship entrepreneurship summit featuring keynote venture capitalists, startup mentors, and high-stakes pitch battles across university chapters.',
    featured: true,
  },
  // TODO: replace placeholder event details
  {
    id: '02',
    title: 'Fuel & MySoil Hackathon',
    date: '2026-02-20',
    displayDate: 'FEBRUARY 20, 2026',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop',
    domain: 'Technical & AgriTech',
    attendance: '220 Hackers',
    outcome: '🌱 12 Prototype soil-testing IoT modules built in 24 hrs.',
    gallery: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
    ],
    description: 'Hands-on hardware and software hackathon focused on sustainable agriculture, IoT sensors, and clean energy innovation.',
    featured: true,
  },
  // TODO: replace placeholder event details
  {
    id: '03',
    title: 'Chai Chats Fireside',
    date: '2026-01-28',
    displayDate: 'JANUARY 28, 2026',
    coverImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1600&auto=format&fit=crop',
    domain: 'Chai Chats',
    attendance: '120 Attendees',
    outcome: '☕ 4 Guest founders shared raw startup failure & turnaround lessons.',
    gallery: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop',
    ],
    description: 'Casual informal networking session connecting aspiring student founders with seasoned ecosystem mentors over tea and candid stories.',
    featured: true,
  },
  // TODO: replace placeholder event details
  {
    id: '04',
    title: 'Product Design Sprint',
    date: '2025-12-10',
    displayDate: 'DECEMBER 10, 2025',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
    domain: 'Design & UI/UX',
    attendance: '180 Designers',
    outcome: '🎨 15 Complete Figma design systems launched for campus projects.',
    gallery: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
    ],
    description: 'Intensive UI/UX design sprint mastering design token systems, interactive prototyping, and brand aesthetics.',
    featured: true,
  },
  // TODO: replace placeholder event details
  {
    id: '05',
    title: 'Full-Stack Web Bootcamp',
    date: '2025-11-14',
    displayDate: 'NOVEMBER 14, 2025',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
    domain: 'Technical',
    attendance: '250 Developers',
    outcome: '⚡ 25 Production-ready web apps deployed live on Vercel.',
    gallery: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
    ],
    description: 'Practical developer workshop building production React apps, TypeScript architecture, and serverless backends.',
    featured: true,
  },
  // TODO: replace placeholder event details
  {
    id: '06',
    title: 'Marketing & Growth Summit',
    date: '2025-10-05',
    displayDate: 'OCTOBER 05, 2025',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1600&auto=format&fit=crop',
    domain: 'Marketing',
    attendance: '200 Students',
    outcome: '🚀 5 Club campaign videos generated 100K+ organic impressions.',
    gallery: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop',
    ],
    description: 'Deep dive into growth hacking, social media algorithms, content pipelines, and viral campus campaigns.',
    featured: true,
  },
  // TODO: replace placeholder event details
  {
    id: '07',
    title: 'Sponsorship Pitch Clinic',
    date: '2025-09-18',
    displayDate: 'SEPTEMBER 18, 2025',
    coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop',
    domain: 'Sponsorship',
    attendance: '90 Founders',
    outcome: '💼 ₹5L Sponsorship deals secured for campus initiatives.',
    gallery: [
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop',
    ],
    description: 'Corporate outreach training teaching students how to pitch corporate sponsors, craft sponsorship decks, and manage partner deliverables.',
    featured: false,
  },
  // TODO: replace placeholder event details
  {
    id: '08',
    title: 'Event Ops Simulation',
    date: '2025-08-22',
    displayDate: 'AUGUST 22, 2025',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop',
    domain: 'Event Management',
    attendance: '150 Organizers',
    outcome: '🎟️ Zero-delay venue management framework executed.',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop',
    ],
    description: 'Real-time simulation workshop for stage management, crowd control, audiovisual setups, and large-scale event logistics.',
    featured: false,
  },
  // TODO: replace placeholder event details
  {
    id: '09',
    title: 'Content Writing Masterclass',
    date: '2025-07-30',
    displayDate: 'JULY 30, 2025',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1600&auto=format&fit=crop',
    domain: 'Content Writing',
    attendance: '110 Writers',
    outcome: '✍️ 30 Editorial articles published across club publications.',
    gallery: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop',
    ],
    description: 'Masterclass covering persuasive copywriting, newsletter architecture, press releases, and editorial storytelling.',
    featured: false,
  },
  // TODO: replace placeholder event details
  {
    id: '10',
    title: 'Venture Demo Day',
    date: '2025-06-15',
    displayDate: 'JUNE 15, 2025',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop',
    domain: 'Venture Creation',
    attendance: '400+ Audience',
    outcome: '🚀 8 Incubated student startups pitched to angel investor panel.',
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop',
    ],
    description: 'Culmination demo day presenting 6 months of student venture incubation to venture funds, alumni founders, and media.',
    featured: false,
  },
];
