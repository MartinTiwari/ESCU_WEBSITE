// Manual notifications for genuinely changed canonical pages only.
// Default is a read-only dry run. Nothing runs during builds or page views.
// Protocol: https://www.indexnow.org/documentation
const fs = require("node:fs");
const path = require("node:path");

const ORIGIN = "https://www.everestsuperchemical.com.np";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const ROOT = path.resolve(__dirname, "..");

function loadConfig() {
  const config = JSON.parse(fs.readFileSync(path.join(ROOT, "indexnow.json"), "utf8"));
  if (config.host !== new URL(ORIGIN).host || config.endpoint !== ENDPOINT || !/^[a-f0-9]{32}\.txt$/.test(config.keyFile)) {
    throw new Error("IndexNow configuration must use the fixed canonical host, endpoint and ownership filename.");
  }
  const key = fs.readFileSync(path.join(ROOT, "public", config.keyFile), "utf8").trim();
  if (key !== config.keyFile.slice(0, -4)) throw new Error("Local ownership file does not match its filename.");
  return { host: config.host, key, keyLocation: `${ORIGIN}/${config.keyFile}` };
}

function parseArgs(args) {
  if (args.includes("--help")) return { help: true, submit: false, paths: [] };
  const submit = args.includes("--submit");
  const paths = args.filter((arg) => arg !== "--submit");
  if (!paths.length || paths.some((arg) => arg.startsWith("--"))) {
    throw new Error("Usage: node scripts/submit-indexnow.cjs [--submit] /changed-page [/another-page]");
  }
  return { submit, paths };
}

function selectUrls(inputs, sitemap) {
  const decode = (value) => value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
  const known = new Set([...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map((match) => new URL(decode(match[1].trim())).href));
  if (!known.size) throw new Error("Canonical sitemap contains no URLs.");
  const selected = inputs.map((input) => {
    if (/[\s\\?#]/.test(input) || (!input.startsWith("/") && !input.startsWith(`${ORIGIN}/`)) || input.startsWith("//")) {
      throw new Error("Use canonical paths or HTTPS www URLs without queries, fragments or whitespace.");
    }
    const url = new URL(input, ORIGIN);
    if (url.origin !== ORIGIN || url.username || url.password || url.href !== (input.startsWith("/") ? `${ORIGIN}${input}` : input) || !known.has(url.href)) {
      throw new Error("Every submitted URL must be a current canonical entry in ESCU's sitemap.");
    }
    return url.href;
  });
  return [...new Set(selected)];
}

async function checkedFetch(fetcher, url, options = {}) {
  // Fail on redirects so an old path cannot be silently submitted as current.
  const response = await fetcher(url, { redirect: "error", signal: AbortSignal.timeout(30000), ...options });
  if (response.status !== 200) throw new Error(`Preflight returned HTTP ${response.status}; notification cancelled.`);
  return response;
}

async function run(args, { fetcher = fetch, log = console.log, config = loadConfig() } = {}) {
  const options = parseArgs(args);
  if (options.help) {
    log("Usage: node scripts/submit-indexnow.cjs [--submit] /changed-page [/another-page]");
    log("Read-only dry run by default. Use only for genuinely added or updated sitemap pages.");
    return { submitted: false, urls: [] };
  }
  const sitemap = await (await checkedFetch(fetcher, `${ORIGIN}/sitemap.xml`)).text();
  const urls = selectUrls(options.paths, sitemap);
  for (const url of urls) {
    const response = await checkedFetch(fetcher, url);
    if (/\b(?:noindex|none)\b/i.test(response.headers.get("x-robots-tag") || "")) throw new Error("A selected page blocks indexing; notification cancelled.");
    await response.body?.cancel();
  }
  if (!options.submit) {
    log(`DRY RUN: ${urls.length} canonical live URLs checked. No notification sent. Add --submit after deploying genuine content changes.`);
    return { submitted: false, urls };
  }
  const liveKey = await (await checkedFetch(fetcher, config.keyLocation)).text();
  if (liveKey.trim() !== config.key) throw new Error("Live ownership key does not match; deploy the key file before notifying IndexNow.");
  const response = await fetcher(ENDPOINT, {
    method: "POST", redirect: "error", signal: AbortSignal.timeout(30000),
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ ...config, urlList: urls }),
  });
  await response.body?.cancel();
  if (![200, 202].includes(response.status)) throw new Error(`IndexNow returned HTTP ${response.status}; no successful receipt confirmed.`);
  log(response.status === 202
    ? `ACCEPTED: ${urls.length} URLs received; ownership-key validation is pending (HTTP 202). This does not confirm indexing or ranking.`
    : `RECEIVED: ${urls.length} URLs received (HTTP 200). This does not confirm indexing or ranking.`);
  return { submitted: true, status: response.status, urls };
}

if (require.main === module) run(process.argv.slice(2)).catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

module.exports = { parseArgs, selectUrls, run };
