export interface DomainLead {
  name: string;
  photo: string;
  role?: string;
}

export interface Domain {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  video?: string;
  lead: DomainLead;
  memberCount: number;
  exampleOutputs: string[];
  mission: string;
  vision: string;
  lookingFor: string[];
  eventPhotos: string[];
}

export type DomainItem = Domain;

export const DOMAINS: Domain[] = [
  // ==========================================
  // REAL DOMAIN 1: Technical
  // ==========================================
  {
    id: "technical",
    name: "Technical",
    tagline: "Building core software, AI platforms, and technical infrastructure for high-growth ventures.",
    description: "The Technical domain is the engineering powerhouse of Entrepreneurs Club. Members build full-stack production web apps, autonomous AI agents, developer tooling, and custom digital infrastructure for collegiate startups and national hackathons.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
    lead: {
      name: "Devemanya",
      photo: "/president.jpg",
      role: "Technical Director",
    },
    memberCount: 42,
    exampleOutputs: [
      "Club Central Portal & Event Engine",
      "Autonomous Agentic Copilot for Hackathons",
      "Full-stack Scalable SaaS Starter Kits",
      "Automated Member Onboarding & Verification Bot",
    ],
    // TODO: replace placeholder domain name/content
    mission: "Empower student engineers to transition from academic coding to shipping production software used by real founders and consumers.",
    // TODO: replace placeholder domain name/content
    vision: "Become the premier student engineering incubator producing industry-defining open source solutions and venture-backed tech products.",
    // TODO: replace placeholder domain name/content
    lookingFor: [
      "Full-Stack React & Next.js Developers",
      "Python / AI Agent Architects",
      "DevOps & Cloud Infrastructure Specialists",
      "UI/UX Systems Implementers",
    ],
    eventPhotos: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==========================================
  // REAL DOMAIN 2: Fuel & MySoil
  // ==========================================
  {
    id: "fuel-mysoil",
    name: "Fuel & MySoil",
    tagline: "Pioneering climate tech, sustainable agtech, and renewable energy hardware solutions.",
    description: "Fuel & MySoil champions deep-tech climate solutions and regenerative agriculture. From telemetry-driven IoT soil probes to bio-waste fuel conversion prototypes, this domain bridges physical hardware innovation with ecological sustainability.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    lead: {
      name: "Sampurna",
      photo: "/wise-lead.jpg",
      role: "Wise Fuel & MySoil Lead",
    },
    memberCount: 28,
    exampleOutputs: [
      "Low-Cost IoT Soil Chemistry Probes",
      "Bio-Pellet Biomass Conversion Feasibility Report",
      "Farmer Micro-Grant Irrigation Telemetry Pilot",
      "Carbon Footprint Measurement Dashboard",
    ],
    // TODO: replace placeholder domain name/content
    mission: "Deploy sustainable technologies directly to local farmers and renewable ventures to tackle pressing climate and resource bottlenecks.",
    // TODO: replace placeholder domain name/content
    vision: "Pioneer circular sustainability ecosystems where agri-waste is transformed into clean power and nutrient-dense soils.",
    // TODO: replace placeholder domain name/content
    lookingFor: [
      "Embedded Systems & IoT Hardware Engineers",
      "Environmental Science & Agronomy Researchers",
      "Hardware Rapid Prototypers (CAD / 3D Print)",
      "Field Deployment Volunteers",
    ],
    eventPhotos: [
      "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==========================================
  // REAL DOMAIN 3: Chai Chats
  // ==========================================
  {
    id: "chai-chats",
    name: "Chai Chats",
    tagline: "Fostering unscripted founder firesides, investor networking, and community dialogue.",
    description: "Chai Chats is the social heart and storytelling engine of E-Club. We break through corporate stiffness with intimate, informal chai sessions where seasoned unicorn founders, angel investors, and bold student operators share vulnerable truths and unfiltered advice.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    lead: {
      name: "Priya Patel",
      photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23141822'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%23E8A33D' font-size='28' font-weight='bold'>PP</text></svg>",
      // TODO: replace placeholder domain name/content
      role: "Community & Fireside Lead",
    },
    memberCount: 35,
    exampleOutputs: [
      "Bi-Weekly Fireside Chai Nights",
      "Behind-the-Scenes Founder Podcasts",
      "Closed-Door Investor AMA Rooms",
      "Peer Pitch Roundtables & Feedback Circles",
    ],
    // TODO: replace placeholder domain name/content
    mission: "Demystify venture creation by creating accessible, warm, and honest spaces where curious minds connect with experienced company builders.",
    // TODO: replace placeholder domain name/content
    vision: "Cultivate an enduring alumni and founder network where any student builder is one cup of chai away from their next co-founder or backer.",
    // TODO: replace placeholder domain name/content
    lookingFor: [
      "Podcast Hosts & Interviewers",
      "Guest Curator & Speaker Liaison",
      "Community Experience Coordinators",
      "Storytellers & Audio Editors",
    ],
    eventPhotos: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==========================================
  // REAL DOMAIN 4: Event Management
  // ==========================================
  {
    id: "event-management",
    name: "Event Management",
    tagline: "Executing flagship hackathons, demo days, and national founder summits.",
    description: "The Event Management domain orchestrates high-stakes, world-class experiences. From booking auditoriums and managing AV stages to running smooth check-ins for 1,000+ attendees, this team transforms ambitious visions into flawlessly executed events.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    lead: {
      name: "Vishal & Sanjith",
      photo: "/event-management-leads.jpg",
      role: "Event Management Leads",
    },
    memberCount: 50,
    exampleOutputs: [
      "Flagship 36-Hour Hackathon 2026",
      "Annual Demo Day & Venture Showcase",
      "E-Club Induction & Mega Orientation",
      "Founder Retreat & Team Bonding Weekend",
    ],
    // TODO: replace placeholder domain name/content
    mission: "Deliver breathtaking, frictionless, and memorable event experiences that inspire entrepreneurial action across campus.",
    // TODO: replace placeholder domain name/content
    vision: "Establish the benchmark for university innovation summits across the country through precision logistics and hospitality.",
    // TODO: replace placeholder domain name/content
    lookingFor: [
      "Stage Managers & AV Technical Operators",
      "Hospitality & Guest Flow Managers",
      "Sponsorship On-Ground Liaisons",
      "Operational Logistics Planners",
    ],
    eventPhotos: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==========================================
  // REAL DOMAIN 5: Bootcamps
  // ==========================================
  {
    id: "bootcamps",
    name: "Bootcamps",
    tagline: "Fast-track cohorts turning ambitious novices into capable startup builders.",
    description: "Bootcamps runs immersive, sprint-style curriculums spanning 2 to 6 weeks. Students build actual MVPs, validate problem-solution fit, conduct user interviews, and pitch to active investors with intense mentorship and peer accountability.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    lead: {
      name: "Pavan",
      photo: "/workshops-lead.jpg",
      role: "Workshops & Bootcamps Lead",
    },
    memberCount: 38,
    exampleOutputs: [
      "0-to-1 Startup Builder Sprint (4-Week Cohort)",
      "Zero-Code Rapid MVP Prototyping Workshop",
      "Product-Market Fit Diagnostic Playbook",
      "Demo Day Cohort Pitch Portfolio",
    ],
    // TODO: replace placeholder domain name/content
    mission: "Accelerate the learning curve of early-stage builders through hands-on, high-intensity project-based cohort curriculums.",
    // TODO: replace placeholder domain name/content
    vision: "Equip 500+ students each semester with the practical skills, resilience, and execution speed required to launch successful ventures.",
    // TODO: replace placeholder domain name/content
    lookingFor: [
      "Cohort Mentors & Teaching Assistants",
      "Curriculum Designers & Workshop Facilitators",
      "Venture Evaluation Specialists",
      "Student Success & Accountability Leads",
    ],
    eventPhotos: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==========================================
  // REAL DOMAIN 6: VPL
  // ==========================================
  {
    id: "vpl",
    name: "VPL",
    tagline: "Venture Pitch League: Competitive mock funding and live investment challenges.",
    description: "VPL (Venture Pitch League) simulates the intensity of real Silicon Valley venture pitching. Teams participate in bracketed tournaments, dynamic valuation rounds, term-sheet negotiations, and live shark-tank challenges judged by real angel investors.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    video: "https://cdn.21st.dev/assets/mirror/c7/c72edad406566d06615b8c711782465a1974f0f3b0b439b7347edc3974a9e215.mp4",
    lead: {
      name: "Marcus Vance",
      photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23141822'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' fill='%23E8A33D' font-size='28' font-weight='bold'>VP</text></svg>",
      // TODO: replace placeholder domain name/content
      role: "VPL League Commissioner",
    },
    memberCount: 32,
    exampleOutputs: [
      "Annual Inter-College Pitch Championship",
      "VPL Fantasy Startup Valuation League",
      "Simulated Cap Table & Due Diligence Matrix",
      "Venture Prize Pool Grants Distribution",
    ],
    // TODO: replace placeholder domain name/content
    mission: "Sharpen founders' pitch instincts, financial literacy, and investor acumen through competitive, gamified pitch leagues.",
    // TODO: replace placeholder domain name/content
    vision: "Establish VPL as the premier collegiate startup competition in the region, bridging student founders directly to seed funding.",
    // TODO: replace placeholder domain name/content
    lookingFor: [
      "Tournament Coordinators & Bracket Managers",
      "Financial Analysts & Mock Cap Table Modeler",
      "Angel & VC Liaison Officers",
      "Pitch Deck Coaches",
    ],
    eventPhotos: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==========================================
  // PLACEHOLDER DOMAIN 7: Marketing
  // ==========================================
  // TODO: replace placeholder domain name/content
  {
    id: "marketing",
    name: "Marketing",
    tagline: "Growth hacking, brand storytelling, and viral campaign strategies for startups.",
    description: "The Marketing domain drives user acquisition, brand positioning, and go-to-market execution for club startups and flagship initiatives through data-backed viral loops.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    lead: {
      name: "Aurodruthi & Homamrutha",
      photo: "/marketing-leads.jpg",
      role: "Marketing Leads",
    },
    memberCount: 26,
    exampleOutputs: [
      "Social Growth Blueprints & TikTok Funnels",
      "Go-To-Market Launch Playbook",
      "Product Hunt Campaign Optimization",
      "Viral Campus Guerilla Activations",
    ],
    // TODO: replace placeholder domain name/content
    mission: "Turn student ideas into household campus names through high-impact viral campaigns and organic community buzz.",
    // TODO: replace placeholder domain name/content
    vision: "Be recognized as the sharpest growth and product marketing laboratory on campus.",
    // TODO: replace placeholder domain name/content
    lookingFor: [
      "Short-Form Video Creators & Reels Specialists",
      "Data & Growth Analytics Experimenters",
      "Campus Brand Ambassadors",
      "Social Media Strategists",
    ],
    eventPhotos: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==========================================
  // PLACEHOLDER DOMAIN 8: Finance
  // ==========================================
  // TODO: replace placeholder domain name/content
  {
    id: "finance",
    name: "Finance",
    tagline: "Venture capital research, startup valuation, and treasury management.",
    description: "The Finance domain focuses on venture economics, unit cost auditing, angel syndicate modeling, and grant application structuring for collegiate entrepreneurs.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    lead: {
      name: "Satwik",
      photo: "/sponsorship-lead.jpg",
      role: "Sponsorship & Finance Lead",
    },
    memberCount: 20,
    exampleOutputs: [
      "Standard Startup DCF & Multiple Valuation Model",
      "Quarterly Angel Investment Syndicate Memo",
      "Grant Application Repository & Grant Tracking",
      "Club Budget Allocation & Treasury Audit",
    ],
    // TODO: replace placeholder domain name/content
    mission: "Democratize financial literacy and venture mathematics for founders navigating early funding rounds.",
    // TODO: replace placeholder domain name/content
    vision: "Establish an active student-run angel micro-fund supporting collegiate innovations.",
    // TODO: replace placeholder domain name/content
    lookingFor: [
      "Financial Modeling Enthusiasts",
      "Venture Capital Deal-Flow Scouts",
      "Grant Writing Specialists",
      "Accounting & Budget Analysts",
    ],
    eventPhotos: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==========================================
  // PLACEHOLDER DOMAIN 9: Design
  // ==========================================
  // TODO: replace placeholder domain name/content
  {
    id: "design",
    name: "Design",
    tagline: "UI/UX systems, brand identity design, and product design prototyping.",
    description: "The Design domain crafts visual identities, design tokens, micro-interactions, and 3D product visuals. We ensure every club venture looks and feels like a top-tier digital product.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    lead: {
      name: "Charan",
      photo: "/design-lead.jpg",
      role: "Creative Design Lead",
    },
    memberCount: 24,
    exampleOutputs: [
      "Universal Club Design System & UI Kit",
      "Flagship Hackathon Brand & Poster Suite",
      "3D Product Visualizations & Motion Reels",
      "Interactive Prototyping Workshop Materials",
    ],
    // TODO: replace placeholder domain name/content
    mission: "Elevate collegiate software through world-class craft, spatial design, and typography discipline.",
    // TODO: replace placeholder domain name/content
    vision: "Form a respected student design studio producing world-class brand identities and interfaces.",
    // TODO: replace placeholder domain name/content
    lookingFor: [
      "Figma & UI/UX Systems Designers",
      "Motion & 3D Artists (Blender / Spline)",
      "Brand Identity & Typography Aficionados",
      "Interaction Designers",
    ],
    eventPhotos: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576153192396-180ecef2a715?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==========================================
  // PLACEHOLDER DOMAIN 10: Content
  // ==========================================
  // TODO: replace placeholder domain name/content
  {
    id: "content",
    name: "Content",
    tagline: "Copywriting, founder newsletters, podcasts, and media publishing.",
    description: "The Content domain produces insightful essays, founder breakdown threads, editorial newsletters, and promotional scripts that give E-Club its articulate and authoritative voice.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    lead: {
      name: "Chaitraya",
      photo: "/content-lead.jpg",
      role: "Content Writing Lead",
    },
    memberCount: 18,
    exampleOutputs: [
      "Weekly 'The Founder's Memo' Newsletter",
      "Deep-Dive Technical Case Studies",
      "High-Conversion Keynote & Pitch Scripts",
      "Campus Venture Editorial Columns",
    ],
    // TODO: replace placeholder domain name/content
    mission: "Capture and translate complex startup ideas into clear, engaging, and memorable prose.",
    // TODO: replace placeholder domain name/content
    vision: "Build the most respected student-led entrepreneurial publication in higher education.",
    // TODO: replace placeholder domain name/content
    lookingFor: [
      "Long-Form Technical Writers",
      "Newsletter Curators & Ghostwriters",
      "SEO & Editorial Strategists",
      "Copywriters for Landing Pages",
    ],
    eventPhotos: [
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==========================================
  // PLACEHOLDER DOMAIN 11: Outreach
  // ==========================================
  // TODO: replace placeholder domain name/content
  {
    id: "outreach",
    name: "Outreach",
    tagline: "Corporate sponsorships, university partnerships, and ecosystem relations.",
    description: "The Outreach domain establishes and sustains strategic bridges with venture capital firms, corporate tech sponsors, government startup incubators, and peer collegiate clubs.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    lead: {
      name: "Kavya",
      photo: "/secretary.png",
      role: "Secretary & Strategic Outreach Lead",
    },
    memberCount: 22,
    exampleOutputs: [
      "Corporate Sponsor Pitch Deck & Tier Matrix",
      "University Cross-Campus Collaboration MoUs",
      "Mentor Network Directory of 50+ VCs",
      "Annual Innovation Gala VIP Guest List",
    ],
    // TODO: replace placeholder domain name/content
    mission: "Connect collegiate founders with external capital, industry mentors, and institutional partnerships.",
    // TODO: replace placeholder domain name/content
    vision: "Establish an interconnected ecosystem where no student startup lacks corporate sponsorship or industry access.",
    // TODO: replace placeholder domain name/content
    lookingFor: [
      "Sponsorship Pitch Closers",
      "Corporate Relations Managers",
      "Ecosystem Partnership Liaisons",
      "Networking & Alumni Representatives",
    ],
    eventPhotos: [
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==========================================
  // PLACEHOLDER DOMAIN 12: Media
  // ==========================================
  // TODO: replace placeholder domain name/content
  {
    id: "media",
    name: "Media",
    tagline: "Video production, event photography, and creative documentary filmmaking.",
    description: "The Media domain captures the cinematic essence of Entrepreneurs Club. From teaser trailers and dynamic event recaps to founder documentaries, we chronicle the journey of student innovators in high fidelity.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    lead: {
      name: "Ritisha",
      photo: "/frontend-lead.jpg",
      role: "Media & Visual Storytelling Lead",
    },
    memberCount: 20,
    exampleOutputs: [
      "36-Hour Hackathon Official Aftermovie",
      "Founder Spotlight Cinematic Series",
      "Event Photography & Real-Time Photo Stream",
      "YouTube Studio Lighting & Audio Setup",
    ],
    // TODO: replace placeholder domain name/content
    mission: "Tell stories that evoke emotion, showcase student grit, and immortalize milestone moments.",
    // TODO: replace placeholder domain name/content
    vision: "Establish an in-house student media production company capable of rivaling professional creative agencies.",
    // TODO: replace placeholder domain name/content
    lookingFor: [
      "Cinematographers & Videographers",
      "Premiere / DaVinci Resolve Video Editors",
      "Event & Portrait Photographers",
      "Sound Engineers & Lighting Technicians",
    ],
    eventPhotos: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=800&q=80",
    ],
  },
];
