import React, { useRef, useState } from 'react';
import { CodeMirrorEditor } from '../CodeMirror/CodeMirror';
import { Toolbar } from '../Toolbar/Toolbar';
import { Markdown } from '../MarkdownOutput/Markdown';
import { Header } from './Header';

interface LayoutProps {
  children: string;
}

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

    if (type === 'unordered list' || type === 'ordered list') {
      const listSelection = doc.listSelections();

      const startingLine = listSelection[0].anchor.line;
      const endingLine = listSelection[0].head.line;

      const lines: any[] = [];

      let lineCount = 1;

      for (let i = startingLine; i < endingLine + 1; i++) {
        const lineText = doc.getLineHandle(i).text;
        const emptyLineText = lineText.trim();
        let newLine;
        if (type === 'unordered list') {
          newLine = emptyLineText ? sufix + lineText : lineText;
        }
        if (type === 'ordered list') {
          newLine = emptyLineText ? `${lineCount}. ` + lineText : lineText;
          lineCount += 1;
        }

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
    <div className="h-screen grid grid-rows-[80px_56px_1fr]">
      <Header />
      <Toolbar handleTextReplacement={handleTextReplacement} />
      <div className="grid grid-cols-[50%_50%] w-screen bg-primary-grey max-h-full h-full overflow-hidden">
        <CodeMirrorEditor
          mirrorEditor={mirrorEditor}
          setMarkdownString={setMarkdownString}
        />
        <Markdown>{markdownString}</Markdown>
      </div>
    </div>
  );
};
