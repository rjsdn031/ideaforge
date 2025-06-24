'use client';

import styles from '../styles/PostHeader.module.css';
import Tag from './Tag';

interface PostHeaderProps {
  title: string;
  date?: string;
  tags?: string[];
}

const PostHeader = ({ title, date, tags = [] }: PostHeaderProps) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>

       <div className={styles.meta}>
        {date && <span>{date}</span>}
        {tags.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>
    </div>
  );
};

export default PostHeader;
