import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Wrench,
  Activity,
  Plus,
  ScanLine,
  Armchair,
  Stethoscope,
  HeartPulse,
} from "lucide-react";
import { categories, products, featuredProducts, summary } from "@/lib/catalog";
import { Eyebrow, ProductCard, ContactBand } from "@/components/ui";
import Hero from "@/components/hero";
import brandAssets from "@/data/brand-assets.json";
export default function Home() {
  const featured = featuredProducts();
  const roots = categories.filter((c) => !c.parentId);
  const icons = [Stethoscope, ScanLine, HeartPulse, Armchair];
  const hero =
    products.find(
      (p) => p.images[0]?.src && /lampa.*emaled.*(300|500)/i.test(p.name),
    ) || featured[0];
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <Eyebrow>SPRZĘT. WIEDZA. WSPARCIE.</Eyebrow>
          <h1>
            Technologia
            <br />w służbie
            <br />
            <span>medycyny.</span>
          </h1>
          <p>
            Nowy i rekondycjonowany sprzęt medyczny.
            <br className="desktop-break" /> Przemyślane rozwiązania dla Twojej
            praktyki.
          </p>
          <div className="hero-buttons">
            <Link className="button" href="/katalog">
              Odkryj naszą ofertę <ArrowUpRight size={20} />
            </Link>
            <Link className="text-link" href="/kontakt">
              Porozmawiajmy <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="tiny-line" /> DLA TYCH, KTÓRZY DBAJĄ O INNYCH
          </div>
        </div>
        <Hero product={hero ? summary(hero) : undefined} />
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
        <Link href="/o-nas">
          Poznaj Praiston <ArrowUpRight size={20} />
        </Link>
      </div>
      <div className="brand-strip">
        <span>MARKI W OFERCIE PRAISTON</span>
        <div>
          {brandAssets
            .filter((a) =>
              /\/(emaled|nitrocare|wesseling|JorgSohn|seersmedical)\.png/.test(
                a.sourceUrl,
              ),
            )
            .map((a) => (
              <img
                key={a.src}
                src={a.src}
                alt={a.alt}
                width={a.width}
                height={a.height}
                loading="lazy"
              />
            ))}
        </div>
      </div>
      <section className="section offer-section">
        <div className="section-heading">
          <div>
            <Eyebrow>01 / NASZA OFERTA</Eyebrow>
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
                  <ArrowUpRight size={22} />
                </div>
                <Icon className="category-icon" strokeWidth={1} />
                <h3>{c.name}</h3>
                <span className="category-foot">
                  Odkryj kategorię <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
        <Link className="text-link category-all" href="/kategorie">
          Zobacz wszystkie specjalizacje <Plus size={17} />
        </Link>
      </section>
      <section className="section product-section">
        <div className="section-heading">
          <div>
            <Eyebrow>02 / WYBRANE Z KATALOGU</Eyebrow>
            <h2>Przyjrzyj się możliwościom.</h2>
          </div>
          <Link className="button outline" href="/katalog">
            Cały katalog <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="support-section">
        <div className="support-art" aria-hidden="true">
          <div className="precision-cross">
            <i />
            <i />
          </div>
          <span>PRAISTON / CARE & TECHNOLOGY</span>
        </div>
        <div className="support-copy">
          <Eyebrow>03 / WIĘCEJ NIŻ SPRZĘT</Eyebrow>
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
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
