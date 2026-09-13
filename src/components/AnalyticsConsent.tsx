"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";

const key = "escu-analytics-choice";
function readChoice() {
  try { return localStorage.getItem(key); } catch { return null; }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("escu-consent", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("escu-consent", callback);
  };
}

export default function AnalyticsConsent({ measurementId }: { measurementId: string }) {
  const choice = useSyncExternalStore(subscribe, readChoice, () => null);
  const [editing, setEditing] = useState(false);
  const [sessionChoice, setSessionChoice] = useState<string | null>(null);
  const accepted = (sessionChoice || choice) === "accepted";
  useEffect(() => {
    (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = !accepted;
  }, [accepted, measurementId]);
  function choose(value: string) {
    const wasAccepted = accepted;
    (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = value !== "accepted";
    try { localStorage.setItem(key, value); setSessionChoice(null); }
    catch { setSessionChoice(value); }
    setEditing(false);
    window.dispatchEvent(new Event("escu-consent"));
    if (value !== "accepted") {
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.trim().split("=")[0];
        if (!/^_ga(?:_|$)/.test(name)) continue;
        for (const domain of ["", location.hostname, ".everestsuperchemical.com.np"]) {
          document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax; Secure`;
        }
      }
      if (wasAccepted) window.location.reload();
    }
  }

  return <>
    {accepted && <>
      <Script id="google-analytics-config" strategy="afterInteractive">{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}', { allow_google_signals: false, allow_ad_personalization_signals: false });
`}</Script>
      <Script id="google-analytics-loader" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    </>}
    <div className="bg-ink px-5 py-3 text-center text-xs text-cream/70">
      <button type="button" onClick={() => setEditing(true)} className="underline underline-offset-4 py-2">Analytics preferences</button>
    </div>
    {(!(sessionChoice || choice) || editing) && <section aria-label="Analytics preferences" className="fixed bottom-4 inset-x-4 z-[100] mx-auto max-w-xl rounded-xl border border-ink/15 bg-cream p-5 text-ink shadow-xl">
      <p className="font-semibold">Help us understand what’s useful</p>
      <p className="mt-2 text-sm leading-relaxed">With your permission, Google Analytics uses cookies to measure visits and page use. Your choice won’t affect enquiries. <Link href="/privacy" className="underline underline-offset-4">Privacy notice</Link></p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("declined")} className="rounded-md border border-ink px-4 py-2 text-sm font-medium">No thanks</button>
        <button type="button" onClick={() => choose("accepted")} className="rounded-md border border-ink bg-ink px-4 py-2 text-sm font-medium text-cream">Allow analytics</button>
      </div>
    </section>}
  </>;
}
