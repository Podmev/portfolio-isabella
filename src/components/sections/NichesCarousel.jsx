"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, ChevronLeft, ChevronRight, Hash } from "lucide-react";

import { getNicheVisualSrc } from "@/lib/tags/nicheVisuals";

export default function NichesCarousel({ niches = [] }) {
  const locale = useLocale();
  const t = useTranslations();
  const labels = {
    eyebrow: t("nichesEyebrow"),
    title: t("nichesTitle"),
    description: t("nichesDescription"),
    works: t("nichesWorks"),
    previous: t("nichesPrevious"),
    next: t("nichesNext"),
    seeAll: t("nichesSeeAll"),
  };
  const carouselRef = useRef(null);
  const dragStateRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const visibleNiches = niches.filter((niche) => niche?.slug && Number(niche?.count || 0) > 0);

  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return undefined;

    function updateScrollState() {
      const maxScroll = element.scrollWidth - element.clientWidth;
      setCanScrollPrev(element.scrollLeft > 8);
      setCanScrollNext(element.scrollLeft < maxScroll - 8);
    }

    updateScrollState();
    element.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      element.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [visibleNiches.length]);

  if (!visibleNiches.length) return null;

  function scrollCarousel(direction) {
    const element = carouselRef.current;
    if (!element) return;

    const cardWidth = element.querySelector("[data-niche-card]")?.getBoundingClientRect()?.width || 216;
    element.scrollBy({
      left: direction * (cardWidth + 18) * 2,
      behavior: "smooth",
    });
  }

  function handlePointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    const element = carouselRef.current;
    if (!element) return;

    dragStateRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: element.scrollLeft,
      moved: false,
    };
    element.setPointerCapture?.(event.pointerId);
  }

  function handlePointerMove(event) {
    const state = dragStateRef.current;
    const element = carouselRef.current;
    if (!state.active || !element) return;

    const deltaX = event.clientX - state.startX;
    if (Math.abs(deltaX) > 4) {
      state.moved = true;
      setIsDragging(true);
    }
    element.scrollLeft = state.startScrollLeft - deltaX;
  }

  function stopDragging(event) {
    const state = dragStateRef.current;
    const element = carouselRef.current;
    if (!state.active) return;

    element?.releasePointerCapture?.(state.pointerId || event.pointerId);
    dragStateRef.current = {
      active: false,
      pointerId: null,
      startX: 0,
      startScrollLeft: 0,
      moved: state.moved,
    };

    if (state.moved) {
      window.setTimeout(() => {
        dragStateRef.current.moved = false;
        setIsDragging(false);
      }, 0);
    } else {
      setIsDragging(false);
    }
  }

  function preventClickAfterDrag(event) {
    if (!dragStateRef.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <section className="writer-theme-scope overflow-hidden py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
          <div className="flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground md:text-xs md:tracking-[0.28em]">
            <Hash className="h-3.5 w-3.5" />
            {labels.eyebrow}
          </div>
          <h2 className="mt-3 text-3xl leading-tight md:text-5xl">{labels.title}</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
            {labels.description}
          </p>
        </div>

        <div className="flex justify-center sm:justify-end">
          <a
            href={`/${locale}/portfolio`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-secondary"
          >
            {labels.seeAll || labels.works}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="relative mt-5 w-screen max-w-none overflow-hidden py-3">
        <button
          type="button"
          onClick={() => scrollCarousel(-1)}
          disabled={!canScrollPrev}
          className="absolute left-3 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground shadow-sm backdrop-blur-md transition hover:border-muted-foreground hover:bg-card hover:text-foreground disabled:pointer-events-none disabled:opacity-30 sm:left-6 sm:h-9 sm:w-9"
          aria-label={labels.previous}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div
          ref={carouselRef}
          className={`flex touch-pan-y gap-4 overflow-x-auto px-[3.25rem] py-2 [mask-image:linear-gradient(to_right,transparent,black_56px,black_calc(100%-56px),transparent)] [scrollbar-width:none] sm:gap-5 sm:px-[5rem] sm:[mask-image:linear-gradient(to_right,transparent,black_88px,black_calc(100%-88px),transparent)] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
          tabIndex={0}
          aria-label={labels.title}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onPointerLeave={stopDragging}
        >
          {visibleNiches.map((niche) => (
            <a
              key={niche.id || niche.slug}
              data-niche-card
              href={`/${locale}/portfolio?niche=${encodeURIComponent(niche.slug)}`}
              className="group relative aspect-[1.08/1] w-[11.25rem] shrink-0 overflow-hidden rounded-[26px] border border-white/45 bg-[var(--writer-surface-soft)] shadow-[0_12px_34px_rgba(15,23,42,0.12)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(15,23,42,0.18)] sm:w-[13.25rem]"
              draggable={false}
              onClick={preventClickAfterDrag}
            >
              <img
                src={getNicheVisualSrc(niche.slug)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                draggable={false}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.52),transparent_32%),linear-gradient(to_top,rgba(15,23,42,0.74),rgba(15,23,42,0.28)_42%,rgba(255,255,255,0.04))]" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white drop-shadow-sm">
                <div className="line-clamp-2 text-lg font-semibold leading-tight">{niche.label || niche.slug}</div>
              </div>
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollCarousel(1)}
          disabled={!canScrollNext}
          className="absolute right-3 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground shadow-sm backdrop-blur-md transition hover:border-muted-foreground hover:bg-card hover:text-foreground disabled:pointer-events-none disabled:opacity-30 sm:right-6 sm:h-9 sm:w-9"
          aria-label={labels.next}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
