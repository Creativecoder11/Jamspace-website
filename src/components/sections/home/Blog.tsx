"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { BlogCard } from "@/components/ui/BlogCard";
import { blogs } from "@/lib/data/blogs";

export function Blog() {
  const containerRef = useRef<HTMLElement>(null);

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

      ScrollTrigger.batch(".blog-card", {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          }),
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="border-t border-border  mt-13 w-full"
    >
      <div className="flex max-w-[1340px] mx-auto items-start justify-between">
        <div className="w-2/3 border-r border-border py-8">
          <AnimatedHeading
            as="h2"
            lines={["Design", "Insights."]}
            className="text-6xl font-normal leading-18"
          />
        </div>
        <div className="w-1/3 pl-8 py-8">
          <p className="text-muted">
            Explore expert tips, design trends, and practical ideas to help you
            create spaces that are both beautiful and functional.
          </p>
          <div className="mt-6">
            <Button href="/about">Learn More About Us</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-3">
        {blogs.map((post, i) => (
          <BlogCard key={post.slug} post={post} priority={i === 0} />
        ))}
      </div>
    </section>
  );
}
