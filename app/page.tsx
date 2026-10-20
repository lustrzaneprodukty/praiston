import Link from "next/link";
import { ShieldCheck, Wrench, Activity } from "lucide-react";
import { categories, featuredProducts } from "@/lib/catalog";
import { Eyebrow, ProductCard } from "@/components/ui";
import VisualSymbol, { categorySymbols } from "@/components/visual-symbol";
import PracticeSection from "@/components/practice-section";
import NewsSection from "@/components/news-section";
import Hero from "@/components/hero";
import { EditorialSections, FaqSection } from "@/components/editorial";
import brandAssets from "@/data/brand-assets.json";
export default function Home() {
  const featured = featuredProducts();
  const roots = categories.filter((c) => !c.parentId);
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
            <span className="headline-line">Więcej możliwości.</span>{" "}
            <span className="headline-line headline-accent">
              Lepsza opieka.
            </span>
          </h1>
          <p>
            Nowy i rekondycjonowany sprzęt medyczny. Wyposażenie i wsparcie dla
            Twojego gabinetu.
          </p>
          <div className="hero-buttons">
            <Link className="button" href="/katalog">
              Odkryj naszą ofertę
            </Link>
            <Link className="button hero-secondary" href="/kontakt">
              Porozmawiajmy
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="tiny-line" /> PONAD 35 LAT NA RYNKU • OD 1989 ROKU
          </div>
        </div>
        <Hero />
      </section>
      <div className="value-strip">
        <div>
          <ShieldCheck />
          <span>
            Nowy i rekondycjonowany <br />
            <strong>Sprzęt objęty gwarancją</strong>
          </span>
        </div>
        <div>
          <Wrench />
          <span>
            Wsparcie techniczne <br />
            <strong>Serwis i usługi</strong>
          </span>
        </div>
        <div>
          <Activity />
          <span>
            Różne specjalizacje <br />
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
            const symbol = categorySymbols[i];
            return (
              <Link
                className={`category-tile specialty-tile specialty-${symbol}`}
                key={c.id}
                href={`/kategorie/${c.slug}`}
              >
                <div className="category-top">
                  <span>0{i + 1}</span>
                </div>
                <div className="specialty-art">
                  <VisualSymbol name={symbol} />
                </div>
                <h3>{c.name}</h3>
                <p className="specialty-description">
                  {
                    [
                      "Diagnostyka, zabiegi i codzienna opieka.",
                      "Wyposażenie Twojego gabinetu stomatologicznego.",
                      "Technologia dla małych i dużych pacjentów.",
                      "Komfort i ergonomia w Twojej placówce.",
                    ][i]
                  }
                </p>
                <span className="category-foot">Poznaj ofertę</span>
              </Link>
            );
          })}
        </div>
        <Link className="text-link category-all" href="/kategorie">
          Zobacz wszystkie specjalizacje
        </Link>
      </section>
      <PracticeSection />
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
          ].map(([name, desc, url], i) => (
            <Link
              className={`service-row service-card service-tone-${i}`}
              key={url}
              href={url}
            >
              <span className="service-art">
                <VisualSymbol
                  name={(["service", "finance", "buyback"] as const)[i]}
                />
              </span>
              <div>
                <h3>{name}</h3>
                <span>{desc}</span>
                <small className="service-action">Poznaj możliwości</small>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <EditorialSections />
      <NewsSection />
      <FaqSection />
      <section className="experience-band" aria-label="Doświadczenie Praiston">
        <div className="experience-number">
          <strong>35<span>+</span></strong>
          <small>LAT NA RYNKU</small>
        </div>
        <div>
          <span>RODZINNA FIRMA. OD 1989 ROKU.</span>
          <h2>Doświadczenie, które pracuje dla Twojej placówki.</h2>
        </div>
        <Link href="/o-nas" className="button outline">
          Poznaj naszą historię
        </Link>
      </section>
    </>
  );
}
