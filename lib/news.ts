import { pages } from "./catalog";
const featured = [
  {
    id: 145,
    category: "Wydarzenia",
    mark: "DOLMED.Tech",
    date: "7–9 października 2026",
    title: "Praiston na DOLMED.Tech 2026",
    excerpt:
      "Spotkania branży medycznej i nowych technologii w Karpaczu. Poznaj zapowiedź udziału Praiston.",
    status: "Wydarzenie zakończone",
  },
  {
    id: 144,
    category: "Targi",
    mark: "Medical Expo",
    date: "15–17 września 2026",
    title: "Praiston na Warsaw Medical Expo 2026",
    excerpt:
      "Sprzęt, rozwiązania i rozmowy o wyposażeniu placówek. Nasza zapowiedź targów w Nadarzynie.",
    status: "Wydarzenie zakończone",
  },
  {
    id: 143,
    category: "Oferta archiwalna",
    mark: "YESON",
    date: "Promocja do 31.08.2026",
    title: "Wyjątkowa oferta na autoklawy YESON — rabaty do 20%",
    excerpt:
      "Archiwalna oferta na wybrane modele autoklawów. O aktualne warunki zakupu zapytaj nasz zespół.",
    status: "Promocja zakończona",
  },
  {
    id: 142,
    category: "Jubileusz",
    mark: "20 lat EMALED",
    date: "Promocja do 31.08.2026",
    title: "EMALED świętuje 20-lecie. Świętujemy razem z Wami",
    excerpt:
      "Jubileusz marki i specjalna oferta na lampy LED. Zobacz szczegóły archiwalnego wpisu.",
    status: "Promocja zakończona",
  },
];
export const latestNews = featured.map((item) => {
  const page = pages.find((p) => p.sourceUrl.includes(`/article/${item.id}/`));
  if (!page) throw new Error(`Missing news article ${item.id}`);
  return {
    ...item,
    slug: page.slug,
    sourceUrl: page.sourceUrl,
    image: `/images/news/${item.id}.png`,
  };
});
