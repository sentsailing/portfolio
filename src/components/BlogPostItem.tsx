import { BlogPost } from "../config/site.config";

interface BlogPostItemProps {
  post: BlogPost;
  variant: "featured" | "list";
}

export function BlogPostItem({ post, variant }: BlogPostItemProps) {
  const formattedDate = formatDate(post.date);
  const postUrl = `/blog/${post.slug}`;
  const isFeatured = variant === "featured";

  if (!isFeatured) {
    return (
      <a
        href={postUrl}
        className="group flex items-baseline justify-between gap-4 py-3 hover:bg-hover-bg -mx-2 px-2 transition-colors"
      >
        <div className="min-w-0">
          <h3 className="font-semibold text-fg group-hover:text-accent transition-colors truncate">
            {post.title}
          </h3>
          <p className="text-sm text-fg-muted mt-0.5 uppercase tracking-wider text-xs">
            {post.category}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-fg-muted whitespace-nowrap">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>{post.readingTime}</span>
        </div>
      </a>
    );
  }

  return (
    <article>
      <a
        href={postUrl}
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-fg"
      >
        <span className="text-xs font-semibold text-fg-muted uppercase tracking-wider">
          {post.category}
        </span>

        <h3 className="text-2xl font-bold text-fg group-hover:text-accent transition-colors mt-2">
          {post.title}
        </h3>

        <p className="text-fg-secondary mt-2 text-base leading-relaxed max-w-[620px]">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 mt-3 text-xs text-fg-muted">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>{post.readingTime}</span>
        </div>
      </a>
    </article>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
