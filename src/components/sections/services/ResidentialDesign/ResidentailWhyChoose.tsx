import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { ServiceDetailContent } from "@/lib/types";

/** Card accent colours cycle in this order. */
const accentClasses = ["text-accent", "text-accent-yellow", "text-accent-teal"];

export default function ResidentailWhyChoose({
  content,
}: {
  content: ServiceDetailContent["whyChoose"];
}) {
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
          <p>{content.intro}</p>

          <div className="mt-3 md:mt-6">
            <MagneticButton>
              <Button href={content.cta.href}>{content.cta.label}</Button>
            </MagneticButton>
          </div>
        </div>
      </div>
      <div className="max-w-335 mt-5 md:mt-13 mx-auto flex flex-col gap-4 md:gap-0 px-4 md:flex-row md:px-0">
        {content.reasons.map((reason, i) => (
          <div
            key={reason.title}
            className={`flex flex-col h-55 md:h-85 w-full md:w-[25%] p-3 md:p-5 justify-between border border-border ${
              i % 2 === 0 ? "mt-0 md:mt-85" : ""
            }`}
          >
            <p>({String(i + 1).padStart(2, "0")})</p>
            <div className="flex flex-col gap-3 md:gap-6">
              <p
                className={`text-xl md:text-3xl font-medium ${
                  accentClasses[i % accentClasses.length]
                }`}
              >
                {reason.title}
              </p>
              <p>{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
