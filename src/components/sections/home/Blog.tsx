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
    <section ref={containerRef} className="border-t border-border py-24 md:py-32">
      <Container className="flex flex-col gap-8 pb-12 md:flex-row md:items-start md:justify-between">
        <AnimatedHeading
          as="h2"
          lines={["Design", "Insights."]}
          className="text-4xl font-medium leading-[1.05] md:text-heading"
        />
        <div className="max-w-md">
          <p className="text-muted">
            Explore expert tips, design trends, and practical ideas to help
            you create spaces that are both beautiful and functional.
          </p>
          <div className="mt-6">
            <Button href="/blog">See All Blogs</Button>
          </div>
        </div>
      </Container>

      <Container className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {blogs.map((post, i) => (
          <BlogCard key={post.slug} post={post} priority={i === 0} />
        ))}
      </Container>
    </section>
  );
}
