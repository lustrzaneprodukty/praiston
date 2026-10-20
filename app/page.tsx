import Link from "next/link";
import {
  ShieldCheck,
  Wrench,
  Activity,
  ScanLine,
  Armchair,
  Stethoscope,
  HeartPulse,
} from "lucide-react";
import { categories, categoryProducts, featuredProducts } from "@/lib/catalog";
import { Eyebrow, ProductCard, ContactBand } from "@/components/ui";
import Hero from "@/components/hero";
import { EditorialSections } from "@/components/editorial";
import brandAssets from "@/data/brand-assets.json";
export default function Home() {
  const featured = featuredProducts();
  const roots = categories.filter((c) => !c.parentId);
  const icons = [Stethoscope, ScanLine, HeartPulse, Armchair];
  return (
    <>
      <section className="hero photo-hero">
        <img
          className="hero-scene"
          src="/images/medical-room.webp"
          alt="Wizualizacja nowoczesnej sali z wyposażeniem medycznym"
          width="1536"
          height="1024"
          fetchPriority="high"
        />
        <div className="hero-content">
          <Eyebrow>SPRZĘT. WIEDZA. WSPARCIE.</Eyebrow>
          <h1>
            Więcej możliwości.
            <br />
            <span>Lepsza opieka.</span>
          </h1>
          <p>
            Wyposażenie, które pomaga Ci robić to, co najważniejsze. Poznaj nowy
            i rekondycjonowany sprzęt medyczny — od gabinetu po salę operacyjną.
          </p>
          <div className="hero-buttons">
            <Link className="button" href="/katalog">
              Odkryj naszą ofertę
            </Link>
            <Link className="text-link" href="/kontakt">
              Porozmawiajmy
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="tiny-line" /> DLA TYCH, KTÓRZY DBAJĄ O INNYCH
          </div>
        </div>
        <Hero />
      </section>
      <div className="value-strip">
        <div>
          <ShieldCheck />
          <span>
            Nowy i rekondycjonowany
            <br />
            <strong>Sprzęt objęty gwarancją</strong>
          </span>
        </div>
        <div>
          <Wrench />
          <span>
            Wsparcie techniczne
            <br />
            <strong>Serwis i usługi</strong>
          </span>
        </div>
        <div>
          <Activity />
          <span>
            Różne specjalizacje
            <br />
            <strong>Jedno miejsce. Wiele możliwości.</strong>
          </span>
        </div>
        <Link href="/o-nas">Poznaj Praiston</Link>
      </div>
      <section className="brand-section" aria-labelledby="brands-title">
        <div className="brand-heading">
          <div>
            <Eyebrow>MARKI W NASZEJ OFERCIE</Eyebrow>
            <h2 id="brands-title">
              Dobre technologie.
              <br />
              Sprawdzeni producenci.
            </h2>
          </div>
          <p>
            Rozwiązania różnych marek.
            <br />
            Wsparcie jednego partnera.
          </p>
        </div>
        <ul className="brand-grid">
          {brandAssets
            .filter((a) =>
              /\/(emaled|nitrocare|wesseling|JorgSohn|seersmedical|uzumcu)\.png/.test(
                a.sourceUrl,
              ),
            )
            .map((a) => (
              <li key={a.src}>
                <span className="brand-name">
                  {(
                    {
                      emaled: "EMALED",
                      nitrocare: "Nitrocare",
                      wesseling: "Wesseling",
                      JorgSohn: "Jörg & Sohn",
                      seersmedical: "SEERS Medical",
                      uzumcu: "Üzümcü",
                    } as Record<string, string>
                  )[a.alt] || a.alt}
                </span>
              </li>
            ))}
        </ul>
      </section>
      <section className="section offer-section">
        <div className="section-heading">
          <div>
            <Eyebrow>ZNAJDŹ SWÓJ SPRZĘT</Eyebrow>
            <h2>
              Twoja specjalizacja.
              <br />
              Nasze rozwiązania.
            </h2>
          </div>
          <p>
            Od wyposażenia gabinetu po zaawansowaną
            <br className="desktop-break" /> aparaturę. Znajdź sprzęt, którego
            potrzebujesz.
          </p>
        </div>
        <div className="category-grid">
          {roots.slice(0, 4).map((c, i) => {
            const Icon = icons[i % 4];
            return (
              <Link
                className="category-tile"
                key={c.id}
                href={`/kategorie/${c.slug}`}
              >
                <div className="category-top">
                  <span>0{i + 1}</span>
                </div>
                {(() => {
                  const options = categoryProducts(c.id);
                  const preferred = [
                    /fotel.*teyco/i,
                    /lampa do wybielania/i,
                    /stół weterynaryjny/i,
                    /taboret/i,
                  ][i];
                  const sample =
                    options.find(
                      (p) => p.images[0]?.src && preferred.test(p.name),
                    ) || options.find((p) => p.images[0]?.src);
                  return sample ? (
                    <img
                      className="category-product"
                      src={sample.images[0].src}
                      alt=""
                      width="240"
                      height="180"
                      loading="lazy"
                    />
                  ) : (
                    <Icon className="category-icon" strokeWidth={1} />
                  );
                })()}
                <h3>{c.name}</h3>
                <span className="category-foot">Odkryj kategorię</span>
              </Link>
            );
          })}
        </div>
        <Link className="text-link category-all" href="/kategorie">
          Zobacz wszystkie specjalizacje
        </Link>
      </section>
      <section className="section product-section">
        <div className="section-heading">
          <div>
            <Eyebrow>WYBRANE Z KATALOGU</Eyebrow>
            <h2>Przyjrzyj się możliwościom.</h2>
          </div>
          <Link className="button outline" href="/katalog">
            Cały katalog
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="support-section">
        <div className="support-story">
          <span className="support-kicker">PRAISTON / TWÓJ PARTNER</span>
          <h2>
            Ty dbasz o ludzi.
            <br />
            <span>My o Twój sprzęt.</span>
          </h2>
          <ol className="support-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Porozmawiajmy</h3>
                <p>O Twojej placówce i jej potrzebach.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Znajdźmy rozwiązanie</h3>
                <p>Sprzęt dopasowany do Twojej praktyki.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Pozostańmy w kontakcie</h3>
                <p>Serwis i wsparcie po zakupie.</p>
              </div>
            </li>
          </ol>
          <Link href="/kontakt" className="text-link">
            Zacznijmy od rozmowy
          </Link>
        </div>
        <div className="support-copy">
          <Eyebrow>WIĘCEJ NIŻ SPRZĘT</Eyebrow>
          <h2>
            Dobry partner.
            <br />
            Na każdym etapie.
          </h2>
          <p>
            Zakup urządzenia to dopiero początek. Poznaj usługi Praiston i
            możliwości wsparcia Twojej placówki.
          </p>
          {[
            [
              "Serwis i usługi",
              "Wsparcie techniczne dla Twojego sprzętu.",
              "/serwis",
            ],
            [
              "Finansowanie",
              "Poznaj dostępne możliwości finansowania.",
              "/finansowanie",
            ],
            [
              "Skup sprzętu",
              "Porozmawiajmy o Twoim wyposażeniu.",
              "/skup-sprzetu",
            ],
          ].map(([name, desc, url]) => (
            <Link className="service-row" key={url} href={url}>
              <div>
                <h3>{name}</h3>
                <span>{desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <EditorialSections />
      <ContactBand />
    </>
  );
}
