import PostCard from '@/components/PostCard';
import { fetchNotionPost } from '@/utils/server/fetchNotionPosts';
import type { Post } from '@/types/post';

const HomePage = async () => {
  const posts: Post[] = await fetchNotionPost();

  return (
    <section className="w-full max-w-4xl mx-auto p-4">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </section>
  );
};

export default HomePage;