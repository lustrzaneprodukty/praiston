import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/",
});
Object.assign(globalThis, {
  window: dom.window,
  self: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  HTMLDialogElement: dom.window.HTMLDialogElement,
  Node: dom.window.Node,
  MutationObserver: dom.window.MutationObserver,
  getComputedStyle: dom.window.getComputedStyle,
  FormData: dom.window.FormData,
});
Object.defineProperty(globalThis, "navigator", {
  value: dom.window.navigator,
  configurable: true,
});
Object.defineProperty(globalThis, "IS_REACT_ACT_ENVIRONMENT", {
  value: true,
  writable: true,
});
const React = await import("react");
const { render, cleanup, waitFor } = await import("@testing-library/react");
const userEvent = (await import("@testing-library/user-event")).default;
const { SearchParamsContext, PathnameContext } =
  await import("next/dist/shared/lib/hooks-client-context.shared-runtime.js");
const Catalog = (await import("../components/catalog-browser")).default;
const Inquiry = (await import("../components/inquiry-form")).default;
const Gallery = (await import("../components/gallery")).default;
const Header = (await import("../components/header")).default;
const products = JSON.parse(
  readFileSync(new URL("../data/products.json", import.meta.url), "utf8"),
).map((p: any) => ({
  ...p,
  slug: p.slug.endsWith("-" + p.id) ? p.slug : p.slug + "-" + p.id,
}));
const categories = JSON.parse(
  readFileSync(new URL("../data/categories.json", import.meta.url), "utf8"),
);
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SearchParamsContext.Provider value={new URLSearchParams()}>
    <PathnameContext.Provider value="/">{children}</PathnameContext.Provider>
  </SearchParamsContext.Provider>
);
afterEach(() => cleanup());
test("catalog searches real records, sorts, resets and displays empty state", async () => {
  const user = userEvent.setup({ document: dom.window.document });
  const ui = render(<Catalog products={products} categories={categories} />, {
    wrapper,
  });
  const search = ui.getByRole("textbox", { name: "Szukaj w katalogu" });
  await user.type(search, "__nieistniejacy_7f428c");
  await waitFor(() => assert(ui.getByText("Nie znaleźliśmy takiego sprzętu.")));
  const inquiryLink = ui.getByRole("link", { name: "Zapytaj o poszukiwany sprzęt" }).getAttribute("href") || "";
  assert(decodeURIComponent(inquiryLink).includes("__nieistniejacy_7f428c"));
  await user.click(ui.getAllByRole("button", { name: "Wyczyść filtry" })[0]);
  await waitFor(() =>
    assert(ui.container.querySelectorAll(".product-card").length > 0),
  );
  const first = products.find((p: any) => p.categoryIds.length);
  await user.type(search, first.name);
  await waitFor(() => assert(ui.container.textContent?.includes(first.name)));
  await user.selectOptions(ui.getByLabelText("Sortuj produkty"), "za");
  assert.equal(
    (ui.getByLabelText("Sortuj produkty") as HTMLSelectElement).value,
    "za",
  );
  await user.selectOptions(
    ui.getByLabelText("Specjalizacja"),
    first.categoryIds[0],
  );
  await waitFor(() =>
    assert(ui.container.querySelectorAll(".product-card").length > 0),
  );
});
test("inquiry preselects product, validates and clearly does not send", async () => {
  const user = userEvent.setup({ document: dom.window.document });
  const product = products[0];
  const ui = render(
    <SearchParamsContext.Provider
      value={new URLSearchParams({ produkt: product.slug })}
    >
      <Inquiry products={products} />
    </SearchParamsContext.Provider>,
  );
  assert.equal(
    (ui.getByLabelText("Produkt lub temat zapytania") as HTMLInputElement)
      .value,
    product.name,
  );
  await user.click(
    ui.getByRole("button", { name: "Przygotuj podsumowanie zapytania" }),
  );
  assert.equal(ui.queryByRole("status"), null);
  await user.type(ui.getByLabelText("Imię i nazwisko *"), "Jan Testowy");
  await user.type(ui.getByLabelText("Adres e-mail *"), "test@example.com");
  await user.type(
    ui.getByLabelText("Treść zapytania *"),
    "Proszę o ofertę tego urządzenia.",
  );
  await user.type(ui.getByLabelText("Telefon"), "123456789");
  await user.type(ui.getByLabelText("Nazwa placówki"), "Gabinet Testowy");
  await user.click(ui.getByRole("checkbox"));
  await user.click(
    ui.getByRole("button", { name: "Przygotuj podsumowanie zapytania" }),
  );
  await waitFor(() =>
    assert(
      ui
        .getByRole("status")
        .textContent?.includes("Wiadomość nie została wysłana."),
    ),
  );
  assert(
    ui
      .getByRole("link", { name: "Otwórz w swojej poczcie" })
      .getAttribute("href")
      ?.startsWith("mailto:"),
  );
  const emailDraft = decodeURIComponent(ui.getByRole("link", { name: "Otwórz w swojej poczcie" }).getAttribute("href") || "");
  assert(emailDraft.includes("Telefon: 123456789"));
  assert(emailDraft.includes("Placówka: Gabinet Testowy"));
  await user.type(ui.getByLabelText("Treść zapytania *"), " Dziękuję.");
  assert.equal(ui.queryByRole("status"), null);
});
test("gallery changes actual image; dialog controls respond", async () => {
  const p = products.find((p: any) => p.images.length > 1);
  assert(p, "Real product with gallery is required");
  dom.window.HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  dom.window.HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
  const user = userEvent.setup({ document: dom.window.document });
  const ui = render(<Gallery images={p.images} name={p.name} />);
  await user.click(ui.getByRole("button", { name: "Pokaż zdjęcie 2" }));
  assert.equal(
    ui.getByAltText(`${p.name} — zdjęcie 2`).getAttribute("src"),
    p.images[1].src,
  );
  await user.click(ui.getByRole("button", { name: "Powiększ zdjęcie" }));
  assert(ui.getByRole("dialog").hasAttribute("open"));
  await user.click(ui.getByRole("button", { name: "Zamknij powiększenie" }));
  assert.equal(ui.queryByRole("dialog"), null);
});
test("mobile navigation state and search toggle respond", async () => {
  const user = userEvent.setup({ document: dom.window.document });
  const ui = render(<Header />, { wrapper });
  await user.click(ui.getByRole("button", { name: "Otwórz menu" }));
  assert.equal(
    ui
      .getByRole("button", { name: "Zamknij menu" })
      .getAttribute("aria-expanded"),
    "true",
  );
  await user.click(ui.getByRole("button", { name: "Zamknij menu" }));
  assert.equal(
    ui
      .getByRole("button", { name: "Otwórz menu" })
      .getAttribute("aria-expanded"),
    "false",
  );
  await user.click(ui.getByRole("button", { name: "Otwórz wyszukiwarkę" }));
  assert(ui.getByLabelText("Czego szukasz?"));
});
