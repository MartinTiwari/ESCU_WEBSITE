// Lossless conversion keeps every decoded pixel intact. Keep the PNG master.
const sharp = require("sharp");
const { stat } = require("node:fs/promises");

async function main() {
  const source = "public/images/liquid-flow-hero.png";
  const output = "public/images/liquid-flow-hero.webp";
  await sharp(source).webp({ lossless: true, effort: 6 }).toFile(output);
  const before = await sharp(source).ensureAlpha().raw().toBuffer();
  const after = await sharp(output).ensureAlpha().raw().toBuffer();
  if (!before.equals(after)) throw new Error("Lossless pixel verification failed");
  const inputBytes = (await stat(source)).size;
  const outputBytes = (await stat(output)).size;
  if (outputBytes >= inputBytes) throw new Error("WebP did not reduce file size");
  console.log(JSON.stringify({ inputBytes, outputBytes,
    reductionPercent: Number((100 * (1 - outputBytes / inputBytes)).toFixed(1)),
    pixelsIdentical: true }));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
