import Link from "next/link";

type BreadcrumbItem = { name: string; href?: string };

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-xs leading-relaxed text-ink/70">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={`${index}-${item.name}`} className="flex min-w-0 items-baseline gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="underline underline-offset-4 hover:text-amber-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-deep">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="break-words text-ink">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
