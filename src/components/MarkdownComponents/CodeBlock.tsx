import React, { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { copyToClipboard } from '../../utils/copyToClipboard';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    node?: string;
  }
}

interface MarkdownCodeBlockProps {
  inline: boolean | undefined;
  node: string;
  className: string | undefined;
  children: string;
  inlineColor?: string;
}



export const MarkdownCodeBlock = ({
  inline,
  node,
  className,
  children,
  inlineColor,
  ...props
}: MarkdownCodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  const codeSnippet = String(children).replace(/\n$/, '');
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <div className="relative flex justify-between text-xs md:text-sm not-prose">
      <div className="highlighted-codeblock">
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {codeSnippet}
        </SyntaxHighlighter>
      </div>
      <span
        onClick={() =>
          copyToClipboard(codeSnippet, () => {
            setCopied(true);
          })
        }
        className="text-[white] block cursor-pointer px-2 typ-body-s border-l-purple-50 "
      >
        {copied ? 'Copied' : 'Copy'}
      </span>
    </div>
  ) : (
    <code className={`${className}  ${inlineColor}`} node={node} {...props}>
      {children}
    </code>
  );
};
