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
    name: "Devemanya",
    role: "President",
    photo: "/team/president.jpg",
    whatTheyOwn: "Sets overall club vision, leads university administration relations, and directs executive strategy.",
    linkedin: "https://linkedin.com"
  },
  // TODO: replace placeholder name/role/photo/linkedin
  {
    id: "vice-president",
    name: "Samantha Chen",
    role: "Vice President",
    photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23141821'/><circle cx='150' cy='150' r='120' fill='%231f2430' stroke='%23ffffff' stroke-width='2'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-size='72' font-weight='bold'>SC</text></svg>",
    whatTheyOwn: "Manages cross-domain execution, internal club governance, and strategic venture partnerships.",
    linkedin: "https://linkedin.com"
  },
  // TODO: replace placeholder name/role/photo/linkedin
  {
    id: "operations-lead",
    name: "Marcus Vance",
    role: "Operations Lead",
    photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23141821'/><circle cx='150' cy='150' r='120' fill='%231f2430' stroke='%23ffffff' stroke-width='2'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-size='72' font-weight='bold'>MV</text></svg>",
    whatTheyOwn: "Oversees club budget allocation, event logistics systems, and member database operations.",
    linkedin: "https://linkedin.com"
  },
  // TODO: replace placeholder name/role/photo/linkedin
  {
    id: "events-lead",
    name: "Elena Rostova",
    role: "Events Lead",
    photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23141821'/><circle cx='150' cy='150' r='120' fill='%231f2430' stroke='%23ffffff' stroke-width='2'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-size='72' font-weight='bold'>ER</text></svg>",
    whatTheyOwn: "Directs national hackathon productions, demo day showcases, and founder retreat experiences.",
    linkedin: "https://linkedin.com"
  }
];
