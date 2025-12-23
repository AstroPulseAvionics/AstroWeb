"use client";

import React from "react";
import { AstroPulseAccordion } from "../library/astro-pulse-accordion";
import type { AccordionItemType } from "@/library/astro-pulse-accordion/data";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "@/components/section-heading";

export default function Design() {
  const { ref } = useSectionInView("Design", 0.25);

  return (
    <section
      id="design"
      ref={ref}
      className="w-full scroll-mt-28 pt-16"
    >

      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <SectionHeading eyebrow="Design" title="Take a closer look" /> 
        <AstroPulseAccordion />   
      </div>
    </section>
  );
}
