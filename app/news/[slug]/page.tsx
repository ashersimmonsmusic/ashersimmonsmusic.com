import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/ui/container";
import { PortableText } from "@/components/news/portable-text";
import { formatDate } from "@/lib/utils";
import { getPostBySlug, getPosts } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage?.url ? [{ url: post.coverImage.url }] : undefined,
    },
  };
}

export default async function NewsPostPage(props: PageProps<"/news/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Container className="py-16 md:py-24">
      <article className="max-w-2xl">
        <Eyebrow>{formatDate(post.publishedAt)}</Eyebrow>
        <h1 className="font-display mt-4 text-4xl leading-[1.05] font-medium tracking-tight md:text-6xl">
          {post.title}
        </h1>

        {post.coverImage?.url && (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            width={1200}
            height={800}
            className="mt-10 w-full rounded-sm object-cover"
            sizes="(min-width: 768px) 42rem, 100vw"
            priority
          />
        )}

        <PortableText blocks={post.body} />

        <Link href="/news" className="font-mono-label mt-16 inline-block text-paper-dim hover:text-paper">
          ← All news
        </Link>
      </article>
    </Container>
  );
}
