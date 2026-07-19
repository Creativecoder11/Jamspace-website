import Image from "next/image";
import { Quote } from "lucide-react";
import type { CSSProperties } from "react";
import type { Testimonial } from "./types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  position: number;
  style: CSSProperties;
}

export function TestimonialCard({ testimonial, position, style }: TestimonialCardProps) {
  const isActive = position === 0;

  return (
    <div
      className="ts-card absolute inset-0 flex flex-col overflow-hidden rounded-[32px] border border-black/5 bg-white/90 shadow-2xl backdrop-blur-sm md:flex-row"
      style={style}
      aria-hidden={!isActive}
      inert={!isActive ? true : undefined}
    >
      <div className="relative h-56 w-full shrink-0 md:h-auto md:w-[45%]">
        <Image
          src={testimonial.image}
          alt={`${testimonial.name}, ${testimonial.designation}`}
          fill
          priority={isActive}
          loading={isActive ? undefined : "lazy"}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex w-full flex-col justify-center gap-6 p-8 md:w-[55%] md:p-12">
        <Quote className="h-8 w-8 shrink-0 text-teal-500" fill="currentColor" strokeWidth={0} />

        <p className="text-lg leading-relaxed text-neutral-600 md:text-xl">
          {testimonial.review}
        </p>

        <div>
          <p className="text-lg font-semibold text-neutral-900">{testimonial.name}</p>
          <p className="text-sm text-neutral-500">
            {testimonial.designation} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
