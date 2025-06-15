export const revalidate = 60; // ISR

import { fetchPostBySlug } from '@/utils/server/fetchNotionPostBySlug';
import PostBody from '@/components/PostBody';
import { notFound } from 'next/navigation';
import { fetchAllSlugs } from '@/utils/server/fetchAllSlugs';

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs();

  return slugs.map((slug) => ({ slug }));
}

const PostDetailPage = async ({ params }: { params: { slug: string } }) => {
  const post = await fetchPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <PostBody content={post.content} />
    </div>
  );
};

export default PostDetailPage;