"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { aboutMissionVision } from "@/lib/data/about";

type TabKey = (typeof aboutMissionVision)[number]["key"];

export function AboutMissionVision() {
  const containerRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const isAnimating = useRef(false);
  const skipNextReveal = useRef(true);
  const [activeTab, setActiveTab] = useState<TabKey>(aboutMissionVision[0].key);

  const active = aboutMissionVision.find((tab) => tab.key === activeTab)!;

  useGSAP(
    () => {
      gsap.from(".line", {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".mv-tabs", {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const split = SplitText.create(copyRef.current, {
        type: "lines",
        mask: "lines",
        linesClass: "mv-line",
      });

      gsap.from(split.lines, {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      return () => split.revert();
    },
    { scope: containerRef },
  );

  // Re-reveals the copy whenever the active tab changes. The paragraph is
  // keyed on activeTab so each switch mounts a brand new node (never one
  // GSAP has already split), and this effect's first run — on initial
  // mount — is skipped since the scroll-triggered effect above already
  // reveals the starting copy.
  useGSAP(
    () => {
      if (skipNextReveal.current) {
        skipNextReveal.current = false;
        return;
      }

      const split = SplitText.create(copyRef.current, {
        type: "lines",
        mask: "lines",
        linesClass: "mv-line",
      });

      gsap.from(split.lines, {
        yPercent: 110,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      return () => split.revert();
    },
    { scope: containerRef, dependencies: [activeTab] },
  );

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleTabClick = (key: TabKey) => {
    if (key === activeTab || isAnimating.current) return;
    isAnimating.current = true;

    contextSafe(() => {
      gsap.to(copyRef.current, {
        yPercent: -12,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setActiveTab(key),
      });
    })();
  };

  return (
    <section ref={containerRef} className="">
      <div className="max-w-[1340px] h-[200px] mx-auto">
        <div className="mv-tabs inline-flex justify-start items-start gap-2 rounded-xl border border-accent p-[1px]">
          {aboutMissionVision.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabClick(tab.key)}
              aria-pressed={tab.key === activeTab}
              className={`rounded-xl px-6 py-2 text-lg justify-left font-medium transition-colors duration-300 ${
                tab.key === activeTab
                  ? "bg-accent text-white"
                  : "text-accent hover:bg-accent/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <p
          key={activeTab}
          ref={copyRef}
          className="mt-6 text-3xl leading-relaxed text-muted"
        >
          <span className="font-medium text-foreground">{active.lead}</span>{" "}
          {active.text}
        </p>
      </div>
    </section>
  );
}
