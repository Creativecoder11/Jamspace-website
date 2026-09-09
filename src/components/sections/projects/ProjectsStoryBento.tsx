"use client";
import { useId, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/animations/gsap";
import type { Project } from "@/lib/types";

const CIRCLE_TEXT = "* PLAY THE VIDEO * PLAY THE VIDEO * PLAY THE VIDEO * ";

export default function ProjectsStoryBento({ project }: { project: Project }) {
    const sectionRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const badgeRef = useRef(null);
    const badgeRotationTween = useRef<gsap.core.Tween | null>(null);
    const pathId = useId();
    const storyTextRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        if (!storyTextRef.current) return;
        const split = SplitText.create(storyTextRef.current, {
            type: "lines,words,chars", linesClass: "story-fill-line", autoSplit: true,
            onSplit: (self) => {
                gsap.set(self.chars, { color: "rgba(25, 25, 25, 0.3)" });
                return gsap.to(self.chars, { color: "#191919", stagger: 0.02, ease: "none", scrollTrigger: { trigger: storyTextRef.current, start: "top 80%", end: "bottom 35%", scrub: true } });
            },
        });
        badgeRotationTween.current = gsap.to(badgeRef.current, { rotation: 360, duration: 14, ease: "none", repeat: -1 });
        return () => { split.revert(); badgeRotationTween.current?.kill(); };
    }, { scope: sectionRef });

    const img = project.bentoImages;

    return (
        <div ref={sectionRef}>
            <Container className="py-12 md:py-20 px-4 md:px-0">
                <p>Overview:</p>
                <p ref={storyTextRef} className="story-fill mt-2.5 text-2xl md:text-[27px] leading-8 md:leading-10 md:pr-16">{project.overview}</p>
                <div className="mt-10 md:mt-16 grid gap-3 md:gap-4 grid-cols-2 auto-rows-[180px] md:grid-cols-[308fr_338fr_338fr_310fr] md:grid-rows-[277fr_211fr_221fr_245fr] md:aspect-[1342/1002]">
                    <div className="relative col-span-2 row-span-2 md:col-start-1 md:row-start-1 md:row-span-2 md:col-span-1"><Image src={img[0]} alt="Living room" fill quality={100} sizes="(min-width: 768px) 308px, 100vw" className="object-cover" /></div>
                    <div className="relative col-span-1 md:col-start-2 md:row-start-1 md:col-span-1"><Image src={img[1]} alt="Bedroom" fill quality={100} sizes="(min-width: 768px) 338px, 50vw" className="object-cover" /></div>
                    <div className="relative col-span-1 md:col-start-3 md:row-start-1 md:col-span-1"><Image src={img[2]} alt="Lounge seating" fill quality={100} sizes="(min-width: 768px) 338px, 50vw" className="object-cover" /></div>
                    <div className="relative col-span-2 row-span-2 md:col-start-4 md:row-start-1 md:row-span-2 md:col-span-1"><Image src={img[3]} alt="Sofa detail" fill quality={100} sizes="(min-width: 768px) 310px, 100vw" className="object-cover" /></div>
                    <div className="relative col-span-2 row-span-2 md:col-start-2 md:row-start-2 md:col-span-2 md:row-span-2"><Image src={img[4]} alt="Kitchen and bar" fill quality={100} sizes="(min-width: 768px) 692px, 100vw" className="object-cover" /></div>

                    <div className="relative col-span-2 row-span-2 md:col-start-1 md:row-start-3 md:row-span-2 md:col-span-1">
                        <video src={project.videoSrc} poster={project.videoPoster} muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
                        <button type="button" onClick={() => setIsOpen(true)} onMouseEnter={() => badgeRotationTween.current?.timeScale(4)} onMouseLeave={() => badgeRotationTween.current?.timeScale(1)} aria-label="Play the video" className="absolute left-1/2 top-1/2 flex h-24 w-24 md:h-40 md:w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                            <svg ref={badgeRef} className="video-badge-circle absolute -inset-6.25 h-[calc(100%+50px)] w-[calc(100%+50px)]" viewBox="0 0 200 200">
                                <defs><path id={pathId} d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="none" /></defs>
                                <text fill="white" fontSize="15" letterSpacing="2" fontWeight="500"><textPath href={`#${pathId}`} startOffset="0%">{CIRCLE_TEXT}</textPath></text>
                            </svg>
                            <Image src="/icons/play.png" width={140} height={140} alt="Play video icon" className="relative z-10" />
                        </button>
                    </div>

                    <div className="relative col-span-1 md:col-start-4 md:row-start-3 md:col-span-1"><Image src={img[5]} alt="Kitchen island" fill quality={100} sizes="(min-width: 768px) 310px, 50vw" className="object-cover" /></div>
                    <div className="relative col-span-1 md:col-start-2 md:row-start-4 md:col-span-1"><Image src={img[6]} alt="Dining area" fill quality={100} sizes="(min-width: 768px) 338px, 50vw" className="object-cover" /></div>
                    <div className="relative col-span-2 md:col-start-3 md:row-start-4 md:col-span-2 md:row-span-1"><Image src={img[7]} alt="Staircase" fill quality={100} sizes="(min-width: 768px) 664px, 100vw" className="object-cover" /></div>
                </div>
            </Container>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10" onClick={() => setIsOpen(false)}>
                    <video src={project.videoSrc} controls autoPlay playsInline className="max-h-full max-w-full" />
                    <button type="button" onClick={() => setIsOpen(false)} aria-label="Close video" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">✕</button>
                </div>
            )}
        </div>
    );
}