import Link from "next/link";
import { Breadcrumbs, Eyebrow, ContactBand } from "./ui";
const options = [
  {
    title: "Leasing",
    label: "WYPOSAŻENIE W PLANIE INWESTYCJI",
    text: "Rozważ finansowanie wybranego urządzenia w ramach umowy leasingowej. Zapytaj o dostępność dla konkretnego modelu oraz warunki przedstawiane przez finansującego.",
  },
  {
    title: "Pożyczka",
    label: "ALTERNATYWA WARTA PORÓWNANIA",
    text: "Porozmawiaj o możliwości sfinansowania zakupu pożyczką. Zestaw całkowity koszt, harmonogram spłat i wymagane dokumenty z pozostałymi wariantami.",
  },
];
export default function FinanceContent({ slug }: { slug: string }) {
  const partner =
    slug === "finansowanie-santander-leasing"
      ? "Santander Leasing"
      : slug === "finansowanie-leaselink"
        ? "LeaseLink"
        : null;
  return (
    <>
      <div className="page-shell finance-page">
        <Breadcrumbs
          items={[
            {
              name: "Finansowanie",
              href: partner ? "/finansowanie" : undefined,
            },
            ...(partner ? [{ name: partner }] : []),
          ]}
        />
        <section className="finance-hero">
          <div>
            <Eyebrow>FINANSOWANIE WYPOSAŻENIA</Eyebrow>
            <h1>
              Więcej miejsca
              <br />
              na <em>Twoje plany.</em>
            </h1>
            <p>
              Rozwój gabinetu zaczyna się od dobrego pomysłu. Porozmawiajmy o
              sprzęcie i możliwościach sfinansowania jego zakupu.
            </p>
            <Link className="button" href="/zapytanie?temat=Finansowanie">
              Zapytaj o finansowanie
            </Link>
          </div>
          <div className="finance-visual">
            <img
              src="/images/medical-room.webp"
              alt="Wizualizacja wyposażonej sali medycznej"
              width="1536"
              height="1024"
            />
            <div>
              <small>INWESTUJ W MOŻLIWOŚCI</small>
              <strong>
                Twój gabinet.
                <br />
                Twój kolejny krok.
              </strong>
            </div>
          </div>
        </section>
        {partner && (
          <section className="partner-notice">
            <Eyebrow>WYBRANY PARTNER</Eyebrow>
            <h2>{partner}</h2>
            <p>
              Zapytaj nas o aktualną dostępność oferty tego partnera dla
              wybranego urządzenia. Indywidualne warunki, koszty i wymagania
              zostaną przedstawione w ofercie finansowania.
            </p>
            <Link href="/kontakt" className="text-link">
              Skontaktuj się z zespołem Praiston
            </Link>
          </section>
        )}
        <section className="finance-options">
          <div className="section-heading">
            <div>
              <Eyebrow>PORÓWNAJ MOŻLIWOŚCI</Eyebrow>
              <h2>
                Dobry sprzęt.
                <br />
                Przemyślany sposób zakupu.
              </h2>
            </div>
            <p>
              Wybierz punkt wyjścia do rozmowy.
              <br />
              Szczegóły zależą od urządzenia i indywidualnej oferty.
            </p>
          </div>
          <div className="choice-grid">
            {options.map((o, i) => (
              <article key={o.title}>
                <span className="choice-number">
                  0{i + 1} / {o.label}
                </span>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <Link
                  className="button outline"
                  href={`/zapytanie?temat=${encodeURIComponent("Finansowanie — " + o.title)}`}
                >
                  Zapytaj o {o.title.toLowerCase()}
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section className="finance-process">
          <Eyebrow>OD POTRZEBY DO ROZMOWY O OFERCIE</Eyebrow>
          <h2>Trzy kroki do konkretów.</h2>
          <div>
            {[
              [
                "01",
                "Wskaż urządzenie",
                "Wybierz produkt z katalogu lub opisz wyposażenie, którego potrzebujesz.",
              ],
              [
                "02",
                "Określ potrzeby",
                "Podaj planowany termin zakupu i zakres inwestycji w Twojej placówce.",
              ],
              [
                "03",
                "Porównaj ofertę",
                "Zapytaj o warunki, dokumenty i całkowity koszt proponowanego finansowania.",
              ],
            ].map(([n, t, p]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="finance-partners">
          <div>
            <Eyebrow>INFORMACJE O PARTNERACH</Eyebrow>
            <h2>Sprawdź możliwości współpracy.</h2>
            <p>
              Aktualną dostępność finansowania potwierdzimy dla Twojego
              zapytania.
            </p>
          </div>
          <Link href="/finansowanie-santander-leasing">
            Santander <strong>Leasing</strong>
            <small>Informacje i kontakt</small>
          </Link>
          <Link href="/finansowanie-leaselink">
            <strong>LeaseLink</strong>
            <small>Informacje i kontakt</small>
          </Link>
        </section>
        <section className="finance-checklist">
          <h2>Co przygotować przed rozmową?</h2>
          <ul>
            <li>Nazwę urządzenia lub listę wyposażenia.</li>
            <li>
              Informację, czy interesuje Cię sprzęt nowy czy rekondycjonowany.
            </li>
            <li>Planowany termin zakupu i dane kontaktowe.</li>
          </ul>
          <p>
            Ta strona prezentuje możliwości kontaktu w sprawie finansowania.
            Wiążące warunki określa indywidualna oferta i umowa z finansującym.
          </p>
        </section>
      </div>
      <ContactBand />
    </>
  );
}
