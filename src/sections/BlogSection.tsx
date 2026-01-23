import { blogPosts } from "../config/site.config";
import { BlogPostItem } from "../components/BlogPostItem";

export function BlogSection() {
  const featuredPost = blogPosts.find((p) => p.featured);
  const otherPosts = blogPosts.filter((p) => !p.featured);

  return (
    <section id="blog" className="scroll-mt-24">
      {/* Section header */}
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-fg">Blog</h2>
        <div className="w-12 h-1 bg-accent rounded-full mt-3" />
        <p className="text-fg-muted mt-4">
          Thoughts on software engineering, design, and technology.
        </p>
      </header>

      {/* Featured post */}
      {featuredPost && (
        <div className="mb-8">
          <BlogPostItem post={featuredPost} variant="featured" />
        </div>
      )}

      {/* Other posts list */}
      {otherPosts.length > 0 && (
        <>
          {featuredPost && (
            <h3 className="text-sm font-semibold text-fg-muted uppercase tracking-wider mb-4 mt-12">
              All Posts
            </h3>
          )}
          <div className="divide-y divide-border">
            {otherPosts.map((post) => (
              <div key={post.id} className="py-2 first:pt-0 last:pb-0">
                <BlogPostItem post={post} variant="list" />
              </div>
            ))}
          </div>
        </>
      )}

      {/* View all posts CTA (for future expansion) */}
      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm text-fg-muted">
          More posts coming soon. Stay tuned!
        </p>
      </div>
    </section>
  );
}
