import type { Category } from "@/lib/products";

/* Simple line-art marks for each product family — used anywhere the
   catalogue was reading as a bare spec-sheet list, to give each
   category a recognizable silhouette instead of just a number. */

const icons: Record<Category, React.ReactNode> = {
  "Water Treatment Chemicals": (
    <path
      d="M12 3.5c2.8 3.6 5.5 7.2 5.5 10.3a5.5 5.5 0 1 1-11 0c0-3.1 2.7-6.7 5.5-10.3Z"
      strokeLinejoin="round"
    />
  ),
  "Swimming Pool Chemicals": (
    <>
      <path d="M3 9.5c1.6 1.3 3.2 1.3 4.8 0 1.6-1.3 3.2-1.3 4.8 0 1.6 1.3 3.2 1.3 4.8 0" strokeLinecap="round" />
      <path d="M3 14.5c1.6 1.3 3.2 1.3 4.8 0 1.6-1.3 3.2-1.3 4.8 0 1.6 1.3 3.2 1.3 4.8 0" strokeLinecap="round" />
      <path d="M3 19.5c1.6 1.3 3.2 1.3 4.8 0 1.6-1.3 3.2-1.3 4.8 0 1.6 1.3 3.2 1.3 4.8 0" strokeLinecap="round" />
      <circle cx="16" cy="6" r="2.2" />
    </>
  ),
  "Housekeeping & Cleaning Chemicals": (
    <>
      <path d="M14.5 3.5 20.5 9.5" strokeLinecap="round" />
      <path d="M12.8 5.2 4 14a2.4 2.4 0 0 0 0 3.4l2.6 2.6a2.4 2.4 0 0 0 3.4 0l8.8-8.8" strokeLinejoin="round" />
      <path d="M4.5 19.5 3 21" strokeLinecap="round" />
    </>
  ),
};

export default function CategoryIcon({
  category,
  className = "w-5 h-5",
}: {
  category: Category;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      {icons[category]}
    </svg>
  );
}
