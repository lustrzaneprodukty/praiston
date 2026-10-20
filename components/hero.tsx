import Link from "next/link";
export default function Hero() {
  return (
    <div className="hero-note">
      <span className="live-dot" />
      <div>
        <small>OD POMYSŁU DO WYPOSAŻENIA</small>
        <p>Przestrzeń dla dobrej medycyny.</p>
        <Link href="/kategorie">Poznaj nasze specjalizacje</Link>
      </div>
    </div>
  );
}
