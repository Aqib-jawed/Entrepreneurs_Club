export interface Achievement {
  id: string;
  number: number;
  prefix?: string;
  suffix?: string;
  title: string;
  description: string;
  tag: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "sih-2024",
    number: 2500,
    suffix: "+",
    title: "SIH 2024 Leadership",
    description: "350+ teams & 2,500+ participants coordinated seamlessly across national innovation rounds.",
    tag: "National Hackathon"
  },
  {
    id: "funding-raised",
    number: 12,
    prefix: "$",
    suffix: "M+",
    title: "Venture Funding Raised",
    description: "Total capital secured by club-incubated student startups from top-tier VCs & angels.",
    tag: "Capital Access"
  },
  {
    id: "startups-incubated",
    number: 85,
    suffix: "+",
    title: "Ventures Launched",
    description: "High-growth startups founded, incubated, and scaled by active club members.",
    tag: "Incubation"
  },
  {
    id: "mentorship-hours",
    number: 4500,
    suffix: "+",
    title: "Executive Mentorship",
    description: "1-on-1 advisory hours delivered by unicorn founders and industry executives.",
    tag: "Mentorship"
  },
  {
    id: "global-chapters",
    number: 14,
    suffix: " Hubs",
    title: "Global Campus Reach",
    description: "Active partner chapters established across leading tech and business universities.",
    tag: "Expansion"
  },
  {
    id: "ip-patents",
    number: 32,
    suffix: " Granted",
    title: "Patents & IP Filed",
    description: "Intellectual property & technology patents registered by member research teams.",
    tag: "Innovation"
  }
];
