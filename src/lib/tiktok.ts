interface TikTokPixel {
  track: (event: string, data?: Record<string, unknown>) => void;
  load: (id: string, options?: Record<string, unknown>) => void;
  page: () => void;
}

declare global {
  interface Window {
    ttq?: TikTokPixel;
  }
}
export const trackTikTokEvent = (
  event: string,
  data?: Record<string, unknown>
) => {
  if (typeof window === "undefined") return;

  const ttq = window.ttq;
  
  if (ttq && typeof ttq.track === "function") {
    ttq.track(event, data || {});
  }
};
