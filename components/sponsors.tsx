"use client";

import React from "react";
import Image from "next/image";
import SectionHeading from "@/components/section-heading";
import sponsors from "@/lib/sponsors.json";
import individuals from "@/lib/individual-supporters.json";

export default function Sponsors() {
  return (
    <section className="w-full scroll-mt-28 pt-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <SectionHeading eyebrow="Sponsors" title="The Organizations Making This Possible" />

        {sponsors.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-neutral-900/70 p-6 text-neutral-300 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-8">
            Sponsor logos will appear here as support comes in.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 via-black/70 to-black/90 p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition hover:border-white/20 sm:p-8"
              >
                <div
                  className={`relative h-24 w-full max-w-[220px] rounded-2xl p-2 transition ${
                    sponsor.whiteBackground
                      ? "bg-white/95 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]"
                      : "bg-gradient-to-br from-neutral-900 via-black/70 to-black/90 opacity-85 group-hover:opacity-100"
                  }`}
                >
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    fill
                    sizes="(max-width: 640px) 220px, 260px"
                    className="object-contain"
                  />
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-white">
            Thank you to the following individuals for their support
          </h3>
          {individuals.length === 0 ? (
            <p className="mt-3 text-sm text-neutral-300">
              Personal contributor names will appear here.
            </p>
          ) : (
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-neutral-200">
              {individuals.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-white/10 bg-neutral-900/70 px-4 py-2"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
