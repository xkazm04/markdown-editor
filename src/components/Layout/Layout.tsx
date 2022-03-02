import React, { useRef, useState } from 'react';
import { CodeMirrorEditor } from '../CodeMirror/CodeMirror';
import { Tabs } from '../EditingTabs/Tabs';
import { Markdown } from '../MarkdownOutput/Markdown';
import { Header } from './Header';

interface LayoutProps {
  children: string;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [markdownString, setMarkdownString] = useState('');
  const mirrorEditor = useRef<any>(null);

  const handleTextReplacement = (
    type: string,
    prefix: string,
    sufix: string
  ) => {
    const doc = mirrorEditor.current.getDoc();
    const cursor = doc.getCursor();
    const selectedText = doc.getSelection();
    let newText = prefix + selectedText + sufix;

    doc.replaceSelection(newText, cursor);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Tabs handleTextReplacement={handleTextReplacement} />
      <div className="grid grid-cols-[50%_50%] bg-blue-900 h-screen">
        <CodeMirrorEditor mirrorEditor={mirrorEditor} setMarkdownString={setMarkdownString} />
        <Markdown>{markdownString}</Markdown>
      </div>
    </div>
  );
};
