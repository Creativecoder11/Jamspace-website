"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

interface SlideItem {
  index: string;
  audience: string;
  image: string;
}

const slides: SlideItem[] = [
  {
    index: "01",
    audience: "New Homeowners.",
    image: "/images/services-residential-01.webp",
  },
  {
    index: "02",
    audience: "Growing Families.",
    image: "/images/about-strip-04.webp",
  },
  {
    index: "03",
    audience: "Empty Nesters.",
    image: "/images/about-strip-05.webp",
  },
  {
    index: "04",
    audience: "Design Enthusiasts.",
    image: "/images/about-strip-02.webp",
  },
];

/** The site's recurring "step" brand mark, used here as a corner accent. */
function CornerMark({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
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
      <div className="flex items-start justify-between">
        <CornerMark />
        <span className="font-sans text-2xl font-normal text-white md:text-3xl">
          {slide.index}
          <span className="text-white/60">
            /{String(slides.length).padStart(2, "0")}
          </span>
        </span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div>
          <span className="slide-badge inline-block rounded-full bg-accent-yellow px-3 py-1 text-xs font-normal text-foreground">
            Our Services Ideal For-
          </span>
          <h3 className="mt-3 text-5xl font-normal leading-[1.05] text-white md:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="slide-line inline-block">{slide.audience}</span>
            </span>
          </h3>
        </div>
        <CornerMark className="hidden rotate-180 md:block" />
      </div>
    </div>
  );
}

