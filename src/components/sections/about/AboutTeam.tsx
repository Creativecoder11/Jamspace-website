"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { aboutTeam } from "@/lib/data/about";


const LinkedinIcon = ({
  className,
}: {
  className?: string;
}) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_822_13472)">
      <path
        d="M22.2278 6.19321C22.2358 3.71045 20.1898 1.80977 17.9298 1.80581L6.4393 1.78601C3.81052 1.78205 1.79631 3.77776 1.79234 6.40703L1.77252 17.5022C1.76855 20.2978 4.02066 22.4598 6.81993 22.2143C7.48605 22.1549 7.66447 22.5232 7.76756 22.8439C7.87065 23.1647 7.7636 23.8378 7.23626 23.917C3.27524 24.511 -0.0275812 21.4937 0.000173662 17.5181L0.0913681 5.58341C0.111193 2.74031 2.77962 0.111041 5.61458 0.0872821L17.569 0.000167732C21.0066 -0.0235907 24.0121 2.47897 24.0002 6.00314L23.9605 18.3179C23.9526 21.3075 21.3 23.9249 18.3897 23.9487L12.7753 24.0002C12.1885 24.0041 11.8753 23.628 11.7563 23.2399C11.6691 22.9429 11.8673 22.2737 12.3907 22.2658L18.3461 22.1589C20.2612 22.1233 22.1763 20.278 22.1842 18.2744L22.2318 6.19321H22.2278Z"
        fill="currentColor"
      />
      <path
        d="M17.3506 18.2002C15.4118 17.8636 17.9612 10.4985 14.3135 11.6943C13.7227 11.8883 13.0328 12.4506 13.0169 13.3099L12.9614 17.1073C12.9535 17.7408 12.6561 18.2081 12.1922 18.2952C11.6609 18.3942 11.1098 17.8834 11.1336 17.0954L11.3556 10.1065C11.3794 9.29472 12.7552 10.0194 13.1676 10.1302C14.0994 10.0748 15.5267 9.52438 16.6369 10.2213C17.422 10.7163 18.2824 11.7498 18.2784 13.1673L18.2705 17.4557C18.2705 17.8992 17.6401 18.2477 17.3467 18.2002H17.3506Z"
        fill="currentColor"
      />
      <path
        d="M7.70463 16.9272C7.70463 17.7033 7.37157 18.1666 7.0068 18.2339C6.37636 18.3448 5.88867 17.8894 5.88867 17.1212L5.8966 10.7421C5.8966 10.1996 6.24948 9.68877 6.63409 9.67294C7.18125 9.64918 7.68481 10.0254 7.68877 10.746L7.70463 16.9311V16.9272Z"
        fill="currentColor"
      />
      <path
        d="M6.79727 8.59524C7.46734 8.59524 8.01055 8.05275 8.01055 7.38356C8.01055 6.71436 7.46734 6.17188 6.79727 6.17188C6.12719 6.17188 5.58398 6.71436 5.58398 7.38356C5.58398 8.05275 6.12719 8.59524 6.79727 8.59524Z"
        fill="currentColor"
      />
    </g>

    <defs>
      <clipPath id="clip0_822_13472">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);


export function AboutTeam() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([".line", ".team-card"], {
          clearProps: "all",
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.set(".team-card", {
        opacity: 0,
        y: 30,
      });

      gsap.from(".line", {
        yPercent: 110,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      ScrollTrigger.batch(".team-card", {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="pt-15 md:pt-20">
      <div className="md:border-y border-border">
        <div className="flex flex-col md:flex-row max-w-335 mx-auto items-start justify-between">
          <div className="md:w-2/3 md:border-r border-border md:pr-0 pb-4 md:py-8">
            <AnimatedHeading
              as="h2"
              lines={["Designing Spaces", "That Feel Meaningful."]}
              className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18 mx-4 md:mx-0"
            />
          </div>

          <div className="md:w-1/3 md:border-l border-border md:pl-8 md:py-8 mx-4 md:mx-0">
            <p className="text-muted">
              Discover the passion, purpose, and philosophy that shape every
              space we create, transforming ideas into interiors that inspire
              everyday living.
            </p>

            <div className="mt-3 md:mt-6">
              <MagneticButton>
                <Button href="/about">Learn More About Us</Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <Container className="mt-7 md:mt-14 grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-2 px-4 md:px-0">
        {aboutTeam.map((member, i) => (
          <div
            key={`${member.name}-${i}`}
            className="team-card group overflow-hidden transition-shadow duration-300"
          >
            <div className="grid h-auto grid-cols-1 gap-3 md:h-[383px] md:grid-cols-8 md:gap-4">
              {/* Image */}
              <div className="relative h-[300px] md:h-auto md:col-span-4 overflow-hidden border border-[#4444441A] p-4">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="md:col-span-4 flex min-h-[220px] flex-col justify-between border border-[#4444441A] p-4">
                <p className="text-[27px] leading-9 text-[muted]">
                  {member.caption}
                </p>

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold">{member.name}</p>
                    <p className="text-base text-muted">{member.role}</p>
                  </div>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <LinkedinIcon className="h-6.5 w-6.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </section >
  );
}