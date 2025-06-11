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
    <div>
      <main className="main">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </main>
    </div>
  );
};

export default MainPage;