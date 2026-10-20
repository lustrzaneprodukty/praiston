import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <div className="error-page">
      <span className="eyebrow">NIE ZNALEZIONO STRONY</span>
      <h1>404</h1>
      <p>Ten adres nie prowadzi do dostępnej strony. Sprawdź nasz katalog.</p>
      <Link className="button" href="/katalog">
        Przejdź do katalogu <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}
