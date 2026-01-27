import React, { Suspense } from "react";
import Sponsors from "@/components/sponsors";
import ContactUs from "@/components/contactUs";

export default function SponsorsPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="h-screen w-screen absolute top-0 max-w-full bg-[radial-gradient(circle_at_top,_rgba(255,95,31,0.1),_transparent_60%)] bg-[length:140%_140%] bg-[position:50%_0%] sm:bg-[length:120%_120%]" />
      <div className="flex w-full min-h-screen flex-col">
        <div className="flex-1">
          <Sponsors />
        </div>
        <Suspense fallback={null}>
          <ContactUs disableSectionTracking />
        </Suspense>
      </div>
    </main>
  );
}
