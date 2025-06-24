'use client';

import { useNotionToc } from '@/utils/client/useNotionToc';
import TableOfContents from './TableOfContents';
import Post from './Post';
import type { ExtendedRecordMap } from 'notion-types';
import styles from '@/styles/PostHeader.module.css';

interface PostLayoutProps {
	title: string;
	date?: string;
	tags?: string[];
	recordMap: ExtendedRecordMap;
}

const PostLayout = ({ title, date, tags, recordMap }: PostLayoutProps) => {
	const toc = useNotionToc();
	
	return (
		<div className={styles.wrapper}>
			<main className={styles.main}>
				<Post title={title} date={date} tags={tags} recordMap={recordMap} />
			</main>
			<aside className={styles.aside}>
				<TableOfContents toc={toc} />
			</aside>
		</div>
	);
};

export default PostLayout;