import AnalyticsConsent from "./AnalyticsConsent";

// Configure a real GA4 web stream before enabling this in production.
// Use enhanced measurement for page views during client-side navigation.
export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const isProduction = process.env.NODE_ENV === "production" &&
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");

  if (!isProduction || !measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) {
    return null;
  }

  return <AnalyticsConsent measurementId={measurementId} />;
}
