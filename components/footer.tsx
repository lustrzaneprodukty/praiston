import Link from "next/link";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { Logo } from "./header";
export default function Footer() {
  return (
    <footer className="footer premium-footer">
      <div className="footer-invitation">
        <div>
          <span className="footer-eyebrow">
            DOBRA ROZMOWA TO DOBRY POCZĄTEK
          </span>
          <h2>
            Co możemy zrobić
            <br />
            dla Twojej placówki?
          </h2>
        </div>
        <Link href="/kontakt" className="footer-advisor">
          <MessageSquare size={22} strokeWidth={1.5} aria-hidden="true" />
          <span>
            Znajdź właściwą osobę<small>Sprzedaż, serwis i finansowanie</small>
          </span>
        </Link>
      </div>
      <div className="footer-contact-grid">
        <a href="tel:+48655270167" className="footer-contact-item">
          <span className="footer-contact-icon">
            <Phone size={23} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span>
            <small>ZADZWOŃ</small>
            <strong>+48 65 527 01 67</strong>
            <span>Porozmawiajmy o sprzęcie</span>
          </span>
        </a>
        <a href="mailto:biuro@praiston.pl" className="footer-contact-item">
          <span className="footer-contact-icon">
            <Mail size={23} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span>
            <small>NAPISZ</small>
            <strong>biuro@praiston.pl</strong>
            <span>Opisz, czego potrzebujesz</span>
          </span>
        </a>
        <Link href="/kontakt" className="footer-contact-item">
          <span className="footer-contact-icon">
            <MapPin size={23} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span>
            <small>ODWIEDŹ NAS</small>
            <strong>ul. Okrężna 8</strong>
            <span>64-100 Leszno, Polska</span>
          </span>
        </Link>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Praiston — strona główna">
            <Logo />
          </Link>
          <p>
            Sprzęt, wiedza i wsparcie.
            <br />
            Dla tych, którzy dbają o innych.
          </p>
          <span className="footer-company">Praiston Sp. z o.o.</span>
          <span className="footer-experience">
            35+ lat na rynku · od 1989 roku
          </span>
        </div>
        <div>
          <h3>Wyposażenie</h3>
          <Link href="/katalog">Katalog produktów</Link>
          <Link href="/kategorie">Kategorie i specjalizacje</Link>
          <Link href="/zapytanie">Zapytanie ofertowe</Link>
        </div>
        <div>
          <h3>Wsparcie placówki</h3>
          <Link href="/serwis">Serwis i usługi</Link>
          <Link href="/finansowanie">Finansowanie</Link>
          <Link href="/skup-sprzetu">Skup sprzętu</Link>
        </div>
        <div>
          <h3>Poznaj Praiston</h3>
          <Link href="/o-nas">O firmie</Link>
          <Link href="/certyfikaty">Certyfikaty</Link>
          <Link href="/aktualnosci">Aktualności</Link>
          <Link href="/kontakt">Zespół i dane kontaktowe</Link>
        </div>
      </div>
      <div className="company-details">
        <div>
          <span>DANE FIRMY / DO FAKTURY</span>
          <strong>Praiston Sp. z o.o.</strong>
          <p>ul. Górowska 32, 64-100 Leszno, Polska</p>
        </div>
        <dl>
          <div>
            <dt>NIP</dt>
            <dd>697-238-39-77</dd>
          </div>
          <div>
            <dt>REGON</dt>
            <dd>520320067</dd>
          </div>
          <div>
            <dt>KRS</dt>
            <dd>0000930089</dd>
          </div>
        </dl>
      </div>
      <div className="professional-note">
        Serwis przeznaczony dla profesjonalistów w dziedzinie wyrobów medycznych
        — osób wykonujących zawód medyczny lub prowadzących obrót wyrobami
        medycznymi oraz ich pracowników i współpracowników.
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Praiston</span>
        <span>Wersja demonstracyjna • Formularze nie wysyłają wiadomości</span>
      </div>
    </footer>
  );
}
