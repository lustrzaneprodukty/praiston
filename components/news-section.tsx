import Link from "next/link";
import { latestNews } from "@/lib/news";
import { pages } from "@/lib/catalog";
import { Breadcrumbs, Eyebrow } from "./ui";
export function NewsCards() {
  return (
    <div className="journal-grid">
      {latestNews.map((item, i) => (
        <article className={`journal-card journal-tone-${i}`} key={item.id}>
          <Link
            className="journal-visual"
            href={`/${item.slug}`}
            aria-label={item.title}
          >
            <img
              src={item.image}
              alt=""
              width="100"
              height="100"
              loading="lazy"
            />
            <div>
              <span>{item.category}</span>
              <strong>{item.mark}</strong>
              <small>{item.date}</small>
            </div>
          </Link>
          <div className="journal-copy">
            <span className="journal-status">{item.status}</span>
            <h3>
              <Link href={`/${item.slug}`}>{item.title}</Link>
            </h3>
            <p>{item.excerpt}</p>
            <Link href={`/${item.slug}`} className="journal-read">
              Czytaj wpis
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
export default function NewsSection() {
  return (
    <section
      className="section journal-section"
      aria-labelledby="journal-title"
    >
      <div className="section-heading">
        <div>
          <Eyebrow>Z ŻYCIA PRAISTON</Eyebrow>
          <h2 id="journal-title">
            Blisko branży.
            <br />
            Na bieżąco z medycyną.
          </h2>
        </div>
        <div className="journal-intro">
          <p>
            Wydarzenia, spotkania i informacje z naszej oferty. Zobacz cztery
            najnowsze wpisy.
          </p>
          <Link href="/aktualnosci" className="button outline">
            Wszystkie aktualności
          </Link>
        </div>
      </div>
      <Link href="/aktualnosci" className="journal-banner">
        <img
          src="/images/medical-events.png"
          alt="Ilustracyjna scena spotkania specjalistów podczas targów technologii medycznych"
          width="1536"
          height="1024"
          loading="lazy"
        />
        <span>SPOTKANIA. WIEDZA. WSPÓŁPRACA.</span>
        <h3>
          Tam, gdzie medycyna
          <br />
          spotyka technologię.
        </h3>
        <p>Odkryj aktualności Praiston</p>
        <small>Wizualizacja poglądowa</small>
      </Link>
      <NewsCards />
    </section>
  );
}
export function NewsIndex() {
  const archive = pages.filter(
    (p) =>
      p.sourceUrl.includes("/article/") &&
      !latestNews.some((n) => n.slug === p.slug),
  );
  return (
    <div className="page-shell journal-index">
      <Breadcrumbs items={[{ name: "Aktualności" }]} />
      <div className="page-intro">
        <Eyebrow>Z ŻYCIA PRAISTON</Eyebrow>
        <h1>
          Wiedza. Spotkania.
          <br />
          Nowe możliwości.
        </h1>
        <p>Wydarzenia i informacje, które tworzą historię Praiston.</p>
      </div>
      <NewsCards />
      <section className="journal-archive">
        <h2>Wcześniejsze wpisy</h2>
        <p>
          Archiwum wydarzeń i ofert. Historyczne promocje mogą już nie
          obowiązywać.
        </p>
        <div>
          {archive.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`}>
              {p.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
