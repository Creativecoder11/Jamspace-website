'use client';

import { useRef, useState } from 'react';
import { Instrument_Serif, Inter } from 'next/font/google';

const heading = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-heading',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

// Replace with real project photos and quotes before shipping.
const defaultTestimonials: Testimonial[] = [
  {
    quote:
      'Working with Jam Space was an exceptional experience from start to finish. They understood our vision, communicated clearly throughout the project, and delivered a space that feels both elegant and highly functional. The attention to detail exceeded our expectations.',
    name: 'Sarah Ahmed',
    role: 'Homeowner, Dhaka',
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop',
  },
  {
    quote:
      'From the first sketch to the final walkthrough, the team listened closely and translated our ideas into something better than we imagined. Timelines were respected and every material choice felt intentional.',
    name: 'Rafiq Islam',
    role: 'Homeowner, Chattogram',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
  },
  {
    quote:
      "What stood out most was how calm the whole process felt. Clear updates, honest budgeting, and a finished home that feels like us. We've already recommended them to two friends.",
    name: 'Farah Chowdhury',
    role: 'Homeowner, Dhaka',
    image:
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=800&auto=format&fit=crop',
  },
];

type Direction = 'next' | 'prev';

interface OutgoingCard {
  testimonial: Testimonial;
  direction: Direction;
}

export interface TestimonialsSectionProps {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
}

const DEFAULT_TITLE = 'Words\nfrom Our Clients.';
const DEFAULT_DESCRIPTION =
  "Every project is built on collaboration, trust, and exceptional results. Here's what our clients have to say.";
const TRANSITION_MS = 560;

export default function TestimonialsSection({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) {
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<OutgoingCard | null>(null);
  const [entered, setEntered] = useState(true);
  const animatingRef = useRef(false);

  const goTo = (rawIndex: number, direction: Direction) => {
    if (animatingRef.current || testimonials.length === 0) return;
    animatingRef.current = true;

    const nextIndex = (rawIndex + testimonials.length) % testimonials.length;

    setOutgoing({ testimonial: testimonials[index], direction });
    setIndex(nextIndex);
    setEntered(false);

    // Two rAFs: the first lets the browser paint the "entering" start state,
    // the second flips it to settled so the transition has a start and end
    // frame to animate between instead of jumping straight to the target.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setEntered(true);
      });
    });

    window.setTimeout(() => {
      setOutgoing(null);
      animatingRef.current = false;
    }, TRANSITION_MS);
  };

  const active = testimonials[index];
  if (!active) return null;

  return (
    <section
      className={`${heading.variable} ${body.variable} mx-auto w-full max-w-[1180px] px-6 py-[60px] font-[family-name:var(--font-body)] text-[#1E2422]`}
    >
      <div className="mb-16 flex flex-wrap items-start justify-between gap-10">
        <h1 className="font-[family-name:var(--font-heading)] text-[58px] font-normal leading-[1.08] tracking-[0.2px] max-[860px]:text-[42px]">
          {title.split('\n').map((line, i) => (
            <span key={line}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </h1>
        <p className="max-w-[300px] pt-3 text-left text-[15px] leading-relaxed text-[#767671]">
          {description}
        </p>
      </div>

      <div className="relative flex items-center gap-7 max-[860px]:gap-3">
        <NavButton direction="left" onClick={() => goTo(index - 1, 'prev')} />

        <div className="relative h-[400px] flex-1 max-[860px]:h-[560px]">
          {/* Decoy stack: scaled down and anchored to the bottom right corner
              so shrinking pulls the top/left edges inward (hidden behind the
              front card) while only a sliver peeks out bottom right, all in
              a straight line since there's no rotation involved. */}
          <div className="absolute inset-0 z-0 origin-bottom-right translate-x-[26px] translate-y-[18px] scale-[0.93] rounded-[28px] bg-white opacity-[0.92] shadow-[0_20px_40px_-20px_rgba(30,36,34,0.14)]" />
          <div className="absolute inset-0 z-[1] origin-bottom-right translate-x-[14px] translate-y-[10px] scale-[0.965] rounded-[28px] bg-white shadow-[0_20px_40px_-20px_rgba(30,36,34,0.14)]" />

          {outgoing && (
            <Card
              testimonial={outgoing.testimonial}
              modifier={
                outgoing.direction === 'next'
                  ? '-translate-x-[70px] -rotate-4 scale-[0.94] opacity-0'
                  : 'translate-x-[70px] rotate-[4deg] scale-[0.94] opacity-0'
              }
            />
          )}

          <Card
            key={index}
            testimonial={active}
            modifier={entered ? '' : 'origin-bottom-right translate-x-[26px] translate-y-[18px] scale-[0.93] opacity-0'}
          />
        </div>

        <NavButton direction="right" onClick={() => goTo(index + 1, 'next')} />
      </div>
    </section>
  );
}

function Card({ testimonial, modifier }: { testimonial: Testimonial; modifier?: string }) {
  return (
    <div
      className={`absolute inset-0 z-[3] flex overflow-hidden rounded-[28px] bg-white shadow-[0_24px_50px_-18px_rgba(30,36,34,0.18)] transition-[transform,opacity] duration-[550ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] max-[860px]:flex-col ${modifier ?? ''}`}
    >
      <div className="relative shrink-0 basis-[42%] max-[860px]:basis-[44%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={testimonial.image}
          alt={`${testimonial.name} project photo`}
          className="block h-full w-full object-cover"
        />
        <div className="absolute left-6 top-6 h-[22px] w-[22px] rounded-full bg-white opacity-90" />
      </div>
      <div className="flex flex-1 flex-col justify-center px-12 pb-9 pt-10 max-[860px]:px-6 max-[860px]:pb-7 max-[860px]:pt-6">
        <div className="mb-[14px] h-[22px] w-[30px] text-[#1C6F63]">
          <QuoteIcon />
        </div>
        <p className="mb-7 max-w-[460px] text-[19px] leading-[1.55] text-[#33372F]">
          {testimonial.quote}
        </p>
        <div className="text-[17px] font-bold text-[#1E2422]">{testimonial.name}</div>
        <div className="mt-1 text-sm text-[#767671]">{testimonial.role}</div>
      </div>
    </div>
  );
}

function NavButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  const d = direction === 'left' ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous testimonial' : 'Next testimonial'}
      className="z-[5] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D98C93] text-[#D98C93] transition-colors duration-300 hover:bg-[#D98C93] hover:text-white active:scale-95 max-[860px]:h-[38px] max-[860px]:w-[38px]"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d={d} />
      </svg>
    </button>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 32 24" fill="currentColor" className="h-full w-full">
      <path d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 4C9.2 5.2 6.8 8 6.8 12h6.4v12H0zm17.2 0V14.4c0-8 4.8-13.2 12.8-14.4L31.6 4c-5.2 1.2-7.6 4-7.6 8h6.4v12H17.2z" />
    </svg>
  );
}
