export interface DomainLead {
  name: string;
  photo: string;
  role?: string;
}

export interface Domain {
  id: string;
  name: string;
  icon: string;
  colorTheme: string;
  tagline: string;
  description: string;
  lead: DomainLead;
  memberCount: number;
  exampleOutputs: string[];
}

export const DOMAINS: Domain[] = [
  // --- 4 REAL DOMAINS ---
  {
    id: "technical",
    name: "Technical",
    icon: "💻",
    colorTheme: "#10b981",
    tagline: "Building core software, AI platforms, and technical infrastructure for high-growth ventures.",
    description: "The Technical domain is the engineering powerhouse of Entrepreneurs Club. Members build production web apps, AI prototypes, and scalable developer tools.",
    lead: { name: "Devemanya", photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231f2430'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%2310b981' font-size='28' font-weight='bold'>DV</text></svg>", role: "Technical Director" },
    memberCount: 42,
    exampleOutputs: ["Full-Stack SaaS Boilerplates", "AI Agent Frameworks", "University Event Systems"]
  },
  {
    id: "fuel-mysoil",
    name: "Fuel & MySoil",
    icon: "🌱",
    colorTheme: "#3b82f6",
    tagline: "Pioneering climate tech, sustainable agtech, and clean energy hardware solutions.",
    description: "Fuel & MySoil focuses on hardtech innovation in agriculture, soil telemetry, and renewable energy storage.",
    lead: { name: "Aarav Sharma", photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231f2430'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%233b82f6' font-size='28' font-weight='bold'>AS</text></svg>", role: "Agritech Director" },
    memberCount: 28,
    exampleOutputs: ["IoT Soil Moisture Sensors", "Biofuel Carbon Accounting", "Solar Tracking Arrays"]
  },
  {
    id: "chai-chats",
    name: "Chai Chats",
    icon: "☕",
    colorTheme: "#f59e0b",
    tagline: "Fostering unscripted founder firesides, investor networking, and community dialogue.",
    description: "Chai Chats brings together founders, VCs, and student builders over tea for candid startup stories.",
    lead: { name: "Priya Patel", photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231f2430'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%23f59e0b' font-size='28' font-weight='bold'>PP</text></svg>", role: "Community Host" },
    memberCount: 35,
    exampleOutputs: ["Weekly Fireside Keynotes", "VC Pitch Practice Rooms", "Founder Breakfast Sessions"]
  },
  {
    id: "event-management",
    name: "Event Management",
    icon: "🎯",
    colorTheme: "#ec4899",
    tagline: "Executing flagship hackathons, demo days, and national founder summits.",
    description: "The Event Management domain plans, produces, and executes large-scale entrepreneurial gatherings.",
    lead: { name: "Elena Rostova", photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231f2430'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%23ec4899' font-size='28' font-weight='bold'>ER</text></svg>", role: "Events Director" },
    memberCount: 50,
    exampleOutputs: ["Annual Hackathon 2026", "Investor Demo Day Showcase", "Regional Startup Summit"]
  },

  // --- 8 PLACEHOLDER DOMAINS ---
  // TODO: replace placeholder domain name/content
  {
    id: "marketing",
    name: "Marketing",
    icon: "📢",
    colorTheme: "#8b5cf6",
    tagline: "Growth hacking, brand storytelling, and viral campaign strategies for startups.",
    description: "Drives user acquisition, brand positioning, and go-to-market execution for club startups.",
    lead: { name: "Placeholder Lead", photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231f2430'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%238b5cf6' font-size='28' font-weight='bold'>MK</text></svg>", role: "Marketing Lead" },
    memberCount: 20,
    exampleOutputs: ["Social Growth Frameworks", "GTM Launch Blueprints", "Product Hunt Campaigns"]
  },
  // TODO: replace placeholder domain name/content
  {
    id: "finance",
    name: "Finance",
    icon: "📈",
    colorTheme: "#06b6d4",
    tagline: "Venture capital research, startup valuation, and treasury management.",
    description: "Focuses on financial modeling, angel investment syndication, and grant applications.",
    lead: { name: "Placeholder Lead", photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231f2430'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%2306b6d4' font-size='28' font-weight='bold'>FN</text></svg>", role: "Finance Lead" },
    memberCount: 18,
    exampleOutputs: ["Startup Financial Models", "VC Pitch Decks", "Grant Application Vault"]
  },
  // TODO: replace placeholder domain name/content
  {
    id: "design",
    name: "Design",
    icon: "🎨",
    colorTheme: "#f43f5e",
    tagline: "UI/UX systems, brand identity design, and product design prototyping.",
    description: "Crafts premium visual assets, design tokens, and user experience flows for club initiatives.",
    lead: { name: "Placeholder Lead", photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231f2430'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%23f43f5e' font-size='28' font-weight='bold'>DS</text></svg>", role: "Design Lead" },
    memberCount: 25,
    exampleOutputs: ["Figma Design Systems", "Brand Style Guides", "3D Product Renderings"]
  },
  // TODO: replace placeholder domain name/content
  {
    id: "content",
    name: "Content",
    icon: "✍️",
    colorTheme: "#eab308",
    tagline: "Copywriting, founder newsletters, podcasts, and media publishing.",
    description: "Produces deep-dive essays, founder interviews, and ecosystem updates.",
    lead: { name: "Placeholder Lead", photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231f2430'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%23eab308' font-size='28' font-weight='bold'>CT</text></svg>", role: "Content Lead" },
    memberCount: 16,
    exampleOutputs: ["Weekly Founder Newsletter", "Podcast Series", "Tech Case Studies"]
  },
  // TODO: replace placeholder domain name/content
  {
    id: "operations",
    name: "Operations",
    icon: "⚡",
    colorTheme: "#6366f1",
    tagline: "Internal logistics, member onboarding, and organizational infrastructure.",
    description: "Keeps the club running smoothly through workflow automation and database management.",
    lead: { name: "Placeholder Lead", photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231f2430'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%236366f1' font-size='28' font-weight='bold'>OP</text></svg>", role: "Operations Lead" },
    memberCount: 22,
    exampleOutputs: ["Member Onboarding Portal", "Resource Allocation Hub", "Logistics Playbooks"]
  },
  // TODO: replace placeholder domain name/content
  {
    id: "outreach",
    name: "Outreach",
    icon: "🤝",
    colorTheme: "#14b8a6",
    tagline: "Corporate sponsorships, university partnerships, and ecosystem relations.",
    description: "Connects club startups with external mentors, corporate sponsors, and accelerator programs.",
    lead: { name: "Placeholder Lead", photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231f2430'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%2314b8a6' font-size='28' font-weight='bold'>OT</text></svg>", role: "Outreach Lead" },
    memberCount: 19,
    exampleOutputs: ["Sponsorship Pitch Packs", "Mentor Network Directory", "University MoUs"]
  },
  // TODO: replace placeholder domain name/content
  {
    id: "research",
    name: "Research",
    icon: "🔬",
    colorTheme: "#a855f7",
    tagline: "Deep tech analysis, market trends research, and patent intelligence.",
    description: "Analyzes emerging technology sectors and publishes market maps for aspiring founders.",
    lead: { name: "Placeholder Lead", photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231f2430'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%23a855f7' font-size='28' font-weight='bold'>RS</text></svg>", role: "Research Lead" },
    memberCount: 15,
    exampleOutputs: ["AI Sector Market Map", "DeepTech Patent Audits", "Industry Landscape Reports"]
  },
  // TODO: replace placeholder domain name/content
  {
    id: "media",
    name: "Media",
    icon: "🎬",
    colorTheme: "#ef4444",
    tagline: "Video production, event photography, and creative documentary filmmaking.",
    description: "Captures the story of student entrepreneurs through high-quality video and photo coverage.",
    lead: { name: "Placeholder Lead", photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231f2430'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%23ef4444' font-size='28' font-weight='bold'>MD</text></svg>", role: "Media Lead" },
    memberCount: 17,
    exampleOutputs: ["Hackathon Recap Videos", "Founder Spotlight Documentaries", "Event Photo Archives"]
  }
];
