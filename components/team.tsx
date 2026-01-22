"use client";

import React from "react";
import Image from "next/image";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "@/components/section-heading";
import shivamPhoto from "@/public/images/team/Shivam.png";
import gavinPhoto from "@/public/images/team/Gavin.png";
import zachScottPhoto from "@/public/images/team/Zach Scott.png";
import andrewPhoto from "@/public/images/team/Andrew.png";
import gurnoorPhoto from "@/public/images/team/Gurnoor.png";
import zachBlairPhoto from "@/public/images/team/Zach Blair.png";

const teamPlaceholders = [
  {
    name: "Shivam Desai",
    role: "Software, Mechanical",
    photo: shivamPhoto,
    linkedin: "https://www.linkedin.com/in/shivam-desai-0458a5231/",
  },
  {
    name: "Gavin Angstadt",
    role: "Mechanical",
    photo: gavinPhoto,
    linkedin: "https://www.linkedin.com/in/gavin-angstadt-44bab3180/",
  },
  {
    name: "Zachary Scott",
    role: "Mechanical",
    photo: zachScottPhoto,
    linkedin: "https://www.linkedin.com/in/zach-scott-0baa72262/",
  },
  {
    name: "Andrew Gonsalves",
    role: "Mechanical",
    photo: andrewPhoto,
    linkedin: "https://www.linkedin.com/in/andrew-gonsalves-b620a621b/",
  },
  {
    name: "Zachariah Blair",
    role: "Software",
    photo: zachBlairPhoto,
    linkedin: "https://www.linkedin.com/in/zachariah-blair-471458263/",
  },
  {
    name: "Gurnoor Gill",
    role: "Electrical",
    photo: gurnoorPhoto,
    linkedin: "https://www.linkedin.com/in/gurnoor-gill-53a2301a0/",
  },
];

export default function Team() {
  const { ref } = useSectionInView("Team");

  return (
    <section
      id="team"
      ref={ref}
      className="w-full scroll-mt-28 pt-20"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="The Team"
          title="The Experience Behind AstroPulse"
        />

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamPlaceholders.map((member) => (
            <a
              key={member.name}
              href={member.linkedin}
              className="block rounded-3xl border border-white/10 bg-neutral-900/70 p-4 sm:p-5 lg:p-5 shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition hover:border-white/20 hover:bg-neutral-900/80"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/30 sm:h-32 sm:w-24 lg:h-36 lg:w-28">
                  <Image
                    src={member.photo}
                    alt={`${member.name} portrait`}
                    fill
                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 160px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">
                    {member.name}
                  </p>
                  <p className="text-sm text-neutral-400">{member.role}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
