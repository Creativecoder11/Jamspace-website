import { blogs } from "@/lib/data/blogs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import BlogHeroBanner from "@/components/sections/blog/BlogHeroBanner";
import BlogOverview from "@/components/sections/blog/BlogOverview";
import BlogContent from "@/components/sections/blog/BlogContent";
import MoreBlogs from "@/components/sections/blog/MoreBlogs";

export async function generateStaticParams() {
    return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogs.find((p) => p.slug === slug);
    if (!post) return {};
    return {
        title: `${post.title} | Jam Space Blog`,
        description: post.excerpt,
    };
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
    const { slug } = await params;
    const post = blogs.find((p) => p.slug === slug);

    if (!post) notFound();

    return (
        <main className="pt-25 md:pt-30">
            <BlogHeroBanner post={post} />
            <BlogOverview post={post} />
            <BlogContent post={post} />
            <MoreBlogs currentSlug={post.slug} />
        </main>
    );
}