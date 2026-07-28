"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/animations/gsap";
import { aboutMissionVision } from "@/lib/data/about";

type TabKey = (typeof aboutMissionVision)[number]["key"];




export function AboutMissionVision() {
  const containerRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);

  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const isAnimating = useRef(false);
  const skipNextReveal = useRef(true);

  const [activeTab, setActiveTab] = useState<TabKey>(
    aboutMissionVision[0].key,
  );

  const active = aboutMissionVision.find(
    (tab) => tab.key === activeTab,
  )!;

  const animateIndicator = (button: HTMLButtonElement) => {
    if (!indicatorRef.current) return;

    gsap.to(indicatorRef.current, {
      x: button.offsetLeft,
      width: button.offsetWidth,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const setLabelColors = (key: TabKey) => {
    const labels = containerRef.current?.querySelectorAll<HTMLElement>(".tab-label");
    labels?.forEach((label) => {
      gsap.to(label, {
        color: label.dataset.tab === key ? "#ffffff" : "var(--accent)",
        duration: 0.35,
        ease: "power2.out",
      });
    });
  };

  // Initial section animations
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
    {
      scope: containerRef,
    },
  );

  // Set initial indicator position
  useGSAP(
    () => {
      const activeButton = tabsRef.current?.querySelector(
        "[data-active='true']",
      ) as HTMLButtonElement | null;

      if (activeButton && indicatorRef.current) {
        gsap.set(indicatorRef.current, {
          x: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
        });
      }

      setLabelColors(activeTab); // initial sync, gsap.set for no transition
    },
    { scope: containerRef },
  );

  // Animate tab label colors
  useGSAP(
    () => {
      const labels =
        containerRef.current?.querySelectorAll(".tab-label");

      labels?.forEach((label) => {
        const key = label.getAttribute("data-tab");

        gsap.to(label, {
          color:
            key === activeTab
              ? "#ffffff"
              : "var(--accent)",
          duration: 0.35,
          ease: "power2.out",
        });
      });
    },
    {
      scope: containerRef,
      dependencies: [activeTab],
    },
  );

  // Reveal copy after tab change
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
    {
      scope: containerRef,
      dependencies: [activeTab],
    },
  );

  const { contextSafe } = useGSAP({
    scope: containerRef,
  });

  const handleTabClick = (key: TabKey, button: HTMLButtonElement) => {
    if (key === activeTab || isAnimating.current) return;
    isAnimating.current = true;

    contextSafe(() => {
      animateIndicator(button);
      setLabelColors(key);

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
    <section ref={containerRef}>
      <div className="max-w-[1340px] h-[200px] mx-auto">
        <div
          ref={tabsRef}
          className="mv-tabs relative inline-flex items-start gap-2 rounded-xl border border-accent p-[1px]"
        >
          {/* Sliding active background */}
          <div
            ref={indicatorRef}
            className="absolute left-0 top-[1px] h-[calc(100%-2px)] rounded-xl bg-accent"
          />

          {aboutMissionVision.map((tab) => (
            <button
              key={tab.key}
              type="button"
              data-active={tab.key === activeTab}
              onClick={(e) =>
                handleTabClick(tab.key, e.currentTarget)
              }
              aria-pressed={tab.key === activeTab}
              className="relative z-10 rounded-xl px-6 py-2 text-lg font-medium"
            >
              <span className="tab-label" data-tab={tab.key}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <p
          key={activeTab}
          ref={copyRef}
          className="mt-6 text-3xl leading-relaxed text-muted"
        >
          <span className="font-medium text-foreground">
            {active.lead}
          </span>{" "}
          {active.text}
        </p>
      </div>
    </section>
  );
}