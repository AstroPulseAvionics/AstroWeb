import React, { Suspense } from "react";
import PartByPart from "@/components/part-by-part";
import ContactUs from "@/components/contactUs";

export default function PartByPartPage() {
  return (
    <main className="relative flex flex-col items-center justify-center">
      <div className="pointer-events-none absolute top-0 -z-10 h-screen w-screen max-w-full bg-[radial-gradient(circle_at_top,_rgba(255,95,31,0.1),_transparent_60%)] bg-[length:140%_140%] bg-[position:50%_0%] sm:bg-[length:120%_120%]" />
      <PartByPart />
      <Suspense fallback={null}>
        <ContactUs disableSectionTracking />
      </Suspense>
    </main>
  );
}
