import Image from "next/image";
import Link from "next/link";
import React, { Fragment, ReactNode, Suspense } from "react";
import { parseDocument } from "htmlparser2";
import { DomUtils } from "htmlparser2";
import { Skeleton } from "./ui/skeleton";

// Function to extract text from HTML string and truncate it
const extractText = (html: string, maxLength: number): string => {
  const dom = parseDocument(html); // Parse the HTML into a DOM-like structure
  const text = DomUtils.textContent(dom); // Extract text content
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

interface CardProps {
  title: string;
  body: string; // HTML string
  src: string;
  href?: string;
  edit?: boolean;
  children?: ReactNode;
}

const ArticleCard: React.FC<CardProps> = ({
  title,
  body,
  src,
  href = "#",
  edit = false,
  children,
}) => {
  // Truncate the HTML body into plain text
  const truncatedBody = extractText(body, 200);

  return (
    <Suspense fallback={<ArticleCardSkeleton />}>
      <div className="max-w-full border border-foreground/20 bg-secondary rounded-lg shadow">
        <Link
          href={href}
          className="w-full block overflow-hidden max-w-full h-64 content-center max-h-96"
        >
          <Image
            className="rounded-t-lg w-full h-full object-cover"
            src={src}
            alt={title}
            width={1000}
            height={1000}
          />
        </Link>
        <div className="p-5">
          <Link href={href}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-foreground/80">{truncatedBody}</p>
          {edit ? (
            <Fragment>{children}</Fragment>
          ) : (
            <Link
              href={href}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </Suspense>
  );
};

const ArticleCardSkeleton: React.FC = () => {
  return (
    <Skeleton className="max-w-sm border shadow">
      {/* Skeleton for image */}
      <Skeleton className="h-48  rounded-t-lg"></Skeleton>
      <Skeleton className="p-5">
        {/* Skeleton for title */}
        <Skeleton className="h-6  rounded mb-3 w-3/4"></Skeleton>
        {/* Skeleton for body */}
        <Skeleton className="h-4  rounded mb-2 w-full"></Skeleton>
        <Skeleton className="h-4  rounded mb-4 w-5/6"></Skeleton>
        {/* Skeleton for button */}
        <Skeleton className="h-8 rounded w-24"></Skeleton>
      </Skeleton>
    </Skeleton>
  );
};

export default ArticleCard;
