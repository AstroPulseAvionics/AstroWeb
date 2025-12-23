"use client"
import React from 'react'
import {motion} from 'framer-motion';
import {useSectionInView} from "@/lib/hooks";


export default function Intro(){
    const { ref } = useSectionInView("Home");

    return(
        <motion.div ref={ref}
                    className="flex flex-col justify-center items-start font-light text-left leading-none tracking-tighter w-full px-10 sm:px-14 lg:px-20 mt-16 xl:px-28 sm:mt-0 text-neutral-200"
                    aria-label="AstroPulse"
                    initial={{x: -100, y:"0%", opacity: 0}}
                    animate={{ x:0, y:"0%", opacity:1}}>
            
            {/* <p className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-400 sm:text-sm">
                Advancing electric propulsion
            </p> */}
            {/* <h1 className="mt-4 max-w-2xl text-[3rem] font-semibold leading-[1.05] text-white sm:text-[3.8rem] lg:text-[4.4rem]">
                For Canada.
            </h1> */}
            <h1 className="mt-28 lg:mt-10 lg:ml-10 max-w-2xl text-[3rem] font-semibold leading-[1.05] text-white sm:text-[3.8rem] lg:text-[4.4rem]">
                {/* Advancing electric propulsion for Canada */}
                Advancing Electric Propulsion
            </h1>
            <p className="mt-4 lg:ml-10 text-sm font-semibold uppercase tracking-[0.35em] text-orange-400 sm:mt-6 sm:text-base lg:mt-10">
                An undergraduate project
            </p>
            {/* <p className="mt-4 max-w-xl text-[1.1rem] font-normal leading-snug text-neutral-300 sm:text-[1.3rem]">
                An undergraduate-led Hall-effect thruster project. ric thruster project
            </p> */}
        </motion.div>
    )
} 
