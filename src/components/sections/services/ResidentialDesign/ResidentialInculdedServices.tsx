import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";
import React from "react";

export default function ResidentialInculdedServices() {
  return (
    <section className="border-b border-border">
      <div className="border-y border-border">
        <div className="mx-auto flex max-w-[1340px] items-start justify-between">
          <div className="w-2/3 border-r border-border py-8">
            <AnimatedHeading
              as="h2"
              lines={["What's Included", "in This Service."]}
              className="text-6xl font-normal leading-18"
            />
          </div>

          <div className="w-1/3 py-8 pl-8">
            <p className="text-muted">
              Everything you need to transform your home into a thoughtfully designed, functional, and timeless living space.
            </p>

            <div className="mt-6">
              <MagneticButton>
                <Button href="/about">Start a Project</Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-w-[1340px] mx-auto flex-row">
        <div className="w-[50%] py-12.5 pr-12.5 border-r border-border">
            <Image className="obeject-contain w-full" src='/images/cta-strip-03.webp' height={200} width={200} alt="website"/>
        </div>
        <div className="w-[16.7%] py-12.5 border-r border-border flex items-center  justify-end pr-5">
            <Image src='/JAM-Black.svg' height={110} width={110} alt="website icon" />
        </div>
        <div className="w-[30%] py-12.5  pl-10">
            <p className="text-base">
                Including:
            </p>
            <ul className="text-3xl mt-5 flex flex-col gap-6">
                <li>
                    (01) Space Planning
                </li>
                <li>
                    (02) Interior Styling
                </li>
                <li>
                    (03) Furniture Selection
                </li>
                <li>
                    (04) Lighting Design
                </li>
                <li>
                    (05) Material Selection
                </li>
                <li>
                    (06) 3D Visualization
                </li>

            </ul>
        </div>
      </div>
    </section>
  );
}
