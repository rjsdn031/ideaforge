import { fetchPostBySlug } from '@/utils/server/fetchNotionPostBySlug';
import { notFound } from 'next/navigation';
import PostLayout from '@/components/PostLayout';
import { fetchAllSlugs } from '@/utils/server/fetchAllSlugs';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <div className="w-full max-w-4xl mx-auto px-0 sm:px-2 md:px-4">
      <PostLayout
        title={post.title}
        date={post.date}
        tags={post.tags}
        recordMap={post.recordMap}
      />
    </div>
  );
}