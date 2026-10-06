"use client";
import { useRouter } from "next/navigation";

export default function IndustryFilter({ industries, selected, category }: { industries: string[]; selected?: string; category?: string }) {
  const router = useRouter();
  return <div id="industry-filter" className="min-w-0 scroll-mt-36">
    <label htmlFor="catalogue-industry" className="mb-2 block text-sm font-medium text-ink">Browse for your business</label>
    <select id="catalogue-industry" value={selected || ""} onChange={(event) => {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (event.target.value) params.set("industry", event.target.value);
      router.push(`/products${params.size ? `?${params}` : ""}#industry-filter`, { scroll: false });
    }} className="w-full border border-line bg-cream px-4 py-3 text-sm text-ink">
      <option value="">All businesses</option>
      {industries.map((industry) => <option key={industry} value={industry}>{industry}</option>)}
    </select>
  </div>;
}
