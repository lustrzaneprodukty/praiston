# Praiston — dopracowana wersja wizualna

## Zmiany
- Nowy fotograficzny hero z hasłem „Więcej możliwości. Lepsza opieka.”
- Dwa wygenerowane obrazy w WebP: sala medyczna oraz ilustracyjna scena serwisu aparatury. To wizualizacje, nie fotografie zespołu ani lokalu Praiston.
- Usunięte dekoracyjne strzałki z linków, kart, kategorii i przycisków oraz gwiazda z logo. Zachowano funkcjonalne sterowanie galerią i menu.
- Zdjęcia rzeczywistych produktów w czterech głównych kategoriach, dobierane z podkategorii.
- Rozbudowana strona główna: wsparcie, wybór nowego lub rekondycjonowanego sprzętu, finansowanie i rozwijane FAQ.
- Przebudowane finansowanie wraz z podstronami partnerów. Zamiast pikselowych grafik: tekst, karty, kroki i wyraźne wezwania do kontaktu. Historyczne warunki liczbowe i obietnice z materiałów źródłowych nie są przedstawiane jako aktualna oferta.
- Nowa oprawa podstron o firmie, serwisu i skupu; wspólne poprawki kart, przycisków, stopki i czytelności.
- Responsywne układy oraz subtelne animacje z obsługą prefers-reduced-motion. FAQ działa bez dodatkowego JavaScript.

## Weryfikacja
- `npm run typecheck`: OK.
- `npm run test:interactions`: 4/4 OK (katalog, formularz, galeria, nawigacja).
- `npm run build`: zablokowany przez błąd środowiska Node `ENOENT: uv_resident_set_memory`. Pełna kompilacja produkcyjna nie została potwierdzona.
- Brak dostępnej obsługi przeglądarki w środowisku: wygląd desktop/mobile wymaga końcowego sprawdzenia po uruchomieniu projektu.
- Zachowano istniejący charakter demonstracyjny formularzy. Formularze nie wysyłają wiadomości.

## Uruchomienie
Node >=22, następnie `npm ci` i `npm run dev`. Przed wdrożeniem wykonać `npm run build` w środowisku z poprawnie działającym odczytem pamięci procesu.

## Pliki i obrazy
Główne zmiany: `app/refined.css`, `app/page.tsx`, `components/editorial.tsx`, `components/finance-content.tsx`, `components/hero.tsx`, komponenty wspólne i `app/[slug]/page.tsx`.

Wygenerowano wbudowanym imagegen; obrazy znajdują się w `public/images/medical-room.webp` i `public/images/medical-service.webp`.

Prompty:
1. Use case: photorealistic-natural. Create a premium architectural editorial photograph for a Polish medical equipment company's website hero. Wide landscape 3:2 composition, modern empty operating room, a beautifully detailed surgical LED light in upper right foreground, blue upholstered operating table lower right, medical monitor and stainless steel trolley, glass partitions, soft daylight from left, deep navy and clean pale blue palette, realistic sophisticated hospital interior. Left third relatively quiet. No people, no text, no logos, no watermark. This is an illustrative environment not a specific product advertisement.
2. Use case photorealistic-natural. Wide premium editorial photograph for medical equipment supplier service page. A professional biomedical technician in navy workwear carefully inspecting an ultrasound console in a bright contemporary workshop, realistic hands, no patient, no treatment, tidy equipment, natural window light, warm human detail balanced with cool blue and white interior, authentic candid photography, medium wide composition, no text, no logos, no watermark.


## Aktualizacja: symbole i podpis logo
- Pod logo w nagłówku i stopce dodano mały podpis „Medical Equipment”.
- Zdjęcia w kafelkach specjalizacji zastąpiono spójnymi symbolami 3D: stetoskop, ząb, łapa i fotel medyczny.
- Każda specjalizacja ma własny stonowany kolor, krótki opis oraz animację symbolu i linii akcentowej przy najechaniu lub fokusie klawiatury.
- Serwis, finansowanie i skup sprzętu otrzymały osobne karty z symbolami klucza, portfela i urządzenia w dłoniach.
- Symbole pojawiają się też w katalogu kategorii. Dekoracje są ukryte przed czytnikami ekranu; nazwy pozostają zwykłym tekstem.
- Dodano dyskretne akcenty do sekcji wyboru sprzętu i nagłówka specjalizacji.
- Animacje respektują prefers-reduced-motion; na urządzeniach dotykowych nie uruchamia się efekt hover.
- TypeScript: OK. Istniejące testy interakcji: 4/4 OK. Nie wykonano nowego pełnego buildu ani kontroli w przeglądarce; ograniczenia opisane powyżej pozostają aktualne.

