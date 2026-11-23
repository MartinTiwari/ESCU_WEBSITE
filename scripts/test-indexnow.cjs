const assert = require("node:assert/strict");
const { parseArgs, selectUrls, run } = require("./submit-indexnow.cjs");
const origin = "https://www.everestsuperchemical.com.np";
const xml = `<urlset><url><loc>${origin}/</loc></url><url><loc>${origin}/products/pac-powder</loc></url></urlset>`;
const config = { host: "www.everestsuperchemical.com.np", key: "test-key", keyLocation: `${origin}/test-key.txt` };

async function main() {
  assert.equal(parseArgs(["/"]).submit, false);
  assert.equal(parseArgs(["--submit", "/"]).submit, true);
  assert.throws(() => parseArgs([]), /Usage/);
  assert.throws(() => parseArgs(["--unknown", "/"]), /Usage/);
  assert.deepEqual(selectUrls(["/", `${origin}/`, "/products/pac-powder"], xml), [`${origin}/`, `${origin}/products/pac-powder`]);
  for (const invalid of ["https://example.com/", "http://www.everestsuperchemical.com.np/", "https://everestsuperchemical.com.np/", "//example.com/", "/?email=private", "/#section", "/industries", "/ne", "/products/../", "/missing"]) {
    assert.throws(() => selectUrls([invalid], xml), /canonical/);
  }
  const calls = [];
  let key = config.key;
  let pageStatus = 200;
  let postStatus = 200;
  const mockFetch = async (url, options) => {
    calls.push({ url, options });
    if (options.method === "POST") return new Response(null, { status: postStatus });
    if (url.endsWith("/sitemap.xml")) return new Response(xml);
    if (url === config.keyLocation) return new Response(key);
    return new Response("Page", { status: pageStatus });
  };
  const logs = [];
  const deps = { config, fetcher: mockFetch, log: (message) => logs.push(message) };
  const dry = await run(["/products/pac-powder"], deps);
  assert.equal(dry.submitted, false);
  assert.ok(!calls.some(({ options }) => options.method === "POST"));
  assert.ok(!calls.some(({ url }) => url === config.keyLocation));
  assert.ok(calls.every(({ options }) => options.redirect === "error"));
  pageStatus = 302;
  await assert.rejects(run(["--submit", "/"], deps), /HTTP 302/);
  assert.ok(!calls.some(({ options }) => options.method === "POST"));
  pageStatus = 200;
  key = "wrong-key";
  await assert.rejects(run(["--submit", "/"], deps), /ownership key does not match/);
  assert.ok(!calls.some(({ options }) => options.method === "POST"));
  key = config.key;
  const result = await run(["--submit", "/"], deps);
  assert.equal(result.status, 200);
  const post = calls.find(({ options }) => options.method === "POST");
  assert.equal(post.url, "https://api.indexnow.org/indexnow");
  assert.deepEqual(JSON.parse(post.options.body), { ...config, urlList: [`${origin}/`] });
  postStatus = 202;
  assert.equal((await run(["--submit", "/"], deps)).status, 202);
  assert.match(logs.at(-1), /validation is pending/);
  postStatus = 429;
  await assert.rejects(run(["--submit", "/"], deps), /HTTP 429/);
  console.log("PASS: canonical-only validation, duplicate handling, dry-run without POST, redirect rejection, ownership preflight and honest 200/202/error reporting. All requests mocked.");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
