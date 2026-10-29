export type EventRecord = {
  id: string;
  title: string;
  /** ISO date. 2099-12-31 is the display-hidden placeholder date. */
  date: string;
  cover: string;
  domain: string;
  attendance: string;
  outcome: string;
  description: string;
  gallery: string[];
  featured: boolean;
};

export const EVENT_DATE_TODO = "2099-12-31";

// TODO: Replace every label, date, attendance figure, domain, outcome, and description with verified event information.
export const events: EventRecord[] = [
  // TODO: Confirm the event name, date, domain, attendance, and outcome for this photo.
  { id: "event-01", title: "Event 01 — title to confirm", date: EVENT_DATE_TODO, cover: "/events/IMG_0507.webp", domain: "Domain to confirm", attendance: "To be confirmed", outcome: "[TODO: Add verified outcome]", description: "[TODO: Add a short description using confirmed event details.]", gallery: ["/events/IMG_0507.webp"], featured: true },
  // TODO: Confirm the event name, date, domain, attendance, and outcome for this photo.
  { id: "event-02", title: "Event 02 — title to confirm", date: EVENT_DATE_TODO, cover: "/events/20251105_173728.webp", domain: "Domain to confirm", attendance: "To be confirmed", outcome: "[TODO: Add verified outcome]", description: "[TODO: Add a short description using confirmed event details.]", gallery: ["/events/20251105_173728.webp"], featured: true },
  // TODO: Confirm the event name, date, domain, attendance, and outcome for this photo.
  { id: "event-03", title: "Event 03 — title to confirm", date: EVENT_DATE_TODO, cover: "/events/IMG20260127181107.webp", domain: "Domain to confirm", attendance: "To be confirmed", outcome: "[TODO: Add verified outcome]", description: "[TODO: Add a short description using confirmed event details.]", gallery: ["/events/IMG20260127181107.webp"], featured: true },
  // TODO: Confirm the event name, date, domain, attendance, and outcome for this photo.
  { id: "event-04", title: "Event 04 — title to confirm", date: EVENT_DATE_TODO, cover: "/events/MG_7698.webp", domain: "Domain to confirm", attendance: "To be confirmed", outcome: "[TODO: Add verified outcome]", description: "[TODO: Add a short description using confirmed event details.]", gallery: ["/events/MG_7698.webp"], featured: true },
  // TODO: Confirm the event name, date, domain, attendance, and outcome for this photo.
  { id: "event-05", title: "Event 05 — title to confirm", date: EVENT_DATE_TODO, cover: "/events/IMG_0710.webp", domain: "Domain to confirm", attendance: "To be confirmed", outcome: "[TODO: Add verified outcome]", description: "[TODO: Add a short description using confirmed event details.]", gallery: ["/events/IMG_0710.webp"], featured: true },
  // TODO: Confirm the event name, date, domain, attendance, and outcome for this photo.
  { id: "event-06", title: "Event 06 — title to confirm", date: EVENT_DATE_TODO, cover: "/events/2W9A0685.webp", domain: "Domain to confirm", attendance: "To be confirmed", outcome: "[TODO: Add verified outcome]", description: "[TODO: Add a short description using confirmed event details.]", gallery: ["/events/2W9A0685.webp"], featured: true },
  // TODO: Replace the placeholder art and confirm all event facts.
  { id: "event-07", title: "Event 07 — details to confirm", date: EVENT_DATE_TODO, cover: "/events/event-placeholder.svg", domain: "Domain to confirm", attendance: "To be confirmed", outcome: "[TODO: Add verified outcome]", description: "[TODO: Add a short description using confirmed event details.]", gallery: ["/events/event-placeholder.svg"], featured: false },
  // TODO: Replace the placeholder art and confirm all event facts.
  { id: "event-08", title: "Event 08 — details to confirm", date: EVENT_DATE_TODO, cover: "/events/event-placeholder.svg", domain: "Domain to confirm", attendance: "To be confirmed", outcome: "[TODO: Add verified outcome]", description: "[TODO: Add a short description using confirmed event details.]", gallery: ["/events/event-placeholder.svg"], featured: false },
  // TODO: Replace the placeholder art and confirm all event facts.
  { id: "event-09", title: "Event 09 — details to confirm", date: EVENT_DATE_TODO, cover: "/events/event-placeholder.svg", domain: "Domain to confirm", attendance: "To be confirmed", outcome: "[TODO: Add verified outcome]", description: "[TODO: Add a short description using confirmed event details.]", gallery: ["/events/event-placeholder.svg"], featured: false },
  // TODO: Replace the placeholder art and confirm all event facts.
  { id: "event-10", title: "Event 10 — details to confirm", date: EVENT_DATE_TODO, cover: "/events/event-placeholder.svg", domain: "Domain to confirm", attendance: "To be confirmed", outcome: "[TODO: Add verified outcome]", description: "[TODO: Add a short description using confirmed event details.]", gallery: ["/events/event-placeholder.svg"], featured: false },
];

export const featuredEvents = events.filter((event) => event.featured);
