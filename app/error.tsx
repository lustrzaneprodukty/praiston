"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="error-page">
      <h1>Coś poszło nie tak.</h1>
      <p>Nie udało się wyświetlić tej strony. Spróbuj ponownie.</p>
      <button className="button" onClick={reset}>
        Spróbuj ponownie
      </button>
    </div>
  );
}
