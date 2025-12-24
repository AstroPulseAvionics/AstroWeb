"use client";

import React, {useEffect} from "react";
import {motion} from "framer-motion";
import Image from "next/image"
import profilePic from '../public/images/profile_pic.png'
import SectionHeading from "@/components/section-heading";
import {useInView} from "react-intersection-observer";
import {useActiveSectionContext} from "@/context/active-section-context";
import {useSectionInView} from "@/lib/hooks";

const imageStyle = {
    borderRadius: '100%',
    border: '1px solid rgba(255, 255, 255, 0.2)',
}

export default function About() {
    const { ref } = useSectionInView("About", 0.4);


    return (
        <motion.section
            ref={ref}
            className="w-full scroll-mt-[7rem] mt-20 mb-12 sm:mb-20"
            initial={{opacity: 0, y: 100}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.175}}
            id={"about"}
        >
            <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
                <SectionHeading eyebrow="About" title="About Us" className="sm:text-center" />
                <div className="mt-6 flex flex-col gap-6 items-center">
                    <div className="text-left flex flex-col gap-6 max-w-xl align-middle items-center">
                        <p className="text-md font-semibold uppercase tracking-[0.35em] text-neutral-300 sm:text-center">
                            What we’re building
                        </p>
                        <p className="text-left text-neutral-300">
                            Developed at the University of Calgary, AstroPulse is an undergraduate led electric propulsion project developing and testing a Hall-effect thruster in Canada.
                            The project is focused on designing a fully electric integrated propulsion system, bringing advanced space propulsion into a hands on engineering environment.
                        </p>

                        <p className="text-md font-semibold uppercase tracking-[0.35em] text-neutral-300 sm:text-center ">
                            How we’re doing it
                        </p>
                        <p className="text-justify text-neutral-300">
                            AstroPulse combines mechanical, electrical, and software engineering to address a technology typically developed by specialized industry and national space agencies. The work spans thermal and fluid behavior, magnetic design, materials selection, and manufacturing, alongside power electronics, embedded systems, and control software. Design decisions are driven by first principles, supported by established literature, and validated through simulation and experimental testing.
                            
                        </p>

                        <p className="text-md font-semibold uppercase tracking-[0.35em] text-neutral-300 sm:text-center">
                            Why It Matters
                        </p>
                        <p className="text-justify text-neutral-300 ">
                            Emerging satellite applications are expanding opportunities in space exploration, Earth observation, and communications. Onboard propulsion systems enable precise positioning, formation control and debris avoidance, supporting more ambitious missions for organizations such as Starlink, Spaceium and AstroForge.
                            
                            {/* By grounding the design in established literature, validating
                            subsystems through simulation and testing, and pursuing full system integration,
                            AstroPulse aims to lower the barrier to electric propulsion research while
                            demonstrating what disciplined, hands on engineering can achieve at the undergraduate
                            level. */}
                        </p>
                        <p className="text-justify text-neutral-300 ">
                            By taking on this challenge, we aim to lower the barrier to entry for electric propulsion technology and demonstrate what is possible when undergraduate teams are empowered to build beyond conventional limits. This represents unexplored territory for our team and our university.
                        </p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
