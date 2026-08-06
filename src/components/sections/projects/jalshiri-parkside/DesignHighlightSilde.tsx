"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";

interface SlideItem {
    index: string;
    audience: string;
    image: string;
}

const slides: SlideItem[] = [
    { index: "01", audience: "New Homeowners.", image: "/images/services-residential-01.webp" },
    { index: "02", audience: "Growing Families.", image: "/images/about-strip-04.webp" },
    { index: "03", audience: "Empty Nesters.", image: "/images/about-strip-05.webp" },
    { index: "04", audience: "Design Enthusiasts.", image: "/images/about-strip-02.webp" },
];

/** Desktop pin/scrub timing — improved UX */
const PIN_TOP_OFFSET = 80;
const SLIDE_TRANSITION_DURATION = 2.5;
const SLIDE_HOLD_DURATION = 0.6;
const SCROLL_DISTANCE_PER_TIMELINE_UNIT = 100;
const IMAGE_ZOOM_AMOUNT = 1.08;
const ENABLE_SLIDE_SNAP = true;

function CornerMark({ className = "" }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M30 -5.24537e-06L30 30L5.24537e-06 30L2.62253e-06 14.9991L15.0018 14.9991L15.0018 -2.62299e-06L30 -5.24537e-06Z"
                fill="white"
            />
        </svg>
    );
}

function SlideContent({ slide }: { slide: SlideItem }) {
    return (
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-10 lg:p-12">
            <div className="slide-top flex items-start justify-between">
                <CornerMark className="hidden rotate-180 md:block" />
                <span className="slide-index font-normal text-white">
                    <span className="text-base md:text-5xl">{slide.index}</span>
                    <span className="text-base md:text-xl">/{String(slides.length).padStart(2, "0")}</span>
                </span>
            </div>

            <div className="flex items-end justify-between gap-6">
                <div className="slide-copy">
                    <span className="block overflow-hidden">
                        <span className="slide-badge inline-block rounded-full bg-accent-yellow px-3 py-1 text-xs font-normal text-foreground">
                            Our Services Ideal For-
                        </span>
                    </span>

                    <h3 className="mt-3 text-5xl font-normal leading-[1.05] text-white md:text-6xl lg:text-7xl">
                        <span className="block overflow-hidden">
                            <span className="slide-line inline-block">{slide.audience}</span>
                        </span>
                    </h3>
                </div>

                <CornerMark />
            </div>
        </div>
    );
}

