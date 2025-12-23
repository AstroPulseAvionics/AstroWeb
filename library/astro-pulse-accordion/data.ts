export type AccordionItemType = {
  id: string;
  title: string;
  description: string;
  imagePath?: string;
  colors?: { name: string; code: string }[];
  mediaSize?: string;
  mediaSizeLg?: string;
  mediaMinSize?: string;
  mediaMinSizeLg?: string;
};

export const data: AccordionItemType[] = [
  {
    id: "thruster-design",
    title: "Thruster Design",
    description:
      "System-level architecture defining the discharge chamber, magnetic circuit, and propellant path.",
    imagePath: "/images/accordion/Hall%20Thruster%20Concept.png",
  },
  {
    id: "cathode",
    title: "Cathode",
    description:
      "Electron emission system optimized for stable discharge and long-life operation.",
    imagePath: "/images/accordion/Cathode.png",
    mediaSize: "420px",
    mediaSizeLg: "640px",
    mediaMinSize: "260px",
    mediaMinSizeLg: "360px",
  },
  {
    id: "magnetic-field-design",
    title: "Magnetic Field Design",
    description:
      "Field geometry tuned to maximize ionization efficiency and plume stability.",
    imagePath: "/images/accordion/Magnetic%20Circuit.png",
  },
  {
    id: "injector",
    title: "Injector",
    description:
      "Propellant delivery designed for uniform distribution and controlled mass flow.",
    imagePath: "/images/accordion/Swirl%20Injector.png",
    mediaSize: "300px",
    mediaSizeLg: "300px",
    mediaMinSize: "260px",
    mediaMinSizeLg: "360px",
  },
  {
    id: "power-processing-unit",
    title: "Power Processing Unit",
    description:
      "Power conversion architecture for efficient, reliable thruster operation.",
    imagePath: "/images/accordion/Electrical%20Sim.png",
  },
  {
    id: "orbital-mechanics-simulator",
    title: "Orbital Mechanics Simulator",
    description:
      "Simulation environment to validate maneuvers and long-duration mission profiles.",
    imagePath: "/images/accordion/Orbital%20Mech%20Sim.mp4",
  },
] as const;
