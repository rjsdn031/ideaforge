import { fetchPostBySlug } from '@/utils/fetchPosts';
import PostBody from '@/components/PostBody';
import { notFound } from 'next/navigation';

interface PostDetailPageProps {
  params: { slug: string };
}

const PostDetailPage: React.FC<PostDetailPageProps> = async ({ params }) => {
  const post = await fetchPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <PostBody content={post.content} />
    </div>
  );
};

export default PostDetailPage;