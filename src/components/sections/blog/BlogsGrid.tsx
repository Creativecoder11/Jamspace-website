"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BlogCard } from "@/components/ui/BlogCard";
import { blogs } from "@/lib/data/blogs";

export function BlogsGrid() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const categories = Array.from(
        new Set(blogs.map((blog) => blog.category))
    );

    const filtered = activeCategory
        ? blogs.filter((blog) => blog.category === activeCategory)
        : blogs;

    useGSAP(
        () => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                gsap.set(".blog-card", {
                    clearProps: "all",
                    opacity: 1,
                    y: 0,
                });
                return;
            }

            gsap.set(".blog-card", {
                opacity: 0,
                y: 24,
            });

            ScrollTrigger.batch(".blog-card", {
                start: "top 90%",
                once: true,
                onEnter: (batch) => {
                    gsap.to(batch, {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: "power3.out",
                        overwrite: "auto",
                    });
                },
            });

            ScrollTrigger.refresh();
        },
        {
            scope: containerRef,
            dependencies: [activeCategory],
            revertOnUpdate: true,
        }
    );

    useGSAP(
        () => {
            gsap.fromTo(
                ".blog-card",
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.45,
                    stagger: 0.06,
                    ease: "power3.out",
                }
            );
        },
        {
            scope: containerRef,
            dependencies: [activeCategory],
        }
    );

    const filterClass = (isActive: boolean) =>
        `w-fit text-left transition-colors ${isActive
            ? "text-lg md:text-3xl font-medium text-foreground"
            : "text-lg md:text-3xl font-normal text-[#1919194D] hover:text-foreground"
        }`;

    return (
        <section ref={containerRef}>
            {/* Header */}
            <div className="mt-16 md:mt-25 w-full border-y border-border">
                <div className="flex flex-col md:flex-row max-w-335 mx-auto items-stretch justify-between">
                    {/* Left */}
                    <div className="md:w-2/3 md:border-r border-border pb-4 md:py-8 px-4 md:px-0">
                        <AnimatedHeading
                            as="h2"
                            lines={["Design", "Insights"]}
                            className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18"
                        />
                    </div>

                    {/* Right */}
                    <div className="md:w-1/3 md:pl-8 pb-4 md:py-8 px-4 md:px-0 flex items-center">
                        <div>
                            <p className="text-muted">
                                Explore our latest insights, design ideas, expert
                                tips, and inspiration to help you create spaces
                                that feel beautiful and work effortlessly.
                            </p>

                            <div className="mt-3 md:mt-6">
                                <MagneticButton>
                                    <Button href="/about">
                                        Start a Project
                                    </Button>
                                </MagneticButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter + Blog Grid */}
            <Container className="flex flex-col gap-5 md:gap-10 border-t border-border md:flex-row px-4 md:px-0">
                {/* Sidebar */}
                <aside className="w-full shrink-0 md:w-80 pt-7 md:pr-8">
                    <div className="sticky top-32">
                        <p className="text-sm md:text-base text-muted underline underline-offset-4">
                            Filter Articles
                        </p>

                        <nav className="mt-4 flex flex-col gap-1 md:gap-3">
                            {/* All */}
                            <button
                                type="button"
                                onClick={() => setActiveCategory(null)}
                                aria-pressed={activeCategory === null}
                                className={filterClass(activeCategory === null)}
                            >
                                All Articles

                                {activeCategory === null && (
                                    <span className="ml-1.5">×</span>
                                )}
                            </button>

                            {/* Categories */}
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() =>
                                        setActiveCategory(category)
                                    }
                                    aria-pressed={
                                        activeCategory === category
                                    }
                                    className={filterClass(
                                        activeCategory === category
                                    )}
                                >
                                    {category}

                                    {activeCategory === category && (
                                        <span
                                            role="button"
                                            aria-label="Clear filter"
                                            className="ml-1.5"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveCategory(null);
                                            }}
                                        >
                                            ×
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Blog Grid */}
                <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 gap-4 md:gap-0">
                    {filtered.map((post) => (
                        <div
                            key={post.slug}
                            className="border-r border-b border-l border-border p-4 md:p-[50px] border-t md:border-t-0"
                        >
                            <BlogCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
