import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { pages } from "@/lib/catalog";
import FinanceContent from "@/components/finance-content";
import ContactContent from "@/components/contact-content";
import { Breadcrumbs, Eyebrow, ContactBand } from "@/components/ui";
const aliases: Record<string, string> = {
  serwis: "serwis--utylizacja--uslugi",
};
const nav = [
  ["O nas", "o-nas"],
  ["Serwis i usługi", "serwis"],
  ["Finansowanie", "finansowanie"],
  ["Skup sprzętu", "skup-sprzetu"],
  ["Certyfikaty", "certyfikaty"],
  ["Kontakt", "kontakt"],
];
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    ...new Set([...pages.map((p) => p.slug), ...Object.keys(aliases)]),
  ].map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      pages.find((p) => p.slug === (aliases[slug] || slug))?.title ||
      "Praiston",
  };
}
export default async function Content({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "oferta") redirect("/katalog");
  const page = pages.find((p) => p.slug === (aliases[slug] || slug));
  if (!page) notFound();
  if (slug.startsWith("finansowanie")) return <FinanceContent slug={slug} />;
  const news = slug === "aktualnosci";
  const articles = pages.filter((p) => p.sourceUrl.includes("/article/"));
  return (
    <>
      <div className="page-shell">
        <Breadcrumbs items={[{ name: page.title }]} />
        <div className="page-intro">
          <Eyebrow>PRAISTON / {news ? "AKTUALNOŚCI" : "POZNAJMY SIĘ"}</Eyebrow>
          <h1>
            {slug === "kontakt"
              ? "Pozostańmy w kontakcie."
              : slug === "o-nas"
                ? "Technologia to nasza codzienność."
                : slug === "serwis"
                  ? "Wsparcie, na którym możesz polegać."
                  : page.title}
          </h1>
          {slug === "o-nas" && (
            <p>
              Rodzinna firma. Doświadczenie budowane od 1989 roku. Sprzęt i
              wsparcie dla profesjonalistów.
            </p>
          )}
        </div>
        {[
          "o-nas",
          "serwis",
          "serwis--utylizacja--uslugi",
          "skup-sprzetu",
        ].includes(slug) && (
          <figure className="inner-editorial-image">
            <img
              src={
                slug === "o-nas"
                  ? "/images/medical-room.webp"
                  : "/images/medical-service.webp"
              }
              alt="Ilustracja działalności w obszarze wyposażenia medycznego"
              width="1536"
              height="1024"
            />
            <figcaption>
              {slug === "o-nas"
                ? "Przestrzeń dla medycyny. Partner dla Twojej placówki."
                : "Sprzęt, wiedza i wsparcie w jednym miejscu."}
            </figcaption>
          </figure>
        )}
        {slug === "kontakt" && (
          <div className="contact-cards">
            <div className="contact-card">
              <h2>ZADZWOŃ DO NAS</h2>
              <a href="tel:+48655270167">+48 65 527 01 67</a>
            </div>
            <div className="contact-card">
              <h2>NAPISZ DO NAS</h2>
              <a href="mailto:biuro@praiston.pl">biuro@praiston.pl</a>
            </div>
          </div>
        )}
        {slug === "kontakt" ? (
          <ContactContent />
        ) : news && articles.length ? (
          <div className="news-grid">
            {articles.map((a) => (
              <article key={a.slug} className="news-card">
                {a.images?.[0]?.src && (
                  <img
                    src={a.images[0].src}
                    alt={a.title}
                    width="600"
                    height="350"
                    loading="lazy"
                  />
                )}
                <h2>{a.title}</h2>
                <p>{a.paragraphs[0]}</p>
                <Link className="text-link" href={`/${a.slug}`}>
                  Czytaj dalej
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="content-layout">
            <aside className="content-aside" aria-label="Informacje o firmie">
              {nav.map(([label, url]) => (
                <Link
                  key={url}
                  href={`/${url}`}
                  className={slug === url ? "active" : ""}
                >
                  {label}
                </Link>
              ))}
            </aside>
            <article className="prose">
              {(slug === "serwis" || slug === "zgloszenie-serwisowe") && (
                <p>
                  <Link
                    href="/zapytanie?temat=Zgłoszenie%20serwisowe"
                    className="button"
                  >
                    Przygotuj zgłoszenie serwisowe
                  </Link>
                </p>
              )}
              {slug === "finansowanie" && (
                <nav
                  className="category-chips"
                  aria-label="Możliwości finansowania"
                >
                  {pages
                    .filter((p) => p.slug.startsWith("finansowanie-"))
                    .map((p) => (
                      <Link key={p.slug} href={`/${p.slug}`}>
                        {p.title}
                      </Link>
                    ))}
                </nav>
              )}
              {page.paragraphs.length ? (
                page.paragraphs.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>
                  Treść tej strony ma formę materiałów graficznych lub nie była
                  dostępna do przeniesienia. Nie uzupełniamy jej
                  niezweryfikowanymi informacjami.
                </p>
              )}
              {page.images
                ?.filter((i) => i.src)
                .map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt || page.title}
                    loading="lazy"
                    width="800"
                    height="500"
                  />
                ))}
              {slug === "kontakt" && (
                <Link href="/zapytanie" className="button">
                  Przygotuj zapytanie
                </Link>
              )}
              <details className="source-detail">
                <summary>Materiały źródłowe</summary>
                <a href={page.sourceUrl} target="_blank" rel="noreferrer">
                  Zobacz treść w obecnym serwisie Praiston
                </a>
              </details>
            </article>
          </div>
        )}
      </div>
      {slug !== "kontakt" && <ContactBand />}
    </>
  );
}
