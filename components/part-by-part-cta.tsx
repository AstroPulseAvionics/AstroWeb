"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/section-heading";
import { useSectionInView } from "@/lib/hooks";

const exampleParts = [
  {
    name: "Anode Ring Isolator",
    image: "/images/parts/anode-ring-isolator.png",
  },
  {
    name: "Thermoionic Emitter",
    image: "/images/parts/thermionic-emitter.png",
  },
  {
    name: "Inner Pole",
    image: "/images/parts/inner-pole.png",
  },
  {
    name: "Thruster Cover",
    image: "/images/parts/thruster-cover.png",
  },
];

export default function PartByPartCta() {
  const { ref } = useSectionInView("Part by Part", 0.3);

  return (
    <section id="part-by-part" ref={ref} className="w-full scroll-mt-28 pt-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Part by Part"
          title="Sponsor a Part"
        />
        <div className="rounded-3xl border border-white/10 bg-neutral-900/70 px-6 pb-6 pt-4 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:px-8 sm:pb-8 sm:pt-5">
          <p className="mt-2 max-w-2xl text-sm text-neutral-300 sm:text-base">
            Explore the parts list, see funding progress, and sponsor a component
            directly from the full Part by Part page.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {exampleParts.map((part) => (
              <div
                key={part.name}
                className="rounded-2xl border border-white/10 bg-black/40 p-3"
              >
                <div className="relative h-24 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-neutral-900 via-black/70 to-black/90">
                  <Image
                    src={part.image}
                    alt={part.name}
                    fill
                    sizes="(max-width: 640px) 45vw, 180px"
                    className="object-contain p-2"
                  />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300">
                  {part.name}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/part-by-part"
              className="inline-flex items-center rounded-full bg-orange-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-orange-500"
            >
              View Parts
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
