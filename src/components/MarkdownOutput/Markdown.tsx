import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { getYoutubeVideoId } from '../../utils/getYoutubeVideoId';
import { AlertTypes, MarkdownAlert } from '../MarkdownComponents/Blockquote';
import { MarkdownCodeBlock } from '../MarkdownComponents/CodeBlock';
import { TabbedCodeBlocks } from '../MarkdownComponents/TabbedCodeBlock';

interface MarkdownProps {
  children: string;
}

export const Markdown = ({ children }: MarkdownProps): JSX.Element => {
  return (
    <div
      style={{ overflow: 'scroll' }}
      className="bg-primary-grey border-t-2 h-full overflow-hidden border-[#4b505f] px-5 pt-1 "
    >
      <ReactMarkdown
        rehypePlugins={[remarkGfm, rehypeRaw]}
        components={{
          div({ className, children, ...props }) {
            const aTypes = [
              'toolbar-note',
              'toolbar-tip',
              'toolbar-warning',
              'toolbar-caution',
            ];

            if (
              (props as unknown as { 'youtube-url': string })['youtube-url']
            ) {
              const videoID = getYoutubeVideoId(
                (props as unknown as { 'youtube-url': string })['youtube-url']
              );
              return (
                <div className="video-container">
                  <iframe
                    title={new Date().toString()}
                    src={`https://www.youtube.com/embed/${videoID}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              );
            }
            if (!className) return null;
            if (className === 'tabbed-code-blocks') {
              return (
                <TabbedCodeBlocks>
                  {String(children).replace(/\n$/, '')}
                </TabbedCodeBlocks>
              );
            }
            if (aTypes.includes(className)) {
              return (
                <MarkdownAlert type={className as AlertTypes} {...props}>
                  {children}
                </MarkdownAlert>
              );
            }
            return null;
          },
          code({ node, children, className, inline, ...props }) {
            return (
              <MarkdownCodeBlock
                inline={inline}
                className={className}
                node={node}
                {...props}
              >
                {children as string}
              </MarkdownCodeBlock>
            );
          },
          a({ children, className, href }) {
            return (
              <a
                rel="noreferrer"
                target={'_blank'}
                href={href}
                className={`${className} no-underline text-[#5d5dbe]`}
              >
                {children}
              </a>
            );
          },
          li({ children, className }) {
            return (
              <li className={`${className}  break-words my-0`}>{children}</li>
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
