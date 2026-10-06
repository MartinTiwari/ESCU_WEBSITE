"use client";

import { useEffect, useRef } from "react";

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window) || !element.animate) return;

    let animation: Animation | undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      if (preference.matches) return;
      animation = element.animate(
        [{ transform: "translateY(8px)" }, { transform: "translateY(0)" }],
        { duration: 350, delay: Math.max(0, delay) * 1000, easing: "cubic-bezier(0.21, 0.47, 0.32, 0.98)" },
      );
    }, { rootMargin: "-80px" });
    const handlePreferenceChange = () => {
      if (preference.matches) {
        observer.disconnect();
        animation?.cancel();
      }
    };
    preference.addEventListener("change", handlePreferenceChange);
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
      preference.removeEventListener("change", handlePreferenceChange);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
