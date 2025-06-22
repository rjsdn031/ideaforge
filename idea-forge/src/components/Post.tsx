import PostHeader from './PostHeader';
import PostBody from './PostBody';
import type { ExtendedRecordMap } from 'notion-types';

interface PostProps {
  title: string;
  date?: string;
  tags?: string[];
  recordMap: ExtendedRecordMap;
}

const Post = ({ title, date, tags, recordMap }: PostProps) => {
  return (
    <article>
      <PostHeader title={title} date={date} tags={tags} />
      <PostBody recordMap={recordMap} />
    </article>
  );
};

export default Post;