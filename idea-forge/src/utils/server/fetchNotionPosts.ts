import { Client } from '@notionhq/client';
import type {
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

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

  return (response.results as PageObjectResponse[])
    .map((page) => {
      const { properties } = page;

      const slugProp = properties['slug'];
      const slug = slugProp?.type === 'rich_text'
        ? slugProp.rich_text?.[0]?.plain_text ?? ''
        : '';

      const titleProp = properties['title'];
      const title = titleProp?.type === 'title'
        ? titleProp.title?.[0]?.plain_text ?? 'Untitled'
        : 'Untitled';

      const dateProp = properties['date'];
      const date = dateProp?.type === 'date'
        ? dateProp.date?.start ?? ''
        : '';

      const tagsProp = properties['tags'];
      const tags = tagsProp?.type === 'multi_select'
        ? tagsProp.multi_select.map((t) => t.name)
        : [];

      const summaryProp = properties['summary'];
      const summary = summaryProp?.type === 'rich_text'
        ? summaryProp.rich_text?.[0]?.plain_text ?? ''
        : '';

      return { slug, title, date, tags, summary };
    });
};