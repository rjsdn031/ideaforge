import type { Post } from '../types/post';
import mockData from '../data/mockPosts.json';

export const fetchPosts = async (): Promise<Post[]> => {
  // 실제로는 API 호출을 할 수도 있음
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData);
    }, 300); // 로딩 감지용 지연
  });
};