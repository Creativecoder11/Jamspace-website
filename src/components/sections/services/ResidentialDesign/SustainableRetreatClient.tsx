"use client";

import { useCallback, useRef } from "react";
import type { CSSProperties, MouseEvent } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Image1 from "../../../../../public/images/about-strip-01.webp";
import Image2 from "../../../../../public/images/about-strip-01.webp";
import Image3 from "../../../../../public/images/about-strip-01.webp";
import Image4 from "../../../../../public/images/about-strip-01.webp";
import Image5 from "../../../../../public/images/about-strip-01.webp";

gsap.registerPlugin(CustomEase);
// Matches Framer Motion's ease: [0.24, 0.43, 0.15, 0.97]
CustomEase.create("brandEase", "0.24, 0.43, 0.15, 0.97");

interface LinkType {
    title: string;
    href: string;
    img: StaticImageData;
}

interface StyledLinkClientProps {
    className?: string;
    style?: CSSProperties;
    children: string;
    sNo: number;
    href: string;
    handleFocus: (newFocus: number, directionalSensitive: boolean) => void;
}

function StyledLinkClient({
    className,
    style,
    children,
    sNo,
    href,
    handleFocus,
}: StyledLinkClientProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const textWrapRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLDivElement>(null);

    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2,
    });

    // Resolves the same CSS var Framer used for x: "var(--spacing-10)"
    const getSpacing10 = () => {
        if (typeof window === "undefined") return "2.5rem";
        const value = getComputedStyle(document.documentElement)
            .getPropertyValue("--spacing-10")
            .trim();
        return value || "2.5rem";
    };

    const handleMouseEnter = (e: MouseEvent<HTMLElement>, index: number) => {
        const { height, top } = e.currentTarget.getBoundingClientRect();
        const enteredFromTop = e.clientY - top <= height / 2;

        if (overlayRef.current) {
            gsap
                .timeline()
                .set(
                    overlayRef.current,
                    enteredFromTop
                        ? { top: 0, bottom: "auto" }
                        : { top: "auto", bottom: 0 },
                    0.05,
                )
                .to(
                    overlayRef.current,
                    { height: "100%", duration: 0.4, ease: "brandEase" },
                    0.05,
                );
        }

        gsap.to(textWrapRef.current, {
            color: "#2b3530",
            duration: 0.6,
            ease: "brandEase",
        });
        gsap.to(numberRef.current, {
            x: getSpacing10(),
            duration: 0.6,
            ease: "brandEase",
        });

        handleFocus(index, true);
    };

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
        const { height, top } = e.currentTarget.getBoundingClientRect();
        const leavingFromTop = e.clientY - top <= height / 2;

        if (overlayRef.current) {
            gsap
                .timeline()
                .set(
                    overlayRef.current,
                    leavingFromTop
                        ? { top: 0, bottom: "auto" }
                        : { top: "auto", bottom: 0 },
                    0.05,
                )
                .to(
                    overlayRef.current,
                    { height: "0%", duration: 0.6, ease: "brandEase" },
                    0.05,
                );
        }

        gsap.to(textWrapRef.current, {
            color: "#D1CCBF",
            duration: 0.6,
            ease: "brandEase",
        });
        gsap.to(numberRef.current, {
            x: 0,
            duration: 0.6,
            ease: "brandEase",
        });
    };

    return (
        <Link href={href}>
            <div
                onMouseEnter={(e) => handleMouseEnter(e, sNo - 1)}
                onMouseLeave={handleMouseLeave}
                style={{ ...style }}
                className={`relative flex h-full items-center justify-between overflow-hidden p-5 [line-height:1] font-normal [&_*]:pointer-events-none ${className ?? ""}`}
            >
                <div
                    ref={overlayRef}
                    style={{ height: "0%" }}
                    className="absolute inset-x-0 z-10 bg-[#D1CCBF]"
                />
                <div
                    ref={textWrapRef}
                    style={{ color: "#D1CCBF" }}
                    className="z-20 flex gap-6 md:gap-28"
                >
                    <div
                        ref={numberRef}
                        className="text-2xs leading-[1] font-normal md:text-sm"
                    >
                        {leadingZeroFormatter.format(sNo)}
                    </div>
                    <div className="text-lg [line-height:1] md:text-26">{children}</div>
                </div>
                <span className="z-20 mr-2.5 text-xl text-current transition-transform duration-300 group-hover:translate-x-1">
                    →
                </span>
            </div>
        </Link>
    );
}

export default function SustainableRetreatClient() {
    const imgContainerRef = useRef<HTMLDivElement>(null);
    const focus = useRef(0);
    const zIndexRef = useRef(1);

    const handleFocus = useCallback(
        (newFocus: number, directionalSensitive: boolean) => {
            if (newFocus === focus.current) return;

            const container = imgContainerRef.current;
            if (!container) return;

            const target = container.querySelector<HTMLDivElement>(
                `[data-index="${newFocus}"]`,
            );
            if (!target) return;

            const fromClip =
                newFocus < focus.current && directionalSensitive
                    ? "inset(0% 0% 100% 0%)"
                    : "inset(100% 0% 0% 0%)";

            gsap.set(target, {
                zIndex: zIndexRef.current,
                clipPath: fromClip,
                scale: 1.15,
            });
            gsap.to(target, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.45,
                ease: "brandEase",
            });
            gsap.to(target, {
                scale: 1,
                duration: 0.6,
                ease: "brandEase",
            });

            focus.current = newFocus;
            zIndexRef.current += 1;
        },
        [],
    );

    const links: LinkType[] = [
        {
            title: "ELEMENTIS Story",
            href: "https://elementis.co/the-story",
            img: Image1,
        },
        {
            title: "Our Vision & Mission",
            href: "https://elementis.co/sustainability#mission-vision",
            img: Image2,
        },
        {
            title: "Our Commitment",
            href: "https://elementis.co/sustainability#our-comitment",
            img: Image3,
        },
        {
            title: "Our Pillars",
            href: "https://elementis.co/sustainability#our-pillars",
            img: Image4,
        },
        {
            title: "Sustainability",
            href: "https://elementis.co/sustainability",
            img: Image5,
        },
    ];

    return (
        <>
            <div ref={imgContainerRef} className="relative overflow-hidden md:w-fit">
                <Image
                    src={links[links.length - 1].img}
                    alt="placeholder"
                    aria-hidden={true}
                    className="invisible w-full max-md:aspect-[0.82] md:h-full md:w-auto"
                />
                {links.map((eachLink, i) => (
                    <div
                        key={`image-${i + 1}`}
                        data-index={i}
                        className="absolute inset-0"
                        style={{ zIndex: -i }}
                    >
                        <Image
                            src={eachLink.img}
                            alt={eachLink.title}
                            className="size-full object-cover md:w-auto"
                        />
                    </div>
                ))}
            </div>
            <div className="-mx-8-25 grid grid-rows-5 divide-y divide-[#D1CCBF] border-y border-[#D1CCBF] md:col-span-2 md:col-start-2 md:row-start-2 md:mx-0">
                {links.map((eachLink, index) => (
                    <StyledLinkClient
                        handleFocus={handleFocus}
                        sNo={index + 1}
                        href={eachLink.href}
                        key={`link-${index + 1}`}
                    >
                        {eachLink.title}
                    </StyledLinkClient>
                ))}
            </div>
        </>
    );
}