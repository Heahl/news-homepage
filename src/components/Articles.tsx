import React from "react";
import Image from "next/image";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";

export type Article = {
  id: number;
  type: string;
  imageUrlMobile?: string | StaticImport;
  imageUrlDesktop?: string | StaticImport;
  imageUrl?: string | StaticImport;
  header: string;
  content: string;
};

type ArticleProps = {
  articles: Article[];
};

export const CtaArticles: React.FC<ArticleProps> = ({ articles }) => {
  return (
    <div className="flex h-full w-full flex-col gap-4 md:col-span-2 md:row-span-3 md:grid md:gap-4">
      {articles.map((article) => (
        <div key={article.id} className="mb-8 w-full">
          <Image
            src={article.imageUrlMobile ?? "/images/placeholder.png"}
            width={100}
            height={100}
            alt="Web 3.0 Illustration"
            className="block w-full object-cover md:hidden"
          />
          <Image
            src={article.imageUrlDesktop ?? "/images/placeholder.png"}
            width={100}
            height={100}
            alt="Web 3.0 Illustration"
            className="hidden h-1/2 w-full object-cover md:block"
          />
          <div className="md:w1/2 flex h-full w-full flex-col justify-start overflow-y-auto md:my-6 md:h-1/2 md:flex-row md:gap-10">
            <h2 className="my-4 text-3xl font-bold md:my-0 md:text-4xl lg:text-6xl">
              {article.header}
            </h2>
            <div className="md:w1/2 flex h-full w-full flex-col">
              <p className="mb-2 font-light">{article.content}</p>
              {article.type === "cta" && (
                <button className="mt-2 h-10 w-40 bg-soft-red px-4 py-2 text-sm font-medium uppercase tracking-widest hover:cursor-pointer hover:bg-very-dark-blue hover:text-white">
                  Read More
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const NewArticles: React.FC<ArticleProps> = ({ articles }) => {
  return (
    <div className="mb-8 flex flex-col overflow-y-auto bg-very-dark-blue px-2 pt-3 text-white md:col-span-1 md:col-start-3 md:row-span-3 md:grid md:grid-cols-1 lg:px-4">
      <h1 className="mb-4 self-start text-3xl font-semibold text-soft-orange">
        New
      </h1>
      <div className="flex h-full w-full flex-col divide-y">
        {articles.map((article) => (
          <div key={article.id} className="w-full border-gray-400 pb-4">
            <h2 className="mt-4 text-xl font-semibold hover:cursor-pointer hover:text-soft-orange">
              {article.header}
            </h2>
            <p className="my-3 text-grayish-blue/70">{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const NumberedListArticles: React.FC<ArticleProps> = ({ articles }) => {
  return (
    <div className="flex flex-col bg-off-white md:col-span-3 md:row-span-2 md:row-start-4 md:h-44 md:flex-row md:gap-4">
      {articles.map((article, index) => (
        <div key={article.id} className="mb-4 flex gap-4">
          <Image
            className="w-1/3 object-cover md:h-full"
            src={article.imageUrl ?? "/images/placeholder.png"}
            width={40}
            height={40}
            alt={article.header}
          />
          <div className="flex w-2/3 flex-col">
            <h1 className="mb-3 text-4xl font-bold text-soft-red hover:cursor-pointer hover:text-soft-red">
              {(index + 1).toString().padStart(2, "0")}
            </h1>
            <h2 className="mb-2 text-xl font-semibold md:font-bold">
              {article.header}
            </h2>
            <p className="text-base">{article.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
