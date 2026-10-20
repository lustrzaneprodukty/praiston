import { Suspense } from "react";
import { products, categories, summary } from "@/lib/catalog";
import CatalogBrowser from "@/components/catalog-browser";
import { Breadcrumbs, Eyebrow } from "@/components/ui";
export const metadata = { title: "Katalog sprzętu medycznego" };
export default function CatalogPage() {
  return (
    <div className="page-shell">
      <Breadcrumbs items={[{ name: "Katalog" }]} />
      <div className="page-intro">
        <Eyebrow>SPRZĘT DLA PROFESJONALISTÓW</Eyebrow>
        <h1>Znajdź swoje rozwiązanie.</h1>
        <p>Przeglądaj ofertę. Porównuj możliwości. Zapytaj o szczegóły.</p>
      </div>
      <Suspense fallback={<p role="status">Ładowanie katalogu…</p>}>
        <CatalogBrowser
          products={products.map(summary)}
          categories={categories}
        />
      </Suspense>
    </div>
  );
}
