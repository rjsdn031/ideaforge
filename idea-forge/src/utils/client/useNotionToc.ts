import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const useNotionToc = () => {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
        .filter((el): el is HTMLElement => el instanceof HTMLElement)
        .filter(el => el.id && el.id.trim() !== '')
        .map(el => ({
          id: el.id,
          text: el.innerText,
          level: Number(el.tagName[1]),
        }));

      setToc(headings);
      console.log('🧭 TOC 수집됨:', headings);
    }, 500); // 필요에 따라 1000으로 늘려도 OK

    return () => clearTimeout(timeout);
  }, []);

  return toc;
};