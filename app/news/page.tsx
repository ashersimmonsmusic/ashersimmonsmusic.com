import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/container";
import { formatDate } from "@/lib/utils";
import { getPosts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "News",
  description: "Releases, shows and what Asher Simmons is working on.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <Container className="py-16 md:py-24">
      <Eyebrow>News</Eyebrow>
      <h1 className="font-display mt-4 text-5xl leading-[0.95] font-medium tracking-tight md:text-7xl">
        What&rsquo;s happening
      </h1>

      {posts.length === 0 ? (
        <p className="mt-12 max-w-xl text-lg text-paper-dim">Nothing posted yet. Check back soon.</p>
      ) : (
        <ul className="mt-16 max-w-2xl">
          {posts.map((post) => (
            <li key={post._id} className="border-paper-dim/20 border-t py-8 first:border-t-0 first:pt-0">
              <article>
                <p className="font-mono-label text-paper-dim">{formatDate(post.publishedAt)}</p>
                <h2 className="font-display mt-3 text-3xl font-medium tracking-tight md:text-4xl">
                  <Link href={`/news/${post.slug}`} className="transition-colors hover:text-paper-dim">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && <p className="mt-4 text-lg text-paper-dim">{post.excerpt}</p>}
              </article>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
