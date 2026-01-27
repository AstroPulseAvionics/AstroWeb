"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "@/components/section-heading";
import sponsorshipParts from "@/lib/part-by-part.json";

const getPriceValue = (price: string) => {
  const value = Number(price);
  return Number.isFinite(value) && value > 0 ? value : 0;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-CA").format(value);

const getFundingStatus = (part: { price: string; funded?: number }) => {
  const priceValue = getPriceValue(part.price);
  const fundedValue = typeof part.funded === "number" ? part.funded : 0;
  const progress =
    priceValue === null
      ? 0
      : Math.min(100, Math.max(0, (fundedValue / priceValue) * 100));

  return {
    priceValue,
    fundedValue,
    progress,
    isAvailable: priceValue === null || fundedValue < priceValue,
  };
};

function PartSketch() {
  return (
    <div className="relative h-28 w-[180px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 via-black/70 to-black/90 sm:w-[200px]">
      <svg
        viewBox="0 0 220 110"
        aria-hidden="true"
        className="h-full w-full"
      >
        <rect
          x="14"
          y="16"
          width="192"
          height="78"
          rx="12"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
        <rect
          x="28"
          y="30"
          width="40"
          height="50"
          rx="8"
          fill="none"
          stroke="rgba(249,115,22,0.65)"
          strokeWidth="2"
        />
        <rect
          x="80"
          y="36"
          width="110"
          height="12"
          rx="6"
          fill="rgba(255,255,255,0.08)"
        />
        <rect
          x="80"
          y="56"
          width="96"
          height="12"
          rx="6"
          fill="rgba(255,255,255,0.08)"
        />
        <rect
          x="80"
          y="76"
          width="72"
          height="10"
          rx="5"
          fill="rgba(255,255,255,0.08)"
        />
      </svg>
      <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/50 px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-neutral-400">
        Render
      </div>
    </div>
  );
}

function PartMedia({ name, image }: { name: string; image?: string }) {
  if (!image) {
    return <PartSketch />;
  }

  return (
    <div className="relative h-28 w-[180px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 via-black/70 to-black/90 sm:w-[200px]">
      <Image
        src={image}
        alt={`${name} part`}
        fill
        sizes="(max-width: 640px) 220px, 220px"
        className="object-contain p-3"
      />
    </div>
  );
}

export default function PartByPart() {
  const { ref } = useSectionInView("Part by Part", 0, "0px 0px -50% 0px");
  const [hideFunded, setHideFunded] = React.useState(false);
  const [sortMode, setSortMode] = React.useState<
    "default" | "name-asc" | "price-asc" | "price-desc"
  >("default");
  const [amounts, setAmounts] = React.useState<Record<string, string>>({});

  const aggregateFunding = React.useMemo(() => {
    return sponsorshipParts.reduce(
      (totals, part) => {
        const priceValue = getPriceValue(part.price);
        const fundedValue = typeof part.funded === "number" ? part.funded : 0;

        if (priceValue !== null) {
          totals.totalPrice += priceValue;
          totals.totalFunded += fundedValue;
        }

        return totals;
      },
      { totalPrice: 0, totalFunded: 0 }
    );
  }, []);

  const originalOrder = React.useMemo(() => {
    return new Map(
      sponsorshipParts.map((part, index) => [part.name, index])
    );
  }, []);

  const filteredParts = React.useMemo(() => {
    const matchesFilter = sponsorshipParts.filter((part) => {
      const funding = getFundingStatus(part);
      if (hideFunded && !funding.isAvailable) {
        return false;
      }
      return true;
    });

    return matchesFilter.slice().sort((a, b) => {
      if (sortMode === "default") {
        return (
          (originalOrder.get(a.name) ?? 0) -
          (originalOrder.get(b.name) ?? 0)
        );
      }
      if (sortMode === "name-asc") {
        return a.name.localeCompare(b.name);
      }

      const priceA = getPriceValue(a.price);
      const priceB = getPriceValue(b.price);

      if (priceA === null && priceB === null) {
        return a.name.localeCompare(b.name);
      }
      if (priceA === null) {
        return 1;
      }
      if (priceB === null) {
        return -1;
      }

      const priceSort =
        sortMode === "price-asc" ? priceA - priceB : priceB - priceA;
      if (priceSort !== 0) {
        return priceSort;
      }

      return a.name.localeCompare(b.name);
    });
  }, [hideFunded, originalOrder, sortMode]);

  const totalProgress =
    aggregateFunding.totalPrice > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (aggregateFunding.totalFunded / aggregateFunding.totalPrice) * 100
          )
        )
      : 0;

  const handleSponsor = (part: (typeof sponsorshipParts)[number]) => {
    const funding = getFundingStatus(part);
    if (!funding.isAvailable) {
      return;
    }

    const amountInput = amounts[part.name]?.trim();
    const params = new URLSearchParams(window.location.search);
    params.set("sponsorPart", part.name);
    if (amountInput) {
      params.set("sponsorAmount", amountInput);
    } else {
      params.delete("sponsorAmount");
    }

    const nextUrl = `${window.location.pathname}?${params.toString()}#contact`;
    window.history.replaceState(null, "", nextUrl);

    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="part-by-part" ref={ref} className="w-full scroll-mt-28 pt-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Part by Part"
          title="Sponsor a Part"
        />

        <div className="mt-4 rounded-3xl border border-white/10 bg-neutral-900/70 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Total Funding Progress
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                ${formatCurrency(aggregateFunding.totalFunded)} / $
                {formatCurrency(aggregateFunding.totalPrice)}
              </p>
            </div>
            <p className="text-xs text-neutral-500">
              {Math.round(totalProgress)}% funded overall
            </p>
          </div>
          <div className="mt-4 h-3 w-full rounded-full bg-white/10">
            <div
              className="h-3 rounded-full bg-orange-500 transition-all"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm text-neutral-300 sm:text-base">
            Become part of the build. Choose to sponsor a component and help
            fund the materials and critical hardware behind the system.
          </p>
          <Link
            href="/sponsors"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/30 hover:bg-white/5"
          >
            View Sponsors
          </Link>
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
          Prices in CAD
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch">
          <label className="flex h-full flex-col gap-2 rounded-3xl border border-white/10 bg-neutral-900/50 p-4 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400 sm:p-5">
            <span>Sort by</span>
            <span className="relative">
              <select
                className="h-11 min-w-[220px] appearance-none rounded-2xl border border-white/10 bg-black/40 px-3 pr-10 text-sm font-normal tracking-normal text-white focus:border-orange-400 focus:outline-none"
                value={sortMode}
                onChange={(event) =>
                  setSortMode(
                    event.target.value as
                      | "default"
                      | "name-asc"
                      | "price-asc"
                      | "price-desc"
                  )
                }
              >
                <option value="default">Default</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              >
                <path
                  d="M4 6l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </label>
          <label className="flex h-full items-center gap-3 rounded-3xl border border-white/10 bg-neutral-900/50 p-4 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400 sm:p-5">
            <span className="relative inline-flex h-5 w-5 items-center justify-center">
              <input
                type="checkbox"
                className="peer h-5 w-5 appearance-none rounded border border-white/20 bg-black/40 transition focus:outline-none focus:ring-2 focus:ring-orange-400/60"
                checked={hideFunded}
                onChange={(event) => setHideFunded(event.target.checked)}
                aria-label="Hide funded items"
              />
              <svg
                viewBox="0 0 12 10"
                aria-hidden="true"
                className="pointer-events-none absolute h-3 w-3 text-orange-300 opacity-0 transition peer-checked:opacity-100"
              >
                <path
                  d="M1 5l3 3 7-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Hide funded items
          </label>
        </div>

        <div className="mt-8 grid gap-6">
          {filteredParts.map((part) => {
            const funding = getFundingStatus(part);

            return (
              <article
                key={part.name}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/70 shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition hover:border-white/20 hover:bg-neutral-900/80"
              >
                <div className="flex flex-col gap-6 p-5 pb-10 sm:flex-row sm:items-center sm:justify-between sm:p-6 sm:pb-12">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <PartMedia name={part.name} image={part.image} />
                  <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">
                          {part.name}
                        </h3>
                        <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-neutral-400">
                          {funding.isAvailable ? "Available" : "Funded"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-neutral-300">
                        {part.description}
                      </p>
                      {funding.priceValue === null && (
                        <p className="mt-3 text-xs text-neutral-500">
                          Funding target TBD
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 sm:flex-col sm:items-end">
                    {funding.priceValue === null ? (
                      <p className="text-base font-semibold text-orange-300">
                        ${part.price}{" "}
                        <span className="text-xs text-neutral-500">CAD</span>
                      </p>
                    ) : (
                      <div className="text-right">
                        <p className="text-lg font-semibold text-orange-300">
                          ${formatCurrency(funding.fundedValue)} / $
                          {formatCurrency(funding.priceValue)}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {Math.round(funding.progress)}% funded
                        </p>
                      </div>
                    )}
                    {funding.isAvailable && (
                      <input
                        type="number"
                        min="1"
                        step="1"
                        inputMode="numeric"
                        placeholder={"$" + (!getPriceValue(part.price) ? 0 : getPriceValue(part.price) - funding.fundedValue) + " left!"}
                        className="h-10 w-36 appearance-none rounded-2xl border border-white/10 bg-black/40 px-3 text-xs font-semibold tracking-[0.2em] text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none sm:w-40"
                        value={amounts[part.name] ?? ""}
                        onChange={(event) =>
                          setAmounts((prev) => ({
                            ...prev,
                            [part.name]: event.target.value,
                          }))
                        }
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => void handleSponsor(part)}
                      disabled={!funding.isAvailable}
                      className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                        funding.isAvailable
                          ? "bg-orange-600 text-white hover:bg-orange-500"
                          : "cursor-not-allowed border border-white/10 text-neutral-500"
                      }`}
                    >
                      {funding.isAvailable ? "Sponsor" : "Reserved"}
                    </button>
                  </div>
                </div>
                {funding.priceValue !== null && (
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/10">
                    <div
                      className="h-full bg-orange-500 transition-all"
                      style={{ width: `${funding.progress}%` }}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
