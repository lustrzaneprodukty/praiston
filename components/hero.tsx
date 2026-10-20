import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";

/** A quiet, bounded image stage keeps small catalogue photographs crisp. */
export default function Hero({ product }: { product?: Product }) {
  return (
    <div className="hero-showcase">
      <div className="showcase-heading">
        <span>W centrum Twojej praktyki</span>
        <span aria-hidden="true">01 /</span>
      </div>
      <div className="showcase-stage">
        <span className="showcase-tag">SPRZĘT MEDYCZNY</span>
        {product?.images[0]?.src ? (
          <img
            src={product.images[0].src}
            alt={product.name}
            width="395"
            height="356"
            fetchPriority="high"
          />
        ) : (
          <span className="showcase-placeholder">Poznaj nasze rozwiązania</span>
        )}
        <span className="showcase-detail">
          Technologia, która wspiera specjalistów.
        </span>
      </div>
      {product && (
        <Link className="showcase-link" href={`/produkt/${product.slug}`}>
          <span>
            <small>W NASZEJ OFERCIE</small>
            {product.name}
          </span>
          <span className="showcase-arrow">
            <ArrowUpRight size={24} />
          </span>
        </Link>
      )}
    </div>
  );
}
