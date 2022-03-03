import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { BlockQuote } from '../../assets/icons/tabs';
import {
  AlertTypes,
  MarkdownAlert,
} from '../MarkdownComponents/Blockquote';

interface MarkdownProps {
  children: string;
}

export const Markdown = ({ children }: MarkdownProps): JSX.Element => {
  return (
    <div className="bg-black border-l-[1px] border-slate-700 px-5 py-1">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, remarkGfm]}
        components={{
          a({ children, className, href }) {
            return (
              <a
                target={'_blank'}
                href={href}
                className={`${className} no-underline text-[#0000EE]`}
              >
                {children}
              </a>
            );
          },
          li({ children }) {
            return <li className={`h-4 break-words my-0`}>{children}</li>;
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
          div({ className, children, ...props }) {
            const aTypes = [
              'toolbar-note',
              'toolbar-tip',
              'toolbar-warning',
              'toolbar-caution',
            ];
            if (!className) return null;
            if (aTypes.includes(className)) {
              return (
                <MarkdownAlert type={className as AlertTypes} {...props}>
                  {children}
                </MarkdownAlert>
              );
            }
            return null;
          },
        }}
        className="ReactMarkDown"
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
