"use client";
import { useDeferredValue, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
} from "lucide-react";
import type { Category, Product } from "@/lib/types";
import { ProductCard } from "./ui";
import { descendants, filterProducts } from "@/lib/search";
export default function CatalogBrowser({
  products,
  categories,
  initialCategory = "",
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState(initialCategory);
  const [condition, setCondition] = useState("");
  const [sort, setSort] = useState("default");
  const [limit, setLimit] = useState(24);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const deferred = useDeferredValue(query);
  const conditions = Array.from(
    new Set(products.map((p) => p.condition).filter(Boolean)),
  ).sort();
  const orderedCategories = useMemo(() => {
    const allowed = initialCategory
      ? new Set(descendants(categories, initialCategory))
      : null;
    const seen = new Set<string>();
    const result: { category: Category; depth: number }[] = [];
    function visit(c: Category, depth: number) {
      if (seen.has(c.id)) return;
      seen.add(c.id);
      if (!allowed || allowed.has(c.id)) result.push({ category: c, depth });
      categories
        .filter((x) => x.parentId === c.id)
        .forEach((x) => visit(x, depth + 1));
    }
    categories.filter((c) => !c.parentId).forEach((c) => visit(c, 0));
    categories.filter((c) => !seen.has(c.id)).forEach((c) => visit(c, 0));
    return result;
  }, [categories, initialCategory]);
  const categoryIds = useMemo(
    () => (category ? descendants(categories, category) : []),
    [category, categories],
  );
  const filtered = useMemo(
    () =>
      filterProducts(products, {
        query: deferred,
        categoryIds,
        condition,
        sort,
      }),
    [products, categoryIds, condition, deferred, sort],
  );
  const urlQuery = params.get("q") || "";
  useEffect(() => {
    setQuery(urlQuery);
    setLimit(24);
  }, [urlQuery]);
  const reset = () => {
    setQuery("");
    setCategory(initialCategory);
    setCondition("");
    setSort("default");
    setLimit(24);
  };
  return (
    <div className="catalog-layout">
      <div className="catalog-search">
        <Search size={22} />
        <input
          aria-label="Szukaj w katalogu"
          placeholder="Szukaj urządzenia, modelu lub producenta…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLimit(24);
          }}
        />
        {query && (
          <button
            className="icon-button"
            aria-label="Wyczyść wyszukiwanie"
            onClick={() => setQuery("")}
          >
            <X size={18} />
          </button>
        )}
        <span className="search-shortcut">KATALOG</span>
      </div>
      <button
        className="button outline filter-toggle"
        onClick={() => setFiltersOpen(!filtersOpen)}
        aria-expanded={filtersOpen}
      >
        <SlidersHorizontal size={18} /> Filtry{" "}
        {category || condition ? "•" : ""}
      </button>
      <aside
        className={`filters ${filtersOpen ? "show-filters" : ""}`}
        aria-label="Filtry katalogu"
      >
        <div className="filters-heading">
          <h2>Filtruj produkty</h2>
          <SlidersHorizontal size={17} />
        </div>
        <label htmlFor="category-filter">Specjalizacja</label>
        <select
          id="category-filter"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setLimit(24);
          }}
        >
          <option value="">
            {initialCategory ? "Wszystkie w tym dziale" : "Wszystkie kategorie"}
          </option>
          {orderedCategories.map(({ category: c, depth }) => (
            <option key={c.id} value={c.id}>
              {"— ".repeat(Math.min(depth, 3))}
              {c.name}
            </option>
          ))}
        </select>
        <fieldset>
          <legend>Stan sprzętu</legend>
          <label className="radio-label">
            <input
              type="radio"
              name="condition"
              checked={!condition}
              onChange={() => {
                setCondition("");
                setLimit(24);
              }}
            />{" "}
            Wszystkie
          </label>
          {conditions.map((s) => (
            <label className="radio-label" key={s}>
              <input
                type="radio"
                name="condition"
                checked={condition === s}
                onChange={() => {
                  setCondition(s);
                  setLimit(24);
                }}
              />
              {s}
            </label>
          ))}
        </fieldset>
        <button className="text-link reset-filter" onClick={reset}>
          <RotateCcw size={14} /> Wyczyść filtry
        </button>
        <div className="catalog-help">
          <span className="eyebrow">POTRZEBUJESZ WSPARCIA?</span>
          <h3>Znajdźmy właściwe rozwiązanie.</h3>
          <a href="tel:+48655270167">+48 65 527 01 67</a>
        </div>
      </aside>
      <div className="catalog-results" aria-busy={deferred !== query}>
        <div className="results-toolbar">
          <p aria-live="polite">
            <strong>{filtered.length}</strong> produktów
          </p>
          <label>
            Sortuj:{" "}
            <select
              aria-label="Sortuj produkty"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Kolejność katalogowa</option>
              <option value="az">Nazwa: A–Z</option>
              <option value="za">Nazwa: Z–A</option>
            </select>
          </label>
        </div>
        {filtered.length ? (
          <>
            <div className="product-grid catalog-grid">
              {filtered.slice(0, limit).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="load-more">
              <p>
                Wyświetlasz {Math.min(limit, filtered.length)} z{" "}
                {filtered.length} produktów
              </p>
              {limit < filtered.length && (
                <button
                  className="button outline"
                  onClick={() => setLimit((l) => l + 24)}
                >
                  Pokaż więcej 
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <Search size={40} strokeWidth={1} />
            <h2>Nie znaleźliśmy takiego sprzętu.</h2>
            <p>Sprawdź pisownię lub wybierz szerszą kategorię.</p>
            <button className="button" onClick={reset}>
              Wyczyść filtry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
