import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getArticleBySlug, getArticles } from "@/database/articles";
import { notFound } from "next/navigation";
import RenderHtml from "@/components/render-html";
import LangBreadcrumbSeparator from "@/components/breadcrumb-separator";
import LangRenderer from "@/components/lang";
import { formatDateInDetails } from "@/lib/date";
import { Locale } from "@/i18n-config";
import { after } from "next/server";
import prisma from "@/prisma/db";
import { cn } from "@/lib/utils";
import ShareDialog from "@/components/share-dialog";
import uri from "@/lib/uri";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { SideCard } from "@/components/cards";
import { extractText } from "@/lib/text";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// **1. Generate Static Params**
export async function generateStaticParams() {
  const articles = await getArticles({});
  return articles.map((article) => ({
    article: article.slug,
  }));
}

// **2. Generate Metadata**
export async function generateMetadata(props: {
  params: Promise<{ article: string; lang: string }>;
}) {
  const params = await props.params;
  const { article: articleId, lang } = params;
  const article = await getArticleBySlug(articleId, true);

  if (!article) {
    return { title: "Article Not Found" };
  }

  // Determine the title and description based on the language
  const title = lang === "en" ? article.enTitle : article.title;
  const description =
    lang === "en"
      ? article.enBody.slice(0, 150).replace(/<[^>]+>/g, "") // Strip HTML for description
      : article.body.slice(0, 150).replace(/<[^>]+>/g, "");
  const publishDate = article.createdAt.toISOString(); // Adding publish date

  // Structured Data (Schema Markup) for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: article?.poster || "/images/default_image.png",
    author: {
      "@type": "Person",
      name: article.author.fullName,
    },
    publisher: {
      "@type": "Organization",
      name: "المركز الليبي لبحوث اللدائن",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png",
      },
    },
    datePublished: publishDate,
    dateModified: article.updatedAt.toISOString(),
  };

  return {
    // Basic Metadata
    title: title,
    description: description,

    // Open Graph Tags
    openGraph: {
      title: title,
      description: description,
      type: "article",
      publishedTime: publishDate, // Adding published time for better SEO
      images: [
        {
          url: article?.poster || "/images/default_image.png",
          alt: title,
        },
      ],
    },

    // Twitter Card Tags
    twitter: {
      title: title,
      description: description,
      image: article?.poster || "/images/default_image.png",
    },

    // JSON-LD Schema Markup
    jsonLd: JSON.stringify(schemaMarkup),
  };
}

// **3. Article Page Component**
const ArticlePage = async (props: {
  params: Promise<{ article: string; lang: string }>;
}) => {
  const params = await props.params;
  const slug = params.article;
  const lang = params.lang;

  const article = await getArticleBySlug(slug, true);

  if (!article) {
    return notFound();
  }
  const articles = await getArticles({
    type: [article.type],
    take: 9,
    notIn: [article.id],
  });

  after(async () => {
    await prisma.article.update({
      where: { slug: article.slug },
      data: {
        views: { increment: 1 },
      },
    });
  });

  return (
    <main className="phone-only:px-4 relative py-2 min-h-[50vh]">
      <div className="my-2 px-2 md:px-16 xl:px-24">
        <article className="relative flex justify-between items-end phone-only:flex-col phone-only:items-center">
          <div className="md:w-4/6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/${lang}`}>
                      <LangRenderer ar={"الرئيسية"} en={"Home"} />
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <LangBreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/${lang}/news-and-activities`}>
                      <LangRenderer
                        ar={"الأخبار و الأنشطة"}
                        en={"News & Activities"}
                      />{" "}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <LangBreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {lang === "en" ? article.enTitle : article.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-8">
              <div className="flex phone-only:flex-col justify-start text-start items-center md:gap-2">
                {article.readTime && (
                  <>
                    <span className="my-2 phone-only:block phone-only:w-full">
                      <LangRenderer
                        ar={`${article.readTime} دقائق للمطالعة`}
                        en={`${article.readTime} minutes to read`}
                      />
                    </span>
                    <span className="phone-only:hidden">{" | "}</span>
                  </>
                )}
                <span className="phone-only:block phone-only:w-full">
                  <LangRenderer ar={"تاريخ التحميل: "} en={"Upload date: "} />
                  {formatDateInDetails(article.createdAt, lang as Locale)}
                </span>
              </div>{" "}
              <h1 className="my-4 font-bold md:text-[60px] text-2xl leading-[64px]">
                {lang === "en" ? article.enTitle : article.title}
              </h1>
              <Suspense
                fallback={
                  <>
                    <Skeleton className="w-full h-2 mb-1 " />
                    <Skeleton className="w-full h-2 mb-1 " />
                    <Skeleton className="w-full h-2 mb-1 " />
                    <Skeleton className="w-full h-2 mb-1 " />
                    <Skeleton className="w-full h-2 mb-1 " />
                    <Skeleton className="w-full h-2 mb-1 " />
                    <Skeleton className="w-full h-2 mb-1 " />
                    <Skeleton className="w-full h-2 mb-1 " />
                    <Skeleton className="w-full h-2 mb-1 " />
                    <Skeleton className="w-full h-2 mb-1 " />
                    <Skeleton className="w-full h-2 mb-1 " />
                  </>
                }
              >
                <RenderHtml
                  html={lang === "en" ? article.enBody : article.body}
                />
              </Suspense>
            </div>
          </div>
          <div className={cn("grid gap-2 h-full content-end")}>
            <ul>
              <li>
                <LangRenderer ar={"تم الرفع بواسطة : "} en={"Uploaded by: "} />
                {article.author.fullName}
              </li>
              <li>
                {article.views} <LangRenderer ar={"مشاهدة"} en={"views"} />
              </li>
              <li>
                <LangRenderer ar={"تاريخ التحميل: "} en={"Upload date: "} />
                {formatDateInDetails(article.createdAt, lang as Locale)}
              </li>
              <li className="flex gap-2 items-center">
                <ShareDialog
                  title={lang === "en" ? article.enTitle : article.title}
                  url={`${uri}/articles/${article.slug}`}
                />
                <CopyToClipboard content={`${uri}/articles/${article.slug}`} />
              </li>
            </ul>
          </div>
        </article>
      </div>
      <div className="py-20 md:w-4/6 mx-auto  px-4">
        <h2 className="my-2 font-bold text-xl phone-only:text-center md:text-3xl">
          <LangRenderer ar="مواضيع ذات صلة" en="Related Content" />{" "}
        </h2>
        <div className="grid">
          {articles.map((content, index) => (
            <div key={index} className="my-2">
              <SideCard
                readTime={content.readTime}
                imageUrl={`${content.poster}`}
                title={lang === "en" ? content.enTitle : content.title}
                description={
                  lang === "en"
                    ? extractText(content.enBody, 150)
                    : extractText(content.body, 150)
                }
                link={`/${lang}/articles/${content.slug}`}
              />
              <Separator className="bg-foreground/50" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ArticlePage;
