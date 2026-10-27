import { site } from "./site";
import { products } from "./products";
import { categoryLandingPages } from "./category-pages";
import { getProductBuyingContent } from "./product-buying-content";
import { getProductEditorial } from "./product-editorial";
import { guides } from "./guides";

// Supplementary exports of public content, not a promise of indexing or citation.
export function llmsText(full = false) {
  const lines = [
    `# ${site.name} (${site.shortName})`, "",
    `> ${site.tagline}`, "",
    `Canonical website: ${site.url}`, `Customer visits: ${site.address}`,
    `Registered address: ${site.registeredAddress}`, `Telephone: ${site.phoneInternational}`,
    `Email: ${site.email}`, `Hours: ${site.hours}`, "",
    "Prices, current stock, packaging, grade and delivery are confirmed by enquiry. SDS and related product documents are provided after enquiry. No public numerical dosing recommendations are supplied by this catalogue.", "",
    "## Main pages", ...[["Company", "/about"], ["Contact", "/contact"], ["Request a quote", "/quote"], ["Catalogue", "/products"], ["Ordering FAQs", "/buying-guide"]].map(([name, path]) => `- [${name}](${site.url}${path})`), "",
    "## Categories", ...categoryLandingPages.map((page) => `- [${page.title}](${site.url}/chemicals/${page.slug}): ${page.description}`), "",
    "## Products", ...products.map((product) => `- [${product.name}](${site.url}/products/${product.slug}): ${product.description}`), "",
    "## Buyer guides", ...guides.map((guide) => `- [${guide.title}](${site.url}/guides/${guide.slug}): ${guide.summary}`),
  ];
  if (full) {
    for (const product of products) {
      const editorial = getProductEditorial(product.slug);
      lines.push("", `## ${product.name}`, `${site.url}/products/${product.slug}`, product.overview,
        "Applications:", ...product.applications.map((use) => `- ${use}`), "Before ordering:",
        ...editorial.buyingChecklist.map((item) => `- ${item}`), editorial.packagingNote, editorial.usageNote,
        editorial.deliveryNote, "Storage and handling:", product.handling);
      for (const faq of getProductBuyingContent(product.slug)?.questions || []) lines.push(`### ${faq.question}`, faq.answer);
    }
    for (const guide of guides) {
      lines.push("", `## ${guide.title}`, `${site.url}/guides/${guide.slug}`, guide.summary);
      for (const section of guide.sections) lines.push(`### ${section.heading}`, ...section.paragraphs, ...(section.checklist || []).map((item) => `- ${item}`));
      lines.push("Sources:", ...guide.sources.map((source) => `- [${source.title}](${source.url})`));
    }
  }
  return lines.join("\n") + "\n";
}
