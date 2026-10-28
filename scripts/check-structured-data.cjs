// Runs after every production build, including Vercel builds. Validate the
// emitted HTML, so moving markup into a component cannot bypass this check.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function nodes(value) {
  if (!value || typeof value !== "object") return [];
  return [value, ...Object.values(value).flatMap(nodes)];
}

// Vocabulary used by this site, reviewed against Schema.org. Fail on misspelled
// terms instead of treating parseable JSON as sufficient validation.
const schemaTypes = new Set(["Organization", "Store", "LocalBusiness", "PostalAddress", "GeoCoordinates", "OpeningHoursSpecification", "Country", "WebSite", "WebPage", "Product", "FAQPage", "Question", "Answer", "BreadcrumbList", "ListItem", "CollectionPage", "ItemList", "Article", "Thing"]);
const schemaProperties = new Set(["@context", "@graph", "@type", "@id", "name", "alternateName", "url", "image", "logo", "description", "hasMap", "telephone", "email", "address", "geo", "openingHoursSpecification", "areaServed", "sameAs", "streetAddress", "addressLocality", "addressRegion", "postalCode", "addressCountry", "latitude", "longitude", "dayOfWeek", "opens", "closes", "inLanguage", "publisher", "author", "isPartOf", "about", "mainEntity", "category", "itemListElement", "position", "item", "numberOfItems", "acceptedAnswer", "text", "headline", "citation", "datePublished", "dateModified", "mainEntityOfPage"]);

function validate(html, filename) {
  const data = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
    .flatMap((match) => nodes(JSON.parse(match[1])));
  const types = data.flatMap((node) => node["@type"] || []);
  // Product identity is permitted; rich-result offers and ratings need a
  // separate evidence review. Do not turn a quotation enquiry into fake stock.
  for (const product of data.filter((node) => node["@type"] === "Product")) {
    for (const field of ["name", "description", "url", "category", "@id"]) assert.ok(product[field], `${filename}: Product missing ${field}`);
    for (const field of ["offers", "review", "aggregateRating", "brand", "manufacturer", "gtin", "sku"]) assert.ok(!(field in product), `${filename}: unverified Product ${field}`);
    assert.ok(product.url.startsWith("https://www.everestsuperchemical.com.np/products/"), `${filename}: invalid Product URL`);
  }
  for (const faq of data.filter((node) => node["@type"] === "FAQPage")) {
    assert.ok(Array.isArray(faq.mainEntity) && faq.mainEntity.length, `${filename}: empty FAQPage`);
    for (const question of faq.mainEntity) assert.ok(question.name && question.acceptedAnswer?.text, `${filename}: incomplete FAQ answer`);
  }
  for (const node of data.filter((node) => !Array.isArray(node))) {
    for (const type of [node["@type"] || []].flat()) assert.ok(schemaTypes.has(type), `${filename}: unreviewed schema type ${type}`);
    for (const property of Object.keys(node)) assert.ok(schemaProperties.has(property), `${filename}: unreviewed schema property ${property}`);
    for (const field of ["datePublished", "dateModified"]) if (node[field]) assert.match(node[field], /^\d{4}-\d{2}-\d{2}$/, `${filename}: invalid ${field}`);
  }
  if (filename.includes(`${path.sep}products${path.sep}`)) {
    assert.ok(types.includes("WebPage"), `${filename}: missing informational WebPage markup`);
    assert.ok(types.includes("BreadcrumbList"), `${filename}: missing breadcrumbs`);
    assert.ok(types.includes("Product"), `${filename}: missing semantic Product identity`);
    const faq = data.find((node) => node["@type"] === "FAQPage");
    assert.ok(faq && faq.mainEntity.length >= 4, `${filename}: missing product buying answers`);
    // These pages have tailored price/suitability answers in addition to the
    // shared ordering/document questions. Guard against silently dropping them.
    const tailoredFaqProducts = ["bleaching-powder", "floor-cleaner", "hcl-acid", "caustic-soda-flakes", "liquid-chlorine-water", "liquid-chlorine-pool", "antiscalant"];
    if (tailoredFaqProducts.some((slug) => filename.endsWith(`${path.sep}${slug}.html`))) {
      assert.equal(faq.mainEntity.length, 6, `${filename}: tailored buying answers were omitted`);
    }
  }
}

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(filename) : entry.name.endsWith(".html") ? [filename] : [];
  });
}

const root = path.resolve(".next/server/app");
if (process.env.VERCEL_ENV === "production") {
  assert.ok(/^re_[A-Za-z0-9_-]+$/.test(process.env.RESEND_API_KEY || ""),
    "Production quote-email key is missing or malformed; refusing to publish a broken enquiry form.");
}
const files = htmlFiles(root);
assert.ok(files.length, "No rendered HTML found; run next build first");
const productPages = files.filter((filename) => filename.includes(`${path.sep}products${path.sep}`));
assert.ok(productPages.length > 0, "No prerendered product pages found");
for (const filename of files) validate(fs.readFileSync(filename, "utf8"), filename);

// Prove incomplete/fabricated product data cannot silently pass a build.
assert.throws(() => validate('<script type="application/ld+json">{"@graph":[{"@type":"Product","name":"Example"}]}</script>', "regression.html"), /Product missing/);
assert.throws(() => validate('<script type="application/ld+json">{"@type":"Product","@id":"x","name":"Example","description":"Example","url":"https://www.everestsuperchemical.com.np/products/example","category":"Example","offers":{"price":0}}</script>', "regression.html"), /unverified Product offers/);
console.log(`PASS: structured data in ${files.length} rendered pages; ${productPages.length} product pages have semantic Product, WebPage, breadcrumbs and FAQs; fabricated offers/ratings blocked.`);
