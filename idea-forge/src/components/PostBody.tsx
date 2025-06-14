import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function PostBody({ content }: { content: string }) {
  return (
    <article className="prose prose-neutral dark:prose-invert">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}