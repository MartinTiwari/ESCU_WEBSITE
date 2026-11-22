// Exercise the real component's hydration effect with unavailable/corrupt
// storage and query changes, without submitting an enquiry or rendering a DOM.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const code = ts.transpileModule(fs.readFileSync("src/components/QuoteForm.tsx", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

for (const storage of [null, "{broken", "[]", "denied", JSON.stringify({ name: "Draft buyer", products: "Old product", productUncertain: true })]) {
  let cursor = 0;
  let product = "PAC Powder";
  let effects = [];
  const states = [];
  const react = {
    useState(initial) {
      const index = cursor++;
      if (!(index in states)) states[index] = initial;
      return [states[index], (value) => { states[index] = typeof value === "function" ? value(states[index]) : value; }];
    },
    useRef: () => ({ current: null }),
    useEffect: (effect) => { effects.push(effect); },
  };
  const imports = (name) => {
    if (name === "react") return react;
    if (name === "react/jsx-runtime") return require(name);
    if (name === "next/navigation") return { useSearchParams: () => new URLSearchParams({ product }) };
    if (name === "next/link") return { default: () => null };
    if (name === "@/lib/site") return { whatsappLink: () => "https://wa.me/" };
    if (name === "@/lib/analytics") return { trackEnquiry: () => {} };
    throw new Error(`Unexpected dependency: ${name}`);
  };
  const exports = {};
  const sessionStorage = { getItem() { if (storage === "denied") throw new Error("Storage denied"); return storage; } };
  new Function("require", "exports", "sessionStorage", code)(imports, exports, sessionStorage);
  function render() {
    cursor = 0;
    effects = [];
    exports.default();
    effects[0]();
  }
  render();
  assert.equal(states[1].products, "PAC Powder");
  product = "TCCA 90%";
  render();
  assert.equal(states[1].products, product, `Query change failed with storage ${storage}`);
  assert.equal(states[1].productUncertain, false);
  if (storage?.includes("Draft buyer")) assert.equal(states[1].name, "Draft buyer");
}
console.log("PASS: quote product changes with empty, corrupt, array, denied and valid draft storage; saved contact preserved.");
