import React from "react";
import { MdRocketLaunch } from "react-icons/md";

// (other icon imports removed)
export const githubLink = "https://github.com/AstroPulseAvionics"
export const links = [{
        name: "About",
        hash: "#about",
    },
    {
        name: "Design",
        hash: "#design",
    },
    {
        name: "Timeline",
        hash: "#projectTimeline",
    },
    {
        name: "Part by Part",
        hash: "/part-by-part",
    },
    {
        name: "Sponsors",
        hash: "/sponsors",
    },
    {
        name: "Team",
        hash: "#team",
    },
    {
        name: "Contact",
        hash: "#contact",
    },
] as const;

export const experiencesData = [
    {
        name: "Literature Review",
        location: "Completed",
        description:
            "Reviewed theory and selected the Hall Effect Thruster architecture.",
        icon: React.createElement(MdRocketLaunch),
        date: "Sept 2025",
        isCurrent: false,
    },
    {
        name: "Conceptual Design",
        location: "Completed",
        description:
            "Defined subsystems and initial architecture.",
        icon: React.createElement(MdRocketLaunch),
        date: "Sept - Oct 2025",
        isCurrent: false,
    },
    {
        name: "Design & Simulation",
        location: "Completed",
        description:
            "Magnetic, thermal, CFD, and circuit modeling (SolidWorks, Ansys, OpenFOAM, PLECS).",
        icon: React.createElement(MdRocketLaunch),
        date: "Oct 2025 - Jan 2026",
        isCurrent: false,
    },
    {
        name: "Manufacturing",
        location: "In Progress",
        description:
            "Prototype via 3D printing; machining with lathe/mill, CNC, water-jet, furnace, metal 3D print.",
        icon: React.createElement(MdRocketLaunch),
        date: "Jan – Mar 2026",
        isCurrent: true,
    },
    {
        name: "Testing",
        location: "Upcoming",
        description:
            "Subsystem tests (Faraday cups, Gauss probes), then vacuum-chamber system testing.",
        icon: React.createElement(MdRocketLaunch),
        date: "Mar – Apr 2026",
        isCurrent: false,
    },
] as const;
