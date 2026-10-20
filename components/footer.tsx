import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./header";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Link href="/" aria-label="Praiston — strona główna">
            <Logo />
          </Link>
          <p>
            Technologia w służbie medycyny.
            <br />
            Sprzęt dla profesjonalistów.
          </p>
          <a href="mailto:biuro@praiston.pl">
            biuro@praiston.pl <ArrowUpRight size={15} />
          </a>
        </div>
        <div>
          <h3>Odkryj ofertę</h3>
          <Link href="/katalog">Katalog produktów</Link>
          <Link href="/kategorie">Wszystkie kategorie</Link>
          <Link href="/zapytanie">Zapytanie ofertowe</Link>
        </div>
        <div>
          <h3>Praiston</h3>
          <Link href="/o-nas">O firmie</Link>
          <Link href="/serwis">Serwis i usługi</Link>
          <Link href="/finansowanie">Finansowanie</Link>
          <Link href="/skup-sprzetu">Skup sprzętu</Link>
        </div>
        <div>
          <h3>Pozostańmy w kontakcie</h3>
          <a href="tel:+48655270167">+48 65 527 01 67</a>
          <Link href="/kontakt">Dane kontaktowe</Link>
          <Link href="/certyfikaty">Certyfikaty</Link>
          <Link href="/aktualnosci">Aktualności</Link>
        </div>
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
