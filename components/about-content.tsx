import Link from "next/link";
import { ShieldCheck, Wrench, GraduationCap, Settings2 } from "lucide-react";
import { Breadcrumbs, Eyebrow } from "./ui";
const partners = [
  [
    "EUROMI",
    "Belgia",
    "Systemy N.I.L. EVA sp, Dermatic oraz rozwiązania dla chirurgii plastycznej i medycyny estetycznej.",
  ],
  ["EMALED", "Niemcy", "Ledowe lampy operacyjne i zabiegowe."],
  ["LID", "Francja", "Lampy zabiegowe LED i halogenowe."],
  [
    "Plasma Fission",
    "Technologia plazmowa",
    "Urządzenie do wykonywania zabiegów z wykorzystaniem wiązki plazmy.",
  ],
  [
    "ÜZÜMCÜ",
    "Turcja",
    "Wyposażenie sal operacyjnych, fotele ginekologiczno-urologiczne, łóżka transportowe i meble ze stali nierdzewnej.",
  ],
  [
    "NITROCARE",
    "Turcja",
    "Łóżka szpitalne, transportowe i OIOM, fotele i meble medyczne oraz projekty pod klucz.",
  ],
  [
    "WESSELING - BV",
    "Holandia",
    "Stoły zabiegowe, rehabilitacyjne, flebologiczne i trakcyjne, fotele ginekologiczne oraz stoły weterynaryjne.",
  ],
  [
    "BIOGENESIS",
    "Urugwaj",
    "Akcesoria do monitorowania funkcji życiowych: kable, czujniki i przewody.",
  ],
];
export default function AboutContent() {
  return (
    <div className="page-shell about-page">
      <Breadcrumbs items={[{ name: "O nas" }]} />
      <section className="about-hero">
        <div>
          <Eyebrow>RODZINNA FIRMA. OD 1989 ROKU.</Eyebrow>
          <h1>
            Technologia się zmienia.
            <br />
            <em>Nasze zaangażowanie pozostaje.</em>
          </h1>
          <p>
            Praiston powstał w 1989 roku z inicjatywy Zenona Praisa. Od pokoleń
            budujemy rodzinną firmę, której codziennością jest sprzęt medyczny i
            wsparcie profesjonalistów.
          </p>
          <div className="about-years">
            <strong>35+</strong>
            <span>
              lat doświadczenia
              <br />
              na rynku medycznym
            </span>
          </div>
        </div>
        <figure>
          <img
            src="/images/medical-practice.png"
            alt="Poglądowa wizualizacja wyposażenia gabinetu medycznego"
            width="1536"
            height="1024"
          />
          <figcaption>
            Wyposażenie dla codziennej praktyki · wizualizacja poglądowa
          </figcaption>
        </figure>
      </section>
      <section className="about-mission">
        <Eyebrow>NASZA MISJA</Eyebrow>
        <h2>
          Być partnerem,
          <br />
          na którego możesz liczyć.
        </h2>
        <div>
          <p>
            Kompleksowa obsługa to dla nas coś więcej niż dostarczenie
            urządzenia. To profesjonalne doradztwo, pomoc specjalistów oraz
            wsparcie techniczne i serwisowe.
          </p>
          <p>
            Dostarczamy sprzęt nowy, rekondycjonowany i powystawowy. Pomagamy
            wyposażać sale operacyjne, prywatne kliniki i gabinety — od
            pojedynczego urządzenia po szerszy plan zakupów.
          </p>
        </div>
      </section>
      <section className="about-services">
        <div className="section-heading">
          <div>
            <Eyebrow>WIĘCEJ NIŻ DYSTRYBUCJA</Eyebrow>
            <h2>Wsparcie na każdym etapie.</h2>
          </div>
        </div>
        <div className="about-service-grid">
          {[
            {
              Icon: Settings2,
              title: "Dobór i zamówienia",
              text: "Doradztwo, indywidualne zamówienia i możliwości finansowania. Jeśli nie znajdujesz urządzenia w katalogu, zapytaj nas o dostępność.",
            },
            {
              Icon: Wrench,
              title: "Serwis i przeglądy",
              text: "Naprawy, okresowe przeglądy, wsparcie techniczne i serwis pogwarancyjny. Obsługujemy również sprzęt zakupiony poza Praiston.",
            },
            {
              Icon: GraduationCap,
              title: "Wiedza i pomoc",
              text: "Szkolenia, możliwość bezpłatnego testowania wybranego sprzętu oraz urządzenia zastępcze podczas awarii lub naprawy — zapytaj o dostępność.",
            },
            {
              Icon: ShieldCheck,
              title: "Cały cykl życia sprzętu",
              text: "Rekondycjonowanie, skup wybranych urządzeń i utylizacja potwierdzona odpowiednim oświadczeniem.",
            },
          ].map(({ Icon, title, text }) => (
            <article key={title}>
              <Icon size={28} strokeWidth={1.4} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-recondition">
        <img
          src="/images/medical-service.webp"
          alt="Ilustracyjna scena pracy przy aparaturze medycznej"
          width="1536"
          height="1024"
          loading="lazy"
        />
        <div>
          <Eyebrow>SPRZĘT REKONDYCJONOWANY</Eyebrow>
          <h2>
            Drugie życie sprzętu.
            <br />
            Konkretne przygotowanie.
          </h2>
          <p>
            Przed wprowadzeniem do oferty urządzenia przechodzą kompleksowy
            przegląd techniczny wykonywany przez naszych inżynierów.
          </p>
          <ol>
            <li>
              <strong>Przegląd i przygotowanie</strong>
              <span>
                Sprawdzenie stanu technicznego oraz wykonanie niezbędnych prac.
              </span>
            </li>
            <li>
              <strong>Testy funkcji</strong>
              <span>Weryfikacja działania urządzenia przed sprzedażą.</span>
            </li>
            <li>
              <strong>Dokumentacja i wsparcie</strong>
              <span>
                Paszport techniczny, 6-miesięczna gwarancja oraz możliwość
                serwisu pogwarancyjnego.
              </span>
            </li>
          </ol>
          <Link href="/serwis" className="button">
            Poznaj nasz serwis
          </Link>
        </div>
      </section>
      <section className="about-partners">
        <Eyebrow>WYŁĄCZNA DYSTRYBUCJA</Eyebrow>
        <h2>
          Specjalistyczne technologie.
          <br />
          Międzynarodowe doświadczenie.
        </h2>
        <div>
          {partners.map(([brand, country, text]) => (
            <article key={brand}>
              <span>{country}</span>
              <h3>{brand}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-scope">
        <div>
          <Eyebrow>RÓŻNE SPECJALIZACJE. JEDEN PARTNER.</Eyebrow>
          <h2>
            Od gabinetu
            <br />
            po salę operacyjną.
          </h2>
        </div>
        <p>
          Nasza oferta obejmuje m.in. anestezjologię, kardiologię, dermatologię,
          chirurgię i chirurgię plastyczną, rehabilitację, ortopedię,
          radiologię, endoskopię, ginekologię, laryngologię, ultrasonografię,
          urologię, medycynę estetyczną, stomatologię i weterynarię. Uzupełniają
          ją meble i drobne urządzenia medyczne.
        </p>
      </section>
      <section className="about-order">
        <div>
          <Eyebrow>INDYWIDUALNE ZAMÓWIENIA</Eyebrow>
          <h2>Szukasz konkretnego urządzenia?</h2>
          <p>
            Realizujemy zamówienia na specjalistyczny sprzęt, w tym MRI, CT, RTG
            i wysokiej klasy USG, korzystając z sieci dostawców z Unii
            Europejskiej. Oferujemy import z dostawą do klienta w terminie do 30
            dni; szczegóły realizacji potwierdzamy przy zamówieniu.
          </p>
          <p>
            Urządzenie, którego potrzebujesz, może być właśnie w transporcie lub
            w trakcie przeglądu. Porozmawiajmy o Twoich planach.
          </p>
        </div>
        <Link href="/zapytanie" className="button">
          Zapytaj o sprzęt
        </Link>
      </section>
    </div>
  );
}
