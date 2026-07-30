import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";
import React from "react";

export default function JalshiriHeroBanner() {
  return (
    <section>
      <div className="mt-30 border-y border-border">
        <div className="mx-auto flex max-w-[1340px] items-start justify-between">
          <div className="w-2/3 border-r border-border py-8">
            <AnimatedHeading
              as="h2"
              lines={["Jalshiri", "Parkside Duplex"]}
              className="text-6xl font-normal leading-18"
            />
          </div>

          <div className="w-1/3 py-8 pl-8">
            <p className="text-muted">
              Jalshiri Parkside Duplex began with a clear client vision: keep
              the heritage alive, but translate it into a home that feels
              minimal, calm, and genuinely liveable.
            </p>

            <div className="mt-6">
              <MagneticButton>
                <Button href="/about">Start a Project</Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1340px] mx-auto mt-5 flex flex-row justify-between">
        <div>
          <p className="text-base">Year:</p>
          <p className="text-base font-medium">2026</p>
        </div>
        <div>
          <p className="text-base">Service:</p>
          <p className="text-base font-medium">Residential Design</p>
        </div>
        <div>
          <p className="text-base">Location:</p>
          <p className="text-base font-medium">Jolshiri Abashan, Narayanganj</p>
        </div>
        <div>
          <p className="text-base">Style:</p>
          <p className="text-base font-medium">Neo-Modern</p>
        </div>
      </div>
      <div className="relative mt-5">
        <Image
          src="/images/hero-01.webp"
          width={1600}
          height={900}
          alt="Project Image"
          className="w-full h-[700px] object-cover"
        />

        {/* Testimonial Card */}
        <div className="absolute right-8 bottom-8 max-w-[380px] bg-white/10 backdrop-blur-md border border-white/20 p-8 text-white">
          <Image
            src="/icons/quote.svg"
            width={24}
            height={24}
            alt="Quote"
            className="mb-5"
          />

          <p className="text-base leading-7 text-white/90">
            “Working with JamSpace was an exceptional experience from start to
            finish. They understood our vision, communicated clearly throughout
            the project, and delivered a space that feels both elegant and
            highly functional. The attention to detail exceeded our
            expectations.”
          </p>

          <div className="mt-6">
            <h4 className="font-medium text-lg">Sarah Ahmed</h4>
            <p className="text-sm text-white/70">Homeowner, Dhaka</p>
          </div>
        </div>
      </div>
    </section>
  );
}
