import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { homeServices } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { blogs } from "@/lib/data/blogs";

type Entry = MetadataRoute.Sitemap[number];

const page = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly"): Entry => ({
  url: absoluteUrl(path),
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page("/", 1, "weekly"),

    // Main sections — the pages we want Google to show as sitelinks
    page("/about", 0.9),
    page("/services", 0.9),
    page("/projects", 0.9, "weekly"),
    page("/packages", 0.9),
    page("/contact", 0.9),

    ...homeServices.map((service) => page(service.href, 0.8)),
    ...projects.map((project) => page(`/projects/${project.slug}`, 0.7)),

    page("/blog", 0.6, "weekly"),
    ...blogs.map((post): Entry => {
      const date = new Date(post.date);
      return {
        ...page(`/blog/${post.slug}`, 0.5, "yearly"),
        ...(Number.isNaN(date.getTime()) ? {} : { lastModified: date }),
      };
    }),

    page("/privacy-policy", 0.2, "yearly"),
    page("/terms-and-conditions", 0.2, "yearly"),
  ];
}
