import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";

export default function ResidentailApproach() {
  return (
    <section className="relative mt-22.5 overflow-hidden">
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
      <div className="relative py-22.5 z-10">
        {/* Heading */}
        <div className="">
          <div className="mx-auto flex max-w-[1340px] items-start justify-between">
            <div className="w-2/3">
              <AnimatedHeading
                as="h2"
                lines={["Our", "Approach."]}
                className="text-6xl font-normal leading-18 text-white"
              />
            </div>

            <div className="w-1/3 pl-8">
              <p className="text-white/80">
                Everything you need to transform your home into a thoughtfully
                designed, functional, and timeless living space.
              </p>

              <div className="mt-6">
                <MagneticButton>
                  <Button href="/about">Start a Project</Button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* Approach List */}
        <div className="mx-auto mt-20 flex max-w-[1340px] flex-row items-end justify-between ">
          <div className="w-[30%]">
            <a
              href="/project"
              className="inline-flex items-center text-white transition-opacity hover:opacity-80"
            >
              See Our Project ↗
            </a>
          </div>

          <div className="flex w-[70%] flex-col gap-12.5">
            <div className="flex justify-between items-end border-b border-white/30 pb-4">
              <p className="text-3xl text-white">(01) Understand</p>
              <p className="max-w-sm text-base text-white/80">
                Every project begins with your goals and lifestyle.
              </p>
            </div>

            <div className="flex justify-between items-end border-b border-white/30 pb-4">
              <p className="text-3xl text-white">(02) Create</p>
              <p className="max-w-sm text-base text-white/80">
                Thoughtful concepts tailored to your space.
              </p>
            </div>

            <div className="flex justify-between items-end border-b border-white/30 pb-4">
              <p className="text-3xl text-white">(03) Refine</p>
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