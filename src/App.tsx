import React, { useEffect, useRef, useState } from 'react';
import { CodeMirrorEditor } from './components/CodeMirror/CodeMirror';
import { Header } from './components/Layout/Header';
import { SideBar } from './components/Layout/SideBar';
import { Markdown } from './components/MarkdownOutput/Markdown';
import { Notification } from './components/Notification/Notification';
import { Toolbar } from './components/Toolbar/Toolbar';
import {
  NotificationContext,
  useNotificationProvider,
} from './provider/NotificationProvider';

export interface CurrentMarkdownType {
  id: number | null;
  text: string;
  collection: string;
}

export const App = (): JSX.Element => {
  const notificationStore = useNotificationProvider();
  const [markdown, setMarkdown] = useState<CurrentMarkdownType>({
    id: null,
    text: '',
    collection: '',
  });
  const mirrorEditor = useRef<any>(null);

  useEffect(() => {
    const selectedText = mirrorEditor.current.getDoc().getSelection();
  }, []);

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

  useEffect(() => {
    const data = localStorage.getItem('lastEditingMarkdown') || '';
    if (data) {
      const lastEditingMarkdown: CurrentMarkdownType = JSON.parse(data);
      setMarkdown((prev) => ({ ...prev, ...lastEditingMarkdown }));
    }
  }, []);

  return (
    <NotificationContext.Provider value={notificationStore}>
      <div className="max-h-screen h-screen grid grid-rows-[56px_1fr] no-scrollbar">
        <Header />
        <div className="grid  grid-cols-[20%_40%_40%] xl:grid-cols-[20%_40%_40%] w-screen max-h-[calc(100vh-56px)]">
          <SideBar markdown={markdown} setMarkdown={setMarkdown} />
          <div className="max-h-full h-full grid grid-rows-[56px_1fr]  ">
            <Toolbar handleTextReplacement={handleTextReplacement} />
            <CodeMirrorEditor
              markdownString={markdown.text}
              mirrorEditor={mirrorEditor}
              setMarkdown={setMarkdown}
            />
          </div>
            <Markdown>{markdown.text}</Markdown>
        </div>
      </div>
      <Notification />
    </NotificationContext.Provider>
  );
};

export default App;
