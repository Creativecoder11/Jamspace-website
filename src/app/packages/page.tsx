import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { BookSession } from "@/components/sections/packages/BookSession";
import { PackageCards } from "@/components/sections/packages/PackageCards";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Interior Design Packages in Dhaka | Jam Space",
  description:
    "Compare Jam Space interior design packages in Dhaka — from a 60-minute design session to full design and execution. Pick the support your project needs.",
  path: "/packages",
});

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { book } = await searchParams;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Packages", path: "/packages" }])} />
      <PageHero eyebrow="Packages" image="/images/hero 1.webp" />
      <BookSession autoOpen={book === "session"} />
      <PackageCards />
      <Faq />
    </>
  );
}
