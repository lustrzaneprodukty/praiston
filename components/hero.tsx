"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
export default function Hero({ product }: { product?: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className="hero-scene"
      ref={ref}
      onPointerMove={(e) => {
        if (
          e.pointerType !== "mouse" ||
          matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const r = e.currentTarget.getBoundingClientRect();
        ref.current?.style.setProperty(
          "--rx",
          `${(e.clientY - r.top - r.height / 2) / 90}deg`,
        );
        ref.current?.style.setProperty(
          "--ry",
          `${(e.clientX - r.left - r.width / 2) / 90}deg`,
        );
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--rx", "0deg");
        ref.current?.style.setProperty("--ry", "0deg");
      }}
    >
      <div className="scene-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="scene-cross cross-a">
        <Plus size={20} />
      </div>
      <div className="scene-cross cross-b">
        <Plus size={20} />
      </div>
      <span className="scene-coordinate">P / 01 — MEDICAL EQUIPMENT</span>
      <div className="hero-pedestal" />
      {product?.images[0]?.src ? (
        <img
          className="hero-device"
          src={product.images[0].src}
          alt={product.name}
          width="800"
          height="800"
          fetchPriority="high"
        />
      ) : (
        <div
          className="abstract-mark"
          aria-label="Abstrakcyjna kompozycja przestrzenna, nie przedstawia produktu"
        >
          <i />
          <i />
          <i />
        </div>
      )}
      <div className="scene-caption">
        <span className="orange-dot" />
        PRECYZJA MA ZNACZENIE
      </div>
      {product && (
        <Link className="hero-product-label" href={`/produkt/${product.slug}`}>
          <span>
            <small>POZNAJ URZĄDZENIE</small>
            {product.name}
          </span>
          <ArrowUpRight size={22} />
        </Link>
      )}
    </div>
  );
}
