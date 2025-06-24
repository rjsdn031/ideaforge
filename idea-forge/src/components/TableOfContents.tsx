'use client';

import { TocItem } from '@/types/tocItem';
import styles from '@/styles/TableOfContents.module.css';

const TableOfContents = ({ toc }: { toc: TocItem[] }) => {
  return (
    <nav className={styles.nav}>
      <ul>
        {toc.map(({ id, text, level }) => (
          <li key={id} className={styles[`indent-${level - 1}`]}>
            <a href={`#${id}`} className={styles.item}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;