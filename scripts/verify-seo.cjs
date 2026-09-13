const assert = require("node:assert/strict");

const base = process.argv[2] || "http://localhost:3100";
const production = "https://www.everestsuperchemical.com.np";
const decode = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const nodes = (value) => value && typeof value === "object"
  ? [value, ...Object.values(value).flatMap(nodes)] : [];

async function read(path) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response.text();
}

async function main() {
  const robots = await read("/robots.txt");
  assert.ok(robots.includes(`Sitemap: ${production}/sitemap.xml`));
  const xml = await read("/sitemap.xml");
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
  assert.equal(urls.length, 37);
  assert.equal(new Set(urls).size, urls.length);
  const titles = new Set();
  const descriptions = new Set();
  const internalLinks = new Set();
  const linkTargets = new Set();
  const pages = new Map();
  const sharingImages = new Set();
  const imageTargets = new Set();
  for (const url of urls) {
    assert.ok(url.startsWith(production));
    const route = new URL(url);
    const html = await read(route.pathname + route.search);
    pages.set(route.pathname + route.search, html);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(title && description && canonical, `${url}: missing metadata`);
    assert.ok(!titles.has(title), `${url}: duplicate title`);
    assert.ok(!descriptions.has(description), `${url}: duplicate description`);
    titles.add(title);
    descriptions.add(description);
    assert.equal(new URL(decode(canonical)).href, route.href);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${url}: expected one H1`);
    let previousLevel = 0;
    for (const heading of html.matchAll(/<h([1-6])(?:\s|>)/g)) {
      const level = Number(heading[1]);
      assert.ok(level <= previousLevel + 1, `${url}: skipped heading level H${previousLevel} to H${level}`);
      previousLevel = level;
    }
    for (const image of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(image[0], /\balt="[^"]*"/, `${url}: image has no alt attribute`);
      assert.match(image[0], /\bsrc="[^"]+"/, `${url}: image has no source`);
      imageTargets.add(decode(image[0].match(/\bsrc="([^"]+)"/)[1]));
    }
    const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    assert.ok(og && og.startsWith(production), `${url}: missing absolute og:image`);
    const sharingImage = new URL(decode(og));
    sharingImages.add(sharingImage.pathname + sharingImage.search);
    assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), `${url}: noindex`);
    assert.ok(!html.includes("google-analytics-loader"), `${url}: analytics must not load before visitor consent`);
    const types = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .flatMap((match) => nodes(JSON.parse(match[1])))
      .flatMap((node) => node["@type"] || []);
    assert.ok(!types.includes("Product") && !types.includes("ProductGroup"), `${url}: incomplete Product markup must not return`);
    if (route.pathname.startsWith("/products/")) {
      assert.ok(types.includes("WebPage") && types.includes("BreadcrumbList"), `${url}: missing page/breadcrumb markup`);
    }
    for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      const link = new URL(decode(match[1]), production);
      if (link.origin === production) {
        internalLinks.add(link.pathname + link.search);
        linkTargets.add(link.pathname + link.search + link.hash);
      }
    }
  }
  for (const target of linkTargets) {
    const link = new URL(target, production);
    const path = link.pathname + link.search;
    const html = pages.get(path) || await read(path);
    if (link.hash) {
      const id = decodeURIComponent(link.hash.slice(1));
      assert.ok(html.includes(`id="${id}"`) || html.includes(`id="${id.replace(/&/g, "&amp;")}"`), `${target}: broken fragment`);
    }
  }
  for (const target of sharingImages) {
    const response = await fetch(new URL(target, base));
    assert.equal(response.status, 200, `${target}: broken sharing image`);
    assert.match(response.headers.get("content-type"), /image\//);
    const metadata = await require("sharp")(Buffer.from(await response.arrayBuffer())).metadata();
    assert.equal(metadata.width, 1200);
    assert.equal(metadata.height, 630);
  }
  for (const target of imageTargets) {
    const response = await fetch(new URL(target, base), { signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200, `${target}: broken page image`);
    assert.match(response.headers.get("content-type"), /image\//, `${target}: response is not an image`);
    await response.body.cancel();
  }
  for (const url of urls) {
    const route = new URL(url);
    assert.ok(internalLinks.has(route.pathname + route.search), `${url}: no incoming internal link`);
  }
  const image = await fetch(new URL("/images/liquid-flow-hero.webp", base));
  assert.equal(image.status, 200);
  assert.match(image.headers.get("content-type"), /image\/webp/);
  const missing = await fetch(new URL("/products/not-a-real-product", base));
  assert.equal(missing.status, 404);
  console.log(`PASS: ${urls.length} sitemap pages; ${linkTargets.size} internal link targets; ${imageTargets.size} page images; unique metadata, canonicals, H1/heading hierarchy, image alt attributes, 1200x630 OG images, JSON-LD regression checks, robots, WebP asset and missing-product 404.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
