import { Suspense } from "react";
import { products } from "@/lib/catalog";
import InquiryForm from "@/components/inquiry-form";
import { Breadcrumbs, Eyebrow } from "@/components/ui";
export const metadata = { title: "Zapytanie ofertowe" };
export default function Inquiry() {
  return (
    <div className="page-shell">
      <Breadcrumbs items={[{ name: "Zapytanie ofertowe" }]} />
      <div className="page-intro">
        <Eyebrow>ZACZNIJMY OD ROZMOWY</Eyebrow>
        <h1>Jak możemy Ci pomóc?</h1>
        <p>
          Opowiedz nam o swoich potrzebach. Przygotuj zapytanie o sprzęt lub
          usługi.
        </p>
      </div>
      <Suspense fallback={<p role="status">Przygotowujemy formularz…</p>}>
        <InquiryForm
          products={products.map(({ slug, name }) => ({ slug, name }))}
        />
      </Suspense>
    </div>
  );
}
