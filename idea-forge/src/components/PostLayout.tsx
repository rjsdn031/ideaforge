'use client';

import { useNotionToc } from '@/utils/client/useNotionToc';
import TableOfContents from './TableOfContents';
import Post from './Post';
import type { ExtendedRecordMap } from 'notion-types';

interface PostLayoutProps {
	title: string;
	date?: string;
	tags?: string[];
	recordMap: ExtendedRecordMap;
}

const PostLayout = ({ title, date, tags, recordMap }: PostLayoutProps) => {
	console.log("test")
	const toc = useNotionToc();
	console.log(`toc: ${toc}`)
	return (
		<div className="relative w-full flex justify-center">
			<main className="w-full max-w-3xl px-4">
				<Post title={title} date={date} tags={tags} recordMap={recordMap} />
			</main>
			<aside className="hidden lg:block w-64 absolute top-0 right-4 sticky h-[calc(100vh-6rem)] overflow-y-auto">
				<TableOfContents toc={toc} />
			</aside>
		</div>
	);
};

export default PostLayout;