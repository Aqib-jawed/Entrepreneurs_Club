export type FacultyMember = {
  id: string;
  name: string;
  designation: string;
  roleInClub: string;
  image?: string;
  focus?: string;
  profileUrl?: string;
};

// TODO: set to true only when real faculty details are confirmed.
export const facultyVisible: boolean = false;

export const facultyMembers: FacultyMember[] = [
  // TODO: Replace this placeholder only after the faculty member's details are confirmed.
  {
    id: "faculty-01",
    name: "Faculty Member 01",
    designation: "[TODO: Confirm official designation]",
    roleInClub: "[TODO: Confirm contribution to the club]",
    image: "/faculty/placeholder.svg",
  },
  // TODO: Replace this placeholder only after the faculty member's details are confirmed.
  {
    id: "faculty-02",
    name: "Faculty Member 02",
    designation: "[TODO: Confirm official designation]",
    roleInClub: "[TODO: Confirm contribution to the club]",
    image: "/faculty/placeholder.svg",
  },
  // TODO: Replace this placeholder only after the faculty member's details are confirmed.
  {
    id: "faculty-03",
    name: "Faculty Member 03",
    designation: "[TODO: Confirm official designation]",
    roleInClub: "[TODO: Confirm contribution to the club]",
    image: "/faculty/placeholder.svg",
  },
  // TODO: Replace this placeholder only after the faculty member's details are confirmed.
  {
    id: "faculty-04",
    name: "Faculty Member 04",
    designation: "[TODO: Confirm official designation]",
    roleInClub: "[TODO: Confirm contribution to the club]",
    image: "/faculty/placeholder.svg",
  },
  // TODO: Replace this placeholder only after the faculty member's details are confirmed.
  {
    id: "faculty-05",
    name: "Faculty Member 05",
    designation: "[TODO: Confirm official designation]",
    roleInClub: "[TODO: Confirm contribution to the club]",
    image: "/faculty/placeholder.svg",
  },
];
