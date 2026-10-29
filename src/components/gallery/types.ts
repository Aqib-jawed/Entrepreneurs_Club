export type GalleryMotion = {
  velocity: number;
  lastInteraction: number;
  hovered: boolean;
  focused: boolean;
  dragging: boolean;
  pointerX: number | null;
  pointerStartX: number;
  pointerStartY: number;
  dragDistance: number;
  ignoreClickUntil: number;
};
