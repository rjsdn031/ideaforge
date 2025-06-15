import { fetchPostBySlug } from '@/utils/server/fetchNotionPostBySlug';
import { notFound } from 'next/navigation';
import PostBody from '@/components/PostBody';
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
  if (!post) notFound();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <PostBody content={post.content} />
    </div>
  );
}
