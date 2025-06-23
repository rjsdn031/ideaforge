import { TocItem } from '@/types/tocItem';

const TableOfContents = ({ toc }: { toc: TocItem[] }) => {
  return (
    <nav className="text-sm leading-relaxed">
      <ul>
        {toc.map(({ id, text, level }) => (
          <li key={id} className={`ml-${(level - 1) * 4}`}>
            <a href={`#${id}`} className="hover:underline block py-1">
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;