'use client';

import dynamic from 'next/dynamic';
import 'react-notion-x/src/styles.css';
import type { ExtendedRecordMap } from 'notion-types';
import { Code } from 'react-notion-x/build/third-party/code';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';

import styles from '../styles/PostBody.module.css';

const NotionRenderer = dynamic(
  () => import('react-notion-x').then((mod) => mod.NotionRenderer),
  { ssr: false }
);

interface PostBodyProps {
  recordMap: ExtendedRecordMap;
}

const PostBody = ({ recordMap }: PostBodyProps) => {
  return (
    <div className={styles.wrapper}>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        components={{ Code, Equation, Modal }}
      />
    </div>
  );
};

export default PostBody;
