import Link from "next/link";
import { notFound } from "next/navigation";
import { FileDown, Phone, ShieldCheck } from "lucide-react";
import { products, categories } from "@/lib/catalog";
import Gallery from "@/components/gallery";
import { Breadcrumbs, ProductCard, Eyebrow } from "@/components/ui";
export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return {
    title: product?.name || "Produkt niedostępny",
    description: product?.description.join(" ").slice(0, 160),
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  const category = categories.find((c) => p.categoryIds.includes(c.id));
  const related = products
    .filter(
      (r) =>
        r.id !== p.id && r.categoryIds.some((id) => p.categoryIds.includes(id)),
    )
    .slice(0, 4);
  return (
    <div className="page-shell product-page">
      <Breadcrumbs
        items={[
          { name: "Katalog", href: "/katalog" },
          ...(category
            ? [{ name: category.name, href: `/kategorie/${category.slug}` }]
            : []),
          { name: p.name },
        ]}
      />
      <div className="product-hero">
        <Gallery images={p.images} name={p.name} />
        <div className="product-overview">
          <Eyebrow>{p.brand || "SPRZĘT MEDYCZNY PRAISTON"}</Eyebrow>
          <h1>{p.name}</h1>
          <div className="product-status">
            <span className="condition">{p.condition || "W ofercie"}</span>
            <span>Nr katalogowy: {p.id}</span>
          </div>
          <p className="product-lead">
            Poznaj szczegóły urządzenia. Zapytaj nas o aktualną dostępność,
            konfigurację i warunki zakupu.
          </p>
          <Link
            className="button product-cta"
            href={`/zapytanie?produkt=${p.slug}`}
          >
            Zapytaj o ten produkt 
          </Link>
          <a className="product-phone" href="tel:+48655270167">
            <Phone size={17} /> Porozmawiaj ze specjalistą{" "}
            <strong>+48 65 527 01 67</strong>
          </a>
          <div className="product-assurance">
            <ShieldCheck size={21} />
            <span>
              Nowy i rekondycjonowany sprzęt objęty gwarancją.
              <br />
              Szczegółowe warunki potwierdzimy w ofercie.
            </span>
          </div>
        </div>
      </div>
      <nav className="product-tabs" aria-label="Informacje o produkcie">
        <a href="#opis">Opis urządzenia</a>
        <a href="#specyfikacja">Specyfikacja</a>
        <a href="#dokumenty">Dokumenty ({p.documents.length})</a>
      </nav>
      <div className="product-information">
        <section id="opis">
          <Eyebrow>INFORMACJE O URZĄDZENIU</Eyebrow>
          <h2>Wszystko, co warto wiedzieć.</h2>
          {p.description.length ? (
            p.description.map((text, i) => <p key={i}>{text}</p>)
          ) : (
            <p>
              Szczegółowy opis jest dostępny u naszego zespołu. Skontaktuj się z
              nami, aby uzyskać szczegóły.
            </p>
          )}
        </section>
        <div>
          <section id="specyfikacja">
            <h2>Specyfikacja techniczna</h2>
            {p.specifications.length ? (
              <dl className="spec-table">
                {p.specifications.map((s, i) => (
                  <div key={i}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p>
                Zapytaj nas o pełne parametry techniczne i dostępne konfiguracje urządzenia.
              </p>
            )}
          </section>
          <section id="dokumenty" className="document-section">
            <h2>Dokumenty do pobrania</h2>
            {p.documents.length ? (
              p.documents.map((d, i) => (
                <a
                  key={i}
                  className="document-link"
                  href={d.url}
                  download={d.url.startsWith("/") ? true : undefined}
                  target={d.url.startsWith("/") ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  <FileDown size={18} />
                  {d.name}
                  
                </a>
              ))
            ) : (
              <p>Potrzebujesz instrukcji lub karty technicznej? Poproś nas o dokumentację tego urządzenia.</p>
            )}
          </section>
          <details className="source-detail">
            <summary>Źródło informacji</summary>
            <p>
              Dane przeniesiono z publicznej karty produktu Praiston. Dostępność
              i wyposażenie wymagają potwierdzenia.
            </p>
            <a href={p.sourceUrl} target="_blank" rel="noreferrer">
              Zobacz oryginalną kartę
            </a>
          </details>
        </div>
      </div>
      {related.length > 0 && (
        <section className="related-section">
          <div className="section-heading">
            <div>
              <Eyebrow>POZNAJ RÓWNIEŻ</Eyebrow>
              <h2>Więcej możliwości.</h2>
            </div>
          </div>
          <div className="product-grid">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
