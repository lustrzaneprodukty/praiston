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
