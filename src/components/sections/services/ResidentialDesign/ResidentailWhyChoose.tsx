import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import React from "react";

export default function ResidentailWhyChoose() {
  return (
    <section>
      <div className="mx-auto mt-25 flex max-w-[1340px] items-start justify-between">
        <div className="w-2/3">
          <AnimatedHeading
            as="h2"
            lines={["Why Choose", "This Service."]}
            className="text-6xl font-normal leading-18"
          />
        </div>

        <div className="w-1/3 pl-8">
          <p>
            Discover what makes our approach different & how we deliver lasting
            value through every project.
          </p>

          <div className="mt-6">
            <MagneticButton>
              <Button href="/about">Start a Project</Button>
            </MagneticButton>
          </div>
        </div>
      </div>
      <div className="max-w-[1340px] mt-13 mx-auto flex flex-row">
        <div className="flex flex-col mt-[340px] h-[340px] w-[25%] p-5 justify-between border border-border">
          <p>(01)</p>
          <div className="flex flex-col gap-6">
            <p className="text-3xl font-medium text-accent">Tailored Solutions.</p>
            <p>
              Every service is customized to match your goals, space, and unique
              requirements.
            </p>
          </div>
        </div>
        <div className="flex flex-col h-[340px] w-[25%] p-5 justify-between border border-border">
          <p>(02)</p>
          <div className="flex flex-col gap-6">
            <p className="text-3xl font-medium text-accent-yellow">Expert Guidance.</p>
            <p>
              Work with experienced designers who guide you through every stage.
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-[340px] h-[340px] w-[25%] p-5 justify-between border border-border">
          <p>(03)</p>
          <div className="flex flex-col gap-6">
            <p className="text-3xl font-medium text-accent-teal">Thoughtful Planning.</p>
            <p>
              Every decision is made to balance functionality, aesthetics, and lasting value.
            </p>
          </div>
        </div>
        <div className="flex flex-col h-[340px] w-[25%] p-5 justify-between border border-border">
          <p>(04)</p>
          <div className="flex flex-col gap-6">
            <p className="text-3xl font-medium text-accent">Lasting Quality.</p>
            <p>
              We create timeless solutions that are practical, durable, and visually refined.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
