# Audyt strony Praiston — klient, design i funkcjonalność

Przegląd bieżących plików projektu, danych katalogowych, przekazanych wcześniej zrzutów i istniejących testów. Nie jest to audyt działającej strony w przeglądarce ani pomiar Lighthouse. Nie sprawdzono wizualnie finalnej wersji na urządzeniach; pełny build produkcyjny pozostawał wcześniej zablokowany błędem środowiska Node.

## Ocena i kierunek

Strona ma już rozpoznawalną oprawę: granat, błękit, typografia, zdjęcia gabinetu i serwisu, historia firmy oraz spójny kontakt. Dalsze dodawanie podobnych sekcji i animacji może wydłużać drogę do oferty. Największy zysk dla klienta przyniesie teraz lepszy katalog i łatwiejsze zapytanie, a nie więcej dekoracji.

## Priorytety

| Priorytet | Ustalenie | Zalecenie |
| --- | --- | --- |
| P0 — przed startem sprzedażowym | Formularz demonstracyjny nie wysyła zapytań; otwiera program pocztowy klienta. | Podłączyć odbiór zapytań, walidację serwerową, ochronę przed spamem i uczciwe potwierdzenie sukcesu/błędu. Do tego czasu zachować informację o demonstracji. |
| P0 — przed publikacją | Globalne metadata zawierają `index: false, follow: false`. | Po odbiorze wersji produkcyjnej skonfigurować indeksowanie, domenę kanoniczną i mapę strony. Nie indeksować przypadkowo wersji testowej. |
| P1 | 1204 z 2459 rekordów katalogowych ma pustą listę zdjęć. | Produkty bez zdjęć zostały tymczasowo ukryte; 1255 produktów pozostaje widocznych. Dane zachowano. Uzupełnić rzeczywiste zdjęcia modeli, zaczynając od produktów kluczowych handlowo. |
| P1 | Formularz pomijał telefon i nazwę placówki w podsumowaniu i wiadomości. | Naprawione w tej wersji. |
| P1 | Przy braku wyników klient mógł jedynie wyczyścić filtry. | Dodano link do zapytania z zachowaniem szukanej frazy. |
| P1 | Stan filtrów i sortowania nie jest kompletnie zapisany w adresie URL. | Zachować wyszukiwanie, kategorię i stan urządzenia w URL, aby powrót z produktu i udostępnienie wyników nie wymagały ponownego filtrowania. |
| P1 | Katalog nie prezentuje potwierdzonych danych magazynowych, terminów dostawy ani cen. | Uzupełniać wyłącznie ze źródła handlowego. Pokazywać aktualną dostępność lub jednoznaczne „potwierdź dostępność”, bez pozorowanych stanów magazynowych. |
| P1 | Brak odbioru w przeglądarce po licznych zmianach responsywnych. | Sprawdzić desktop i rzeczywiste iPhone/Android: nawigację, wysokość hero, formularz, galerię i powrót do wyników. |
| P2 | Obrazy medical-practice.png i medical-events.png zajmują łącznie około 4 MB. Arkusz symboli około 1,3 MB. | Przygotować zoptymalizowane warianty WebP/AVIF, responsywne rozmiary i właściwe ładowanie. Zachować jakość zdjęć produktów. |
| P2 | Projekt ma 6803 wiersze CSS w kilku kolejnych warstwach. | Scalić reguły komponentów i usunąć nadpisujące się historyczne style. To ograniczy powroty błędów mobilnych. |
| P2 | Strona główna jest długa: kategorie, gabinet, produkty, wsparcie, serwis, wybór sprzętu, finansowanie, FAQ, aktualności i stopka. | Po odbiorze zredukować powtarzające się sekcje. Docelowy ciąg: hero → doświadczenie/kategorie → produkty → serwis → aktualności → kontakt. Rozwinięcia zostawić na podstronach. |
| P2 | Aktualności są statycznym wyborem czterech wpisów z 20.10.2026. | Zaplanować edycję treści i aktualizację kolejności. Zakończone promocje powinny nadal mieć czytelny status archiwalny. |

## Co poprawiono od razu

1. Telefon i nazwa placówki są zachowane w podsumowaniu oraz treści wiadomości otwieranej w poczcie.
2. Brak wyników w katalogu ma dodatkową drogę do kontaktu, z automatycznie wpisanym tematem wyszukiwania.
3. Przycisk filtrów ma powiązanie z panelem przez `aria-controls`.
4. Komunikaty na stronach produktów mówią o opisie, dokumentacji i kontakcie, zamiast o lokalnych plikach lub procesie importu danych.
5. Sekcje informacji produktowych otrzymały odstęp przy przewijaniu do kotwic.
6. Rozszerzono istniejące testy o zachowanie telefonu i placówki oraz przekazanie frazy do zapytania.

## Zalecenia wizualne

- Zachować obecny system kolorów i pojedynczą animację nagłówka. Nie dodawać ruchu do każdej sekcji.
- Karty produktów powinny pozostać proste: rzeczywiste zdjęcie, status, pełna nazwa i jedno główne działanie.
- Nie powiększać małych zdjęć ani logotypów ponad ich użyteczną rozdzielczość. Oryginalne znaki wyróżnień zachować bez przerabiania.
- Mobilne hero może wypełniać pierwszy ekran, ale treść musi móc rosnąć przy powiększeniu tekstu i małym ekranie. Testować również przeglądarkę otwieraną w Messengerze.
- Zdjęcia firmy i zespołu, jeśli będą dostępne, powinny zastąpić część wizualizacji poglądowych. To lepiej buduje wiarygodność niż kolejne obrazy generowane.
- Kolejnym sensownym materiałem są prawdziwe realizacje: zdjęcie, zakres dostarczonego wyposażenia, typ placówki. Bez fikcyjnych referencji i liczników.

## Funkcje warte rozważenia po podstawach

- Lista urządzeń do jednego zapytania, przydatna przy wyposażaniu całego gabinetu.
- Porównywanie wyłącznie urządzeń o wspólnych, uporządkowanych parametrach.
- Wygodny kontakt ze specjalistą na karcie produktu, bez nakładania przycisku na treść mobilną.
- Pomiar drogi klienta: wyszukanie → karta produktu → zapytanie. Dopiero na tej podstawie dalsze zmiany układu.

## Ograniczenia

Nie uruchamiano wysyłania wiadomości, nie zmieniano indeksowania i nie publikowano nowej wersji online. Nie wprowadzano fikcyjnych cen, dostępności, opinii ani danych o realizacjach. Dane handlowe i aktualność certyfikatów należy potwierdzić przed uruchomieniem produkcyjnym.
