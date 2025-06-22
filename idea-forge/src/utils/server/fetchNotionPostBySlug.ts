import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import type { ExtendedRecordMap } from 'notion-types';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const notionX = new NotionAPI();

const extractSchemaMappedValue = (
  recordMap: ExtendedRecordMap,
  matchName: string
): { id: string; value: any } | null => {
  const collection = Object.values(recordMap.collection ?? {})[0]?.value;
  const schema = collection?.schema;
  if (!schema) return null;

  const entry = Object.entries(schema).find(
    ([_, val]) => val.name.toLowerCase() === matchName.toLowerCase()
  );
  if (!entry) return null;

  const [id] = entry;

  const pageBlock = Object.values(recordMap.block).find(
    (block: any) => block.value?.type === 'page'
  );
  if (!pageBlock) return null;

  const rawValue = pageBlock.value.properties?.[id];

  return { id, value: rawValue };
};

export const fetchPostBySlug = async (
  slug: string
): Promise<{
  recordMap: ExtendedRecordMap;
  title: string;
  date?: string;
  tags: string[];
} | null> => {
  const dbId = process.env.NOTION_DATABASE_ID!;
  const query = await notion.databases.query({
    database_id: dbId,
    filter: {
      property: 'slug',
      rich_text: {
        equals: slug,
      },
    },
  });

  const page = query.results[0];
  if (!page || !('id' in page)) {
    console.warn(`No page found for slug "${slug}"`);
    return null;
  }

  const pageId = page.id.replace(/-/g, '');
  const recordMap = await notionX.getPage(pageId);
  const block = recordMap.block[Object.keys(recordMap.block)[0]];
  const title =
    block.value.properties?.title?.[0]?.[0] ?? '제목 없음';

  const dateRaw = extractSchemaMappedValue(recordMap, 'publishedAt');
  const tagsRaw = extractSchemaMappedValue(recordMap, 'tags');

  // console.log(dateRaw?.value?.[0]?.[1]?.[0]?.[1].start_date);
  const date =
    (dateRaw?.value?.[0]?.[1]?.[0]?.[1].start_date)
      ? new Date(
        dateRaw?.value?.[0]?.[1]?.[0]?.[1].start_date
      ).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      : undefined;

  // console.log(date);
  const tags = Array.isArray(tagsRaw?.value)
    ? tagsRaw.value
      .flat()
      .flatMap((v: string) => v.split(',')) // split
      .map((tag) => tag.trim())
    : [];

  return {
    recordMap,
    title,
    date,
    tags,
  };
};
