import React from 'react';
import { ReactComponent as Bold } from '../../assets/icons/bold.svg';
import { ReactComponent as Italic } from '../../assets/icons/italic.svg';
import { ReactComponent as Blockquote } from '../../assets/icons/blockquote.svg';
import { ReactComponent as Code } from '../../assets/icons/code.svg';
import { ReactComponent as List } from '../../assets/icons/list.svg';
import { ReactComponent as Warning } from '../../assets/icons/warning.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { ReactComponent as StrikeThrough } from '../../assets/icons/strikethrough.svg';
import { ReactComponent as Video } from '../../assets/icons/video.svg';
import { ReactComponent as Tip } from '../../assets/icons/tip.svg';
import { ReactComponent as H6Icon } from '../../assets/icons/h6.svg';
import { ReactComponent as H5Icon } from '../../assets/icons/h5.svg';
import { ReactComponent as H4Icon } from '../../assets/icons/h4.svg';
import { ReactComponent as H3Icon } from '../../assets/icons/h3.svg';
import { ReactComponent as H2Icon } from '../../assets/icons/h2.svg';
import { ReactComponent as H1Icon } from '../../assets/icons/h1.svg';
import { ReactComponent as HeadingIcon } from '../../assets/icons/heading.svg';
import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';
import { ReactComponent as LinkIcon } from '../../assets/icons/link.svg';
import { ReactComponent as OrderedListIcon } from '../../assets/icons/ordered-list.svg';

interface TabsProps {
  handleTextReplacement: (type: string, sufix: string, prefix: string) => void;
}

export const Toolbar = ({ handleTextReplacement }: TabsProps): JSX.Element => {
  return (
    <div className="flex justify-start  w-full z-50 items-center h-14 bg-primary-grey px-2 border-r-2 border-t-2 border-sections_border">
      {syntax.map(({ icon: Icon, type, sufix, prefix, group }, index) => {
        return (
          <div
            className="tooltip z-50  tooltip-[#8A90A3]"
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
                        className="tooltip z-50 tooltip-[#8A90A3] tooltip-right"
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
    icon: Bold,
    type: 'bold',
    prefix: '**',
    sufix: '**',
  },
  {
    icon: Italic,
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
    icon: Code,
    type: 'code',
    prefix: '```\n',
    sufix: '\n\n```',
  },
  {
    icon: List,
    type: 'unordered list',
    prefix: '',
    sufix: '',
    group: [
      {
        icon: List,
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
    icon: Blockquote,
    type: 'toolbar',
    group: [
      {
        icon: Warning,
        type: 'warning',
        prefix: '<div className="toolbar-warning">',
        sufix: '</div>',
      },
      {
        icon: Info,
        type: 'info',
        prefix: '<div className="toolbar-note">',
        sufix: '</div>',
      },
      {
        icon: Info,
        type: 'caution',
        prefix: '<div className="toolbar-caution">',
        sufix: '</div>',
      },
      {
        icon: Tip,
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
