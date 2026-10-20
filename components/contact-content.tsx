import Link from "next/link";
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
const departments = [
  {
    title: "Sprzedaż krajowa",
    people: [
      [
        "Michał Kuniec",
        "Koordynator relacji handlowych i procesów wewnętrznych",
        "728376000",
        "michal.kuniec@praiston.pl",
      ],
      [
        "Marcin Ganowski",
        "Dolnośląskie, Opolskie, Śląskie, Małopolskie, Podkarpackie",
        "882762008",
        "marcin.ganowski@praiston.pl",
      ],
      [
        "Tomasz Staniszewski",
        "Lubelskie, Łódzkie, Mazowieckie, Podlaskie, Świętokrzyskie",
        "608523252",
        "tomasz.staniszewski@praiston.pl",
      ],
      [
        "Jakub Wietrzykowski",
        "Kujawsko-Pomorskie, Lubuskie, Wielkopolskie, Pomorskie, Warmińsko-Mazurskie, Zachodniopomorskie",
        "882762006",
        "jakub.wietrzykowski@praiston.pl",
      ],
    ],
  },
  {
    title: "Serwis i logistyka",
    people: [
      [
        "Marcel Królikowski",
        "Kierownik działu serwisu i logistyki",
        "694794844",
        "marcel.krolikowski@praiston.pl",
      ],
      [
        "Daria Kowalska",
        "Logistyka krajowa",
        "605766556",
        "logistyka@praiston.pl",
      ],
    ],
  },
  {
    title: "Finansowanie",
    people: [
      [
        "Sylwia Wojtkowiak",
        "Specjalista ds. finansowania",
        "506308110",
        "sylwia.wojtkowiak@praiston.pl",
      ],
    ],
  },
  {
    title: "Sprzedaż międzynarodowa",
    people: [
      [
        "Tobiasz Pujanek",
        "Sprzedaż eksportowa",
        "728374000",
        "export@praiston.pl",
      ],
    ],
  },
  {
    title: "Skup i pośrednictwo sprzedaży",
    people: [
      [
        "Tomasz Kowaliński",
        "Dział zakupów z rynku wtórnego",
        "608523054",
        "tomasz.kowalinski@praiston.pl",
      ],
    ],
  },
];
export default function ContactContent() {
  return (
    <div className="contact-content">
      <div className="contact-address">
        <MapPin size={28} strokeWidth={1.2} />
        <span className="eyebrow">ODWIEDŹ NAS</span>
        <h2>Praiston Sp. z o.o.</h2>
        <p>
          ul. Okrężna 8<br />
          64-100 Leszno, Polska
        </p>
        <div className="billing">
          <strong>Dane do faktury</strong>
          <p>
            ul. Górowska 32
            <br />
            64-100 Leszno
            <br />
            NIP 697-238-39-77
            <br />
            REGON 520320067
            <br />
            KRS 0000930089
          </p>
        </div>
        <Link className="button" href="/zapytanie">
          Przygotuj zapytanie <ArrowUpRight size={18} />
        </Link>
      </div>
      <div>
        <h2>Znajdź właściwą osobę.</h2>
        <p className="contact-description">
          Wybierz obszar, w którym potrzebujesz wsparcia.
        </p>
        {departments.map((d, i) => (
          <details className="department" key={d.title} open={i === 0}>
            <summary>
              {d.title}
              <span>+</span>
            </summary>
            <div className="people-grid">
              {d.people.map(([name, role, phone, email]) => (
                <div className="person" key={name}>
                  <h3>{name}</h3>
                  <p>{role}</p>
                  <a href={`tel:+48${phone}`}>
                    <Phone size={13} />
                    +48 {phone.replace(/(.{3})(.{3})(.{3})/, "$1 $2 $3")}
                  </a>
                  <a href={`mailto:${email}`}>
                    <Mail size={13} />
                    {email}
                  </a>
                </div>
              ))}
            </div>
          </details>
        ))}
        <p className="contact-source">
          Dane kontaktowe pochodzą z publicznej strony Praiston.{" "}
          <a
            href="https://www.praiston.pl/pl/kontakt"
            target="_blank"
            rel="noreferrer"
          >
            Pełne dane firmy ↗
          </a>
        </p>
      </div>
    </div>
  );
}
