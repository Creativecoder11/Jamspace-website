import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import React from "react";

export default function ResidentailWhyChoose() {
  return (
    <section>
      <div className="mx-auto mt-16 md:mt-25 flex flex-col md:flex-row max-w-335 items-start justify-between px-4 md:px-0">
        <div className="md:w-2/3">
          <AnimatedHeading
            as="h2"
            lines={["Why Choose", "This Service."]}
            className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18"
          />
        </div>

        <div className="md:w-1/3 md:pl-8 py-4 md:py-8">
          <p>
            Discover what makes our approach different & how we deliver lasting
            value through every project.
          </p>

          <div className="mt-3 md:mt-6">
            <MagneticButton>
              <Button href="/about">Start a Project</Button>
            </MagneticButton>
          </div>
        </div>
      </div>
      <div className="max-w-335 mt-5 md:mt-13 mx-auto flex flex-col gap-4 md:gap-0 px-4 md:flex-row md:px-0">
        <div className="flex flex-col mt-0 md:mt-85 h-55 md:h-85 w-full md:w-[25%] p-3 md:p-5 justify-between border border-border">
          <p>(01)</p>
          <div className="flex flex-col gap-3 md:gap-6">
            <p className="text-xl md:text-3xl font-medium text-accent">Tailored Solutions.</p>
            <p>
              Every service is customized to match your goals, space, and unique
              requirements.
            </p>
          </div>
        </div>
        <div className="flex flex-col h-55 md:h-85 w-full md:w-[25%] p-3 md:p-5 justify-between border border-border">
          <p>(02)</p>
          <div className="flex flex-col gap-3 md:gap-6">
            <p className="text-xl md:text-3xl font-medium text-accent-yellow">Expert Guidance.</p>
            <p>
              Work with experienced designers who guide you through every stage.
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-0 md:mt-85 h-55 md:h-85 w-full md:w-[25%] p-3 md:p-5 justify-between border border-border">
          <p>(03)</p>
          <div className="flex flex-col gap-3 md:gap-6">
            <p className="text-xl md:text-3xl font-medium text-accent-teal">Thoughtful Planning.</p>
            <p>
              Every decision is made to balance functionality, aesthetics, and lasting value.
            </p>
          </div>
        </div>
        <div className="flex flex-col h-55 md:h-85 w-full md:w-[25%] p-3 md:p-5 justify-between border border-border">
          <p>(04)</p>
          <div className="flex flex-col gap-3 md:gap-6">
            <p className="text-xl md:text-3xl font-medium text-accent">Lasting Quality.</p>
            <p>
              We create timeless solutions that are practical, durable, and visually refined.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
