import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getArticleById, getArticles } from "@/database/articles";
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
import { parseArticleType } from "@/lib/parse";
import { extractText } from "@/lib/text";
import { Separator } from "@/components/ui/separator";

// **1. Generate Static Params**
export async function generateStaticParams() {
  const articles = await getArticles({});
  return articles.map((article) => ({
    article: article.id,
  }));
}

// **2. Generate Metadata**
export async function generateMetadata(props: {
  params: Promise<{ article: string; lang: string }>;
}) {
  const params = await props.params;
  const { article: articleId, lang } = params;
  const article = await getArticleById(articleId, true);

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

  const article = await getArticleById(slug, true);

  if (!article) {
    return notFound();
  }
  const articles = await getArticles({
    type: article?.type,
    take: 9,
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
    <main className="phone-only:px-4 relative py-2 bg-secondary min-h-[50vh]">
      <div className="my-2 px-2 md:px-16 xl:px-24">
        <article className="relative">
          <div></div>
          <div className="md:w-1/2 mx-auto">
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
                    <Link href={`/${lang}/articles`}>
                      <LangRenderer ar={"المقالات"} en={"Articles"} />
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
              <div className="flex items-center gap-2">
                {article.readTime && (
                  <>
                    <span className="my-2">
                      <LangRenderer
                        ar={`${article.readTime} دقائق قرازةً`}
                        en={`${article.readTime} min read`}
                      />
                    </span>
                    {" | "}
                  </>
                )}
                <span className="my-2">
                  <LangRenderer ar={"تاريخ التحميل: "} en={"Upload date: "} />
                  {formatDateInDetails(article.createdAt, lang as Locale)}
                </span>
              </div>{" "}
              <h1 className="my-4 font-bold md:text-6xl text-2xl">
                {lang === "en" ? article.enTitle : article.title}
              </h1>
              <RenderHtml
                html={lang === "en" ? article.enBody : article.body}
              />
            </div>
          </div>
          <div
            className={cn(
              "grid mt-6 gap-2 md:absolute -bottom-2",
              lang === "en" ? "right-0" : "left-0"
            )}
          >
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
        <div className="py-20 md:w-4/6 mx-auto  px-4">
          <h2 className="my-2">
            <LangRenderer ar="محتوى مشابه" en="Related Content" />
          </h2>
          <div className="grid">
            {articles.map((content, index) => (
              <div key={index} className="">
                <SideCard
                  imageUrl={`${content.poster}`}
                  tag={parseArticleType(content.type, lang as Locale)}
                  title={lang === "en" ? content.enTitle : content.title}
                  description={
                    lang === "en"
                      ? extractText(content.enBody, 35)
                      : extractText(content.body, 35)
                  }
                  link={`/articles/${content.slug}`}
                />
                <Separator className="bg-foreground/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArticlePage;
