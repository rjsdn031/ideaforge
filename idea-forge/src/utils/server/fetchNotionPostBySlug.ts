import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

export const fetchPostBySlug = async (slug: string): Promise<{ content: string }> => {
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
  if (!page) throw new Error(`No post found for slug: ${slug}`);

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const markdown = n2m.toMarkdownString(mdBlocks);
  const content = markdown.parent;

  return { content };
};