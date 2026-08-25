"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/animations/gsap";

const CIRCLE_TEXT = "* PLAY THE VIDEO * PLAY THE VIDEO * PLAY THE VIDEO * ";

const ProjectsStoryBento = () => {
    const sectionRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const badgeRef = useRef(null);
    const badgeRotationTween = useRef<gsap.core.Tween | null>(null);
    const pathId = useId();
    const storyTextRef = useRef<HTMLParagraphElement>(null);

    useGSAP(
        () => {
            if (!storyTextRef.current) return;

            const split = SplitText.create(storyTextRef.current, {
                type: "lines,words,chars",
                linesClass: "story-fill-line",
                autoSplit: true,

                onSplit: (self) => {
                    gsap.set(self.chars, {
                        color: "rgba(25, 25, 25, 0.3)",
                    });

                    return gsap.to(self.chars, {
                        color: "#191919",
                        stagger: 0.02,
                        ease: "none",
                        scrollTrigger: {
                            trigger: storyTextRef.current,
                            start: "top 80%",
                            end: "bottom 35%",
                            scrub: true,
                        },
                    });
                },
            });

            badgeRotationTween.current = gsap.to(badgeRef.current, {
                rotation: 360,
                duration: 14,
                ease: "none",
                repeat: -1,
            });

            return () => {
                split.revert();
                badgeRotationTween.current?.kill();
            };
        },
        {
            scope: sectionRef,
        }
    );


    return (
        <div ref={sectionRef}>
            <Container className="py-12 md:py-20 px-4 md:px-0">
                <p>Overview:</p>
                <p
                    ref={storyTextRef}
                    className="story-fill mt-2.5 text-2xl md:text-[27px] leading-8 md:leading-10 md:pr-16"
                >
                    Taqwaa Residence is a contemporary triplex shaped around understated luxury, spatial comfort, and material harmony. Warm neutral tones, natural textures, refined finishes, and layered lighting establish a cohesive interior language throughout the home, while carefully planned spaces balance everyday functionality with an elegant residential character.
                </p>

                <div className="mt-10 md:mt-16 grid gap-3 md:gap-4 grid-cols-2 auto-rows-[180px] md:grid-cols-[308fr_338fr_338fr_310fr] md:grid-rows-[277fr_211fr_221fr_245fr] md:aspect-[1342/1002]">
                    {/* 1 — Living room : col 1, rows 1-2 */}
                    <div className="relative col-span-2 row-span-2 md:col-start-1 md:row-start-1 md:row-span-2 md:col-span-1">
                        <Image
                            src="/images/projects/taqwaa/bento-1.webp"
                            alt="Living room"
                            fill
                            quality={100}
                            sizes="(min-width: 768px) 308px, 100vw"
                            className="object-cover"
                        />
                    </div>

                    {/* 2 — Bedroom : col 2, row 1 */}
                    <div className="relative col-span-1 md:col-start-2 md:row-start-1 md:col-span-1">
                        <Image
                            src="/images/galleryImage2.png"
                            alt="Bedroom"
                            fill
                            quality={100}
                            sizes="(min-width: 768px) 338px, 50vw"
                            className="object-cover"
                        />
                    </div>

                    {/* 3 — Lounge : col 3, row 1 */}
                    <div className="relative col-span-1 md:col-start-3 md:row-start-1 md:col-span-1">
                        <Image
                            src="/images/projects/taqwaa/bento-3.webp"
                            alt="Lounge seating"
                            fill
                            quality={100}
                            sizes="(min-width: 768px) 338px, 50vw"
                            className="object-cover"
                        />
                    </div>

                    {/* 4 — Sofa detail : col 4, rows 1-2 */}
                    <div className="relative col-span-2 row-span-2 md:col-start-4 md:row-start-1 md:row-span-2 md:col-span-1">
                        <Image
                            src="/images/projects/taqwaa/bento-4.webp"
                            alt="Sofa detail"
                            fill
                            quality={100}
                            sizes="(min-width: 768px) 310px, 100vw"
                            className="object-cover"
                        />
                    </div>

                    {/* 5 — Kitchen & bar : cols 2-3, rows 2-3 */}
                    <div className="relative col-span-2 row-span-2 md:col-start-2 md:row-start-2 md:col-span-2 md:row-span-2">
                        <Image
                            src="/images/projects/taqwaa/bento-mid.webp"
                            alt="Kitchen and bar"
                            fill
                            quality={100}
                            sizes="(min-width: 768px) 692px, 100vw"
                            className="object-cover"
                        />
                    </div>

                    {/* 6 — Hallway video : col 1, rows 3-4 */}
                    <div className="relative col-span-2 row-span-2 md:col-start-1 md:row-start-3 md:row-span-2 md:col-span-1">
                        <video
                            src="/videos/hallway.mp4"
                            poster="/images/projects/taqwaa/bento-6.webp"
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            onMouseEnter={() => badgeRotationTween.current?.timeScale(4)}
                            onMouseLeave={() => badgeRotationTween.current?.timeScale(1)}
                            aria-label="Play the video"
                            className="absolute left-1/2 top-1/2 flex h-24 w-24 md:h-40 md:w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                        >
                            {/* Circular Text */}
                            <svg
                                ref={badgeRef}
                                className="video-badge-circle absolute -inset-6.25 h-[calc(100%+50px)] w-[calc(100%+50px)]"
                                viewBox="0 0 200 200"
                            >
                                <defs>
                                    <path
                                        id={pathId}
                                        d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                                        fill="none"
                                    />
                                </defs>

                                <text
                                    fill="white"
                                    fontSize="15"
                                    letterSpacing="2"
                                    fontWeight="500"
                                >
                                    <textPath href={`#${pathId}`} startOffset="0%">
                                        {CIRCLE_TEXT}
                                    </textPath>
                                </text>
                            </svg>

                            {/* Play Icon */}
                            <Image
                                src="/icons/play.png"
                                width={140}
                                height={140}
                                alt="Play video icon"
                                className="relative z-10"
                            />
                        </button>
                    </div>

                    {/* 7 — Kitchen island : col 4, row 3 */}
                    <div className="relative col-span-1 md:col-start-4 md:row-start-3 md:col-span-1">
                        <Image
                            src="/images/galleryImage7.png"
                            alt="Kitchen island"
                            fill
                            quality={100}
                            sizes="(min-width: 768px) 310px, 50vw"
                            className="object-cover"
                        />
                    </div>

                    {/* 8 — Dining : col 2, row 4 */}
                    <div className="relative col-span-1 md:col-start-2 md:row-start-4 md:col-span-1">
                        <Image
                            src="/images/galleryImage8.png"
                            alt="Dining area"
                            fill
                            quality={100}
                            sizes="(min-width: 768px) 338px, 50vw"
                            className="object-cover"
                        />
                    </div>

                    {/* 9 — Staircase : cols 3-4, row 4 */}
                    <div className="relative col-span-2 md:col-start-3 md:row-start-4 md:col-span-2 md:row-span-1">
                        <Image
                            src="/images/galleryImage9.png"
                            alt="Staircase"
                            fill
                            quality={100}
                            sizes="(min-width: 768px) 664px, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </Container>

            {/* Video lightbox */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
                    onClick={() => setIsOpen(false)}
                >
                    <video
                        src="/videos/hallway.mp4"
                        controls
                        autoPlay
                        playsInline
                        className="max-h-full max-w-full"
                    />
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close video"
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectsStoryBento;