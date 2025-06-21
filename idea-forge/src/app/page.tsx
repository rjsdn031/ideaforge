import { fetchNotionPosts } from '@/utils/server/fetchNotionPosts';
import PostCard from '@/components/PostCard';

export const revalidate = 60;

const HomePage = async () => {
  const posts = await fetchNotionPosts();

  return (
    <section className="w-full max-w-4xl mx-auto px-0 sm:px-2 md:px-4">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </section>
  );
};

export default HomePage;