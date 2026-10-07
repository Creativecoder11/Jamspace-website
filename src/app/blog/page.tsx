import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { BlogsGrid } from "@/components/sections/blog/BlogsGrid";

export const metadata: Metadata = {
    title: "Interior Design Insights & Ideas | Jam Space",
    description:
        "Explore Jam Space's interior design insights, expert tips, design trends, and practical ideas for creating beautiful and functional spaces in Dhaka.",
};

export default function BlogPage() {
    return (
        <>
            <PageHero
                eyebrow="Blog"
                image="/images/blog-image-1.webp"
            />

            <BlogsGrid />
        </>
    );
}
