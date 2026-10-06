/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS Node regression runner. */
// Executes the real route with a mock Resend module; no network or real email.
// Run: node scripts/test-quote-api.cjs
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const { NextRequest, NextResponse } = require("next/server");
const root = path.resolve(__dirname, "..");

function compile(relativePath) {
  return ts.transpileModule(fs.readFileSync(path.join(root, relativePath), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
}
const siteModule = { exports: {} };
vm.runInNewContext(compile("src/lib/site.ts"), { exports: siteModule.exports, module: siteModule });
const { site } = siteModule.exports;
const sent = [];
const logged = [];
let sendError = null;
let sendThrows = false;
const env = { NODE_ENV: "production", RESEND_API_KEY: "test-only-never-sent" };
class MockResend {
  constructor(key) { assert.equal(key, "test-only-never-sent"); }
  emails = { send: async (email) => {
    sent.push(email);
    if (sendThrows) throw new Error("Mock email failure");
    return { data: { id: "test" }, error: sendError };
  } };
}
const route = { exports: {} };
vm.runInNewContext(compile("src/app/api/quote/route.ts"), {
  exports: route.exports, module: route, process: { env }, TextEncoder, URL,
  console: { error: (...args) => logged.push(args) },
  require: (name) => {
    if (name === "next/server") return { NextRequest, NextResponse };
    if (name === "resend") return { Resend: MockResend };
    if (name === "@/lib/site") return { site };
    throw new Error(`Unexpected module: ${name}`);
  },
});
const valid = { name: "Sita", company: "Hotel", phone: "9800000000", email: "sita@example.com", products: "PAC Powder\nLiquid Chlorine", quantity: "PAC Powder — 50 bags\nLiquid Chlorine — 100 litres", deliveryTown: "Pokhara", fulfillment: "delivery", message: "Please quote for next week.", website: "" };
let sequence = 0;
let assertions = 0;
async function request(body, options = {}) {
  const headers = { origin: new URL(site.url).origin, "content-type": "application/json", "sec-fetch-site": "same-origin", "x-forwarded-for": options.ip || `198.51.100.${++sequence}`, ...options.headers };
  if (options.noOrigin) delete headers.origin;
  const result = await route.exports.POST(new NextRequest(`${site.url}/api/quote`, { method: "POST", headers, body: options.raw === undefined ? JSON.stringify(body) : options.raw }));
  return { status: result.status, body: await result.json(), headers: result.headers };
}
async function expectStatus(body, status, options) {
  const result = await request(body, options);
  assert.equal(result.status, status);
  assertions++;
  return result;
}

(async () => {
  // Missing, invalid, future and freshly mounted timestamps must all send.
  for (const timestamp of [undefined, null, "invalid", Date.now() + 86_400_000, Date.now(), Date.now() - 86_400_000]) {
    const before = sent.length;
    await expectStatus({ ...valid, formRenderedAt: timestamp }, 200);
    assert.equal(sent.length, before + 1, "A clock value must never silently discard a lead");
  }
  assert.ok(sent[0].text.includes("Product(s): PAC Powder\nLiquid Chlorine"));
  assert.ok(sent[0].text.includes(valid.quantity));
  assert.ok(sent[0].text.includes("Delivery town: Pokhara"));
  assert.ok(sent[0].text.includes("Delivery / pickup preference: Delivery"));

  const limits = { name: 200, company: 200, phone: 200, email: 200, products: 3000, quantity: 1000, deliveryTown: 200, message: 3000 };
  for (const [field, limit] of Object.entries(limits)) {
    const before = sent.length;
    const result = await expectStatus({ ...valid, [field]: "x".repeat(limit + 1) }, 400);
    assert.equal(typeof result.body.fieldErrors[field], "string");
    assert.equal(sent.length, before, `${field} must be rejected, not truncated and sent`);
    const boundary = field === "email" ? `${"x".repeat(limit - "@example.com".length)}@example.com` : "x".repeat(limit);
    await expectStatus({ ...valid, [field]: boundary }, 200);
    assert.ok(field === "name" || field === "company" ? sent.at(-1).subject.includes(boundary) : sent.at(-1).text.includes(boundary));
  }
  await expectStatus({ ...valid, products: "", productUncertain: true, fulfillment: "unsure" }, 200);
  assert.ok(sent.at(-1).text.includes("Not sure yet — please help me choose"));
  assert.ok(sent.at(-1).text.includes("Help choosing a product: Yes"));
  await expectStatus({ ...valid, fulfillment: "pickup" }, 200);
  assert.ok(sent.at(-1).text.includes("Delivery / pickup preference: Pickup"));
  await expectStatus({ ...valid, products: "", productUncertain: false }, 400);
  await expectStatus({ ...valid, productUncertain: "true" }, 400);
  await expectStatus({ ...valid, fulfillment: "invalid" }, 400);
  await expectStatus({ ...valid, quantity: 50 }, 400);
  await expectStatus({ ...valid, email: "invalid" }, 400);
  await expectStatus({ ...valid, name: "\n\t" }, 400);
  await expectStatus({ ...valid, name: "Sita\r\nBcc: nobody@example.com" }, 200);
  assert.ok(!/[\r\n]/.test(sent.at(-1).subject));
  await expectStatus({ ...valid, products: "PAC\r\nChlorine" }, 200);
  assert.ok(sent.at(-1).text.includes("Product(s): PAC\nChlorine"));
  // Maximum valid Nepali text remains below the byte limit.
  await expectStatus({ ...valid, products: "क".repeat(3000), quantity: "क".repeat(1000), message: "क".repeat(3000) }, 200);

  let before = sent.length;
  await expectStatus({ ...valid, website: "bot.example" }, 200);
  assert.equal(sent.length, before, "Honeypot should discard bots");
  await expectStatus(valid, 403, { headers: { origin: "https://untrusted.example" } });
  await expectStatus(valid, 403, { noOrigin: true });
  await expectStatus(valid, 403, { headers: { "sec-fetch-site": "cross-site" } });
  await expectStatus(valid, 415, { headers: { "content-type": "text/plain" } });
  for (const raw of ["{", "[]", "null"]) await expectStatus(null, 400, { raw });
  await expectStatus(valid, 413, { headers: { "content-length": "40000" } });
  await expectStatus(null, 413, { raw: JSON.stringify({ message: "x".repeat(40000) }) });
  assert.equal(sent.length, before, "Rejected requests must not send emails");
  for (let i = 0; i < 5; i++) await expectStatus(valid, 200, { ip: "203.0.113.250" });
  before = sent.length;
  const limited = await expectStatus(valid, 429, { ip: "203.0.113.250" });
  assert.equal(limited.headers.get("retry-after"), "600");
  assert.equal(sent.length, before);
  delete env.RESEND_API_KEY;
  await expectStatus(valid, 500);
  assert.equal(sent.length, before);
  env.RESEND_API_KEY = "test-only-never-sent";
  sendError = { message: "Mock provider rejection" };
  await expectStatus(valid, 500);
  sendError = null;
  sendThrows = true;
  await expectStatus(valid, 500);
  assert.equal(logged.length, 2);
  console.log(`Quote API: ${assertions} request cases passed; email sender mocked, no real emails sent.`);
})().catch((error) => { console.error(error); process.exitCode = 1; });
