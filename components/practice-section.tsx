import Link from "next/link";
import { ScanLine, Armchair, Lightbulb } from "lucide-react";
import { Eyebrow } from "./ui";
export default function PracticeSection() {
  return (
    <section className="practice-section" aria-labelledby="practice-title">
      <div className="practice-image">
        <img
          src="/images/medical-practice.png"
          alt="Wizualizacja gabinetu z leżanką, aparatem USG i miejscem pracy lekarza"
          width="1536"
          height="1024"
          loading="lazy"
        />
        <div className="practice-caption">
          <span>PRZESTRZEŃ DLA TWOJEJ PRAKTYKI</span>
          <p>
            Przemyślane wyposażenie.
            <br />
            Od pierwszej konsultacji.
          </p>
        </div>
        <small className="visualization-label">Wizualizacja poglądowa</small>
      </div>
      <div className="practice-copy">
        <Eyebrow>OD URZĄDZENIA DO CAŁEJ PRZESTRZENI</Eyebrow>
        <h2 id="practice-title">
          Twój gabinet.
          <br />
          <em>Wszystko na swoim miejscu.</em>
        </h2>
        <p>
          Wybór wyposażenia to więcej niż lista urządzeń. To miejsce dla
          pacjenta, wygoda specjalisty i sprzęt dopasowany do codziennych zadań.
        </p>
        <div className="practice-links">
          {[
            {
              icon: ScanLine,
              name: "Diagnostyka",
              text: "Znajdź aparaturę do swojej specjalizacji.",
              query: "USG",
            },
            {
              icon: Armchair,
              name: "Komfort pracy",
              text: "Poznaj fotele do wyposażenia gabinetu.",
              query: "fotel",
            },
            {
              icon: Lightbulb,
              name: "Światło i precyzja",
              text: "Sprawdź lampy do badań i zabiegów.",
              query: "lampa",
            },
          ].map(({ icon: Icon, name, text, query }) => (
            <Link key={name} href={`/katalog?q=${encodeURIComponent(query)}`}>
              <span className="practice-icon">
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span>
                <strong>{name}</strong>
                <small>{text}</small>
              </span>
              <span className="practice-link-label">Zobacz</span>
            </Link>
          ))}
        </div>
        <div className="practice-help">
          <p>
            <strong>Planujesz większą zmianę?</strong>
            <br />
            Opisz swoją specjalizację i zakres wyposażenia.
          </p>
          <Link
            className="button"
            href="/zapytanie?temat=Wyposa%C5%BCenie%20gabinetu"
          >
            Zaplanujmy wyposażenie
          </Link>
        </div>
      </div>
    </section>
  );
}
