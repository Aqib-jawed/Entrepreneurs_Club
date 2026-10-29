export type DomainRecord = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  video?: string;
  description: string;
  knowMore: string;
  mission: string;
  vision: string;
  lookingFor: string[];
  confirmed: boolean;
};

const placeholderImage = "/domains/domain-placeholder.svg";

// This is the source of truth for domain names shown in the Join Form dropdown.
// TODO: Replace copy marked below with verified E-Club descriptions and recruitment details.
export const domains: DomainRecord[] = [
  // TODO: Confirm the tagline, image, description, mission, vision, and recruitment details.
  { id: "technical", name: "Technical", tagline: "[TODO: Add a verified tagline.]", image: placeholderImage, description: "[TODO: Add a verified description of the Technical domain.]", knowMore: "[TODO: Add verified details about its activities and programs.]", mission: "[TODO: Add the confirmed mission.]", vision: "[TODO: Add the confirmed vision.]", lookingFor: ["[TODO: Add confirmed skills or interests.]"], confirmed: true },
  // TODO: Confirm the tagline, image, description, mission, vision, and recruitment details.
  { id: "fuel-mysoil", name: "Fuel & MySoil", tagline: "[TODO: Add a verified tagline.]", image: placeholderImage, description: "[TODO: Add a verified description of Fuel & MySoil.]", knowMore: "[TODO: Add verified details about its activities and programs.]", mission: "[TODO: Add the confirmed mission.]", vision: "[TODO: Add the confirmed vision.]", lookingFor: ["[TODO: Add confirmed skills or interests.]"], confirmed: true },
  // TODO: Confirm the tagline, image, description, mission, vision, and recruitment details.
  { id: "chai-chats", name: "Chai Chats", tagline: "[TODO: Add a verified tagline.]", image: placeholderImage, description: "[TODO: Add a verified description of Chai Chats.]", knowMore: "[TODO: Add verified details about its activities and programs.]", mission: "[TODO: Add the confirmed mission.]", vision: "[TODO: Add the confirmed vision.]", lookingFor: ["[TODO: Add confirmed skills or interests.]"], confirmed: true },
  // TODO: Confirm the tagline, image, description, mission, vision, and recruitment details.
  { id: "event-management", name: "Event Management", tagline: "[TODO: Add a verified tagline.]", image: placeholderImage, description: "[TODO: Add a verified description of Event Management.]", knowMore: "[TODO: Add verified details about its activities and programs.]", mission: "[TODO: Add the confirmed mission.]", vision: "[TODO: Add the confirmed vision.]", lookingFor: ["[TODO: Add confirmed skills or interests.]"], confirmed: true },
  // TODO: Confirm the tagline, image, description, mission, vision, and recruitment details.
  { id: "bootcamps", name: "Bootcamps", tagline: "[TODO: Add a verified tagline.]", image: placeholderImage, description: "[TODO: Add a verified description of Bootcamps.]", knowMore: "[TODO: Add verified details about its activities and programs.]", mission: "[TODO: Add the confirmed mission.]", vision: "[TODO: Add the confirmed vision.]", lookingFor: ["[TODO: Add confirmed skills or interests.]"], confirmed: true },
  // TODO: Confirm the tagline, image, description, mission, vision, and recruitment details.
  { id: "vpl", name: "VPL", tagline: "[TODO: Add a verified tagline.]", image: placeholderImage, description: "[TODO: Add a verified description of VPL.]", knowMore: "[TODO: Add verified details about its activities and programs.]", mission: "[TODO: Add the confirmed mission.]", vision: "[TODO: Add the confirmed vision.]", lookingFor: ["[TODO: Add confirmed skills or interests.]"], confirmed: true },
  // TODO: Replace this placeholder with the confirmed seventh domain and its details.
  { id: "domain-07", name: "Domain 07 — TODO", tagline: "[TODO: Confirm tagline.]", image: placeholderImage, description: "[TODO: Confirm description.]", knowMore: "[TODO: Confirm further details.]", mission: "[TODO: Confirm mission.]", vision: "[TODO: Confirm vision.]", lookingFor: ["[TODO: Confirm who can join.]"], confirmed: false },
  // TODO: Replace this placeholder with the confirmed eighth domain and its details.
  { id: "domain-08", name: "Domain 08 — TODO", tagline: "[TODO: Confirm tagline.]", image: placeholderImage, description: "[TODO: Confirm description.]", knowMore: "[TODO: Confirm further details.]", mission: "[TODO: Confirm mission.]", vision: "[TODO: Confirm vision.]", lookingFor: ["[TODO: Confirm who can join.]"], confirmed: false },
  // TODO: Replace this placeholder with the confirmed ninth domain and its details.
  { id: "domain-09", name: "Domain 09 — TODO", tagline: "[TODO: Confirm tagline.]", image: placeholderImage, description: "[TODO: Confirm description.]", knowMore: "[TODO: Confirm further details.]", mission: "[TODO: Confirm mission.]", vision: "[TODO: Confirm vision.]", lookingFor: ["[TODO: Confirm who can join.]"], confirmed: false },
  // TODO: Replace this placeholder with the confirmed tenth domain and its details.
  { id: "domain-10", name: "Domain 10 — TODO", tagline: "[TODO: Confirm tagline.]", image: placeholderImage, description: "[TODO: Confirm description.]", knowMore: "[TODO: Confirm further details.]", mission: "[TODO: Confirm mission.]", vision: "[TODO: Confirm vision.]", lookingFor: ["[TODO: Confirm who can join.]"], confirmed: false },
  // TODO: Replace this placeholder with the confirmed eleventh domain and its details.
  { id: "domain-11", name: "Domain 11 — TODO", tagline: "[TODO: Confirm tagline.]", image: placeholderImage, description: "[TODO: Confirm description.]", knowMore: "[TODO: Confirm further details.]", mission: "[TODO: Confirm mission.]", vision: "[TODO: Confirm vision.]", lookingFor: ["[TODO: Confirm who can join.]"], confirmed: false },
  // TODO: Replace this placeholder with the confirmed twelfth domain and its details.
  { id: "domain-12", name: "Domain 12 — TODO", tagline: "[TODO: Confirm tagline.]", image: placeholderImage, description: "[TODO: Confirm description.]", knowMore: "[TODO: Confirm further details.]", mission: "[TODO: Confirm mission.]", vision: "[TODO: Confirm vision.]", lookingFor: ["[TODO: Confirm who can join.]"], confirmed: false },
];

export const joinableDomains = domains.filter((domain) => domain.confirmed);
