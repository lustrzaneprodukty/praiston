import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, categoryProducts } from "@/lib/catalog";
import { Breadcrumbs, Eyebrow } from "@/components/ui";
export const metadata = { title: "Kategorie i specjalizacje" };
export default function Categories() {
  return (
    <div className="page-shell">
      <Breadcrumbs items={[{ name: "Kategorie" }]} />
      <div className="page-intro">
        <Eyebrow>KATALOG / SPECJALIZACJE</Eyebrow>
        <h1>Wybierz swój obszar.</h1>
        <p>Cała oferta Praiston, uporządkowana według zastosowań.</p>
      </div>
      {categories
        .filter((c) => !c.parentId)
        .map((root, i) => (
          <section key={root.id} className="category-directory">
            <h2>
              <span>0{i + 1}</span>
              <Link href={`/kategorie/${root.slug}`}>
                {root.name} <ArrowUpRight />
              </Link>
            </h2>
            <div>
              {categories
                .filter((c) => c.parentId === root.id)
                .map((c) => (
                  <Link key={c.id} href={`/kategorie/${c.slug}`}>
                    <span>{c.name}</span>
                    <small>{categoryProducts(c.id).length}</small>
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
            </div>
          </section>
        ))}
    </div>
  );
}
