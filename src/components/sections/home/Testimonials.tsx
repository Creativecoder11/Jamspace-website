"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { testimonials } from "@/lib/data/testimonials";

const CARD_Y_OFFSET = 5;
const CARD_SCALE_STEP = 0.075;

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalCards = testimonials.length;

  const goTo = (index: number) => {
    const wrappedIndex = (index + totalCards) % totalCards;
    setActiveIndex(wrappedIndex);
  };

  // Heading scroll animation
  useGSAP(
    () => {
      gsap.from(".line", {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  // Card transition animations based on activeIndex
  useEffect(() => {
    const cards = cardRefs.current.filter(
      (card): card is HTMLDivElement => card !== null,
    );

    cards.forEach((card, i) => {
      if (i < activeIndex) {
        gsap.to(card, {
          yPercent: -250,
          rotationX: 35,
          duration: 0.9,
          ease: "power2.inOut",
        });
      } else if (i === activeIndex) {
        gsap.to(card, {
          yPercent: -50,
          rotationX: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        const behindIndex = i - activeIndex;

        gsap.to(card, {
          yPercent: -50 + behindIndex * CARD_Y_OFFSET,
          rotationX: 0,
          scale: 1 - behindIndex * CARD_SCALE_STEP,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });
  }, [activeIndex]);

  // Initial positions on mount
  useEffect(() => {
    const cards = cardRefs.current.filter(
      (card): card is HTMLDivElement => card !== null,
    );

    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + i * CARD_Y_OFFSET,
        scale: 1 - i * CARD_SCALE_STEP,
      });
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="border-t border-border md:pt-25 md:pb-10 mx-4 md:mx-0"
    >
      <Container className="flex flex-col gap-4 md:gap-8 md:flex-row md:items-end md:justify-between pt-10 md:pt-0 pb-4 md:pb-16 md:px-0">
        <AnimatedHeading
          as="h2"
          lines={["Words", "from Our Clients."]}
          className="text-[42px] md:text-6xl font-normal leading-[120%] md:leading-18"
        />

        <div className="max-w-md md:pl-5 md:ms-0">
          <p className="text-muted">
            Every project is built on collaboration, trust, and exceptional
            results. Here&apos;s what our clients have to say.
          </p>
        </div>
      </Container>

      <div className="h-[700px] overflow-hidden md:h-[450px]">
        <div
          className="relative mx-auto h-[700px] w-full max-w-300 md:h-[450px]"
          style={{ perspective: "1000px" }}
        >
          {testimonials.map((card, i) => (
            <div
              key={card.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 flex h-[650px] w-[calc(100vw-2rem)] max-w-300 flex-col items-center gap-4 rounded-[20px] border border-[#E5E5E5] bg-white p-4 text-black will-change-transform md:h-[450px] md:flex-row md:p-6"
              style={{
                transformOrigin: "center bottom",
                zIndex: 5 - i,
              }}
            >
              <div className="h-62.5 w-full shrink-0 overflow-hidden rounded-lg md:h-100 md:w-126.25">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="max-w-137 h-full flex flex-col p-2">
                <Image
                  src="/icons/quote.svg"
                  width={28}
                  height={28}
                  alt="Quote"
                />

                <p className="mt-3 md:mt-6 text-lg text-muted md:text-2xl">
                  {card.quote}
                </p>

                <div className="flex flex-col gap-1 mt-4 md:mt-18">
                  <h1 className="text-base font-bold md:text-xl">
                    {card.name}
                  </h1>
                  <p className="text-sm text-muted md:text-base">
                    {card.role}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Arrow navigation */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous card"
              className="pointer-events-auto absolute left-2 top-[42%] flex h-10 w-10 -translate-y-1/2 items-center justify-center text-3xl text-black transition-transform hover:scale-110 md:-left-4 md:top-1/2"
            >
              <Image
                src="/left.svg"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </button>

            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next card"
              className="pointer-events-auto absolute right-2 top-[42%] flex h-10 w-10 -translate-y-1/2 items-center justify-center text-3xl text-black transition-transform hover:scale-110 md:-right-4 md:top-1/2"
            >
              <Image
                src="/right.svg"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
