import type { Metadata } from "next";
import { categories } from "@/lib/catalog";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "@fontsource-variable/manrope";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Praiston — technologia w służbie medycyny",
    template: "%s | Praiston",
  },
  description:
    "Poznaj ofertę nowego i rekondycjonowanego sprzętu medycznego Praiston. Znajdź urządzenie dla swojej specjalizacji i zapytaj o ofertę.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>
        <a href="#main" className="skip-link">
          Przejdź do treści
        </a>
        <Header
          categories={categories
            .filter((c) => ["1", "2", "3", "4"].includes(c.id))
            .map(({ slug, name }) => ({ slug, name }))}
        />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
