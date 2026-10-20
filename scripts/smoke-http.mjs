/** Run only after npm run build. Exercises real production HTTP routes. */
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const products = JSON.parse(
  readFileSync(new URL("../data/products.json", import.meta.url), "utf8"),
);
const categories = JSON.parse(
  readFileSync(new URL("../data/categories.json", import.meta.url), "utf8"),
);
const product =
  products.find((p) => p.images.length && p.categoryIds.length) || products[0];
const category =
  categories.find((c) => product.categoryIds.includes(c.id)) || categories[0];
const slug = (p) =>
  p.slug.endsWith("-" + p.id) ? p.slug : p.slug + "-" + p.id;
const port = 4381;
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--port",
    String(port),
    "--hostname",
    "127.0.0.1",
  ],
  {
    cwd: new URL("../", import.meta.url),
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  },
);
let stderr = "";
server.stderr.on("data", (d) => (stderr += d.toString()));
const origin = `http://127.0.0.1:${port}`;
try {
  let ready = false;
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch(origin);
      if (r.status === 200) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  assert(ready, "Production server did not become ready: " + stderr);
  const routes = [
    "/",
    "/katalog",
    "/kategorie",
    `/kategorie/${slug(category)}`,
    `/produkt/${slug(product)}`,
    `/zapytanie?produkt=${slug(product)}`,
    "/kontakt",
    "/serwis",
    "/aktualnosci",
  ];
  for (const route of routes) {
    const r = await fetch(origin + route);
    assert.equal(r.status, 200, route);
    const body = await r.text();
    assert(body.includes('lang="pl"'), route + " Polish html");
    assert(body.includes('id="main"'), route + " main landmark");
    console.log("200", route);
  }
  for (const route of [
    `/produkt/${slug(product)}`,
    `/kategorie/${slug(category)}`,
  ]) {
    const r = await fetch(origin + route, {
      headers: { "cache-control": "no-cache" },
    });
    assert.equal(r.status, 200);
    console.log("REFRESH 200", route);
  }
  for (const route of [
    "/nieistniejaca-strona-7f428c",
    "/produkt/nieistniejacy-7f428c",
    "/kategorie/nieistniejaca-7f428c",
  ]) {
    const r = await fetch(origin + route);
    assert.equal(r.status, 404, route);
    console.log("404", route);
  }
  if (product.images[0]) {
    const r = await fetch(origin + product.images[0].src);
    assert.equal(r.status, 200);
    assert(r.headers.get("content-type")?.includes("image/"));
    console.log("MEDIA 200", product.images[0].src);
  }
  console.log(
    "PASS: direct URLs, refresh, Polish HTML, missing routes and local media.",
  );
} finally {
  server.kill("SIGTERM");
}
