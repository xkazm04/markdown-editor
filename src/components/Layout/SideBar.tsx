import React, { FormEvent, useEffect, useState } from 'react';
import { CurrentMarkdownType } from '../../App';
import { useNotification } from '../../provider/NotificationProvider';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'

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
  token: string;
}

export const SideBar = ({
  setMarkdown,
  markdown,
}: SideBarProps): JSX.Element => {
  const [apiValue, setApiValue] = useState('');
  const [error, setError] = useState('');
  const [strapiData, setStrapiData] = useState<DocumentationData[] | []>([]);
  const [search, setSearch] = useState('');
  const notificationStore = useNotification();
  const [apiToken, setApiToken] = useState('');

  const handleFetchAPI = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const getAPI = await fetch(`${apiValue}`);
      const data = await getAPI.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      localStorage.setItem(
        'collection',
        JSON.stringify({ endpoint: apiValue, data: data.data })
      );
      setStrapiData(data.data);
    } catch (error) {
      const errorMsg = (error as { message: string }).message;
      if (error && errorMsg) {
        notificationStore?.addNotification('error', errorMsg);
      }
    }
  };

  const handleMarkdownChangesSave = async () => {
    try {
      const body = JSON.stringify({
        data: { markdown: markdown.text },
      });
      const post = await fetch(`${apiValue}/${markdown.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken.trim()}`,
        },
        body,
      });
      const response = await post.json();

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data) {
        notificationStore?.addNotification(
          'success',
          'Collection has been updated'
        );

        localStorage.setItem(
          'collection',
          JSON.stringify({ endpoint: apiValue, token: apiToken })
        );
        saveLastViewedMarkdown(
          response.data.id,
          response.data.attributes.markdown,
          apiValue
        );
      }
    } catch (error) {
      notificationStore?.addNotification(
        'error',
        (error as { message: string }).message
      );
    }
  };

  useEffect(() => {
    const collection = localStorage.getItem('collection') || '';
    if (collection) {
      const parsed: CollectionLSType = JSON.parse(collection);
      setApiValue(parsed.endpoint);
      setApiToken(parsed.token);
    }
  }, []);

  useEffect(() => {
    const lastViewedMarkdown = localStorage.getItem('lastEditingMarkdown');
    if (lastViewedMarkdown) {
      const parsed = JSON.parse(lastViewedMarkdown);
      setMarkdown((prev) => ({ ...prev, parsed }));
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

  const searchArticle = (data: DocumentationData) => {
    return data.attributes.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  };

  return (
    <div className="flex flex-col z-50 h-full max-h-full overflow-x-auto w-full bg-[white]/5 border-t-2 border-sections_border border-r-2">
      <Input
        containerClass="px-5"
        inputClass="pl-10"
        value={search}
        onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
        placeholder="Search..."
        icon={<SearchIcon className="absolute top-5 left-7" />}
      />
      <div className="py-3 h-full border-b-2 border-[white]/5 mb-4">
        <span className="text-lg font-semibold text-white mx-5">Collection CMS</span>
        <ul className="overflow-scroll h-full py-3 no-scrollbar mx-5">
          {error && (
            <div className="text-red-400 font-semibold text-center my-5">
              {error}
            </div>
          )}
          {strapiData.filter(searchArticle).map((data, index) => {
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
      </div>
      <form className="mx-5" onSubmit={handleFetchAPI}>
        <Input
          value={apiValue}
          onChange={(e) => setApiValue((e.target as HTMLInputElement).value)}
          label="Connected API"
        />
        <Input
          value={apiToken}
          onChange={(e) => setApiToken((e.target as HTMLInputElement).value)}
          label="API Token"
        />
        <div className="flex justify-between items-center my-5">
          <span className="text-[#8A90A3]">Cancel</span>
          <Button
            type="button"
            text="Save"
            onClick={handleMarkdownChangesSave}
          />
          <Button type="submit" disabled={!apiValue} text="Import" />
        </div>
      </form>
    </div>
  );
};
