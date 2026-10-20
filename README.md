# Praiston — nowy frontend

Serwis w języku polskim oparty na **Next.js 16.4.2 (App Router), React 19.3.1, TypeScript i Tailwind CSS 4.3.3**. Dane katalogowe i zasoby są lokalne. Brak backendu aplikacyjnego, bazy, CMS, logowania, płatności i sekretów.

## Uruchomienie

Wymagany Node.js 22 lub 24 LTS i npm.

```bash
npm install
npm run dev
```

Otwórz `http://localhost:3000`.

```bash
npm run build
npm start
```

`npm install`, `npm run dev` i `npm run build` automatycznie rozpakowują lokalne zdjęcia z `assets/catalog-media-*.json.gz` do `public/media/`. Nie pobierają niczego z praiston.pl. Archiwa zawierają wyłącznie zoptymalizowane WebP, sumy kontrolne i ścieżki. Rozpakowywanie weryfikuje SHA-256 i dozwolone nazwy plików. `public/media/` jest ignorowany przez Git, żeby nie powielać zdjęć w repozytorium. Font Manrope dostarczany jest lokalnie przez pakiet Fontsource.

## Weryfikacja

```bash
npm run typecheck
npm run test:data
npm run test:interactions
npm run build
npm run test:http
```

Raport faktycznie wykonanych kontroli i ograniczeń środowiska znajduje się w `REPORT.md`. Nie należy utożsamiać pomyślnego buildu z pełnym audytem dostępności ani testem w każdej przeglądarce.

## Najważniejsze ścieżki

- `/` — strona główna
- `/katalog` — wyszukiwanie, kategorie, stan sprzętu, sortowanie A–Z/Z–A, „Pokaż więcej”
- `/kategorie` — struktura oferty
- `/kategorie/[slug]` — podkategorie i produkty, także z kategorii potomnych
- `/produkt/[slug]` — galeria, powiększenie, opis, parametry, źródło, powiązane produkty
- `/zapytanie?produkt=[slug]` — formularz uzupełniony nazwą produktu
- `/o-nas`, `/serwis`, `/finansowanie`, `/skup-sprzetu`, `/certyfikaty`, `/kontakt`, `/aktualnosci`
- pozostałe dostępne strony firmowe i artykuły mają trasy na podstawie lokalnych danych

Nazwy tras katalogowych zawierają ID źródłowe, żeby rozróżnić powtarzające się nazwy (np. „Inne”). W `data/url-map.json` zapisano mapowanie starych adresów na nowe. Nie zmieniono produkcyjnej domeny ani jej przekierowań.

## Formularz

Formularz waliduje wymagane pola, adres e-mail oraz długość wiadomości. **Nie wysyła danych.** Po zatwierdzeniu pokazuje lokalne podsumowanie i informację „Wiadomość nie została wysłana”. Opcjonalny link `mailto:` otwiera program pocztowy użytkownika — wysłanie pozostaje jego decyzją. Dane osobowe nie są zapisywane w localStorage ani przesyłane do usługi zewnętrznej.

## Architektura

```text
app/              strony i układy App Router, metadane, stany ładowania/błędu/404
components/       nawigacja, katalog, galeria, formularz, karty, treści kontaktowe
lib/              typy, odczyt lokalnych danych, filtrowanie
data/            produkty, kategorie, strony, źródła i raport importu
assets/           skompresowane, lokalne zdjęcia WebP
public/media/     automatycznie rozpakowywane zdjęcia (nie śledzone w Git)
scripts/          niezależny import, pakowanie mediów, walidacja danych
```

Strony produktów i kategorii generuje `generateStaticParams`. Dane źródłowe są importowane podczas buildu. Komponenty interaktywne działają w przeglądarce. Zmiana dostawcy danych w `lib/catalog.ts` umożliwi późniejsze podłączenie CMS lub backendu bez przebudowy komponentów prezentacyjnych.

## GitHub i Vercel Preview

Repozytorium: `lustrzaneprodukty/praiston`. Kod projektu jest na gałęzi `preview/praiston-redesign`; `main` pozostaje gałęzią inicjalizującą. Nie łącz gałęzi przed przeglądem.

1. W Vercel wybierz **Add New → Project**, zaimportuj repozytorium `lustrzaneprodukty/praiston`.
2. Framework: **Next.js**, Root Directory: katalog główny repozytorium. Node.js: **22.x** lub **24.x**.
3. Install Command: `npm ci`. Build Command: `npm run build`. Output Directory: ustawienie domyślne Next.js.
4. Nie dodawaj zmiennych środowiskowych. Nie ustawiaj `output: "export"`.
5. Zachowaj `main` jako Production Branch. Uruchom wdrożenie gałęzi `preview/praiston-redesign` jako **Preview**, a nie Production. Gdy import oczekuje pierwszego wdrożenia produkcyjnego, pomiń je i uruchom Preview przez CLI poniżej.
6. Otwórz otrzymany adres `*.vercel.app` i wykonaj ścieżkę: kategoria → filtry → produkt → zapytanie.

Alternatywnie, z lokalnego katalogu projektu po własnym zalogowaniu do Vercel:

```bash
npx vercel login
npx vercel link
npx vercel deploy
```

Nie używaj `--prod`. Nie podłączaj domeny praiston.pl na tym etapie. Nie zapisuj tokenów w repozytorium.

W sesji wykonawczej utworzenie projektu Vercel zwróciło **403 — brak uprawnień do zakresu zespołu**. Nie ma potwierdzonego wdrożenia Preview ani adresu wdrożenia. Samo podłączenie GitHub nie potwierdza dostępu do zapisu w Vercel.

## Osobny import danych

Import nie jest częścią instalacji, uruchamiania ani buildu. Wymaga Python 3, `lxml` i Pillow:

```bash
python -m pip install -r scripts/requirements.txt
python scripts/import_catalog.py
python scripts/finalize-data.py
python scripts/package-media.py
npm run test:data
npm run build
```

Importer korzysta z publicznych linków, hierarchii kategorii i paginacji. Respektuje robots.txt, deduplikuje URL i zapisuje adres źródłowy. Surowa pamięć podręczna jest poza repozytorium (`../.cache/praiston`). Aktualizacja importu może zmienić lokalny katalog; przed zatwierdzeniem sprawdź diff danych i raport zakresu. Nie uruchamiaj kilku importerów jednocześnie.

## Kierunek wizualny i dostępność

Granat, niebieskie akcenty, chłodna biel i lokalny Manrope. Zaokrąglone przyciski, karty i powierzchnie. Nowy hero z prawdziwym zdjęciem na białym tle, siatka nazw producentów i sekcja współpracy. Zdjęcia zachowują pełny kadr, a ich wielkość jest ograniczona. Wspólny system wizualny i poprawki responsywności: `app/redesign.css`, importowany po `app/globals.css`. Animacje respektują `prefers-reduced-motion`.

Semantyczne nagłówki, etykiety pól, widoczny focus, skip link, natywny `dialog` galerii z Escape i przywróceniem focusu, akordeony `details`, responsywny układ i lokalne fonty. Wersja Preview ma `noindex` — przed osobnym wdrożeniem produkcyjnym należy świadomie ustawić indeksowanie i docelowe canonical URL.

## Materiały i ograniczenia

Zdjęcia i treści są materiałami Praiston, pobranymi na potrzeby zleconego projektu. Nie przyznaje się im nowej licencji. Pełny zakres importu, niedostępne materiały i rozdzielczości opisano w `REPORT.md` oraz `data/coverage.json`. Nie dodano niezweryfikowanych cen, certyfikatów, opinii ani osiągnięć.
