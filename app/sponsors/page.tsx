import React from "react";
import Sponsors from "@/components/sponsors";

export default function SponsorsPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="h-screen w-screen absolute top-0 max-w-full bg-[radial-gradient(circle_at_top,_rgba(255,95,31,0.1),_transparent_60%)] bg-[length:140%_140%] bg-[position:50%_0%] sm:bg-[length:120%_120%]" />
      <Sponsors />
    </main>
  );
}
