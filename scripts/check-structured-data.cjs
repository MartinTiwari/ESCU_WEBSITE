// Runs after every production build, including Vercel builds. Validate the
// emitted HTML, so moving markup into a component cannot bypass this check.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function nodes(value) {
  if (!value || typeof value !== "object") return [];
  return [value, ...Object.values(value).flatMap(nodes)];
}

function validate(html, filename) {
  const data = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
    .flatMap((match) => nodes(JSON.parse(match[1])));
  const types = data.flatMap((node) => node["@type"] || []);
  assert.ok(!types.includes("Product") && !types.includes("ProductGroup"),
    `${filename}: quote-only catalogue must not emit Product snippets; publish real qualifying data and update this policy before enabling them.`);
  if (filename.includes(`${path.sep}products${path.sep}`)) {
    assert.ok(types.includes("WebPage"), `${filename}: missing informational WebPage markup`);
    assert.ok(types.includes("BreadcrumbList"), `${filename}: missing breadcrumbs`);
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

// Prove the guard catches the original error, even when it is nested.
assert.throws(() => validate('<script type="application/ld+json">{"@graph":[{"@type":"Product","name":"Example"}]}</script>', "regression.html"), /must not emit Product/);
console.log(`PASS: structured data in ${files.length} rendered pages; ${productPages.length} product pages retain WebPage and breadcrumbs; Product regression blocked.`);
