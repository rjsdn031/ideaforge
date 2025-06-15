import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

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

  return (response.results as PageObjectResponse[])
    .map((page) => {
      const prop = page.properties['slug'];
      if (
        prop?.type === 'rich_text' &&
        prop.rich_text.length > 0
      ) {
        return prop.rich_text[0].plain_text;
      }
      return null;
    })
    .filter(Boolean) as string[];
};