export default function ResidentailServicesSlider() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastAnimatedIndex = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);

  // Pins the section full-screen and scrubs through the slides as the user
  // scrolls — the section only releases once the last slide finishes. The
  // active slide's image gets a continuous horizontal parallax drift
  // (leftward start, drifting right) tied to scroll progress within its own
  // segment. Desktop/tablet only: a pinned,
  // scroll-jacked section is a poor fit for mobile viewports (dynamic
  // browser chrome, no room to "dwell"), so phones get a normal swipeable
  // strip instead (see the md:hidden block in the JSX below).
  useGSAP(
    () => {
      // GSAP must own this xPercent from the very first paint — setting the
      // initial off-canvas position via a plain inline `transform` style
      // instead and then later handing the element to GSAP causes it to
      // parse the resolved pixel matrix and keep it as an extra fixed
      // offset stacked underneath the new xPercent tween.
      gsap.set(slideRefs.current, { xPercent: (i: number) => (i === 0 ? 0 : 100) });

      // Every slide but the first starts with its heading/badge pre-hidden
      // (masked line below its frame, badge nudged down) so the crossfade
      // transition below can reveal them in with a stagger each time that
      // slide becomes active — slide 0 is visible immediately, no entrance.
      slideRefs.current.forEach((slide, i) => {
        if (!slide || i === 0) return;
        const line = slide.querySelector<HTMLElement>(".slide-line");
        const badge = slide.querySelector<HTMLElement>(".slide-badge");
        if (line) gsap.set(line, { yPercent: 120 });
        if (badge) gsap.set(badge, { y: 18 });
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const trigger = ScrollTrigger.create({
          trigger: pinRef.current,
          // Header is `fixed` (h-20 = 80px, out of normal flow) and stays on
          // top the entire time this section is pinned, so pin 80px below
          // the viewport top rather than at true top — otherwise the top
          // corner mark/counter dwell hidden underneath the navbar for the
          // whole scroll-jack, not just a momentary scroll-past.
          start: "top top+=80",
          end: `+=${slides.length * 100}%`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const scaled = self.progress * slides.length;
            const idx = Math.min(slides.length - 1, Math.floor(scaled));
            const localProgress = Math.min(1, Math.max(0, scaled - idx));

            setActiveIndex(idx);
            setShowHint(self.progress < 0.02);

            const image = imageRefs.current[idx];
            if (image) {
              gsap.set(image, { xPercent: -8 + localProgress * 16 });
            }
          },
        });

        return () => trigger.kill();
      });
    },
    { scope: containerRef },
  );

  // Slides the outgoing/incoming slide whenever the pinned scroll above
  // crosses a segment boundary (no opacity — the outgoing slide is pushed
  // fully off-screen while the incoming one slides in from the opposite
  // edge). Layered for depth: the masked frame slides at full speed while
  // the image inside it lags behind and settles in afterward (the image
  // "catches up" to its frame — a multi-speed parallax, not a flat crossfade),
  // and the heading/badge reveal in with their own delayed stagger. Direction
  // follows scroll direction: scrolling back up slides/lags the other way.
  useGSAP(
    () => {
      if (activeIndex === lastAnimatedIndex.current) return;
      const prevIndex = lastAnimatedIndex.current;
      lastAnimatedIndex.current = activeIndex;

      const outgoing = slideRefs.current[prevIndex];
      const incoming = slideRefs.current[activeIndex];
      const direction = activeIndex > prevIndex ? 1 : -1;

      const incomingLine =
        incoming?.querySelector<HTMLElement>(".slide-line") ?? null;
      const incomingBadge =
        incoming?.querySelector<HTMLElement>(".slide-badge") ?? null;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(outgoing, { clearProps: "all", xPercent: -direction * 100 });
        gsap.set(incoming, { clearProps: "all", xPercent: 0 });
        gsap.set([incomingLine, incomingBadge], { clearProps: "all" });
        return;
      }

      const incomingImage = imageRefs.current[activeIndex];
      const outgoingImage = imageRefs.current[prevIndex];

      gsap.set(incoming, { xPercent: direction * 100 });
      gsap.set(incomingImage, { xPercent: direction * 12 - 8 });
      if (incomingLine) gsap.set(incomingLine, { yPercent: 120 });
      if (incomingBadge) gsap.set(incomingBadge, { y: 18 });

      // One timeline drives every layer: the masked frame (pure slide, no
      // opacity) on a smooth in-out curve, the images on their own
      // deceleration-only settle (started together but resolving at
      // slightly different rates for depth), and the text revealing in
      // partway through the frame's motion rather than all at once.
      gsap
        .timeline({ defaults: { ease: "expo.inOut", duration: 1.1 } })
        .to(outgoing, { xPercent: -direction * 100 }, 0)
        .to(incoming, { xPercent: 0 }, 0)
        .to(outgoingImage, { xPercent: -direction * 10, duration: 1.2, ease: "power3.out" }, 0)
        .to(incomingImage, { xPercent: -8, duration: 1.3, ease: "power3.out" }, 0)
        .to(incomingLine, { yPercent: 0, duration: 0.95, ease: "power3.out" }, 0.22)
        .to(incomingBadge, { y: 0, duration: 0.75, ease: "power3.out" }, 0.3);
    },
    { scope: pinRef, dependencies: [activeIndex] },
  );

  return (
    <section ref={containerRef} className="relative">
      {/* Desktop/tablet: pinned, scroll-scrubbed, parallax slider */}
      <div
        ref={pinRef}
        className="relative hidden h-[calc(100vh-80px)] mt-25 w-full overflow-hidden md:block"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.index}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="absolute inset-0 overflow-hidden will-change-transform"
          >
            <div
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="absolute inset-y-0 inset-x-[-32%] will-change-transform"
            >
              {/* Not-yet-active slides sit off-canvas via translateX, so the
                  browser's viewport-intersection check for native lazy
                  loading never fires for them until the slide-in tween is
                  already underway — eager loading avoids a blank flash. */}
              <Image
                src={slide.image}
                alt={`Residential design ideal for ${slide.audience.replace(/\.$/, "")}`}
                fill
                sizes="100vw"
                loading="eager"
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-black/25" />

            <SlideContent slide={slide} />
          </div>
        ))}

        <div
          className={`absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-sm text-white/80 transition-opacity duration-500 ${
            showHint ? "opacity-100" : "opacity-0"
          }`}
        >
          Scroll to Explore ↓
        </div>
      </div>

      {/* Mobile: normal swipeable strip, no pin/scroll-jack */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-4 md:hidden">
        {slides.map((slide) => (
          <div
            key={slide.index}
            className="relative h-[75vh] w-[88vw] shrink-0 snap-center overflow-hidden rounded-2xl"
          >
            <Image
              src={slide.image}
              alt={`Residential design ideal for ${slide.audience.replace(/\.$/, "")}`}
              fill
              sizes="88vw"
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
