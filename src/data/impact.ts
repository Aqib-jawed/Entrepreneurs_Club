export type ImpactMilestone = {
  id: string;
  year: string;
  month?: string;
  title: string;
  description: string;
  metric?: {
    value: string;
    label: string;
  };
};

// TODO: Replace every placeholder below with verified E-Club dates, stories, and outcomes.
export const impactMilestones: ImpactMilestone[] = [
  // TODO: Replace with the verified founding year and story.
  {
    id: "founding",
    year: "20XX",
    month: "TBD",
    title: "The first spark",
    description: "[TODO: Add the verified founding story and what inspired the club.]",
  },
  // TODO: Replace with the first verified flagship event and its outcome.
  {
    id: "first-flagship",
    year: "20XX",
    title: "Our first flagship event",
    description: "[TODO: Name the first flagship event and describe its verified impact.]",
  },
  // TODO: Replace with the date and details of the first verified bootcamp.
  {
    id: "first-bootcamp",
    year: "20XX",
    month: "TBD",
    title: "Learning by building",
    description: "[TODO: Add details about the first entrepreneurship or startup bootcamp.]",
  },
  // TODO: Replace the example scale and event details with verified numbers.
  {
    id: "hackathon",
    year: "20XX",
    title: "A bigger challenge",
    description: "[TODO: Replace with verified details from a large hackathon or SIH-style event.]",
    metric: { value: "[TODO: 350+]", label: "teams participating" },
  },
  // TODO: Replace the example membership count and domains with verified data.
  {
    id: "community-growth",
    year: "20XX",
    month: "TBD",
    title: "A community takes shape",
    description: "[TODO: Add verified member growth and the domains or programs created.]",
    metric: { value: "[TODO: N]", label: "members across domains" },
  },
  // TODO: Replace with one verified student, venture, or partnership outcome.
  {
    id: "new-ideas",
    year: "20XX",
    title: "More ideas in motion",
    description: "[TODO: Add one verified outcome, venture, partnership, or student success.]",
  },
  // TODO: Replace with E-Club's verified current status and next milestone.
  {
    id: "today",
    year: "TODAY",
    title: "And we’re just getting started",
    description: "[TODO: Replace with E-Club’s current status and the next milestone ahead.]",
  },
];
