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
    <div className="">
      <CodeMirror
        editorDidMount={(editor) =>  (mirrorEditor.current = editor)}
        className="border-2 bg-indigo-900 h-auto text-black border-black "
        options={{
          lineNumbers: true,
          mode: 'javascript',
          
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
