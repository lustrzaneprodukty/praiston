import assert from "node:assert/strict";
import { filterProducts, descendants, normalizeSearch } from "../lib/search.ts";
import fs from "node:fs";
import path from "node:path";
import type { Product, Category } from "../lib/types.ts";
const root = path.resolve(import.meta.dirname, "..");
const products = JSON.parse(
  fs.readFileSync(path.join(root, "data/products.json"), "utf8"),
) as Product[];
const categories = JSON.parse(
  fs.readFileSync(path.join(root, "data/categories.json"), "utf8"),
) as Category[];
const pages = JSON.parse(
  fs.readFileSync(path.join(root, "data/pages.json"), "utf8"),
) as { slug: string; sourceUrl: string }[];
const counts = {
  products: products.length,
  categories: categories.length,
  pages: pages.length,
};
assert(products.length > 0, "Catalog is empty");
for (const [name, records] of Object.entries({ products, categories, pages })) {
  const slugs = records.map((r) => r.slug);
  assert.equal(
    new Set(slugs).size,
    slugs.length,
    `${name}: duplicate route slug`,
  );
  for (const r of records)
    assert(
      r.sourceUrl.startsWith("https://www.praiston.pl/"),
      `${name}: missing source URL`,
    );
}
const ids = new Set(categories.map((c) => c.id));
for (const c of categories) {
  let current: Category | undefined = c;
  const seen = new Set<string>();
  while (current) {
    assert(!seen.has(current.id), `Category cycle: ${c.id}`);
    seen.add(current.id);
    if (current.parentId)
      assert(ids.has(current.parentId), `Dangling category parent: ${c.id}`);
    current = categories.find((x) => x.id === current?.parentId);
  }
}
let imageReferences = 0;
for (const p of products) {
  assert(p.name && p.id && p.slug, "Incomplete product identity");
  for (const id of p.categoryIds) assert(ids.has(id), `Unknown category ${id}`);
  for (const image of p.images) {
    assert(image.src.startsWith("/media/"), "Hotlinked product image");
    assert(
      fs.existsSync(path.join(root, "public", image.src)),
      `Missing image: ${image.src}`,
    );
    assert(image.sourceUrl, "Missing image attribution");
    imageReferences++;
  }
}
console.log(
  JSON.stringify({ ...counts, imageReferences, status: "PASS" }, null, 2),
);

assert.equal(normalizeSearch("Łóżko MEDYCZNE"), "lozko medyczne");
const options = {
  query: "",
  categoryIds: [] as string[],
  condition: "",
  sort: "default",
};
assert.equal(filterProducts(products, options).length, products.length);
const example = products.find((p) => p.categoryIds.length)!;
assert(example, "No categorized product");
assert(
  filterProducts(products, { ...options, query: example.name }).some(
    (p) => p.id === example.id,
  ),
);
assert.equal(
  filterProducts(products, {
    ...options,
    query: "__brak_takiego_produktu_7f428c",
  }).length,
  0,
);
const scopedIds = descendants(categories, example.categoryIds[0]);
const scoped = filterProducts(products, {
  ...options,
  categoryIds: scopedIds,
  condition: example.condition,
});
assert(scoped.some((p) => p.id === example.id));
assert(
  scoped.every(
    (p) =>
      p.categoryIds.some((id) => scopedIds.includes(id)) &&
      p.condition === example.condition,
  ),
);
const az = filterProducts(products, { ...options, sort: "az" });
for (let i = 1; i < az.length; i++)
  assert(az[i - 1].name.localeCompare(az[i].name, "pl") <= 0);
const za = filterProducts(products, { ...options, sort: "za" });
for (let i = 1; i < za.length; i++)
  assert(za[i - 1].name.localeCompare(za[i].name, "pl") >= 0);
console.log(
  "PASS: real product search, Polish normalization, empty state, combined filters, sorting.",
);