### Nowy zasób
`public/images/praiston-symbols.png`: pojedynczy przezroczysty arkusz siedmiu symboli, wygenerowany wbudowanym imagegen. Poszczególne symbole są wyświetlane przez pozycjonowanie tła CSS bez dodatkowej biblioteki i JavaScript.

Prompt: Create a precisely arranged sprite sheet of SEVEN separate premium 3D clay-and-frosted-glass pictograms for a sophisticated medical equipment website. Transparent background. Canvas landscape 2:1 ratio, exact regular grid 4 columns and 2 rows, eight equally sized square cells, no visible dividers. Each icon centered, same scale, clear padding. Top row: blue stethoscope forming a heart curve; ivory molar tooth with blue base; teal paw; medical examination couch with blue padding and white base. Bottom row: blue and silver wrench with gear; blue wallet with two silver coins; blue cupped hands cradling medical equipment; last cell empty. Consistent three-quarter camera, soft studio illumination, cobalt, sky blue, teal, white and silver. No text, logos, arrows, stars or background tiles.


## Aktualizacja responsywności po zrzutach mobilnych
- Hero desktop: mniejsza wysokość i spokojniejsze proporcje tekstu do zdjęcia.
- Hero mobile: wysokość automatyczna, krótszy opis, usunięta dodatkowa karta i pusta przestrzeń, dwa przyciski o równej wysokości. Na najwęższych ekranach przyciski układają się jeden pod drugim.
- Kategorie mobile: jeden zwarty poziomy kafelek w rzędzie, symbol po lewej i tekst po prawej; bez rozrywania słów w nazwach.
- Kategorie desktop: wspólne wysokości obszarów i linki przy dolnej krawędzi.
- Karty produktów: uporządkowane zdjęcia, czytelniejsze tytuły, spójne odstępy i dolne linki. Na telefonach jedna pełna kolumna bez ściskania nazw i przycinania tytułów.
- Zachowano symbole i podpis Medical Equipment z poprzedniej aktualizacji. Dostarczone zrzuty przedstawiały starszą wersję bez tych elementów.
- TypeScript po zmianach: OK. Zmiany dotyczą układu i treści; wcześniejsze testy interakcji 4/4 OK. Nie potwierdzono wyglądu w przeglądarce ani pełnego buildu produkcyjnego w tym środowisku.


## Animacja nagłówka
Jednorazowe wejście dwóch linii nagłówka, opisu i przycisków z krótkim przesunięciem oraz delikatne przybliżenie zdjęcia (2,5%). Bez zapętlenia, dodatkowego JavaScript i zmian wysokości sekcji. Przy prefers-reduced-motion animacje są wyłączone. TypeScript: OK; podgląd przeglądarkowy nadal niezweryfikowany.


## Sekcja gabinetu i dopracowana stopka
- Dodano sekcję „Twój gabinet. Wszystko na swoim miejscu.” z wygenerowanym wnętrzem i linkami do wyszukiwania USG, foteli oraz lamp.
- Obraz jest oznaczony jako wizualizacja poglądowa; nie jest przedstawiany jako realizacja Praiston.
- Nowa granatowa stopka: trzy karty telefonu, e-maila i adresu z ikonami, odnośnik do zespołu, uporządkowane kolumny nawigacyjne i dane firmy. Dane pochodzą z istniejącego projektu.
- Usunięto z głównej strony dodatkowy ContactBand bezpośrednio nad stopką, aby nie powielać wezwania do kontaktu.
- Układy responsywne: na telefonie sekcja gabinetu i dane kontaktowe ustawiają się w jednej kolumnie.
- TypeScript: OK. Istniejące testy interakcji: 4/4 OK. Brak weryfikacji przeglądarkowej i potwierdzonego buildu produkcyjnego — ograniczenia środowiska jak wyżej.

Nowy zasób: `public/images/medical-practice.png`, wygenerowany wbudowanym imagegen.
Prompt: Premium editorial architectural photograph, wide landscape, contemporary outpatient medical examination room in Poland, inviting professional human-scale environment, blue upholstered examination couch on right, compact ultrasound machine beside it, doctor's desk on left, tall window with sheer light curtains, warm oak cabinetry, pale ivory walls, muted navy accents, one discreet plant, realistic practical equipment and cables, daylight, refined authentic interiors magazine photography, no people, no logos, no lettering, no watermark. A conceptual illustration for a medical equipment supplier, not an actual company facility. Beautiful balanced composition, warm welcoming atmosphere distinct from an operating theatre.
