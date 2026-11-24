import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { BlogsGrid } from "@/components/sections/blog/BlogsGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Design Insights | Jam Space",
  description:
    "Interior design ideas, planning tips and trends from the Jam Space studio in Dhaka — practical advice for spaces that look good and work well.",
  path: "/blog",
});

export default function BlogPage() {
    return (
        <>
          <JsonLd data={breadcrumbJsonLd([{ name: "Blog", path: "/blog" }])} />
            <PageHero
                eyebrow="Blog"
                image="/images/blog-image-1.webp"
            />

            <BlogsGrid />
        </>
    );
}
