import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  categoryProducts,
  categoryAncestors,
  summary,
} from "@/lib/catalog";
import CatalogBrowser from "@/components/catalog-browser";
import { Breadcrumbs, Eyebrow } from "@/components/ui";
export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      categories.find((c) => c.slug === slug)?.name ||
      "Nie znaleziono kategorii",
  };
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const children = categories.filter((c) => c.parentId === category.id);
  return (
    <div className="page-shell">
      <Breadcrumbs
        items={[
          { name: "Kategorie", href: "/kategorie" },
          ...categoryAncestors(category.id).map((c) => ({
            name: c.name,
            ...(c.id !== category.id ? { href: `/kategorie/${c.slug}` } : {}),
          })),
        ]}
      />
      <div className="page-intro">
        <Eyebrow>OFERTA PRAISTON</Eyebrow>
        <h1>{category.name}</h1>
        <p>
          Sprawdź dostępne urządzenia i skontaktuj się z nami, aby poznać
          ofertę.
        </p>
      </div>
      {category.description && category.description.length>0 && <details className="category-description"><summary>O kategorii {category.name}</summary>{category.description.map((text,i)=><p key={i}>{text}</p>)}</details>}
      {children.length > 0 && (
        <nav aria-label="Podkategorie" className="category-chips">
          {children.map((c) => (
            <Link key={c.id} href={`/kategorie/${c.slug}`}>
              {c.name} ↗
            </Link>
          ))}
        </nav>
      )}
      <Suspense fallback={<p role="status">Ładowanie produktów…</p>}>
        <CatalogBrowser
          products={categoryProducts(category.id).map(summary)}
          categories={categories}
          initialCategory={category.id}
        />
      </Suspense>
    </div>
  );
}
