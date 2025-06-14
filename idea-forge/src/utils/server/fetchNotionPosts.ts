import { Client } from '@notionhq/client';
import type { Post } from '@/types/post';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export const fetchNotionPost = async (): Promise<Post[]> => {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: 'date', direction: 'descending' }], // 실제 날짜 속성명으로
  });

  return response.results.map((page: any) => ({
    slug: page.properties.slug?.rich_text?.[0]?.plain_text || '',
    title: page.properties.title?.title?.[0]?.plain_text || '',
    date: page.properties.date?.date?.start || '',
    tags: page.properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
    summary: page.properties.summary?.rich_text?.[0]?.plain_text || '',
  }));
};