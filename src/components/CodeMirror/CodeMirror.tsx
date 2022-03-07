import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { CurrentMarkdownType } from '../Layout/Layout';

interface CodeMirrorEditorProps {
  setMarkdown: React.Dispatch<React.SetStateAction<CurrentMarkdownType>>;
  mirrorEditor: React.MutableRefObject<any>;
  markdownString: string;
}

export const CodeMirrorEditor = ({
  setMarkdown,
  mirrorEditor,
  markdownString,
}: CodeMirrorEditorProps): JSX.Element => {
  const [mirrorValue, setMirrorValue] = useState(markdownString);

  useEffect(() => {
    setMirrorValue(markdownString);
  }, [markdownString]);

  return (
    <div className="max-h-full h-full">
      <CodeMirror
        editorDidMount={(editor) => {
          mirrorEditor.current = editor;
        }}
        className="border-r-2 border-t-2  h-auto p-4 text-black border-sections_border "
        options={{
          lineWrapping: true,
          mode: 'markdown',
        }}
        value={mirrorValue}
        onBeforeChange={(editor, data, value) => {
          setMirrorValue(value);
          setMarkdown((prev) => ({ ...prev, text: value }));
        }}
      />
    </div>
  );
};
