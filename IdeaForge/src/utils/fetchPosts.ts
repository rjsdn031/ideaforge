import type { Post } from '../types/post';
import mockData from '../data/mockPosts.json';

export const fetchPosts = async (): Promise<Post[]> => {
  // 실제로는 API 호출
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData);
    }, 300); // 로딩 감지용 지연
  });
};

export const fetchPostBySlug = async (slug: string): Promise<{ content: string }> => {
  const path = `/posts/${slug}.md`;
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`포스트를 불러오지 못했습니다: ${slug}`);
  }
  const content = await res.text();
  return { content };
};