"use client"
import React from 'react'
import {motion} from 'framer-motion';
import {links} from "@/lib/data"
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import websiteLogo from "@/public/images/astropulse.svg";
import {useActiveSectionContext} from "@/context/active-section-context";

// <div
//     className="bg-gradient-to-br from-teal-100 to-rose-100 h-full w-screen relative -z-10 blur-[10rem] ">
// </div>
export default function Header() {
    const {activeSection, setActiveSection} = useActiveSectionContext()
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileOpen, setIsMobileOpen] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 8)
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll, {passive: true})

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (

        <header className="relative z-[999]">
            <div className="fixed left-0 right-0 top-0 z-[999]">
                <motion.div
                    className={clsx(
                        "border-b border-white/10 transition-all duration-300",
                        isScrolled ? "bg-neutral-950/75 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-2xl" : "bg-transparent"
                    )}
                    initial={{y: -100, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                >
                <nav className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:h-20 sm:px-10 lg:px-16">
                    <Link
                        className="flex h-full items-center gap-3 text-white transition hover:text-orange-200"
                        href="#home"
                        onClick={() => {
                            // setActiveSection("About")
                            setIsMobileOpen(false)
                        }}
                    >
                        <span className="relative h-full w-[188px] py-3">
                            <Image
                                src={websiteLogo}
                                alt="Logo"
                                fill
                                sizes="188px"
                                className="object-contain object-left"
                                priority
                            />
                        </span>
                    </Link>

                    <ul className="hidden flex-wrap items-center justify-end gap-3 text-[0.78rem] font-medium text-neutral-300 sm:flex sm:gap-6 sm:text-[0.9rem]">
                        {links.map((link => (
                            <li className="relative" key={link.hash}>
                                <Link
                                    className={clsx(
                                        "relative px-1 py-2 transition hover:text-white",
                                        {"text-white": activeSection === link.name}
                                    )}
                                    href={link.hash}
                                    onClick={() => setActiveSection(link.name)}
                                >
                                    {link.name}
                                    {link.name === activeSection && (
                                        <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-orange-500/90"></span>
                                    )}
                                </Link>
                            </li>
                        )))}
                    </ul>

                    <button
                        className="mr-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:bg-white/10 sm:hidden"
                        type="button"
                        aria-label="Toggle menu"
                        aria-expanded={isMobileOpen}
                        onClick={() => setIsMobileOpen((prev) => !prev)}
                    >
                        <span className="sr-only">Toggle menu</span>
                        <div className="flex h-4 w-5 flex-col items-center justify-between">
                            <span
                                className={clsx(
                                    "h-[2px] w-full rounded-full bg-white transition",
                                    isMobileOpen && "translate-y-[6px] rotate-45"
                                )}
                            />
                            <span
                                className={clsx(
                                    "h-[2px] w-full rounded-full bg-white transition",
                                    isMobileOpen && "opacity-0"
                                )}
                            />
                            <span
                                className={clsx(
                                    "h-[2px] w-full rounded-full bg-white transition",
                                    isMobileOpen && "-translate-y-[6px] -rotate-45"
                                )}
                            />
                        </div>
                    </button>
                </nav>

                <div
                    className={clsx(
                        "overflow-hidden border-t border-white/10 backdrop-blur-2xl transition-all duration-300 ease-out sm:hidden",
                        isMobileOpen
                            ? "max-h-[80vh] translate-y-0 opacity-100 pointer-events-auto"
                            : "max-h-0 -translate-y-2 opacity-0 pointer-events-none"
                    )}
                >
                    <ul className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 text-sm font-medium text-neutral-200">
                        {links.map((link => (
                            <li key={link.hash}>
                                <Link
                                    className={clsx(
                                        "flex w-full items-center justify-between rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-white",
                                        {"text-white": activeSection === link.name}
                                    )}
                                    href={link.hash}
                                    onClick={() => {
                                        setActiveSection(link.name)
                                        setIsMobileOpen(false)
                                    }}
                                >
                                    <span>{link.name}</span>
                                    {link.name === activeSection && (
                                        <span className="h-2 w-2 rounded-full bg-orange-500/90"></span>
                                    )}
                                </Link>
                            </li>
                        )))}
                    </ul>
                </div>
                </motion.div>
            </div>


        </header>
    )
}