/** Staggered text reveal — badge first, then title */
function revealText(
    tl: gsap.core.Timeline,
    slide: HTMLElement,
    at: number,
    reverse = false
) {
    const line = slide.querySelector<HTMLElement>(".slide-line");
    const badge = slide.querySelector<HTMLElement>(".slide-badge");
    const top = slide.querySelector<HTMLElement>(".slide-top");

    if (reverse) {
        if (line) tl.to(line, { yPercent: -20, autoAlpha: 0, duration: 0.25, ease: "power2.in" }, at);
        if (badge) tl.to(badge, { y: -10, autoAlpha: 0, duration: 0.2, ease: "power2.in" }, at);
        if (top) tl.to(top, { y: -10, autoAlpha: 0, duration: 0.2, ease: "power2.in" }, at);
        return;
    }

    if (badge) tl.fromTo(badge, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" }, at + 0.2);
    if (line) tl.fromTo(line, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, at + 0.3);
    if (top) tl.fromTo(top, { y: -15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" }, at + 0.4);
}

export default function DesignHighlightSilde() {
    const containerRef = useRef<HTMLElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const hintRef = useRef<HTMLDivElement>(null);

    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    const mobileContainerRef = useRef<HTMLDivElement>(null);
    const mobileSlideRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            const pinEl = pinRef.current;
            const slideEls = slideRefs.current.filter((el): el is HTMLDivElement => el !== null);
            const imageEls = imageRefs.current.filter((el): el is HTMLDivElement => el !== null);
            const mobileSlideEls = mobileSlideRefs.current.filter(
                (el): el is HTMLDivElement => el !== null
            );

            if (!pinEl || slideEls.length === 0) return;

            const mm = gsap.matchMedia();

            // Desktop: pinned horizontal scrub
            mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
                gsap.set(slideEls, { xPercent: 100, autoAlpha: 1, force3D: true });
                gsap.set(slideEls[0], { xPercent: 0 });

                imageEls.forEach((img, i) =>
                    gsap.set(img, {
                        scale: i === 0 ? 1 : IMAGE_ZOOM_AMOUNT,
                        transformOrigin: "center center",
                        force3D: true,
                    })
                );

                slideEls.forEach((slide, i) => {
                    const line = slide.querySelector<HTMLElement>(".slide-line");
                    const badge = slide.querySelector<HTMLElement>(".slide-badge");
                    const top = slide.querySelector<HTMLElement>(".slide-top");

                    if (i === 0) {
                        gsap.set([line, badge, top], { y: 0, yPercent: 0, autoAlpha: 1 });
                        return;
                    }
                    if (line) gsap.set(line, { yPercent: 120, autoAlpha: 0 });
                    if (badge) gsap.set(badge, { y: 20, autoAlpha: 0 });
                    if (top) gsap.set(top, { y: -15, autoAlpha: 0 });
                });

                const totalUnits =
                    slides.length * SLIDE_HOLD_DURATION + (slides.length - 1) * SLIDE_TRANSITION_DURATION;

                const tl = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: pinEl,
                        start: `top top+=${PIN_TOP_OFFSET}`,
                        end: () =>
                            `+=${totalUnits * window.innerHeight * (SCROLL_DISTANCE_PER_TIMELINE_UNIT / 100)}`,
                        pin: true,
                        pinSpacing: true,
                        scrub: 0.8,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        snap: ENABLE_SLIDE_SNAP
                            ? { snapTo: "labels", duration: { min: 0.3, max: 0.5 }, delay: 0.1, ease: "power2.out" }
                            : undefined,
                    },
                });

                tl.addLabel("slide-0", 0);

                if (hintRef.current) {
                    tl.to(hintRef.current, { autoAlpha: 0, duration: 0.12 }, 0);
                }

                tl.to({}, { duration: SLIDE_HOLD_DURATION }, 0);

                let cursor = SLIDE_HOLD_DURATION;

                for (let i = 1; i < slideEls.length; i++) {
                    const start = cursor;
                    const prevSlide = slideEls[i - 1];
                    const nextSlide = slideEls[i];

                    tl.to(prevSlide, { xPercent: -100, duration: SLIDE_TRANSITION_DURATION, ease: "power3.inOut" }, start)
                        .to(nextSlide, { xPercent: 0, duration: SLIDE_TRANSITION_DURATION, ease: "power3.inOut" }, start);

                    if (imageEls[i - 1]) {
                        tl.to(
                            imageEls[i - 1],
                            { scale: IMAGE_ZOOM_AMOUNT, duration: SLIDE_TRANSITION_DURATION, ease: "power2.inOut" },
                            start
                        );
                    }
                    if (imageEls[i]) {
                        tl.to(
                            imageEls[i],
                            { scale: 1, duration: SLIDE_TRANSITION_DURATION, ease: "power2.inOut" },
                            start
                        );
                    }

                    revealText(tl, prevSlide, start, true);
                    revealText(tl, nextSlide, start + 0.5);

                    cursor += SLIDE_TRANSITION_DURATION;
                    tl.addLabel(`slide-${i}`, cursor);
                    tl.to({}, { duration: SLIDE_HOLD_DURATION }, cursor);
                    cursor += SLIDE_HOLD_DURATION;
                }

                tl.addLabel("release", cursor);

                return () => {
                    gsap.set(slideEls, { clearProps: "transform,opacity,visibility" });
                    gsap.set(imageEls, { clearProps: "transform" });
                    if (hintRef.current) gsap.set(hintRef.current, { clearProps: "opacity,visibility" });
                };
            });

            // Desktop: reduced-motion fallback
            mm.add("(min-width: 768px) and (prefers-reduced-motion: reduce)", () => {
                gsap.set(slideEls, { xPercent: 100, autoAlpha: 0 });
                gsap.set(slideEls[0], { xPercent: 0, autoAlpha: 1 });

                return () => {
                    gsap.set(slideEls, { clearProps: "transform,opacity,visibility" });
                };
            });

            // Mobile: same text reveal, driven by visibility
            mm.add("(max-width: 767px)", () => {
                const container = mobileContainerRef.current;
                if (!container || mobileSlideEls.length === 0) return;

                const reveals = mobileSlideEls.map((slide, i) => {
                    const line = slide.querySelector<HTMLElement>(".slide-line");
                    const badge = slide.querySelector<HTMLElement>(".slide-badge");
                    const top = slide.querySelector<HTMLElement>(".slide-top");

                    if (i > 0) {
                        if (line) gsap.set(line, { yPercent: 120, autoAlpha: 0 });
                        if (badge) gsap.set(badge, { y: 20, autoAlpha: 0 });
                        if (top) gsap.set(top, { y: -15, autoAlpha: 0 });
                    }

                    const reveal = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
                    if (line) reveal.to(line, { yPercent: 0, autoAlpha: 1, duration: 0.5 }, 0);
                    if (badge) reveal.to(badge, { y: 0, autoAlpha: 1, duration: 0.4 }, 0.06);
                    if (top) reveal.to(top, { y: 0, autoAlpha: 1, duration: 0.4 }, 0.05);
                    if (i === 0) reveal.progress(1);

                    return reveal;
                });

                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            const idx = mobileSlideEls.indexOf(entry.target as HTMLDivElement);
                            if (idx === -1) return;

                            if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                                reveals[idx].play();
                            } else {
                                reveals[idx].reverse();
                            }
                        });
                    },
                    { root: container, threshold: [0, 0.6, 1] }
                );

                mobileSlideEls.forEach((slide) => observer.observe(slide));

                return () => observer.disconnect();
            });

            return () => mm.revert();
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="relative">
            {/* Desktop and tablet slider */}
            <div
                ref={pinRef}
                className="relative mb-25 hidden h-[calc(100svh-80px)] w-full overflow-hidden bg-black md:block"
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.index}
                        ref={(el) => {
                            slideRefs.current[index] = el;
                        }}
                        style={{ zIndex: index + 1 }}
                        className="absolute inset-0 overflow-hidden will-change-transform transform-gpu"
                    >
                        <div
                            ref={(el) => {
                                imageRefs.current[index] = el;
                            }}
                            className="absolute inset-y-0 inset-x-[-14%] will-change-transform transform-gpu"
                        >
                            <Image
                                src={slide.image}
                                alt={`Residential design ideal for ${slide.audience.replace(/\.$/, "")}`}
                                fill
                                sizes="100vw"
                                priority={index === 0}
                                loading={index === 0 ? "eager" : "lazy"}
                                className="object-cover"
                            />
                        </div>

                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-black/25" />

                        <SlideContent slide={slide} />
                    </div>
                ))}

                <div
                    ref={hintRef}
                    className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-sm text-white/80"
                >
                    Scroll to Explore ↓
                </div>
            </div>

            {/* Mobile swipeable slider */}
            <div
                ref={mobileContainerRef}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-4 md:hidden"
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.index}
                        ref={(el) => {
                            mobileSlideRefs.current[index] = el;
                        }}
                        className="relative h-[50svh] w-[88vw] shrink-0 snap-center overflow-hidden rounded-2xl"
                    >
                        <Image
                            src={slide.image}
                            alt={`Residential design ideal for ${slide.audience.replace(/\.$/, "")}`}
                            fill
                            sizes="88vw"
                            priority={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                            className="object-cover"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-black/25" />

                        <SlideContent slide={slide} />
                    </div>
                ))}
            </div>
        </section>
    );
}