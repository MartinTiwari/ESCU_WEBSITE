import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import { guides } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Chemical Buying Guides for Nepal Businesses",
  description: "Practical guides for buying PAC, alum, pool chlorine, bleaching powder and cleaning products in Nepal. Compare options and prepare a clear supply enquiry.",
  path: "/guides",
});

export default function GuidesPage() {
  return <article className="bg-paper">
    <PageHeader eyebrow="Buyer guides" title="Choose with a clearer brief." sub="Practical questions for your operator, purchasing team and supplier before ordering chemicals in Nepal." />
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Buying guides" }]} />
      <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => <Link key={guide.slug} href={`/guides/${guide.slug}`} className="border-t border-line py-7 group focus-visible:outline-2 focus-visible:outline-amber-deep">
          <p className="eyebrow text-amber-deep mb-3">{guide.category}</p>
          <h2 className="font-display text-2xl leading-snug text-ink group-hover:text-amber-deep mb-3">{guide.title}</h2>
          <p className="text-sm leading-relaxed text-muted">{guide.description}</p>
          <span className="mt-5 inline-block text-sm font-semibold underline underline-offset-4 text-ink">Read guide</span>
        </Link>)}
      </div>
      <aside className="mt-6 border-t border-line pt-6 text-sm leading-relaxed text-muted">
        <p>These guides help you prepare an enquiry; they do not replace product labels, SDS or an operator&apos;s treatment plan. SDS and related documents are provided after an enquiry.</p>
        <Link href="/buying-guide" className="mt-3 inline-block underline underline-offset-4 text-ink">Ordering, delivery and contact questions</Link>
      </aside>
    </div>
  </article>;
}
