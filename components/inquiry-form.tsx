"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
export default function InquiryForm({
  products,
}: {
  products: { slug: string; name: string }[];
}) {
  const params = useSearchParams();
  const selected = products.find((p) => p.slug === params.get("produkt"));
  const [product, setProduct] = useState(
    selected?.name || params.get("temat") || "",
  );
  const [result, setResult] = useState<{
    name: string;
    email: string;
    message: string;
  } | null>(null);
  const [error, setError] = useState("");
  return (
    <div className="inquiry-layout">
      <aside className="inquiry-summary">
        <span className="eyebrow">TWOJE ZAPYTANIE</span>
        <h2>{product || "Porozmawiajmy o wyposażeniu Twojej placówki."}</h2>
        <p>
          Podaj swoje potrzeby, interesującą konfigurację i pytania. Dane
          wpisane w tej wersji pozostają w przeglądarce do opuszczenia strony.
        </p>
        <p style={{ marginTop: 25 }}>
          Wolisz porozmawiać?
          <br />
          <a href="tel:+48655270167">
            <strong>+48 65 527 01 67</strong>
          </a>
          <br />
          <a href="mailto:biuro@praiston.pl">biuro@praiston.pl</a>
        </p>
      </aside>
      <form
        className="inquiry-form"
        onChange={() => {
          setResult(null);
          setError("");
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          if (
            String(data.get("name")).trim().length < 2 ||
            String(data.get("message")).trim().length < 10
          ) {
            setError(
              "Wpisz imię i nazwisko oraz wiadomość zawierającą co najmniej 10 znaków (bez początkowych i końcowych spacji).",
            );
            return;
          }
          setError("");
          setResult({
            name: String(data.get("name")),
            email: String(data.get("email")),
            message: String(data.get("message")),
          });
        }}
      >
        <div className="form-notice">
          To formularz demonstracyjny. Jego zatwierdzenie pokaże podsumowanie —
          wiadomość nie zostanie wysłana.
        </div>
        <label className="field wide">
          Produkt lub temat zapytania
          <input
            name="product"
            list="product-options"
            value={product}
            onChange={(e) => {
              setProduct(e.target.value);
              setResult(null);
            }}
            placeholder="Wybierz urządzenie lub wpisz temat"
            required
            maxLength={250}
          />
          <datalist id="product-options">
            {products.map((p) => (
              <option key={p.slug} value={p.name} />
            ))}
          </datalist>
        </label>
        <label className="field">
          Imię i nazwisko *
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        <label className="field">
          Adres e-mail *
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={150}
          />
        </label>
        <label className="field">
          Telefon
          <input name="phone" type="tel" autoComplete="tel" maxLength={30} />
        </label>
        <label className="field">
          Nazwa placówki
          <input name="company" autoComplete="organization" maxLength={200} />
        </label>
        <label className="field wide">
          Treść zapytania *
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={5000}
            placeholder="Jak możemy pomóc? Opisz interesującą Cię konfigurację i potrzeby placówki."
          />
        </label>
        <label className="checkbox-field">
          <input type="checkbox" required />
          Potwierdzam, że korzystam z serwisu jako profesjonalista w dziedzinie
          wyrobów medycznych. *
        </label>
        {error && (
          <p className="form-notice" role="alert">
            {error}
          </p>
        )}
        <button className="button" type="submit">
          Przygotuj podsumowanie zapytania <ArrowUpRight size={19} />
        </button>
        {result && (
          <div className="form-result" role="status">
            <Check size={24} />
            <h2>Podsumowanie jest gotowe.</h2>
            <p>
              <strong>Wiadomość nie została wysłana.</strong> To demonstracja
              formularza.
            </p>
            <p>
              {result.name} · {result.email}
            </p>
            <p>Temat: {product}</p>
            <p style={{ whiteSpace: "pre-wrap" }}>{result.message}</p>
            <a
              className="button outline"
              href={`mailto:biuro@praiston.pl?subject=${encodeURIComponent("Zapytanie: " + product)}&body=${encodeURIComponent(result.message + "\n\n" + result.name + "\n" + result.email)}`}
            >
              Otwórz w swojej poczcie <ArrowUpRight size={16} />
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
