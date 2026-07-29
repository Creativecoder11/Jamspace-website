import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export function BlogCard({
  post,
  priority = false,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card group border border-border relative flex md:h-[420px] flex-col justify-end overflow-hidden p-4 md:p-6"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority={priority}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="absolute inset-0 object-cover opacity-0 duration-500 ease-out group-hover:scale-[1.08] group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
      </div>

      <div className="relative flex flex-col w-full h-full justify-between gap-20 text-black">
        <div>
          <span className="inline-block rounded-full bg-accent-yellow px-3 py-1 text-xs font-normal  text-foreground">
            {post.category}
          </span>
          <h3 className="mt-4 text-2xl font-medium leading-tight group-hover:text-white md:text-[27px]">
            {post.title}
          </h3>
        </div>
        <div>
          <p className="mt-3 line-clamp-2 text-sm text-black/85 group-hover:text-white">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-black/70 group-hover:text-white">{post.date}</span>
            <span className="relative font-normal text-black after:absolute group-hover:text-white after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-300 group-hover:after:w-full">
              Read More ↗
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
