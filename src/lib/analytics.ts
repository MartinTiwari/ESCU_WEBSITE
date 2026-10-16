type AnalyticsWindow = Window & {
  escuAnalyticsAllowed?: boolean;
  gtag?: (command: "event", event: string, parameters: Record<string, string>) => void;
};

export function setAnalyticsAllowed(allowed: boolean) {
  (window as AnalyticsWindow).escuAnalyticsAllowed = allowed;
}

// Only fixed categories and the page path are measured. Never send enquiry text,
// contact details, full link URLs or URL query parameters to Analytics.
export function trackEnquiry(event: "contact_click" | "quote_open" | "generate_lead", method: "whatsapp" | "phone" | "email" | "quote_form") {
  const analyticsWindow = window as AnalyticsWindow;
  if (!analyticsWindow.escuAnalyticsAllowed || !analyticsWindow.gtag) return;
  try {
    analyticsWindow.gtag("event", event, {
      method,
      page_path: window.location.pathname,
      page_location: window.location.origin + window.location.pathname,
    });
  } catch {
    // Optional measurement must never interrupt an enquiry or navigation.
  }
}

export function trackPageView() {
  const analyticsWindow = window as AnalyticsWindow;
  if (!analyticsWindow.escuAnalyticsAllowed || !analyticsWindow.gtag) return;
  try {
    analyticsWindow.gtag("event", "page_view", {
      page_path: window.location.pathname,
      page_location: window.location.origin + window.location.pathname,
      page_title: document.title,
      page_referrer: document.referrer.split(/[?#]/)[0],
    });
  } catch {
    // Browsing still works when Analytics is unavailable or blocked.
  }
}
