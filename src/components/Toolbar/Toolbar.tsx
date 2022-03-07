import React from 'react';
import {
  BlockQuote,
  Blockquote,
  BoldIcon,
  CodeIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  H4Icon,
  H5Icon,
  H6Icon,
  HeadingIcon,
  ImageIcon,
  InfoIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  OrderedListIcon,
  StrikeThrough,
  TipIcon,
  WarningIcon,
  Video,
} from '../../assets/icons/tabs';

interface TabsProps {
  handleTextReplacement: (type: string, sufix: string, prefix: string) => void;
}

export const Toolbar = ({ handleTextReplacement }: TabsProps): JSX.Element => {
  return (
    <div className="flex justify-start items-center bg-primary-grey px-7">
      {syntax.map(({ icon: Icon, type, sufix, prefix, group }, index) => {
        return (
          <div
            className="tooltip  tooltip-[#8A90A3]"
            key={index}
            data-tip={type}
          >
            <div
              onClick={() =>
                !group && handleTextReplacement(type, prefix, sufix)
              }
              className="relative p-1 cursor-pointer group"
            >
              <Icon key={type} />
              {/* renders dropdown of group of syntaxes */}
              {group && (
                <div className="absolute z-50 h-auto group-hover:inline-table bottom-0 rounded-md right-0 top-7 bg-[#2d3644] hidden ">
                  {group?.map(({ icon: Icon, type, prefix, sufix }, index) => {
                    return (
                      <div
                        key={index}
                        className="tooltip tooltip-[#8A90A3] tooltip-right"
                        data-tip={type}
                      >
                        <div
                          onClick={() =>
                            handleTextReplacement(type, prefix, sufix)
                          }
                          className="py-3 px-1 "
                        >
                          <Icon key={index} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const syntax = [
  {
    icon: HeadingIcon,
    group: [
      {
        icon: H1Icon,
        type: 'h1',
        prefix: '# ',
        sufix: '',
      },
      {
        icon: H2Icon,
        type: 'h2',
        prefix: '## ',
        sufix: '',
      },
      {
        icon: H3Icon,
        type: 'h3',
        prefix: '### ',
        sufix: '',
      },
      {
        icon: H4Icon,
        type: 'h4',
        prefix: '#### ',
        sufix: '',
      },
      {
        icon: H5Icon,
        type: 'h5',
        prefix: '##### ',
        sufix: '',
      },
      {
        icon: H6Icon,
        type: 'h6',
        prefix: '###### ',
        sufix: '',
      },
    ],
    type: 'heading',
    prefix: '',
    sufix: '',
  },
  {
    icon: StrikeThrough,
    type: 'strike through',
    prefix: '~~',
    sufix: '~~',
  },
  {
    icon: BoldIcon,
    type: 'bold',
    prefix: '**',
    sufix: '**',
  },
  {
    icon: ItalicIcon,
    type: 'italic',
    prefix: '*',
    sufix: '*',
  },
  {
    icon: Blockquote,
    type: 'blockquote',
    prefix: '>',
    sufix: '',
  },
  {
    icon: CodeIcon,
    type: 'code',
    prefix: '```\n',
    sufix: '\n\n```',
  },
  {
    icon: ListIcon,
    type: 'unordered list',
    prefix: '',
    sufix: '',
    group: [
      {
        icon: ListIcon,
        type: 'unordered list',
        prefix: '- ',
        sufix: '',
      },
      {
        icon: OrderedListIcon,
        type: 'ordered list',
        prefix: '',
        sufix: '',
      },
    ],
  },
  {
    icon: ImageIcon,
    type: 'image',
    prefix: '![alt](',
    sufix: ')',
  },
  {
    icon: LinkIcon,
    type: 'link',
    prefix: '[link name](',
    sufix: ')',
  },
  {
    icon: BlockQuote,
    type: 'toolbar',
    group: [
      {
        icon: WarningIcon,
        type: 'warning',
        prefix: '<div className="toolbar-warning">',
        sufix: '</div>',
      },
      {
        icon: InfoIcon,
        type: 'info',
        prefix: '<div className="toolbar-note">',
        sufix: '</div>',
      },
      {
        icon: InfoIcon,
        type: 'caution',
        prefix: '<div className="toolbar-caution">',
        sufix: '</div>',
      },
      {
        icon: TipIcon,
        type: 'tip',
        prefix: '<div className="toolbar-tip">',
        sufix: '</div>',
      },
    ],
    prefix: '',
    sufix: '',
  },
  {
    icon: Video,
    prefix: '<div youtube-url="',
    sufix: '"></div>',
    type: 'youtube video',
  },
];
