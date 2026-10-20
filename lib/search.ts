import type { Product, Category } from "./types";
export const normalizeSearch = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ł/g, "l");
export function descendants(
  categories: Category[],
  id: string,
  seen = new Set<string>(),
): string[] {
  if (seen.has(id)) return [];
  seen.add(id);
  return [
    id,
    ...categories
      .filter((c) => c.parentId === id)
      .flatMap((c) => descendants(categories, c.id, seen)),
  ];
}
export function filterProducts(
  products: Product[],
  options: {
    query: string;
    categoryIds: string[];
    condition: string;
    sort: string;
  },
): Product[] {
  const words = normalizeSearch(options.query).split(/\s+/).filter(Boolean);
  const ids = new Set(options.categoryIds);
  const result = products.filter(
    (p) =>
      (!ids.size || p.categoryIds.some((id) => ids.has(id))) &&
      (!options.condition || p.condition === options.condition) &&
      words.every((w) =>
        normalizeSearch(`${p.name} ${p.brand || ""} ${p.id}`).includes(w),
      ),
  );
  if (options.sort === "az")
    result.sort((a, b) => a.name.localeCompare(b.name, "pl"));
  if (options.sort === "za")
    result.sort((a, b) => b.name.localeCompare(a.name, "pl"));
  return result;
}
