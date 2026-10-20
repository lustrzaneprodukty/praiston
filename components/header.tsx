"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { ArrowUpRight, ChevronDown, Menu, Search, X } from "lucide-react";
export function Logo() {
  return (
    <span className="logo">
      praiston<span className="logo-mark">✳</span>
    </span>
  );
}
export default function Header({
  categories = [],
}: {
  categories?: { slug: string; name: string }[];
}) {
  const [offerOpen, setOfferOpen] = useState(false);
  const offerButton = useRef<HTMLButtonElement>(null);
  const close = () => {
    setOpen(false);
    setOfferOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <div className="topbar">
        <span>Sprzęt medyczny. Nowy i rekondycjonowany.</span>
        <a href="tel:+48655270167">
          Porozmawiajmy: +48 65 527 01 67 <ArrowUpRight size={12} />
        </a>
      </div>
      <header
        className="header"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOfferOpen(false);
            setOpen(false);
            offerButton.current?.focus();
          }
        }}
      >
        <Link href="/" aria-label="Praiston — strona główna" onClick={close}>
          <Logo />
        </Link>
        <nav
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label="Menu główne"
        >
          <button
            ref={offerButton}
            className="nav-offer-button"
            aria-expanded={offerOpen}
            aria-controls="offer-menu"
            onClick={() => {
              setOfferOpen(!offerOpen);
              setSearch(false);
            }}
          >
            Oferta <ChevronDown size={12} />
          </button>
          {offerOpen && (
            <div className="offer-menu" id="offer-menu">
              <div className="offer-menu-heading">
                <span className="eyebrow">POZNAJ NASZĄ OFERTĘ</span>
                <Link href="/katalog" onClick={close}>
                  Cały katalog <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="offer-menu-grid">
                {categories.map((c, i) => (
                  <Link
                    key={c.slug}
                    href={`/kategorie/${c.slug}`}
                    onClick={close}
                  >
                    <small>0{i + 1}</small>
                    <strong>{c.name}</strong>
                    <ArrowUpRight size={20} />
                  </Link>
                ))}
              </div>
              <Link className="offer-all" href="/kategorie" onClick={close}>
                Wszystkie kategorie i specjalizacje ↗
              </Link>
            </div>
          )}
          {[
            ["O nas", "/o-nas"],
            ["Serwis i usługi", "/serwis"],
            ["Finansowanie", "/finansowanie"],
          ].map(([label, href]) => (
            <Link
              onClick={close}
              className={pathname.startsWith(href) ? "active" : ""}
              key={href}
              href={href}
            >
              {label}
              {href === "/katalog" && <ChevronDown size={12} />}
            </Link>
          ))}
          <Link className="mobile-contact" href="/kontakt" onClick={close}>
            Kontakt
          </Link>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            aria-label={search ? "Zamknij wyszukiwarkę" : "Otwórz wyszukiwarkę"}
            onClick={() => {
              setSearch(!search);
              setOfferOpen(false);
            }}
          >
            {search ? <X size={20} /> : <Search size={20} />}
          </button>
          <Link className="button small header-contact" href="/kontakt">
            Kontakt <ArrowUpRight size={16} />
          </Link>
          <button
            className="icon-button menu-toggle"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {search && (
        <form
          className="header-search"
          action="/katalog"
        >
          <label htmlFor="global-search">Czego szukasz?</label>
          <input
            autoFocus
            id="global-search"
            name="q"
            placeholder="Nazwa urządzenia, model…"
          />
          <button className="button" type="submit">
            Szukaj <Search size={18} />
          </button>
        </form>
      )}
    </>
  );
}
