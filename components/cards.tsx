import { parseArticleType } from "@/lib/parse";
import { extractText } from "@/lib/text";
import { cn } from "@/lib/utils";
import { ArticleType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SideCardProps {
  imageUrl: string;
  tag: string;
  title: string;
  description: string;
  link: string;
}

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  authorName: string;
  authorImageUrl: string;
  date: string;
  href: string;
  lang: "ar" | "en";
  type: ArticleType;
}

const SideCard: React.FC<SideCardProps> = ({
  imageUrl,
  tag,
  title,
  description,
  link,
}) => {
  return (
    <div className="relative flex flex-col md:flex-row w-full my-6 bg-secondary shadow-sm border border-fotext-foreground rounded-lg">
      <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden max-w-sm h-48">
        <img
          src={imageUrl}
          alt="card-image"
          className="h-full w-full rounded-md md:rounded-lg object-cover"
        />
      </div>
      <div className="p-6">
        <h4 className="mb-2 text-foreground text-xl font-semibold">{title}</h4>
        <p className="mb-8 text-foreground leading-normal font-light">
          {description}
        </p>
        <div>
          <a
            href={link}
            className="text-foreground font-semibold text-sm hover:underline flex items-center"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  authorName,
  authorImageUrl,
  date,
  href,
  lang,
  type,
}) => {
  return (
    <Link
      href={href}
      dir={lang === "en" ? "ltr" : "rtl"}
      className="max-w-full"
    >
      <div className="relative flex flex-col rounded-xl h-full my-6 bg-secondary shadow-sm">
        <div className="relative h-56 m-2.5 overflow-hidden text-foreground rounded-md">
          <Image src={imageUrl} alt="card-image" width={1000} height={1000} />
        </div>
        <div className="flex h-1/2 flex-col justify-between">
          {" "}
          <div className="p-4">
            <div
              className={cn(
                "mb-4 rounded py-0.5 px-2  text-xs transition-all shadow-sm w-20 content-center text-center",
                type === "research" &&
                  "dark:bg-cyan-700 text-cyan-700 dark:text-cyan-200 bg-cyan-200",
                type === "news" &&
                  "dark:bg-rose-700 text-rose-700 dark:text-rose-200 bg-rose-200",
                type === "conference" &&
                  "dark:bg-sky-700 text-sky-700 dark:text-sky-200 bg-sky-200"
              )}
            >
              {parseArticleType(type, lang)}
            </div>
            <h6 className="mb-2 text-foreground text-xl font-semibold">
              {title}
            </h6>
            <p className="text-foreground/80 leading-normal text-sm font-light">
              {extractText(description, 200)}
            </p>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center mb-4">
              <Image
                alt={authorName}
                width={100}
                height={100}
                src={authorImageUrl}
                className="relative inline-block h-8 w-8 rounded-full"
              />
              <div className="flex flex-col mx-3 text-foreground/90 text-sm">
                <span className="font-semibold">{authorName}</span>
                <span>{date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { Card, SideCard };
