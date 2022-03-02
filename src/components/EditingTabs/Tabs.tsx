import React from 'react';
import {
  Blockquote,
  BoldIcon,
  H1Icon,
  H2Icon,
  ItalicIcon,
} from '../../assets/icons/tabs';

interface TabsProps {
  handleTextReplacement: (type: string, sufix: string, prefix: string) => void;
}

export const Tabs = ({ handleTextReplacement }: TabsProps): JSX.Element => {
  return (
    <div className="flex justify-start items-center bg-black border-y-[1px] border-y-slate-700 px-2">
      {tabs.map(({ icon: Icon, type, sufix, prefix }, index) => {
        return (
          <div className="tooltip tooltip-secondary" data-tip={type}>
            <div
              key={index}
              onClick={() => handleTextReplacement(type, prefix, sufix)}
              className="p-1 cursor-pointer"
            >
              <Icon key={type} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const tabs = [
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
];
