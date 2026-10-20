/** Decorative, generated symbols; the adjacent text provides the accessible label. */
export const categorySymbols = [
  "medical",
  "dental",
  "veterinary",
  "furniture",
] as const;
export type SymbolName =
  (typeof categorySymbols)[number] | "service" | "finance" | "buyback";
export default function VisualSymbol({
  name,
  className = "",
}: {
  name: SymbolName;
  className?: string;
}) {
  return (
    <span
      className={`visual-symbol symbol-${name} ${className}`}
      aria-hidden="true"
    />
  );
}
