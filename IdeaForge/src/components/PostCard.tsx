import type { Post } from '../types/post';
import { Link } from 'react-router-dom';
import styles from '../styles/PostCard.module.css';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link to={`/posts/${post.slug}`} className={styles.card}>
      {post.thumbnailUrl && (
        <img src={post.thumbnailUrl} alt="post thumbnail" className={styles.thumbnail} />
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.summary}>{post.summary}</p>
        <div className={styles.footer}>
          <span className={styles.date}>{new Date(post.date).toLocaleDateString()}</span>
          <div className={styles.tags}>
            {post.tags.map(tag => (
              <span key={tag} className={styles.tag}>#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;