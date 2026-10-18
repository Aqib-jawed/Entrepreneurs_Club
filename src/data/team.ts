import type { WheelCarouselItem } from '@/components/ui/wheel-carousel';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  whatTheyOwn: string;
  linkedin?: string;
}

export const CORE_TEAM: TeamMember[] = [
  {
    id: "president",
    name: "Devamanaya",
    role: "President",
    photo: "/president.jpg",
    whatTheyOwn: "Directing strategic vision, university partnerships, and overall club trajectory.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "backend-lead",
    name: "Bhavya",
    role: "Backend Lead",
    photo: "/vp-backend.jpg",
    whatTheyOwn: "Architecting server infrastructure, database models, and API integrations.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "frontend-lead",
    name: "Ritisha",
    role: "Frontend Lead",
    photo: "/frontend-lead.jpg",
    whatTheyOwn: "Building intuitive user interfaces, responsive layouts, and web experiences.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "secretary",
    name: "Kavya",
    role: "Secretary",
    photo: "/secretary.png",
    whatTheyOwn: "Managing club communications, documentation, meeting schedules, and compliance.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "wise-lead",
    name: "Sampurna",
    role: "Wise Fuel & MySoil Lead",
    photo: "/wise-lead.jpg",
    whatTheyOwn: "Leading Wise Fuel & MySoil domain initiatives and sustainability projects.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "workshops-lead",
    name: "Pavan",
    role: "Workshops & Bootcamps Lead",
    photo: "/workshops-lead.jpg",
    whatTheyOwn: "Organizing technical workshops, hands-on bootcamps, and skill sessions.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "marketing-leads",
    name: "Aurodruthi & Homamrutha",
    role: "Marketing Leads",
    photo: "/marketing-leads.jpg",
    whatTheyOwn: "Driving brand awareness, social media campaigns, and marketing strategies.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "content-lead",
    name: "Chaitraya",
    role: "Content Writing Lead",
    photo: "/content-lead.jpg",
    whatTheyOwn: "Crafting compelling newsletter content, event copy, and brand editorial.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "event-management-leads",
    name: "Vishal & Sanjith",
    role: "Event Management Leads",
    photo: "/event-management-leads.jpg",
    whatTheyOwn: "Executing seamless event logistics, venue setup, and stage management.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "design-lead",
    name: "Charan",
    role: "Creative Design Lead",
    photo: "/design-lead.jpg",
    whatTheyOwn: "Designing visual identity, posters, creative assets, and UI design systems.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "sponsorship-lead",
    name: "Satwik",
    role: "Sponsorship Lead",
    photo: "/sponsorship-lead.jpg",
    whatTheyOwn: "Securing corporate sponsorships, sponsor relations, and funding partnerships.",
    linkedin: "https://linkedin.com",
  },
];

export const LEADERSHIP_WHEEL_ITEMS: WheelCarouselItem[] = CORE_TEAM.map((member) => ({
  label: member.name,
  role: member.role,
  image: member.photo,
  imageAlt: `${member.name} - ${member.role}`,
  whatTheyOwn: member.whatTheyOwn,
}));
