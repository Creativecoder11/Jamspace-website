import type { StripImage } from "@/lib/types";

export const aboutStripImages: StripImage[] = [
  { image: "/images/about-strip-01.webp", alt: "Bedroom interior" },
  { image: "/images/about-strip-02.webp", alt: "Reading nook with artwork" },
  { image: "/images/about-strip-03.webp", alt: "Dining room" },
  { image: "/images/about-strip-04.webp", alt: "Kitchen sink and window" },
  { image: "/images/about-strip-05.webp", alt: "Kitchen stove detail" },
];

export const aboutTickerText =
  "Residential Design . Bedroom . Residential Design . Bedroom . Residential Design";

export const aboutMissionVision: {
  key: "mission" | "vision";
  label: string;
  lead: string;
  text: string;
}[] = [
    {
      key: "mission",
      label: "Mission",
      lead: "Our mission",
      text: "is to create thoughtfully designed spaces that enrich everyday living by combining creativity, functionality, and timeless craftsmanship. Through close collaboration and attention to detail, we transform every client's vision into meaningful environments that inspire for years to come.",
    },
    {
      key: "vision",
      label: "Vision",
      lead: "Our vision",
      text: "is to become a leading name in interior design, recognized for redefining everyday spaces with creativity and craftsmanship, and for setting new standards of quality across Bangladesh and beyond.",
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
      value: 3,
      suffix: "+",
      label: "Years of Experience",
      description: "Over 20+ successful projects completed.",
      accent: "yellow",
      icon: "lshape",
    },
    {
      value: 44,
      suffix: "+",
      label: "Projects",
      description:
        "From homes to workplaces, we're creating thoughtfully designed spaces across Dhaka, one project at a time.",
      accent: "pink",
      icon: "traiangle",
    },
    {
      value: 95,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Consistently earning the trust and confidence of our clients.",
      accent: "teal",
      icon: "mshape",
    },
  ];

export const aboutValues: { label: string; accent: Accent }[] = [
  { label: "Creativity", accent: "pink" },
  { label: "Innovation", accent: "yellow" },
  { label: "Collaboration", accent: "teal" },
  { label: "Sustainability", accent: "teal" },
  { label: "Client Centric", accent: "pink" },
  { label: "Attention to Detail", accent: "yellow" },
  { label: "Quality", accent: "yellow" },
  { label: "Integrity", accent: "teal" },
  { label: "Flexibility", accent: "pink" },
];

export const aboutJourneySteps: {
  index: string;
  title: string;
  description: string;
  accent: Accent;
}[] = [
    {
      index: "01",
      title: "Discover",
      description:
        "We understand your vision, lifestyle, and space before every design decision.",
      accent: "yellow",
    },
    {
      index: "02",
      title: "Design",
      description: "Ideas evolve into detailed layouts and realistic 3D visualizations.",
      accent: "pink",
    },
    {
      index: "03",
      title: "Deliver",
      description:
        "Every detail is managed with precision, quality, and seamless coordination.",
      accent: "pink",
    },
    {
      index: "04",
      title: "Reveal",
      description: "A final walkthrough ensures every space is complete and ready to enjoy.",
      accent: "teal",
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
    title: "Environmental",
    description:
      "We prioritize durable materials, efficient planning, and thoughtful design solutions that help reduce waste and support healthier indoor environments.",
  },
  {
    index: "02",
    title: "Economic",
    description:
      "Our timeless designs and quality materials minimize future renovations, helping clients maximize their investment for years to come.",
  },
  {
    index: "03",
    title: "Social",
    description:
      "We create comfortable, accessible, and inspiring spaces that enhance everyday living, encourage meaningful collaboration, and promote overall well being for everyone who experiences them.",
  },
];
