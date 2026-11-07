export type FacultyMember = {
  id: string;
  name: string;
  designation: string;
  roleInClub: string;
  image?: string;
  focus?: string;
  profileUrl?: string;
};

export const facultyVisible = true;

export const facultyMembers: FacultyMember[] = [
  {
    id: "vikas-kumar-srivastav",
    name: "Vikas Kumar Srivastav",
    designation: "Deputy Director, Venture Development Centre",
    roleInClub: "Deputy Director, Venture Development Centre",
    image: "/faculty/vikas-kumar-srivastav.webp",
    focus: "50% 25%",
    profileUrl: "https://www.linkedin.com/in/theideaenabler/",
  },
  {
    id: "sandhyarani-vandrasi",
    name: "Sandhyarani Vandrasi",
    designation: "Senior Venture Coach",
    roleInClub: "Senior Venture Coach",
    image: "/faculty/sandhyarani-vandrasi.webp",
    focus: "50% 28%",
    profileUrl: "https://www.linkedin.com/in/sandhyarani-vandrasi/",
  },
  {
    id: "monica-goud",
    name: "Monica Goud",
    designation: "Startup Ecosystem Mentor",
    roleInClub: "Startup Ecosystem Mentor",
    image: "/faculty/monica-goud.webp",
    focus: "50% 28%",
    profileUrl: "https://www.linkedin.com/in/monica-goud/",
  },
  {
    id: "deepesh-vangapulusu",
    name: "Deepesh Vangapulusu",
    designation: "Venture Coach",
    roleInClub: "Venture Coach",
    image: "/faculty/deepesh-vangapulusu.webp",
    focus: "50% 28%",
    profileUrl: "https://www.linkedin.com/in/deepeshvangapulusu/",
  },
];
