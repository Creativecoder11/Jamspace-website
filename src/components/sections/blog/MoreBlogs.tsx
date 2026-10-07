"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BlogCard } from "@/components/ui/BlogCard";
import { blogs } from "@/lib/data/blogs";

export default function MoreBlogs({ currentSlug }: { currentSlug: string }) {
    const containerRef = useRef(null);

    const featuredBlogs = blogs
        .filter((b) => b.slug !== currentSlug)
        .slice(0, 2);

    useGSAP(
        () => {
            gsap.set(".blog-card", { opacity: 0, y: 24 });

            ScrollTrigger.batch(".blog-card", {
                start: "top 90%",
                once: true,
                onEnter: (batch) => {
                    gsap.to(batch, {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.12,
                        ease: "power3.out",
                        overwrite: "auto",
                    });
                },
            });

            ScrollTrigger.refresh();
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="w-full">
            {/* Header */}
            <div className="w-full border-y border-border py-4 md:py-0">
                <div className="flex flex-col md:flex-row max-w-335 mx-auto items-stretch justify-between">
                    {/* Left */}
                    <div className="md:w-2/3 md:border-r border-border pb-4 md:py-8 px-4 md:px-0">
                        <AnimatedHeading
                            as="h2"
                            lines={["More", "Design Insights."]}
                            className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18"
                        />
                    </div>

                    {/* Right */}
                    <div className="md:w-1/3 md:pl-8 md:py-8 px-4 md:px-0 flex items-center">
                        <div>
                            <p className="text-muted">
                                Continue exploring our journal for more expert tips,
                                design trends, and practical ideas.
                            </p>

                            <div className="mt-6">
                                <MagneticButton>
                                    <Button href="/blog">
                                        View All Articles
                                    </Button>
                                </MagneticButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Cards */}
            <div className="w-full border-b border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-335 mx-auto">
                    {featuredBlogs.map((post, idx) => (
                        <div
                            key={post.slug}
                            className={`
                                border-l border-border
                                p-4 md:p-12.5
                                ${idx === featuredBlogs.length - 1
                                    ? "md:border-r"
                                    : ""
                                }
                            `}
                        >
                            <BlogCard post={post} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
