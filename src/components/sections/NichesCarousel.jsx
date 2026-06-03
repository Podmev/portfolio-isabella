"use client";

import { useRef } from "react";

export default function NichesCarousel({ niches = [], locale = "en" }) {
  const ref = useRef(null);
  const visible = niches.filter((niche) => niche?.slug).slice(0, 18);

  if (!visible.length) return null;

  const scrollBy = (direction) => {
    ref.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <section className="border-y border-border bg-surface-alt py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">Niches</p>
            <h2 className="mt-2 text-2xl md:text-3xl">Explore the work by focus area</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous niches"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-lg transition hover:bg-secondary"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next niches"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-lg transition hover:bg-secondary"
            >
              ›
            </button>
          </div>
        </div>

        <div ref={ref} className="carousel-scroll flex snap-x gap-4 overflow-x-auto pb-3">
          {visible.map((niche) => (
            <a
              key={niche.slug}
              href={`/${locale}/portfolio?industry=${encodeURIComponent(niche.slug)}`}
              className="min-w-[245px] snap-start rounded-[24px] border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{niche.count || 0} works</p>
              <h3 className="mt-3 line-clamp-2 text-xl">{niche.label || niche.slug}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}



