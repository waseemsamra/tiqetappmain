// Shared carousel options for iOS-like behavior
export const CAROUSEL_OPTS = {
  align: "start",
  loop: false,
  dragFree: true,
  skipSnaps: false,
  watchDrag: true,
  draggable: true,
  containScroll: "trimSnaps",
  speed: 15,
  duration: 20,
  breakpoints: {
    "(min-width: 640px)": { slidesToScroll: 1 },
    "(min-width: 1024px)": { slidesToScroll: 1 },
  }
} as const;