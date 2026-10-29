export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  focus?: string;
};

// Ordered as supplied by the E-Club team.
export const teamMembers: TeamMember[] = [
  { id: "team-01", name: "Devemanaya", role: "President", image: "/team/team-01.webp", focus: "43% 45%" },
  { id: "team-02", name: "Bhavya", role: "VP Backend", image: "/team/team-02.webp", focus: "50% 34%" },
  { id: "team-03", name: "Ritisha", role: "VP Frontend", image: "/team/team-03.webp", focus: "52% 35%" },
  { id: "team-04", name: "Kavya", role: "Secretary", image: "/team/team-04.webp", focus: "82% 38%" },
  { id: "team-05", name: "Sampurna", role: "WFM Lead", image: "/team/team-05.webp", focus: "51% 39%" },
  { id: "team-06", name: "Pavan", role: "Workshop Lead", image: "/team/team-06.webp", focus: "50% 36%" },
  { id: "team-07", name: "Chaitraya", role: "Content Writing Lead", image: "/team/team-07.webp", focus: "50% 38%" },
  { id: "team-08", name: "Charan", role: "Creative Design Lead", image: "/team/team-08.webp", focus: "50% 35%" },
  { id: "team-09", name: "Vishal & Sanjith", role: "EM Lead", image: "/team/team-09.webp", focus: "50% 35%" },
  { id: "team-10", name: "Aurodruthi & Homamrutha", role: "Marketing Lead", image: "/team/team-10.webp", focus: "33% 38%" },
];

// TODO: Replace with an approved team endorsement and verified attribution.
export const teamEndorsement = {
  quote: "[TODO: Add an approved team endorsement quote.]",
  attribution: "[TODO: Confirm the speaker's name and role.]",
};
