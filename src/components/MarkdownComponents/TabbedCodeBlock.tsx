import React, { ReactElement, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Parser } from 'commonmark';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ReactRenderer from 'commonmark-react-renderer';
import { copyToClipboard } from '../../utils/copyToClipboard';

interface TabbedCodeBlocksProps {
  children: string;
}

// eslint-disable-next-line react/display-name
export const TabbedCodeBlocks = React.memo(
  ({ children }: TabbedCodeBlocksProps) => {
    const [tabs, setTabs] = useState<{ language: string; code: string }[]>([]);
    const [activeTab, setActiveTab] = useState<{
      language: string;
      code: string;
    } | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      if (copied) {
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    }, [copied]);

    useEffect(() => {
      const parser = new Parser();
      const renderer = new ReactRenderer();
      const ast = parser.parse(children);
      const result = renderer.render(ast) as ReactElement[];
      const tabs = result.map((tab) => ({
        language: tab.props?.codeinfo?.join(' '),
        code: tab.props.literal,
      }));
      setTabs(tabs);
    }, [children]);

    useEffect(() => {
      if (tabs && !activeTab) {
        setActiveTab(tabs[0]);
      }
    }, [tabs, activeTab]);

    const initialCode = (activeTab: { language: string; code: string }) => {
      const str = `${'```'}${activeTab.language}
${activeTab.code}${'```'}`;
      return str;
    };

    return (
      <div className="bg-code-block rounded-md my-4">
        <div className="flex justify-between items-center">
          <div className="tabs flex justify-start  items-center py-1 border-b-purple-50">
            {tabs.map((tab, index) => {
              return (
                <span
                  key={index}
                  onClick={() => setActiveTab(tab)}
                  className={`tab tab-bordered  typ-body-s self-center ${
                    activeTab?.language === tab.language
                      ? 'tab-active'
                      : 'tab-inactive'
                  } text-purple-100`}
                >
                  {tab.language}
                </span>
              );
            })}
          </div>
          {activeTab?.code && (
            <div
              onClick={() =>
                copyToClipboard(activeTab?.code, () => setCopied(true))
              }
              className={`text-[white] typ-body-s px-4  cursor-pointer`}
            >
              {copied ? 'Copied' : 'Copy'}
            </div>
          )}
        </div>
        <div className="tabbed-codeblock">
          {activeTab && (
            <ReactMarkdown
              components={{
                code({ inline, node, className, children, ...props }) {
                  return !inline ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={'js'}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} node={node} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {initialCode(activeTab)}
            </ReactMarkdown>
          )}
        </div>
      </div>
    );
  }
);
