import { BlogPost, theme } from "../config/site.config";
import { useMagneticHover } from "../hooks/useMagneticHover";

interface BlogPostItemProps {
  post: BlogPost;
  variant: "featured" | "list";
}

export function BlogPostItem({ post, variant }: BlogPostItemProps) {
  const magneticRef = useMagneticHover<HTMLAnchorElement>({
    strength: variant === "featured" ? 4 : 6,
  });

  const isFeatured = variant === "featured";
  const formattedDate = formatDate(post.date);

  // For now, posts link to slugs (ready for future routing)
  const postUrl = `/blog/${post.slug}`;

  if (isFeatured) {
    return (
      <article className="col-span-full">
        <a
          ref={magneticRef}
          href={postUrl}
          className="group block p-8 rounded-xl bg-card-bg border border-card-border hover:border-border-hover transition-all duration-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {/* Featured badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-accent/10 text-accent">
              Featured
            </span>
            <CategoryBadge category={post.category} />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-fg group-hover:text-accent transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-fg-secondary mt-3 text-base leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-4 text-sm text-fg-muted">
            <time dateTime={post.date}>{formattedDate}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-fg-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        </a>
      </article>
    );
  }

  // List variant
  return (
    <article>
      <a
        ref={magneticRef}
        href={postUrl}
        className="group block p-5 rounded-lg hover:bg-hover-bg transition-colors duration-200 -mx-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Category and date */}
            <div className="flex items-center gap-3 mb-2">
              <CategoryBadge category={post.category} />
              <time dateTime={post.date} className="text-xs text-fg-muted">
                {formattedDate}
              </time>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-fg group-hover:text-accent transition-colors truncate">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-fg-muted mt-1 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div className="flex items-center gap-4 mt-2 text-xs text-fg-muted">
              <span>{post.readingTime}</span>
              <span className="flex items-center gap-1">
                {post.tags.slice(0, 3).map((tag, i) => (
                  <span key={tag}>
                    #{tag}
                    {i < Math.min(post.tags.length - 1, 2) && ","}
                  </span>
                ))}
              </span>
            </div>
          </div>

          {/* Arrow indicator */}
          <div className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-5 h-5 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </a>
    </article>
  );
}

interface CategoryBadgeProps {
  category: string;
}

function CategoryBadge({ category }: CategoryBadgeProps) {
  const normalizedCategory = category.toLowerCase().replace(/[^a-z]/g, "");
  const colors =
    theme.tagColors[normalizedCategory as keyof typeof theme.tagColors] ||
    theme.tagColors.default;

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {category}
    </span>
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
