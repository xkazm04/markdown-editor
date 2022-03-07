import React, { FormEvent, useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { CurrentMarkdownType } from './Layout';

export interface DocumentationData {
  id: number;
  attributes: {
    markdown: string;
    metaDescription: string;
    production: boolean;
    serviceCategory: string;
    title: string;
    createdAt: string;
    locale: string;
    publishedAt: string;
    updatedAt: string;
    order: number;
    link?: string;
    slug?: string;
    requestPlayground?: string;
    category?: 'article' | 'jsonrpc' | 'pubsub' | string;
  };
}

interface SideBarProps {
  setMarkdown: React.Dispatch<React.SetStateAction<CurrentMarkdownType>>;
  markdown: CurrentMarkdownType;
}

interface CollectionLSType {
  endpoint: string;
  data: DocumentationData[];
}

export const SideBar = ({
  setMarkdown,
  markdown,
}: SideBarProps): JSX.Element => {
  const [apiValue, setApiValue] = useState('');
  const [error, setError] = useState('');
  const [strapiData, setStrapiData] = useState<DocumentationData[] | []>([]);

  const handleFetchAPI = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const getAPI = await fetch(`${apiValue}`);
      const data = await getAPI.json();

      if (data.error) {
        throw new Error(data.error.message);
      }
      if (!data.data) return;
      localStorage.setItem(
        'collection',
        JSON.stringify({ endpoint: apiValue, data: data.data })
      );
      setStrapiData(data.data);
    } catch (error) {
      if (error) {
        if (error && (error as { message: string }).message) {
          setError((error as { message: string }).message);
          setTimeout(() => setError(''), 2000);
        }
      }
    }
  };

  useEffect(() => {
    if (strapiData.length !== 0) return;
    const collection = localStorage.getItem('collection') || '';
    if (collection) {
      const parsed: CollectionLSType = JSON.parse(collection);
      setApiValue(parsed.endpoint);
      setStrapiData(parsed.data);
    }
  }, []);

  const saveLastViewedMarkdown = (
    id: number,
    text: string,
    collection: string
  ) => {
    const lastEditingMarkdown = { id, text, collection };

    localStorage.setItem(
      'lastEditingMarkdown',
      JSON.stringify(lastEditingMarkdown)
    );
  };

  return (
    <div className=" grid grid-rows-[60%_30%] z-50 h-full w-full px-5 bg-primary-grey border-t-2 border-sections_border border-r-2">
      <ul className="overflow-scroll h-full py-3">
        <span className="text-lg font-semibold">Collection CMS</span>
        {error && (
          <div className="text-red-400 font-semibold text-center my-5">
            {error}
          </div>
        )}
        {strapiData.map((data, index) => {
          return (
            <li
              className="list-none"
              onClick={() => {
                setMarkdown((prev) => ({
                  ...prev,
                  text: data.attributes.markdown,
                  id: data.id,
                  collection: apiValue,
                }));
                saveLastViewedMarkdown(
                  data.id,
                  data.attributes.markdown,
                  apiValue
                );
              }}
              key={index}
            >
              <p
                className={` text-sm 2xl:text-base my-5 2xl:my-2 cursor-pointer ${
                  markdown.id === data.id
                    ? 'text-[#bbace6] font-semibold'
                    : 'text-white'
                }`}
              >
                {data.attributes.title}
              </p>
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleFetchAPI}>
        <Input
          value={apiValue}
          onChange={(e) => setApiValue((e.target as HTMLInputElement).value)}
          label="Connected API"
        />
        <div className="flex justify-between items-center my-5">
          <span className="text-[#8A90A3]">Cancel</span>
          <Button
            type="submit"
            // onClick={handleFetchAPI}
            disabled={!apiValue}
            text="Import"
          />
        </div>
      </form>
    </div>
  );
};
