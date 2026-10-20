"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X, Cross } from "lucide-react";
import type { Media } from "@/lib/types";
export default function Gallery({
  images,
  name,
}: {
  images: Media[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const valid = images.filter((i) => i.src);
  if (!valid.length)
    return (
      <div className="gallery-main image-missing">
        <Cross size={60} strokeWidth={1} />
        <p>Zdjęcia tego urządzenia są niedostępne.</p>
      </div>
    );
  const move = (n: number) =>
    setActive((a) => (a + n + valid.length) % valid.length);
  return (
    <div className="gallery">
      <div className="gallery-main">
        <img
          src={valid[active].src}
          alt={`${name} — zdjęcie ${active + 1}`}
          width="900"
          height="900"
          fetchPriority="high"
        />
        <button
          className="gallery-expand icon-button"
          onClick={() => dialog.current?.showModal()}
          aria-label="Powiększ zdjęcie"
        >
          <Expand size={20} />
        </button>
        <span className="gallery-counter">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(valid.length).padStart(2, "0")}
        </span>
      </div>
      {valid.length > 1 && (
        <div className="gallery-thumbs">
          {valid.map((img, i) => (
            <button
              key={img.src}
              aria-label={`Pokaż zdjęcie ${i + 1}`}
              aria-pressed={active === i}
              className={active === i ? "selected" : ""}
              onClick={() => setActive(i)}
            >
              <img
                src={img.src}
                alt=""
                width="100"
                height="100"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
      <dialog
        className="lightbox"
        ref={dialog}
        aria-label={`Galeria: ${name}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
      >
        <button
          autoFocus
          className="lightbox-close icon-button"
          onClick={() => dialog.current?.close()}
          aria-label="Zamknij powiększenie"
        >
          <X />
        </button>
        <img
          src={valid[active].src}
          alt={`${name} — powiększenie ${active + 1}`}
          width="1200"
          height="1000"
        />
        {valid.length > 1 && (
          <div className="lightbox-controls">
            <button
              className="icon-button"
              aria-label="Poprzednie zdjęcie"
              onClick={() => move(-1)}
            >
              <ChevronLeft />
            </button>
            <span>
              {active + 1} / {valid.length}
            </span>
            <button
              className="icon-button"
              aria-label="Następne zdjęcie"
              onClick={() => move(1)}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}
