import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID!;

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
}

export const fetchNotionPosts = async (): Promise<PostMeta[]> => {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: 'date', direction: 'descending' }],
  });

  return response.results.map((page: any) => ({
    slug: page.properties.slug?.rich_text?.[0]?.plain_text || '',
    title: page.properties.title?.title?.[0]?.plain_text || 'Untitled',
    date: page.properties.date?.date?.start || '',
    tags: page.properties.tags?.multi_select?.map((t: any) => t.name) || [],
    summary: page.properties.summary?.rich_text?.[0]?.plain_text || '',
  }));
};