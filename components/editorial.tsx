import Link from "next/link";
import { Eyebrow } from "./ui";
export function EditorialSections() {
  return (
    <>
      <section className="editorial-section">
        <div className="editorial-photo">
          <img
            src="/images/medical-service.webp"
            alt="Ilustracyjna scena przeglądu aparatury w pracowni technicznej"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <span>SPRZĘT TO POCZĄTEK RELACJI.</span>
        </div>
        <div className="editorial-copy">
          <Eyebrow>CODZIENNOŚĆ TWOJEJ PLACÓWKI</Eyebrow>
          <h2>
            Za każdym urządzeniem
            <br />
            <em>stoi człowiek.</em>
          </h2>
          <p>
            W gabinecie liczy się komfort pracy. W placówce — sprawna
            organizacja. Dlatego o sprzęcie rozmawiamy w kontekście Twoich
            potrzeb, specjalizacji i planów.
          </p>
          <p>
            Kompletujesz wyposażenie od podstaw czy szukasz jednego urządzenia?
            Zacznijmy od tego, co chcesz zmienić. Wspólnie przyjrzymy się
            rozwiązaniom w katalogu.
          </p>
          <Link href="/serwis" className="button">
            Poznaj serwis i wsparcie
          </Link>
        </div>
      </section>
      <section className="choice-section section">
        <div className="section-heading">
          <div>
            <Eyebrow>DWA PODEJŚCIA. WSPÓLNY CEL.</Eyebrow>
            <h2>
              Sprzęt dopasowany
              <br />
              do Twojego planu.
            </h2>
          </div>
          <p>
            Rozwijaj placówkę w swoim tempie.
            <br />
            Zacznij od potrzeb, potem porównaj możliwości.
          </p>
        </div>
        <div className="choice-grid">
          <article>
            <span className="choice-number">01 / NOWY SPRZĘT</span>
            <h3>
              Nowy rozdział
              <br />
              Twojej praktyki.
            </h3>
            <p>
              Poznaj wyposażenie do nowych gabinetów i rozbudowy istniejących
              placówek. Porównaj parametry, zastosowania i dostępne modele.
            </p>
            <Link href="/katalog" className="button">
              Przeglądaj urządzenia
            </Link>
          </article>
          <article>
            <span className="choice-number">02 / REKONDYCJONOWANY</span>
            <h3>
              Nowe możliwości.
              <br />
              Drugie życie sprzętu.
            </h3>
            <p>
              Sprawdź również urządzenia rekondycjonowane. Zapytaj o stan
              konkretnego egzemplarza, dokumentację i zakres przygotowania do
              pracy.
            </p>
            <Link href="/kontakt" className="button outline">
              Porozmawiaj o możliwościach
            </Link>
          </article>
        </div>
      </section>
      <section className="finance-teaser">
        <div>
          <Eyebrow>TWÓJ KOLEJNY KROK</Eyebrow>
          <h2>
            Plany na rozwój?
            <br />
            Porozmawiajmy o finansowaniu.
          </h2>
          <p>Wybór sprzętu i sposób zakupu warto zaplanować razem.</p>
        </div>
        <Link href="/finansowanie" className="button light">
          Poznaj możliwości finansowania
        </Link>
      </section>

    </>
  );
}

export function FaqSection() {
  return (
      <section className="faq-section section">
        <div>
          <Eyebrow>WARTO WIEDZIEĆ</Eyebrow>
          <h2>
            Zacznijmy od
            <br />
            dobrych pytań.
          </h2>
          <p>
            Nie musisz znać konkretnego modelu.
            <br />
            Opowiedz nam, czego potrzebujesz.
          </p>
        </div>
        <div className="faq-list">
          {[
            [
              "Jak znaleźć sprzęt dla mojej specjalizacji?",
              "Przejdź do kategorii lub skorzystaj z wyszukiwarki w katalogu. Jeśli nie znasz nazwy urządzenia, skontaktuj się z nami i opisz jego planowane zastosowanie.",
            ],
            [
              "O co zapytać przy sprzęcie rekondycjonowanym?",
              "Zapytaj o stan urządzenia, zakres wykonanych prac, dokumentację, wyposażenie zestawu oraz warunki gwarancji konkretnego egzemplarza.",
            ],
            [
              "Jak przygotować zapytanie o wyposażenie?",
              "Podaj nazwę lub model urządzenia, liczbę sztuk i planowany termin zakupu. Przy większym projekcie dodaj specjalizację placówki oraz listę potrzebnego wyposażenia.",
            ],
            [
              "Potrzebuję wsparcia po zakupie. Gdzie się zgłosić?",
              "Przejdź do sekcji Serwis i usługi. Przygotuj model, numer seryjny i opis problemu — te informacje ułatwią rozpoczęcie rozmowy z zespołem.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
  );
}
