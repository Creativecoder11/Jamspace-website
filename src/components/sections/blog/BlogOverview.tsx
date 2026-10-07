"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/animations/gsap";
import type { BlogPost } from "@/lib/types";

export default function BlogOverview({ post }: { post: BlogPost }) {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        if (textRef.current) {
            const split = SplitText.create(textRef.current, {
                type: "lines,words,chars",
                linesClass: "story-fill-line",
                autoSplit: true,
                onSplit: (self) => {
                    gsap.set(self.chars, {
                        color: "rgba(25, 25, 25, 0.4)",
                    });

                    return gsap.to(self.chars, {
                        color: "#191919",
                        stagger: 0.02,
                        ease: "none",
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: "top 80%",
                            end: "bottom 40%",
                            scrub: true,
                        },
                    });
                },
            });

            return () => split.revert();
        }
    }, { scope: sectionRef });

    useGSAP(() => {
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
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="max-w-335 mx-auto px-4 md:px-0 py-12 md:py-20"
        >
            <div className="flex flex-col gap-8 md:gap-12">
                <div className="flex flex-col">
                    <h3 className="w-fit text-xs bg-yellow-400 text-black inline-block px-4 py-1 rounded-xl">
                        Overview
                    </h3>

                    <p
                        ref={textRef}
                        className="story-fill mt-5 text-2xl md:text-[27px] font-medium leading-relaxed text-muted"
                    >
                        {post.overview}
                    </p>
                </div>

                <div>
                    <div className="relative mt-4 md:mt-0 w-full aspect-video md:aspect-[16/9] overflow-hidden">
                        <Image
                            src={post.overviewImage}
                            alt="Overview"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Main Content Paragraph */}
                <div className="fade-up mx-auto mt-2 md:mt-4">
                    <p className="text-lg md:text-xl leading-relaxed text-[#191919cc]">
                        {post.mainContent}
                    </p>
                </div>
            </div>
        </section>
    );
}