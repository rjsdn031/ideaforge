import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import type { ExtendedRecordMap } from 'notion-types';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const notionX = new NotionAPI();

export const fetchPostBySlug = async (
  slug: string
): Promise<{ recordMap: ExtendedRecordMap } | null> => {
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
    console.warn(`❌ No page found for slug "${slug}"`);
    return null;
  }

  const pageId = page.id.replace(/-/g, '');
  const recordMap = await notionX.getPage(pageId);

  return { recordMap };
};