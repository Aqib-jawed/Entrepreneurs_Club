export type GalleryImage = {
  id: string;
  type: "image";
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  eventId?: string;
};

export type GalleryVideo = {
  id: string;
  type: "video";
  src: string;
  poster: string;
  alt: string;
  caption?: string;
};

export type GalleryItem = GalleryImage | GalleryVideo;

export const galleryItems: GalleryItem[] = [
  { id: "gallery-01", type: "image", src: "/gallery/gallery-01.webp", thumb: "/gallery/gallery-01-thumb.webp", alt: "E-Cell students and mentors after the entrepreneurs summit", width: 1024, height: 683 },
  { id: "gallery-02", type: "image", src: "/gallery/gallery-02.webp", thumb: "/gallery/gallery-02-thumb.webp", alt: "Students gathered on stage at a campus event", width: 1024, height: 683 },
  { id: "gallery-03", type: "image", src: "/gallery/gallery-03.webp", thumb: "/gallery/gallery-03-thumb.webp", alt: "A student interviewing a guest at an event", width: 1024, height: 683 },
  { id: "gallery-04", type: "image", src: "/gallery/gallery-04.webp", thumb: "/gallery/gallery-04-thumb.webp", alt: "A speaker presenting to students in a classroom", width: 1024, height: 683 },
  { id: "gallery-05", type: "image", src: "/gallery/gallery-05.webp", thumb: "/gallery/gallery-05-thumb.webp", alt: "Student team at a community entrepreneurship event", width: 1024, height: 683 },
  { id: "gallery-06", type: "image", src: "/gallery/gallery-06.webp", thumb: "/gallery/gallery-06-thumb.webp", alt: "Students taking part in entrepreneurial charades", width: 1024, height: 683 },
  { id: "gallery-07", type: "image", src: "/gallery/gallery-07.webp", thumb: "/gallery/gallery-07-thumb.webp", alt: "Student presenting a rose to community members", width: 1024, height: 683 },
  { id: "gallery-08", type: "image", src: "/gallery/gallery-08.webp", thumb: "/gallery/gallery-08-thumb.webp", alt: "Visitors exploring a sustainable products store", width: 1024, height: 683 },
];
