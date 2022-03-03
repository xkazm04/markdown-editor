import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  NoteIcon,
  WarningIcon,
  TipIcon,
  CautionIcon,
} from '../../assets/icons/blockquote';
import { MarkdownCodeBlock } from './CodeBlock';

export type AlertTypes =
  | 'toolbar-note'
  | 'toolbar-tip'
  | 'toolbar-warning'
  | 'toolbar-caution';

interface MarkdownAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type: AlertTypes;
}

export const MarkdownAlert = ({ children, type }: MarkdownAlertProps) => {
  const CurrentIcon = icon[type];

  return (
    <div
      className={` ${classes['border'][type]} border-2 rounded-lg bg-[white] shadow-toolbox     my-4 py-2`}
    >
      <div className={`flex flex-col md:flex-row my-5`}>
        <div className={`flex pl-4 items-center toolbar-warning `}>
          <div className="self-start">
            <CurrentIcon />
          </div>
          <span
            className={`typ-subtitle-l block md:hidden ml-4 ${classes.title[type]}`}
          >
            {title[type]}
          </span>
        </div>
        <div className="px-5 w-full">
          <span
            className={`typ-subtitle-l hidden text-black md:block ${classes.title[type]}`}
          >
            {title[type]}
          </span>
          <div className="pt-4 text-black ">
            <ReactMarkdown
              components={{
                code({ node, children, inline, ...props }) {
                  return (
                    <MarkdownCodeBlock
                      inline={inline}
                      className={`${classes.title[type]}  `}
                      node={node}
                      inlineColor={'text-red-400'}
                      {...props}
                    >
                      {children as string}
                    </MarkdownCodeBlock>
                  );
                },
              }}
            >
              {String(children).replace(/\n$/, '')}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

const icon = {
  'toolbar-note': NoteIcon,
  'toolbar-tip': TipIcon,
  'toolbar-warning': WarningIcon,
  'toolbar-caution': CautionIcon,
};

const classes = {
  bg: {
    'toolbar-note': 'bg-note-100',
    'toolbar-tip': 'bg-green-50',
    'toolbar-warning': 'bg-warning-100',
    'toolbar-caution': 'bg-caution-100',
  },
  title: {
    'toolbar-note': 'text-note-300',
    'toolbar-tip': 'text-green-600',
    'toolbar-warning': 'text-warning-300',
    'toolbar-caution': 'text-caution-200',
  },
  border: {
    'toolbar-note': 'border-purple-700',
    'toolbar-tip': 'border-green-600',
    'toolbar-warning': 'border-error-300',
    'toolbar-caution': 'border-warning-200',
  },
};

const title = {
  'toolbar-note': 'Note',
  'toolbar-tip': 'Tip',
  'toolbar-warning': 'Warning',
  'toolbar-caution': 'Caution',
};
