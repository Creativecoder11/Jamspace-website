import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card group relative flex h-[420px] flex-col justify-end overflow-hidden rounded-2xl p-6"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority={priority}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      </div>

      <div className="relative text-white">
        <span className="inline-block rounded-full bg-accent-yellow px-3 py-1 text-xs font-normal text-foreground">
          {post.category}
        </span>
        <h3 className="mt-4 text-2xl font-medium leading-tight md:text-[27px]">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm text-white/85">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-white/70">{post.date}</span>
          <span className="relative font-normal text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
            Read More ↗
          </span>
        </div>
      </div>
    </Link>
  );
}
