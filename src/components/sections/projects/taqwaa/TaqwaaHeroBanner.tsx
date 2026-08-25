import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";

export default function TaqwaaHeroBanner() {
  return (
    <section>
      <div className="mt-25 md:mt-30 md:border-y border-border">
        <div className="flex flex-col md:flex-row max-w-335 mx-auto items-start justify-between">
          <div className="md:w-2/3 md:border-r border-border md:pr-0 pb-4 md:py-8">
            <AnimatedHeading
              as="h2"
              lines={["Taqwaa", "Residence"]}
              className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18 px-4 md:px-0"
            />
          </div>

          <div className="md:w-1/3 border-border md:pl-8 md:py-8 px-4 md:px-0">
            <p className="text-muted">
              Taqwaa Residence is a contemporary triplex blending modern luxury with everyday comfort. Warm neutrals, refined materials, clean lines, and thoughtful lighting create a cohesive, elegant, and inviting interior.
            </p>

            <div className="mt-3 md:mt-6">
              <MagneticButton>
                <Button href="/about">Start a Project</Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-335 mx-auto mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 justify-between px-4 md:px-0">
        <div>
          <p className="text-base">Year:</p>
          <p className="text-base font-medium">2025</p>
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
          <p className="text-base font-medium">Luxury Modern</p>
        </div>
      </div>

      <div className="relative mt-5">
        <div className="relative px-4 md:px-0">
          <Image
            src="/images/projects/taqwaa/hero.webp"
            width={1600}
            height={900}
            alt="Project Image"
            className="w-full h-90 md:h-175 object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Testimonial Card */}
        <div className="absolute inset-x-0 bottom-8">
          <div className="max-w-335 mx-auto px-4 md:px-0 flex justify-end">
            <div className="max-w-70 mx-auto md:mx-0 md:max-w-95 bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-8 text-white">
              <Image
                src="/icons/quote.svg"
                width={24}
                height={24}
                alt="Quote"
                className="mb-5"
              />

              <p className="text-sm md:text-base leading-5 md:leading-7 text-white/90">
                From the initial concept to the final details, the team was patient, responsive, and committed to getting everything right. They listened carefully to our feedback and worked through every revision with us, ultimately creating a home that reflects our vision and expectations.”
              </p>

              <div className="mt-3 md:mt-6">
                <h4 className="font-medium text-base md:text-lg">Major Serajus Salekin</h4>
                <p className="text-xs md:text-sm text-white/70">Homeowner, Dhaka</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
