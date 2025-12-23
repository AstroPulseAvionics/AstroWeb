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
            className="w-full scroll-mt-[7rem] mt-20 mb-12 sm:mb-24"
            initial={{opacity: 0, y: 100}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.175}}
            id={"about"}
        >
            <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
                <SectionHeading eyebrow="About" title="About Us" />
                <div className="mt-6 flex flex-col gap-6">
                    <div className="text-left flex flex-col gap-4 max-w-4xl">
                        <p className="text-left text-neutral-300">
                        AstroPulse is an undergraduate-led engineering project advancing
                        electric propulsion capability in Canada through the design, build,
                        and testing of a Hall-effect thruster. Developed at the University of
                        Calgary, the project brings together expertise in embedded systems,
                        power electronics, magnetic design, and plasma physics to tackle a
                        technology typically reserved for national space agencies and specialized
                        industry. By grounding the design in established literature, validating
                        subsystems through simulation and testing, and pursuing full system integration,
                        AstroPulse aims to lower the barrier to electric propulsion research while
                        demonstrating what disciplined, hands-on engineering can achieve at the undergraduate
                        level. Beyond a single thruster, the project seeks to establish a foundation for
                        future student-led research and innovation in satellite propulsion.
                        </p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
