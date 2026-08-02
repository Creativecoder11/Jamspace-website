import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";

export default function ResidentailApproach() {
  return (
    <section className="relative mt-20 md:mt-22.5 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/cta-strip-03.webp" // Change to your image
        alt="Residential Approach"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative py-16 md:py-22.5 z-10 px-4 md:px-0">
        {/* Heading */}
        <div className="">
          <div className="mx-auto flex max-w-335 flex-col md:flex-row md:items-start md:justify-between">
            <div className="w-2/3">
              <AnimatedHeading
                as="h2"
                lines={["Our", "Approach."]}
                className="text-[44px] font-normal leading-[120%] md:mx-0 md:text-6xl md:leading-18 text-white"
              />
            </div>

            <div className="py-4 md:mx-0 md:w-1/3 md:py-8 md:pl-8">
              <p className="text-white/80">
                Everything you need to transform your home into a thoughtfully
                designed, functional, and timeless living space.
              </p>

              <div className="mt-3 md:mt-6">
                <MagneticButton>
                  <Button href="/about">Start a Project</Button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* Approach List */}
        <div className="mx-auto mt-10 flex max-w-335 flex-col gap-10 md:mt-20 md:flex-row md:items-end md:justify-between">
          <div className="w-full md:w-[30%]">
            <a
              href="/project"
              className="inline-flex items-center text-white transition-opacity hover:opacity-80"
            >
              See Our Project ↗
            </a>
          </div>

          <div className="flex w-full flex-col gap-8 md:w-[70%] md:gap-12.5">
            <div className="flex flex-col gap-3 border-b border-white/30 pb-4 md:flex-row md:items-end md:justify-between">
              <p className="text-2xl text-white md:text-3xl">
                (01) Understand
              </p>
              <p className="max-w-sm text-base text-white/80">
                Every project begins with your goals and lifestyle.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-b border-white/30 pb-4 md:flex-row md:items-end md:justify-between">
              <p className="text-2xl text-white md:text-3xl">
                (02) Create
              </p>
              <p className="max-w-sm text-base text-white/80">
                Thoughtful concepts tailored to your space.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-b border-white/30 pb-4 md:flex-row md:items-end md:justify-between">
              <p className="text-2xl text-white md:text-3xl">
                (03) Refine
              </p>
              <p className="max-w-sm text-base text-white/80">
                Every detail is carefully reviewed before delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}