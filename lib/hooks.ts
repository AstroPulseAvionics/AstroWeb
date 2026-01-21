import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {links} from "@/lib/data";



export type SectionName = (typeof links)[number]["name"] | "Home";

export function useSectionInView(
    sectionName: SectionName,
    threshold = 0.75,
    rootMargin?: string
) {
    const { ref, inView } = useInView({
        threshold,
        rootMargin,
    });
    const { setActiveSection } = useActiveSectionContext();

    useEffect(() => {
        if (inView ) {
            setActiveSection(sectionName);
        }
    }, [inView, setActiveSection, sectionName]);

    return {
        ref,
    };
}
