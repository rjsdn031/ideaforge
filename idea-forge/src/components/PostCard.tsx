import type { Post } from '../types/post';
import Link from 'next/link';
import styles from '../styles/PostCard.module.css';
import Tag from './Tag';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/posts/${post.slug}`} className={styles.card}>
      {post.thumbnailUrl && (
        <img src={post.thumbnailUrl} alt="post thumbnail" className={styles.thumbnail} />
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.summary}>{post.summary}</p>
        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
        <div className={styles.footer}>
          <span>{new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          {/* 원하는 경우 댓글 수, 좋아요 수 등도 추가 가능 */}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
