import React, { Dispatch, SetStateAction, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

interface CodeMirrorEditorProps {
  setMarkdownString: Dispatch<SetStateAction<string>>;
  mirrorEditor: React.MutableRefObject<any>;
}

export const CodeMirrorEditor = ({
  setMarkdownString,
  mirrorEditor,
}: CodeMirrorEditorProps): JSX.Element => {
  const [mirrorValue, setMirrorValue] = useState('');
  return (
    <div className="max-h-full h-full">
      <CodeMirror
        editorDidMount={(editor) => (mirrorEditor.current = editor)}
        className="border-r-2 border-t-2  h-auto p-4 text-black border-sections_border "
        options={{
          // lineNumbers: true,,
          lineWrapping: true,
          mode: {
            highlightFormatting: true,
          },
        }}
        value={mirrorValue}
        onBeforeChange={(editor, data, value) => {
          setMirrorValue(value);
          setMarkdownString(value);
        }}
      />
    </div>
  );
};
