import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const [id, inputArgument] = process.argv.slice(2);

if (!id || !inputArgument || !/^gallery-[a-z0-9-]+$/i.test(id)) {
  console.error("Usage: node scripts/process-gallery-image.mjs <gallery-id> <input-image>");
  process.exit(1);
}

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const inputPath = path.resolve(process.cwd(), inputArgument);
const outputDirectory = path.join(projectRoot, "public", "gallery");

async function writeWebp(maxEdge, suffix) {
  await sharp(inputPath)
    .rotate()
    .resize({ width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(outputDirectory, `${id}${suffix}.webp`));
}

await writeWebp(1024, "");
await writeWebp(480, "-thumb");
console.log(`Created ${id}.webp and ${id}-thumb.webp in public/gallery.`);
