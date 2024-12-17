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

// **1. Generate Static Params**
export async function generateStaticParams() {
  const articles = await getArticles({});
  return articles.map((article) => ({
    article: article.id,
  }));
}

// **2. Generate Metadata**
export async function generateMetadata({
  params,
}: {
  params: { article: string; lang: string };
}) {
  const { article: articleId, lang } = params;
  const article = await getArticleById(articleId, true);

  if (!article) {
    return { title: "Article Not Found" };
  }

  const title = lang === "en" ? article.enTitle : article.title;
  const description =
    lang === "en"
      ? article.enBody.slice(0, 150).replace(/<[^>]+>/g, "") // Strip HTML for description
      : article.body.slice(0, 150).replace(/<[^>]+>/g, "");

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "article",
      images: [
        {
          url: article?.poster || "/images/default_image.png",
          alt: title,
        },
      ],
    },
  };
}

// **3. Article Page Component**
const ArticlePage = async ({
  params,
}: {
  params: { article: string; lang: string };
}) => {
  const id = params.article;
  const lang = params.lang;

  const article = await getArticleById(id, true);

  if (!article) {
    return notFound();
  }

  after(async () => {
    await prisma.article.update({
      where: { id: article.id },
      data: {
        views: { increment: 1 },
      },
    });
  });

  return (
    <main className="phone-only:px-4 bg-secondary mt-36 min-h-[50vh]">
      <Breadcrumb className="my-2">
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

      <div className="my-4 px-2 md:px-16 xl:px-24">
        <h1 className="my-4 font-bold md:text-3xl text-xl">
          {lang === "en" ? article.enTitle : article.title}
        </h1>
        <div className="flex justify-between items-start phone-only:flex-col">
          <div className="w-full flex-1">
            <RenderHtml html={lang === "en" ? article.enBody : article.body} />
          </div>
          <div className="phone-only:my-4 grid gap-2">
            <ul>
              <li>تم الرفع بواسطة : {article.author.fullName}</li>
              <li>{article.views} مشاهدة</li>
              <li>
                تاريخ التحميل:{" "}
                {formatDateInDetails(article.createdAt, lang as Locale)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArticlePage;
