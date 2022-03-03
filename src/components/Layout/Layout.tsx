import React, { useRef, useState } from 'react';
import { CodeMirrorEditor } from '../CodeMirror/CodeMirror';
import { Tabs } from '../EditingTabs/Tabs';
import { Markdown } from '../MarkdownOutput/Markdown';
import { Header } from './Header';

interface LayoutProps {
  children: string;
}

// one
// two
// three

export const Layout = ({}: LayoutProps): JSX.Element => {
  const [markdownString, setMarkdownString] = useState('');
  const mirrorEditor = useRef<any>(null);

  const handleTextReplacement = (
    type: string,
    prefix: string,
    sufix: string
  ) => {
    const doc = mirrorEditor.current.getDoc();
    const cursor = doc.getCursor();
    
    if (type === 'unordered list') {
      const listSelection = doc.listSelections();

      const startingLine = listSelection[0].anchor.line;
      const endingLine = listSelection[0].head.line;

      const lines: any[] = [];

      for (let i = startingLine; i < endingLine + 1; i++) {
        const lineText = doc.getLineHandle(i).text;
        const emptyLineText = lineText.trim();
        const newLine = emptyLineText ? prefix + lineText : lineText;
        lines.push(newLine);
      }

      const newLines = lines.join('\n');
      const lastLine = lines[lines.length - 1];
      const lastLineTextCH = lastLine.length;

      doc.replaceRange(
        newLines,
        { line: startingLine, ch: 0 },
        { line: endingLine, ch: lastLineTextCH }
      );
      return;
    }

    const selectedText = doc.getSelection();
    let newText = prefix + selectedText + sufix;

    doc.replaceSelection(newText, cursor);
    mirrorEditor.current.focus();
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Tabs handleTextReplacement={handleTextReplacement} />
      <div className="grid grid-cols-[50%_50%] bg-blue-900 h-screen">
        <CodeMirrorEditor
          mirrorEditor={mirrorEditor}
          setMarkdownString={setMarkdownString}
        />
        <Markdown>{markdownString}</Markdown>
      </div>
    </div>
  );
};
