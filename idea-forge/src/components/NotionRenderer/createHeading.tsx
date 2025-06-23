import React from 'react';

const createHeading = (level: 1 | 2 | 3) => {
  return ({ block, children }: { block: any; children: React.ReactNode }) => {
    const text = block?.properties?.title?.[0]?.[0] ?? 'heading';
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');

    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
      <Tag id={id} className="notion-heading">
        {children}
      </Tag>
    );
  };
};

export default createHeading;