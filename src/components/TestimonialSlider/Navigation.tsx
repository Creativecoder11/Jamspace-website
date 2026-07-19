import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
}

export function Navigation({ onPrev, onNext, disabled }: NavigationProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Previous testimonial"
        disabled={disabled}
        onClick={onPrev}
        className="absolute left-0 top-1/2 z-[60] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-lg transition-all hover:scale-105 hover:bg-neutral-900 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
      >
        <ArrowLeft className="h-5 w-5" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label="Next testimonial"
        disabled={disabled}
        onClick={onNext}
        className="absolute right-0 top-1/2 z-[60] flex h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-lg transition-all hover:scale-105 hover:bg-neutral-900 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
      >
        <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
      </button>
    </>
  );
}
