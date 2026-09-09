"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/animations/gsap";
import type { Project } from "@/lib/types";

export default function DesignScope({ project }: { project: Project }) {
    const scopeRef = useRef(null);
    const fillRef = useRef(null);

    useGSAP(() => {
        if (!fillRef.current) return;

        const split = SplitText.create(fillRef.current, {
            type: "lines,words,chars",
            linesClass: "story-fill-line",
            autoSplit: true,
            onSplit: (self) => {
                gsap.set(self.chars, { color: "#1919194D" });
                return gsap.to(self.chars, {
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
            },
        });

        ScrollTrigger.refresh();
        return () => {
            split.revert();
        };
    }, { scope: scopeRef });

    return (
        <div ref={scopeRef} className="w-full mx-auto px-4 md:px-0">
            <div className="mt-0 md:mt-6 border border-border md:border-y">
                <div className="flex flex-col md:flex-row max-w-335 mx-auto">
                    {/* Left Column */}
                    <div className="md:w-80 md:border-r border-border md:pr-12 py-8 px-4 md:px-0">
                        <h3 className="text-xs bg-yellow-400 text-black inline-block px-4 py-1 rounded-xl">
                            Understanding The Space
                        </h3>
                        <p className="mt-20 text-muted text-base">
                            {project.scopeUnderstanding}
                        </p>
                    </div>

                    {/* Center Column */}
                    <div className="md:w-82 md:border-r border-border md:px-12 py-8 px-4 border-t md:border-t-0">
                        <h3 className="text-xs bg-yellow-400 text-black inline-block px-4 py-1 rounded-xl">
                            Material Selection
                        </h3>
                        <p className="mt-20 text-muted text-base">
                            {project.scopeMaterials}
                        </p>
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 md:px-12 py-8 px-4 border-t border-border md:border-t-0">
                        <h3 className="text-muted text-base">Design Scope:</h3>
                        <p
                            ref={fillRef}
                            className="story-fill mt-2 text-muted text-2xl md:text-[27px] font-medium leading-relaxed"
                        >
                            {project.scopeDescription}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}