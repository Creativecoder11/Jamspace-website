"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import type { BlogPost } from "@/lib/types";

export default function BlogContent({ post }: { post: BlogPost }) {
    const sectionRef = useRef(null);

    useGSAP(
        () => {
            gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
                gsap.fromTo(
                    el,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="w-full pb-20">
            {/* Bullet Points Section */}
            {post.bulletPoints.map((bp, idx) => (
                <div
                    key={idx}
                    className="w-full border-y border-border mb-16"
                >
                    <div className="fade-up max-w-335 mx-auto px-4 md:px-0 py-12 md:py-16">
                        <h3 className="text-2xl md:text-3xl font-medium mb-8">
                            {bp.heading}
                        </h3>

                        <ul className="grid gap-4 md:gap-6">
                            {bp.items.map((item, i) => (
                                <li key={i} className="flex items-center gap-4">
                                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent-yellow" />

                                    <span className="text-base md:text-lg text-muted leading-relaxed">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}

            {/* Side-by-Side Sections */}
            <div className="max-w-335 mx-auto px-4 md:px-0">
                {post.sideBySideSections.map((section, idx) => (
                    <div
                        key={idx}
                        className={`fade-up flex flex-col ${section.reverse
                            ? "md:flex-row-reverse"
                            : "md:flex-row"
                            } gap-8 md:gap-12 items-center ${idx !== post.sideBySideSections.length - 1
                                ? "mb-16 md:mb-24"
                                : ""
                            }`}
                    >
                        <div className="md:w-1/2">
                            <h3 className="text-2xl md:text-3xl font-medium mb-6">
                                {section.heading}
                            </h3>

                            <p className="text-base md:text-lg text-muted leading-relaxed">
                                {section.content}
                            </p>
                        </div>

                        <div className="md:w-1/2 w-full">
                            <div className="relative w-full aspect-[4/3] overflow-hidden">
                                <Image
                                    src={section.image}
                                    alt={section.heading}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
