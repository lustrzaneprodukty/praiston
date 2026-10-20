import Link from "next/link";
import { ChevronRight, Cross } from "lucide-react";
import type { Product } from "@/lib/types";
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span /> {children}
    </div>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Okruszki" className="breadcrumbs">
      <Link href="/">Strona główna</Link>
      {items.map((item, i) => (
        <span key={i}>
          <ChevronRight size={12} />
          {item.href ? (
            <Link href={item.href}>{item.name}</Link>
          ) : (
            <span aria-current="page">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link className="product-visual" href={`/produkt/${product.slug}`}>
        <span className="condition">{product.condition || "W ofercie"}</span>
        {product.images[0]?.src ? (
          <img
            src={product.images[0].src}
            alt={product.name}
            loading="lazy"
            width="600"
            height="600"
          />
        ) : (
          <div className="image-missing">
            <Cross size={46} strokeWidth={1} />
            <span>Zdjęcie niedostępne</span>
          </div>
        )}
      </Link>
      <div className="product-copy">
        <h3>
          <Link href={`/produkt/${product.slug}`}>{product.name}</Link>
        </h3>
        <Link
          className="button product-inquiry"
          href={`/zapytanie?produkt=${product.slug}`}
        >
          Zapytaj o produkt
        </Link>
      </div>
    </article>
  );
}
export function ContactBand() {
  return (
    <section className="contact-band">
      <div>
        <Eyebrow>POROZMAWIAJMY O TWOICH POTRZEBACH</Eyebrow>
        <h2>
          Dobry sprzęt zaczyna się
          <br />
          od dobrej rozmowy.
        </h2>
      </div>
      <Link className="button light" href="/kontakt">
        Skontaktuj się z nami
      </Link>
    </section>
  );
}
