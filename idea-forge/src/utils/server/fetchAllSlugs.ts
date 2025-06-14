import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID!;

export const fetchAllSlugs = async (): Promise<string[]> => {
  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: 100,
    filter: {
      property: 'slug',
      rich_text: { is_not_empty: true },
    },
  });

  return response.results.map(
    (page: any) => page.properties.slug.rich_text?.[0]?.plain_text
  ).filter(Boolean);
};