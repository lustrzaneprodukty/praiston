import Link from "next/link";
import brandAssets from "@/data/brand-assets.json";
const labels: Record<string, string> = {
  "rzetelna-firma": "Rzetelna Firma",
  "zlota-rzetelna-firma": "Złota Rzetelna Firma",
  "big-info-monitor": "BIG InfoMonitor",
  "firma-wiarygodna": "Firma Wiarygodna",
};
export default function RecognitionBand() {
  return (
    <section className="recognition-band" aria-labelledby="recognition-title">
      <div>
        <span>WIARYGODNOŚĆ I WYRÓŻNIENIA</span>
        <h2 id="recognition-title">Zaufanie ma znaczenie.</h2>
        <Link href="/certyfikaty">Poznaj nasze certyfikaty</Link>
      </div>
      <div className="recognition-logos">
        {brandAssets
          .filter((a) => labels[a.alt])
          .map((a) => (
            <Link href="/certyfikaty" key={a.src}>
              <img
                src={a.src}
                alt={labels[a.alt]}
                width="260"
                height="117"
                loading="lazy"
              />
            </Link>
          ))}
      </div>
    </section>
  );
}
