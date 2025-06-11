import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostBySlug } from '../../utils/fetchPosts';
import PostBody from '../../components/PostBody';

const PostDetail = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;

    fetchPostBySlug(slug)
      .then(res => {
        setContent(res.content);
        setLoading(false);
      })
      .catch(err => {
        setError(`포스트를 불러오는 데 실패했습니다, ${err}`);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="p-4">불러오는 중...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <PostBody content={content} />
    </div>
  );
};

export default PostDetail;
