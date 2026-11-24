import { blogs } from "@/lib/data/blogs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { ORGANIZATION_ID, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

import BlogHeroBanner from "@/components/sections/blog/BlogHeroBanner";
import BlogOverview from "@/components/sections/blog/BlogOverview";
import BlogContent from "@/components/sections/blog/BlogContent";
import MoreBlogs from "@/components/sections/blog/MoreBlogs";

export async function generateStaticParams() {
    return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogs.find((p) => p.slug === slug);
    if (!post) return {};
    return pageMetadata({
        title: `${post.title} | Jam Space Blog`,
        description: post.excerpt,
        path: `/blog/${post.slug}`,
        image: post.heroImage ?? post.image,
        type: "article",
    });
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogs.find((p) => p.slug === slug);

    if (!post) notFound();

    return (
        <div className="pt-25 md:pt-30">
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.title,
                        description: post.excerpt,
                        image: absoluteUrl(post.heroImage ?? post.image),
                        ...(Number.isNaN(new Date(post.date).getTime())
                            ? {}
                            : { datePublished: new Date(post.date).toISOString() }),
                        mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
                        author: { "@id": ORGANIZATION_ID },
                        publisher: { "@id": ORGANIZATION_ID },
                    },
                    breadcrumbJsonLd([
                        { name: "Blog", path: "/blog" },
                        { name: post.title, path: `/blog/${post.slug}` },
                    ]),
                ]}
            />
            <BlogHeroBanner post={post} />
            <BlogOverview post={post} />
            <BlogContent post={post} />
            <MoreBlogs currentSlug={post.slug} />
        </div>
    );
}