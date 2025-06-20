import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID!;

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  thumbnailUrl?: string;
}

export const fetchNotionPosts = async (): Promise<PostMeta[]> => {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: 'publishedAt', direction: 'descending' }],
    filter: {
      property: 'private',
      checkbox: {
        equals: false,
      },
    },
  });

  return (response.results as PageObjectResponse[]).map((page) => {
    const { properties, cover } = page;

    const slug = properties['slug']?.type === 'rich_text'
      ? properties['slug'].rich_text?.[0]?.plain_text ?? ''
      : '';

    const title = properties['title']?.type === 'title'
      ? properties['title'].title?.[0]?.plain_text ?? 'Untitled'
      : 'Untitled';

    const date = properties['publishedAt']?.type === 'date'
      ? properties['publishedAt'].date?.start ?? ''
      : '';

    const tags = properties['tags']?.type === 'multi_select'
      ? properties['tags'].multi_select.map((t) => t.name)
      : [];

    const summary = properties['summary']?.type === 'rich_text'
      ? properties['summary'].rich_text?.[0]?.plain_text ?? ''
      : '';

    const isPrivate = {

    }

    let thumbnailUrl: string | undefined = undefined;
    if (cover?.type === 'external') {
      thumbnailUrl = cover.external.url;
    } else if (cover?.type === 'file') {
      thumbnailUrl = cover.file.url;
    }

    return { slug, title, date, tags, summary, thumbnailUrl };
  });
};
