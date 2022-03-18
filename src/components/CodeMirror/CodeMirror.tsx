import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { CurrentMarkdownType } from '../../App';

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
    <div className="max-h-full h-full overflow-hidden">
      <CodeMirror
        editorDidMount={(editor) => {
          editor.addKeyMap({
            'Ctrl-B': function (cm) {
              const selectedText = cm.getSelection();
              const cursor = cm.getCursor();
              // addds bold font
              const newText = '**' + selectedText + '**';
              cm.replaceSelection(newText, cursor as unknown as string);
            },
            'Ctrl-I': function (cm) {
              const selectedText = cm.getSelection();
              const cursor = cm.getCursor();
              // adds italic font
              const newText = '*' + selectedText + '*';
              cm.replaceSelection(newText, cursor as unknown as string);
            },
          });
          mirrorEditor.current = editor;
        }}
        className="border-r-2 border-t-2 h-full text-black border-sections_border no-scrollbar"
        options={{
          lineWrapping: true,
          mode: 'markdown',
        }}
        value={mirrorValue}
        onBeforeChange={(_, __, value) => {
          setMirrorValue(value);
          setMarkdown((prev) => ({ ...prev, text: value }));
        }}
      />
    </div>
  );
};
