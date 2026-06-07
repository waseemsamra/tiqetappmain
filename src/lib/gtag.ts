
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'G-XXXXXXXXXX';

type GTagEvent = {
  action: string;
  params: {
    [key: string]: any;
  };
};

export const event = ({ action, params }: GTagEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
