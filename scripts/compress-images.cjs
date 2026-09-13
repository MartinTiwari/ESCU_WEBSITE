const sharp = require("sharp");
const fs = require("node:fs/promises");
const path = require("node:path");

async function sources(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? sources(file) : /\.(png|jpe?g)$/i.test(file) ? [file] : [];
  }));
  return groups.flat();
}

async function main() {
  const results = [];
  for (const input of await sources("public")) {
    const output = input.replace(/\.(png|jpe?g)$/i, ".webp");
    const lossless = input.endsWith(".png");
    const original = await fs.readFile(input);
    const compressed = await sharp(original).webp(lossless ? { lossless: true, effort: 6 } : { quality: 85, effort: 6 }).toBuffer();
    if (compressed.length >= original.length) {
      results.push({ input, retainedOriginal: true });
      continue;
    }
    if (lossless) {
      const before = await sharp(original).ensureAlpha().raw().toBuffer();
      const after = await sharp(compressed).ensureAlpha().raw().toBuffer();
      if (!before.equals(after)) throw new Error(`${input}: lossless verification failed`);
    }
    await fs.writeFile(output, compressed);
    results.push({ input, output, inputBytes: original.length, outputBytes: compressed.length, lossless });
  }
  console.log(JSON.stringify(results, null, 2));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
