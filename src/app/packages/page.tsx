import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { BookSession } from "@/components/sections/packages/BookSession";
import { PackageCards } from "@/components/sections/packages/PackageCards";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Interior Design Packages in Dhaka | Jam Space",
  description:
    "Book a 60-minute interior design session with Jam Space, or explore our packages — from complimentary project discovery to personalised design and full execution in Dhaka.",
};

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { book } = await searchParams;

  return (
    <>
      <PageHero eyebrow="Packages" image="/images/hero 1.webp" />
      <BookSession autoOpen={book === "session"} />
      <PackageCards />
      <Faq />
    </>
  );
}
