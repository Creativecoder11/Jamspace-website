"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(CustomEase);
if (!CustomEase.get("brandEase")) {
    CustomEase.create("brandEase", "0.24, 0.43, 0.15, 0.97");
}

const services = [
    {
        title: "(01) Space Planning",
        image: "/images/cta-strip-01.webp",
    },
    {
        title: "(02) Interior Styling",
        image: "/images/cta-strip-02.webp",
    },
    {
        title: "(03) Furniture Selection",
        image: "/images/cta-strip-03.webp",
    },
    {
        title: "(04) Lighting Design",
        image: "/images/cta-strip-01.webp",
    },
    {
        title: "(05) Material Selection",
        image: "/images/cta-strip-02.webp",
    },
    {
        title: "(06) 3D Visualization",
        image: "/images/cta-strip-03.webp",
    },
];

export default function ResidentialIncludedServices() {
    const [activeImage, setActiveImage] = useState(services[0].image);
    const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

    const getAccentColor = () => {
        if (typeof window === "undefined") return "#000";
        return getComputedStyle(document.documentElement)
            .getPropertyValue("--color-accent")
            .trim();
    };

    const handleEnter = (title: string, image: string) => {
        setActiveImage(image);
        const el = itemRefs.current.get(title);
        if (!el) return;
        gsap.to(el, {
            x: 8, // matches Tailwind's translate-x-2 (0.5rem)
            color: getAccentColor(),
            duration: 0.3,
            ease: "brandEase",
        });
    };

    const handleLeave = (title: string) => {
        const el = itemRefs.current.get(title);
        if (!el) return;
        gsap.to(el, {
            x: 0,
            color: "inherit",
            duration: 0.3,
            ease: "brandEase",
        });
    };

    return (
        <section className="border-b border-border border-t md:border-t-0 pt-15">
            {/* Heading */}
            <div className="md:border-y border-border">
                <div className="mx-auto flex max-w-335 flex-col md:flex-row md:items-start md:justify-between">
                    <div className="md:w-2/3 md:border-r border-border pb-4 md:py-8">
                        <AnimatedHeading
                            as="h2"
                            lines={["What's Included", "in This Service."]}
                            className="mx-4 text-[44px] font-normal leading-[120%] md:mx-0 md:text-6xl md:leading-18"
                        />
                    </div>

                    <div className="mx-4 pb-4 md:mx-0 md:w-1/3 md:border-l border-border md:py-8 md:pl-8">
                        <p className="text-muted">
                            Everything you need to transform your home into a thoughtfully
                            designed, functional, and timeless living space.
                        </p>

                        <div className="mt-3 md:mt-6">
                            <MagneticButton>
                                <Button href="/about">Start a Project</Button>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto flex md:max-w-335 flex-col md:flex-row">
                {/* Image */}
                <div className="w-full border-b border-border py-4 px-4 md:w-1/2 md:border-b-0 md:border-r md:py-12 md:pr-12">
                    <div className="relative h-80 md:h-103.25 w-full overflow-hidden">
                        <Image
                            src={activeImage}
                            alt="Service"
                            fill
                            className="object-cover transition-opacity duration-500"
                        />
                    </div>
                </div>

                {/* Icon */}
                <div className="hidden md:flex w-full items-center justify-center border-b border-border p-4 md:w-[16.666%] md:border-b-0 md:border-r md:px-0">
                    <Image
                        src="/JAM-Black.svg"
                        width={100}
                        height={334}
                        alt="Service Icon"
                        className="h-12 w-12 md:h-83.5 md:w-25"
                    />
                </div>

                <div className="flex md:hidden w-full items-center justify-center border-b border-border p-4 md:w-[16.666%] md:border-b-0 md:border-r md:px-0">
                    <Image
                        src="/jam-footer-icon.svg"
                        width={334}
                        height={100}
                        alt="Service Icon"
                        className="h-25 w-83.5"
                    />
                </div>

                {/* List */}
                <div className="w-full p-6 md:w-[33.333%] md:py-12 md:pl-10">
                    <p className="text-base">Including:</p>

                    <ul className="mt-5 flex flex-col gap-4 md:gap-6">
                        {services.map((service) => (
                            <li
                                key={service.title}
                                ref={(el) => {
                                    if (el) itemRefs.current.set(service.title, el);
                                    else itemRefs.current.delete(service.title);
                                }}
                                onMouseEnter={() => handleEnter(service.title, service.image)}
                                onMouseLeave={() => handleLeave(service.title)}
                                onFocus={() => handleEnter(service.title, service.image)}
                                onBlur={() => handleLeave(service.title)}
                                className="cursor-pointer text-2xl md:text-3xl"
                            >
                                {service.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}