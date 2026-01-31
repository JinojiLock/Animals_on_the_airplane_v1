// Google Analytics & Yandex Metrika integration

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

// Google Analytics
export const initGA = (trackingId: string) => {
  if (!trackingId) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(..._args: any[]) {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', trackingId);
};

export const trackGAEvent = (event: AnalyticsEvent) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }
};

export const trackGAPageView = (path: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
      page_path: path,
    });
  }
};

// Yandex Metrika
export const initYM = (counterId: string) => {
  if (!counterId) return;

  (window as any).ym =
    (window as any).ym ||
    function () {
      ((window as any).ym.a = (window as any).ym.a || []).push(arguments);
    };
  (window as any).ym.l = Date.now();

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  document.head.appendChild(script);

  script.onload = () => {
    (window as any).ym(parseInt(counterId), 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  };
};

export const trackYMEvent = (event: AnalyticsEvent) => {
  if (typeof (window as any).ym !== 'undefined' && import.meta.env.VITE_YM_COUNTER_ID) {
    (window as any).ym(
      parseInt(import.meta.env.VITE_YM_COUNTER_ID),
      'reachGoal',
      event.action,
      {
        [event.category]: event.label,
      }
    );
  }
};

export const trackYMPageView = (path: string) => {
  if (typeof (window as any).ym !== 'undefined' && import.meta.env.VITE_YM_COUNTER_ID) {
    (window as any).ym(parseInt(import.meta.env.VITE_YM_COUNTER_ID), 'hit', path);
  }
};

// Combined tracking
export const trackEvent = (event: AnalyticsEvent) => {
  trackGAEvent(event);
  trackYMEvent(event);
};

export const trackPageView = (path: string) => {
  trackGAPageView(path);
  trackYMPageView(path);
};

// Predefined events
export const AnalyticsEvents = {
  // Page visits
  PAGE_VIEW: (page: string) => ({
    category: 'Navigation',
    action: 'page_view',
    label: page,
  }),

  // Search & Filters
  SEARCH: (query: string) => ({
    category: 'Search',
    action: 'search_query',
    label: query,
  }),
  FILTER_TRANSPORT: (method: string) => ({
    category: 'Filters',
    action: 'filter_transport_method',
    label: method,
  }),
  RESET_FILTERS: () => ({
    category: 'Filters',
    action: 'reset_filters',
  }),

  // Airline interactions
  VIEW_AIRLINE_DETAILS: (airlineId: string) => ({
    category: 'Airline',
    action: 'view_details',
    label: airlineId,
  }),
  CLICK_OFFICIAL_RULES: (airlineId: string) => ({
    category: 'Airline',
    action: 'click_official_rules',
    label: airlineId,
  }),

  // Language & Theme
  SWITCH_LANGUAGE: (language: string) => ({
    category: 'Settings',
    action: 'switch_language',
    label: language,
  }),
  TOGGLE_THEME: (theme: string) => ({
    category: 'Settings',
    action: 'toggle_theme',
    label: theme,
  }),

  // Contact Form
  OPEN_CONTACT_FORM: () => ({
    category: 'Contact',
    action: 'open_form',
  }),
  SUBMIT_CONTACT_FORM: (type: string) => ({
    category: 'Contact',
    action: 'submit_form',
    label: type,
  }),

  // Donate
  CLICK_DONATE: () => ({
    category: 'Donate',
    action: 'click_donate_button',
  }),

  // OS Detection
  DETECTED_OS: (os: string) => ({
    category: 'System',
    action: 'detected_os',
    label: os,
  }),
};

// Extend window type
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    ym: (...args: any[]) => void;
  }
}
