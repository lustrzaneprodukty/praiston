import "server-only";
import rawProducts from "@/data/products.json";
import rawCategories from "@/data/categories.json";
import rawPages from "@/data/pages.json";
import type { Product, Category, ContentPage } from "./types";
export const products = (rawProducts as Product[]).map((p) => ({
  ...p,
  slug: p.slug.endsWith("-" + p.id) ? p.slug : p.slug + "-" + p.id,
}));
export const categories = (rawCategories as Category[]).map((c) => ({
  ...c,
  slug: c.slug.endsWith("-" + c.id) ? c.slug : c.slug + "-" + c.id,
}));
export const pages = rawPages as ContentPage[];
export function categoryTree(id: string, seen = new Set<string>()): string[] {
  if (seen.has(id)) return [];
  seen.add(id);
  return [
    id,
    ...categories
      .filter((c) => c.parentId === id)
      .flatMap((c) => categoryTree(c.id, seen)),
  ];
}
export function categoryProducts(id: string) {
  const ids = categoryTree(id);
  return products.filter((p) => p.categoryIds.some((c) => ids.includes(c)));
}
export function summary(p: Product) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    sourceUrl: p.sourceUrl,
    categoryIds: p.categoryIds,
    condition: p.condition,
    ...(p.brand ? { brand: p.brand } : {}),
    description: [],
    specifications: p.specifications.slice(0, 2),
    images: p.images.slice(0, 1),
    documents: [],
  };
}
export function featuredProducts() {
  const chosen: Product[] = [];
  for (const term of ["EMALED", "USG", "Coburg", "TEYCO"]) {
    const p = products.find(
      (p) =>
        p.images.some((i) => i.src) &&
        p.name.includes(term) &&
        !chosen.includes(p),
    );
    if (p) chosen.push(p);
  }
  return [
    ...chosen,
    ...products.filter(
      (p) => !chosen.includes(p) && p.images.some((i) => i.src),
    ),
  ].slice(0, 4);
}

export function categoryAncestors(id: string) {
  const result: Category[] = [];
  const seen = new Set<string>();
  let category = categories.find((c) => c.id === id);
  while (category && !seen.has(category.id)) {
    seen.add(category.id);
    result.unshift(category);
    category = categories.find((c) => c.id === category?.parentId);
  }
  return result;
}
