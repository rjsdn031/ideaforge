import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import type { Post } from '../types/post';
import { fetchPosts } from '../utils/fetchPosts';

const MainPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  return (
    <section className="w-full max-w-4xl mx-auto p-4">
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </section>
  );
};

export default MainPage;