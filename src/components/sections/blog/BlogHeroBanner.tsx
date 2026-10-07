import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import Image from "next/image";
import type { BlogPost } from "@/lib/types";

export default function BlogHeroBanner({ post }: { post: BlogPost }) {
    return (
        <section className="w-full">
            <div className="">
                <div className="w-full border-y border-border">
                    <div className="flex flex-col md:flex-row max-w-335 mx-auto items-stretch justify-between">
                        {/* Left Side: Title */}
                        <div className="md:w-2/3 md:border-r border-border pb-4 md:py-12 px-4 md:px-0">
                            <span className="inline-block rounded-full bg-accent-yellow px-3 py-1 text-xs font-normal text-foreground mb-4">
                                {post.category}
                            </span>

                            <AnimatedHeading
                                as="h1"
                                lines={[post.title]}
                                className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18"
                            />
                        </div>

                        {/* Right Side: Excerpt */}
                        <div className="md:w-1/3 md:pl-8 md:py-8 px-4 md:px-0 flex items-center">
                            <p className="text-muted text-base md:text-lg leading-relaxed">
                                {post.excerpt}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Meta Data Grid */}
                <div className="max-w-335 mx-auto grid grid-cols-3 gap-4 pt-6 px-4 md:px-0">
                    <div>
                        <p className="text-base mb-1">Published:</p>
                        <p className="text-base font-medium">{post.date}</p>
                    </div>
                    <div>
                        <p className="text-base mb-1">Read:</p>
                        <p className="text-base font-medium">{post.readTime}</p>
                    </div>
                    <div>
                        <p className="text-base mb-1">By:</p>
                        <p className="text-base font-medium">{post.author}</p>
                    </div>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative mt-5 w-full">
                <div className="relative w-full">
                    <Image
                        src={post.heroImage || post.image}
                        width={1600}
                        height={900}
                        alt={post.title}
                        className="w-full h-90 md:h-175 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>
            </div>
        </section>
    );
}