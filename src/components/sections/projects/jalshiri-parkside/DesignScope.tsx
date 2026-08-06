"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/animations/gsap";

const DesignScope = () => {
    const scopeRef = useRef(null);
    const fillRef = useRef(null);

    useGSAP(() => {
        const split = SplitText.create(fillRef.current, {
            type: "lines,words,chars",
            linesClass: "story-fill-line",
            autoSplit: true,
        });

        gsap.set(split.chars, {
            color: "#1919194D",
        });

        gsap.to(split.chars, {
            color: "#191919",
            stagger: 0.02,
            ease: "none",
            scrollTrigger: {
                trigger: fillRef.current,
                start: "top 80%",
                end: "bottom 35%",
                scrub: true,
            },
        });

        ScrollTrigger.refresh();

        return () => {
            split.revert();
        };
    }, { scope: scopeRef });

    return (
        <div ref={scopeRef} className="w-full mx-auto px-4 md:px-0">
            <div className="mt-0 md:mt-20 border border-border md:border-y">
                <div className="flex flex-col md:flex-row max-w-335 mx-auto">

                    {/* Left Column */}
                    <div className="md:w-64 md:border-r border-border md:pr-12 py-8 px-4 md:px-0">
                        <h3 className="text-xs bg-yellow-400 text-black inline-block px-4 py-1 rounded-xl">
                            Understanding The Space
                        </h3>

                        <p className="mt-20 text-muted text-base">
                            We study the lifestyle, needs and spatial potential.
                        </p>
                    </div>

                    {/* Center Column */}
                    <div className="md:w-82 md:border-r border-border md:px-12 py-8 px-4 border-t md:border-t-0">
                        <h3 className="text-xs bg-yellow-400 text-black inline-block px-4 py-1 rounded-xl">
                            Material Selection
                        </h3>

                        <p className="mt-20 text-muted text-base">
                            Natural material and neutral tones bring warmth and harmony.
                        </p>
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 md:px-12 py-8 px-4 border-t border-border md:border-t-0">
                        <h3 className="text-muted text-base">Design Scope:</h3>

                        <p
                            ref={fillRef}
                            className="story-fill mt-2 text-muted text-2xl md:text-[27px] font-medium leading-relaxed"
                        >
                            This project was carefully planned to maximize functionality, enhance
                            visual harmony, and create a space that reflects the client&apos;s lifestyle
                            and aspirations.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DesignScope;