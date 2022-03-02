import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  children: string;
}

export const Markdown = ({ children }: MarkdownProps): JSX.Element => {
  return (
    <div className="bg-black border-l-[1px] border-slate-700 px-5">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, remarkGfm]}
        components={{
          a({ children, className, href }) {
            return (
              <a
                href={href}
                className={`${className} no-underline text-[#0000EE]`}
              >
                {children}
              </a>
            );
          },
          li({ children, className }) {
            return (
              <li className={`${className} break-words my-1`}>{children}</li>
            );
          },
          h1: ({ children, ...props }) => {
            return <h1 {...props}>{children}</h1>;
          },
          h2: ({ children, ...props }) => {
            return <h2 {...props}>{children}</h2>;
          },
          h3: ({ children, ...props }) => {
            return <h3 {...props}>{children}</h3>;
          },
        }}
        className="ReactMarkDown"
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
