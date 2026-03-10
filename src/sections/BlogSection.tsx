import { blogPosts } from "../config/site.config";
import { BlogPostItem } from "../components/BlogPostItem";

export function BlogSection() {
  const featuredPost = blogPosts.find((p) => p.featured);
  const otherPosts = blogPosts.filter((p) => !p.featured);

  return (
    <section id="blog" className="scroll-mt-24 min-h-screen">
      <header className="mb-4">
        <h2 className="text-4xl font-bold text-fg flex items-center gap-3">
          <svg className="w-7 h-7 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Blog
        </h2>
      </header>
      <hr className="border-border mb-4" />

      {/* Featured post */}
      {featuredPost && (
        <div className="mb-8">
          <BlogPostItem post={featuredPost} variant="featured" />
        </div>
      )}

      {/* Other posts */}
      {otherPosts.length > 0 && (
        <>
          {featuredPost && (
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-4 mt-12">
              All Posts
            </h3>
          )}
          <div>
            {otherPosts.map((post) => (
              <BlogPostItem key={post.id} post={post} variant="list" />
            ))}
          </div>
        </>
      )}

      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm text-fg-muted">
          More posts coming soon. Stay tuned!
        </p>
      </div>
    </section>
  );
}
