import getFormattedDate from "@/lib/getFormattedDate";
import { getBlogPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map(async (post) => ({
    slug: (await post).slug,
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find(
    async (post) => (await post).slug === params.slug
  );

  if (!post) {
    notFound();
  }

  return (
    <>
      <main>
        <h1 className="title font-semibold text-2xl tracking-tighter">
          {(await post).metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {getFormattedDate((await post).metadata.publishedAt)}
          </p>
        </div>

        <article
          className="prose prose-slate"
          dangerouslySetInnerHTML={{ __html: (await post).content }}
        ></article>
        <Link href="/">← Back to home</Link>
      </main>
    </>
  );
}
