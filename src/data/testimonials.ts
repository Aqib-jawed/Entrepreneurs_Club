export type Testimonial = {
  id: string;
  name: string;
  affiliation: string;
  quote: string;
  image?: string;
  focus?: string;
  verified: boolean;
};

// TODO: Set to true only after at least three exact member stories are approved.
export const testimonialsVisible: boolean = false;

export const testimonials: Testimonial[] = [
  // TODO: Replace with a member-approved name, affiliation, exact quote, and optional portrait.
  { id: "member-01", name: "Member Name", affiliation: "Domain, Year", quote: "Placeholder: replace with the member's own words.", verified: false },
  // TODO: Replace with a member-approved name, affiliation, exact quote, and optional portrait.
  { id: "member-02", name: "Member Name", affiliation: "Domain, Year", quote: "Placeholder: replace with the member's own words.", verified: false },
  // TODO: Replace with a member-approved name, affiliation, exact quote, and optional portrait.
  { id: "member-03", name: "Member Name", affiliation: "Domain, Year", quote: "Placeholder: replace with the member's own words.", verified: false },
  // TODO: Replace with a member-approved name, affiliation, exact quote, and optional portrait.
  { id: "member-04", name: "Member Name", affiliation: "Domain, Year", quote: "Placeholder: replace with the member's own words.", verified: false },
  // TODO: Replace with a member-approved name, affiliation, exact quote, and optional portrait.
  { id: "member-05", name: "Member Name", affiliation: "Domain, Year", quote: "Placeholder: replace with the member's own words.", verified: false },
  // TODO: Replace with a member-approved name, affiliation, exact quote, and optional portrait.
  { id: "member-06", name: "Member Name", affiliation: "Domain, Year", quote: "Placeholder: replace with the member's own words.", verified: false },
];

if (testimonials.some((entry) => entry.verified && entry.quote.trimStart().startsWith("Placeholder"))) {
  throw new Error("A testimonial marked verified still has placeholder quote text.");
}
