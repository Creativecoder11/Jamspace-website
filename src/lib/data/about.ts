import type { StripImage } from "@/lib/types";

export const aboutStripImages: StripImage[] = [
  {
    image: "/images/bedroom.webp",
    alt: "Bedroom interior with upholstered wall panelling",
    tickerText: ["BEDROOM LAYOUT", "BEDROOM LAYOUT", "BEDROOM LAYOUT"],
  },
  {
    image: "/images/drawing-room.webp",
    alt: "Living room with marble feature wall and lounge seating",
    tickerText: ["LIVING SPACE", "LIVING SPACE", "LIVING SPACE"],
  },
  {
    image: "/images/kitchen.webp",
    alt: "Kitchen with island, bar stools and built-in cabinetry",
    tickerText: ["KITCHEN SPACE", "KITCHEN SPACE", "KITCHEN SPACE"],
  },
  {
    image: "/images/office.webp",
    alt: "Colourful workspace with built-in bookshelves",
    tickerText: ["OFFICE LOBBY", "OFFICE LOBBY", "OFFICE LOBBY"],
  },
  {
    image: "/images/commercial.webp",
    alt: "Retail interior with arched display shelving",
    tickerText: ["RETAIL OUTLET", "RETAIL OUTLET", "RETAIL OUTLET"],
  },
];

export const aboutMobileTexts = [
  "Residential Design",
  "Bedroom",
  "Living Room",
  "Interior Styling",
];

export const aboutMissionVision: {
  key: "mission" | "vision";
  label: string;
  // lead: string;
  text: string;
}[] = [
    {
      key: "mission",
      label: "Mission",
      text: "To create thoughtful, people-centred design solutions that bring together aesthetics, functionality and purpose. Through collaboration, creativity and attention to detail, we transform individual needs and aspirations into spaces that enrich everyday experiences.",
    },
    {
      key: "vision",  
      label: "Vision",
      text: "To shape a future where thoughtful, people-centred design improves everyday experiences, creating meaningful spaces that inspire connection, comfort and a better way of living and working.",
    },
  ];

type Accent = "pink" | "yellow" | "teal";

export const aboutPillars: { title: string; description: string; accent: Accent }[] = [
  {
    title: "Vision Driven Design",
    description:
      "Every project starts by understanding your vision, creating spaces that are meaningful and uniquely yours.",
    accent: "pink",
  },
  {
    title: "Thoughtful Craftsmanship",
    description:
      "We combine creativity and functionality to create interiors that are timeless, practical, and beautifully refined.",
    accent: "yellow",
  },
  {
    title: "Collaborative Journey",
    description:
      "From the first consultation to the final reveal, we create a seamless and rewarding design experience together.",
    accent: "teal",
  },
  {
    title: "Lasting Impact",
    description:
      "We create interiors that inspire everyday living, enhance the way you experience your space, and stand the test of time.",
    accent: "pink",
  },
];

export const aboutStorySnapshots: {
  value: number;
  suffix: string;
  label: string;
  description: string;
  accent: Accent;
  icon: "lshape" | "traiangle" | "mshape";
}[] = [
    {
      value: 2023,
      suffix: "",
      label: "Established",
      description: "Designing homes, workplaces and commercial spaces in Dhaka since 2023.",
      accent: "yellow",
      icon: "lshape",
    },
    {
      value: 52,
      suffix: "+",
      label: "Completed Projects",
      description:
        "From homes to workplaces, each project is designed around the people who use it.",
      accent: "pink",
      icon: "traiangle",
    },
    {
      value: 4,
      suffix: "",
      label: "Design Disciplines",
      description: "Interiors, architecture, furniture, and consultancy & visualisation.",
      accent: "teal",
      icon: "mshape",
    },
  ];

export const aboutValues: { label: string; accent: Accent }[] = [
  { label: "Understanding People", accent: "pink" },
  { label: "Design with Purpose", accent: "yellow" },
  { label: "Creative Thinking", accent: "teal" },
  { label: "Working Together", accent: "teal" },
  { label: "Taking Responsibility", accent: "pink" },
  { label: "Clear Scope", accent: "yellow" },
  { label: "Budget Awareness", accent: "yellow" },
  { label: "Attention to Detail", accent: "teal" },
  { label: "Material Reuse", accent: "pink" },
];

export const aboutJourneySteps: {
  index: string;
  title: string;
  description: string;
  accent: Accent;
  icon: string;
}[] = [
    {
      index: "01",
      title: "Proposal",
      description:
        "If you choose execution, we provide a separate proposal covering scope, specifications, cost and timeline.",
      accent: "yellow",
      icon: "/discover.svg",
    },
    {
      index: "02",
      title: "Realise",
      description:
        "Where separately commissioned, we coordinate execution of the approved design under the agreed contract.",
      accent: "pink",
      icon: "/design.svg",
    },
    {
      index: "03",
      title: "Deliver",
      description:
        "We review the agreed scope and hand over the deliverables. Final design files follow written approval and final payment.",
      accent: "pink",
      icon: "/deliver.svg",
    },
    {
      index: "04",
      title: "Connect",
      description:
        "After handover, we check in, welcome feedback and remain available for relevant support.",
      accent: "teal",
      icon: "/reveal.svg",
    },
  ];

export const aboutTeam: {
  name: string;
  role: string;
  caption: string;
  image: string;
  linkedin: string;
}[] = [
    {
      name: "Soumik Ahmed",
      role: "Creative Director",
      caption: "Watashi wa Banguradeshu Chū o tabi shite imasu",
      image: "/images/soumik-1.png",
      linkedin: "https://linkedin.com/in/soumikahmed",
    },
    {
      name: "Soumik Ahmed",
      role: "Creative Director",
      caption: "Watashi wa Banguradeshu Chū o tabi shite imasu",
      image: "/images/soumik-1.png",
      linkedin: "https://linkedin.com/in/soumikahmed",
    },
    {
      name: "Soumik Ahmed",
      role: "Creative Director",
      caption: "Watashi wa Banguradeshu Chū o tabi shite imasu",
      image: "/images/soumik-1.png",
      linkedin: "https://linkedin.com/in/soumikahmed",
    },
    {
      name: "Soumik Ahmed",
      role: "Creative Director",
      caption: "Watashi wa Banguradeshu Chū o tabi shite imasu",
      image: "/images/soumik-1.png",
      linkedin: "https://linkedin.com/in/soumikahmed",
    },
  ];

export const aboutSustainability: { index: string; title: string; description: string }[] = [
  {
    index: "01",
    title: "Materials",
    description:
      "We consider durability, finish and maintenance when choosing materials for the way each space will be used.",
  },
  {
    index: "02",
    title: "Layout",
    description:
      "We plan around movement, storage and daily routines, from family life at home to customers and teams at work.",
  },
  {
    index: "03",
    title: "Feasibility",
    description:
      "We consider detailing, budget and implementation as the design develops, so clients can make informed decisions before work proceeds.",
  },
];
