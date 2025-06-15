'use client';

import dynamic from 'next/dynamic';
import 'react-notion-x/src/styles.css';
import type { ExtendedRecordMap } from 'notion-types';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';

const NotionRenderer = dynamic(
  () => import('react-notion-x').then((mod) => mod.NotionRenderer),
  { ssr: false }
);

interface PostBodyProps {
  recordMap: ExtendedRecordMap;
}

const extractTitle = (recordMap: ExtendedRecordMap): string => {
  const pageBlock = recordMap.block[Object.keys(recordMap.block)[0]];
  return pageBlock.value.properties?.title?.[0]?.[0] ?? '제목 없음';
};

const extractDate = (recordMap: ExtendedRecordMap): string | null => {
  const pageBlock = recordMap.block[Object.keys(recordMap.block)[0]];
  const props = pageBlock.value.properties;

  const raw =
    props?.작성일?.[0]?.[1]?.start || // 날짜 속성이 Date 타입일 때
    props?.작성일?.[0]?.[0]; // 그냥 텍스트일 때

  if (!raw) return null;

  const date = new Date(raw);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const PostBody = ({ recordMap }: PostBodyProps): JSX.Element => {
  const title = extractTitle(recordMap);
  const date = extractDate(recordMap);

  return (
    <article className="notion-render max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {date && <p className="text-sm text-gray-400 mb-6">작성일: {date}</p>}
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
        }}
      />
    </article>
  );
};

export default PostBody;
