# Raport realizacji — 20.10.2026

## Zakres danych

| Pozycja | Liczba |
|---|---:|
| Adresy objęte próbą odczytu | 3600 |
| Adresy z odpowiedzią zapisaną w cache | 3499 |
| Kategorie | 753 |
| Produkty zapisane lokalnie | 2459 |
| Strony firmowe i usługowe | 12 |
| Artykuły | 100 |
| Unikalne lokalne obrazy po deduplikacji treści | 5573 |
| Powiązania zdjęć z produktami | 7177 |
| Odkryte identyfikatory produktów | 3396 |
| Odkryte produkty bez pobranej karty | 937 |
| Produkty bez lokalnego zdjęcia | 1204 |
| Produkty bez opisu w zapisanym źródle | 5 |
| Odnośniki do dokumentów / lokalne dokumenty | 3 / 0 |

3499 zapisanych odpowiedzi nie oznacza tylu odrębnych stron treści: liczba obejmuje m.in. paginację. Dziennik zawiera 119 nieudanych prób; ponowne próby i istniejący cache mogą dotyczyć tego samego adresu. Nie należy odejmować liczby błędów od liczby URL jako metody liczenia treści.

**Nie potwierdzono kompletności katalogu ani wszystkich publicznych podstron.** Przejrzano hierarchię kategorii i paginację, nie tylko pierwszy listing. Sprawdzone adresy sitemap nie udostępniły mapy XML; robots.txt nie wskazywał mapy. Szczegóły: `data/sitemap-check.json`, `data/discovered-urls.json`, `data/coverage.json`.

Dalsze pobieranie zatrzymała blokada sieci środowiska (`Tunnel connection failed: 403 Forbidden`, następnie anulowana zgoda sieciowa). Nie omijano ograniczeń. Lokalny snapshot nie zależy od dalszej dostępności źródła.

Nie pobierano oryginałów z wykluczonego przez robots.txt `/uploads/`. Zdjęcia to dozwolone miniatury i warianty z publicznego HTML, dlatego nie wszystkie mają rozdzielczość odpowiednią do dużego powiększenia. Trzy dokumenty znajdują się w wykluczonej ścieżce; zachowano adresy źródłowe i status niedostępności. Pozostałe brakujące zdjęcia otrzymują uczciwy placeholder.

Wszystkie zapisane produkty mają kategorię, a wszystkie kategorie poprawne powiązanie w drzewie. Nie wykryto cykli ani brakujących lokalnych plików wskazanych przez dane. Źródła, parametry i powiązania pozostają w JSON; `data/url-map.json` mapuje stare adresy na nowe.

## Projekt i funkcje

Spójny frontend obejmuje stronę główną, katalog, podkategorie, wszystkie zapisane produkty, treści firmowe, usługi, aktualności, kontakt i 404. Kierunek wizualny: ciepła biel, grafit, pomarańczowy akcent, duża typografia Manrope i rzeczywiste zdjęcia sprzętu. Przestrzenna kompozycja hero jest wykonana w CSS, z ograniczeniem ruchu na urządzeniach dotykowych i przy prefers-reduced-motion.

Działają wyszukiwanie rzeczywistych produktów, filtrowanie kategorii i stanu, sortowanie, dokładanie wyników, menu mobilne, galeria i powiększanie, akordeony oraz walidacja zapytania z produktem. Formularz nie wysyła wiadomości; pokazuje jednoznaczną informację i opcjonalne otwarcie programu pocztowego.

Nie dodano fikcyjnych parametrów, cen, opinii ani osiągnięć. Brak backendu aplikacyjnego, kont i płatności.

## Weryfikacja

- TypeScript: PASS.
- Kontrola danych, drzewa kategorii, tras, źródeł zdjęć i wyszukiwania: PASS.
- Testy interakcji w jsdom: 4/4 PASS (katalog, zapytanie, galeria, menu mobilne).
- Kompilacja produkcyjna: PASS, 3331 wygenerowanych stron. Kontrola HTTP: główne strony, produkt, kategoria i ich odświeżenie — 200.

Testy jsdom nie zastępują przeglądarki. Środowisko nie udostępniło działającego renderera ani serwera podglądu, dlatego **nie wykonano wizualnej kontroli desktop/mobile ani pełnego audytu dostępności**. Responsywność, semantyka, focus, kontrast wybranych kolorów i reduced motion zostały sprawdzone w kodzie. Przed publikacją wymagany jest przegląd wizualny rzeczywistego Preview.

Host wykonawczy wymagał lokalnego obejścia niedostępnego `/proc` dla odczytu pamięci procesu Node. Obejście nie należy do aplikacji ani repozytorium i nie jest potrzebne w zwykłym środowisku Node/Vercel.

## Rozmiar i wdrożenie

Obrazy WebP zajmują 18 472 562 bajty (17,62 MiB). Trzy archiwa dystrybucyjne zajmują 18 945 539 bajtów; największe ma około 8,21 MiB. Instalacja rozpakowuje je lokalnie, bez pobierania z Praiston. Nie dołączono node_modules, .next, cache ani surowych HTML.

Próba utworzenia projektu Vercel zakończyła się 403: brak uprawnień do zespołu. **Nie ma działającego adresu Preview.** Instrukcja wdrożenia gałęzi jako Preview znajduje się w README. Domena produkcyjna pozostaje bez zmian.
