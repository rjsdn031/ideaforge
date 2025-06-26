'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-notion-x/src/styles.css';
import type { ExtendedRecordMap } from 'notion-types';
import { Code } from 'react-notion-x/build/third-party/code';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Pdf } from 'react-notion-x/build/third-party/pdf';

import styles from '../styles/PostBody.module.css';

const NotionRenderer = dynamic(
  () => import('react-notion-x').then((mod) => mod.NotionRenderer),
  { ssr: false }
);

interface PostBodyProps {
  recordMap: ExtendedRecordMap;
}

const PostBody = ({ recordMap }: PostBodyProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className={styles.wrapper}>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={isDarkMode}
        components={{
      Code,
      Collection,
      Equation,
      Modal,
      Pdf
    }}
      />
    </div>
  );
};

export default PostBody;
