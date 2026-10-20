/** Unpack locally versioned media. No network, credentials or external services. */
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { createHash } from "node:crypto";
const root = fileURLToPath(new URL("../", import.meta.url));
const assets = join(root, "assets");
if (!existsSync(assets)) process.exit(0);
let count = 0;
for (const name of readdirSync(assets)
  .filter((n) => /^catalog-media-\d+\.json\.gz$/.test(n))
  .sort()) {
  const files = JSON.parse(
    gunzipSync(readFileSync(join(assets, name))).toString("utf8"),
  );
  for (const file of files) {
    if (!/^media\/[a-f0-9]{20}\.webp$/.test(file.path))
      throw new Error("Invalid media path");
    const destination = join(root, "public", file.path);
    if (
      existsSync(destination) &&
      createHash("sha256").update(readFileSync(destination)).digest("hex") ===
        file.sha256
    )
      continue;
    const bytes = Buffer.from(file.base64, "base64");
    if (createHash("sha256").update(bytes).digest("hex") !== file.sha256)
      throw new Error("Corrupt media archive: " + file.path);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, bytes);
    count++;
  }
}
console.log(`Local media ready (${count} files unpacked).`);
