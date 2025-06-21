'use client';

import dynamic from 'next/dynamic';
import 'react-notion-x/src/styles.css';
import type { ExtendedRecordMap } from 'notion-types';
import { Code } from 'react-notion-x/build/third-party/code';
// import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';

const NotionRenderer = dynamic(
  () => import('react-notion-x').then((mod) => mod.NotionRenderer),
  { ssr: false }
);

interface PostBodyProps {
  recordMap: ExtendedRecordMap;
  title: string;
  date?: string;
  tags?: string[];
}

const PostBody = ({ recordMap, title, date, tags = [] }: PostBodyProps): JSX.Element => {
  return (
    <article className="notion-render max-w-4xl mx-auto px-0 sm:px-4 md:px-8 py-4">
      <h1 className="text-3xl font-bold mb-2 px-4">{title}</h1>

      <div className="text-sm text-gray-500 mb-6 px-4 flex flex-wrap gap-2 items-center">
        {date && <span className='date'>{date}</span>}
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        components={{
          Code,
          Equation,
          Modal,
        }}
      />
    </article>
  );
};

export default PostBody;
