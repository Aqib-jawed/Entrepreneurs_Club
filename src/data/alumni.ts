export type Alumni = {
  id: string;
  name: string;
  batch: string;
  outcome: string;
  role: string;
  quote?: string;
  image?: string;
  focus?: string;
  verified: boolean;
};

// TODO: Set to true only after at least three alumni entries are fully verified.
export const alumniVisible: boolean = false;

export const alumni: Alumni[] = [
  // TODO: Replace with an alumnus-approved name, batch, outcome, role, quote and portrait.
  { id: "alumni-01", name: "Alumni Name", batch: "Batch of 20XX", outcome: "Placeholder outcome", role: "Placeholder role", verified: false },
  // TODO: Replace with an alumnus-approved name, batch, outcome, role, quote and portrait.
  { id: "alumni-02", name: "Alumni Name", batch: "Batch of 20XX", outcome: "Placeholder outcome", role: "Placeholder role", verified: false },
  // TODO: Replace with an alumnus-approved name, batch, outcome, role, quote and portrait.
  { id: "alumni-03", name: "Alumni Name", batch: "Batch of 20XX", outcome: "Placeholder outcome", role: "Placeholder role", verified: false },
  // TODO: Replace with an alumnus-approved name, batch, outcome, role, quote and portrait.
  { id: "alumni-04", name: "Alumni Name", batch: "Batch of 20XX", outcome: "Placeholder outcome", role: "Placeholder role", verified: false },
  // TODO: Replace with an alumnus-approved name, batch, outcome, role, quote and portrait.
  { id: "alumni-05", name: "Alumni Name", batch: "Batch of 20XX", outcome: "Placeholder outcome", role: "Placeholder role", verified: false },
];

const placeholderWord = /placeholder/i;
const hasPlaceholderText = (entry: Alumni) =>
  [entry.name, entry.batch, entry.outcome, entry.role, entry.quote]
    .some((value) => value !== undefined && placeholderWord.test(value));

if (alumni.some((entry) => entry.verified && hasPlaceholderText(entry))) {
  throw new Error("An alumni entry marked verified still contains placeholder text.");
}
