"use server";

import { getSession } from "@/lib/session";
import { generateSlug } from "@/lib/slug";
import prisma from "@/prisma/db";
import { Article, ArticleType } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";

const createArtcle = async ({
  body,
  enBody,
  enTitle,
  poster,
  title,
  type,
  readTime,
}: Omit<
  Article,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "views"
  | "poster"
  | "authorId"
  | "slug"
  | "readTime"
> & {
  poster?: nullable | string;
  readTime?: nullable | number;
}) => {
  try {
    const user = await getSession();
    if (!user) {
      return { message: "يجب تسجيل الدخول اولا" };
    }
    const slug = await generateSlug(enTitle);
    const article = await prisma.article.create({
      data: {
        body,
        enBody,
        enTitle,
        title,
        authorId: user.id,
        poster,
        type,
        slug,
        readTime,
      },
    });
    if (!article) {
      return { message: "فشل انشاء المقالة" };
    }
    revalidateTag("articles");
    return { message: "تم انشاء المقالة بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل انشاء المقالة" };
  }
};
const deleteArticle = async ({ id }: { id: string }) => {
  try {
    const article = await prisma.article.delete({
      where: { id },
    });
    if (!article) {
      return { message: "فشل حذف المقالة" }; // "Failed to delete user"
    }
    revalidateTag("articles");
    return { message: "تم حذف المقالة بنجاح" }; // "User deleted successfully"
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل حذف القالة" }; // "Failed to delete account"
  }
};

const updateArticle = async ({
  id,
  title,
  body,
  enTitle,
  enBody,
  type,
  poster,
  readTime,
}: Omit<
  Article,
  | "createdAt"
  | "updatedAt"
  | "authorId"
  | "views"
  | "poster"
  | "slug"
  | "readTime"
> & { poster?: nullable | string; readTime?: nullable | number }) => {
  try {
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title,
        body,
        enTitle,
        enBody,
        type,
        readTime,
        poster, // Assuming the `poster` field is a string representing the image URL or path
      },
    });

    if (!updatedArticle) {
      return { message: "فشل تحديث المقالة" }; // "Failed to update article"
    }

    // Revalidate the articles cache/tag if you're using caching
    revalidateTag("articles"); // Uncomment if you are using revalidation in your setup

    return { message: "تم تحديث المقالة بنجاح" }; // "Article updated successfully"
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل تحديث المقالة" }; // "Failed to update article"
  }
};

const getArticles = unstable_cache(
  async ({
    content,
    author = false,
    type,
    take,
    notIn = [],
  }: {
    content?: string;
    author?: boolean;
    type?: ArticleType;
    take?: number;
    notIn?: string[];
  }) => {
    const filter: any = content
      ? {
          OR: [
            {
              title: {
                contains: content,
                mode: "insensitive", // Case-insensitive search
              },
            },
            {
              enTitle: {
                contains: content,
                mode: "insensitive", // Case-insensitive search
              },
            },
            {
              body: {
                contains: content,
                mode: "insensitive",
              },
            },
            {
              enBody: {
                contains: content,
                mode: "insensitive",
              },
            },
          ],
          type,
          id: {
            notIn,
          },
        }
      : {
          type,
          id: {
            notIn,
          },
        }; // No filter if title is undefined or empty

    try {
      const articles = await prisma.article.findMany({
        where: filter,
        orderBy: {
          createdAt: "desc",
        },
        take,
        include: {
          author,
        },
      });
      if (!articles) {
        return [];
      }
      if (!articles || articles.length === 0) {
        console.log("لم يتم العثور على اي مقالة.");
        return [];
      }
      return articles;
    } catch (error) {
      console.dir(error, { depth: null });
      return [];
    }
  },
  ["articles"],
  { tags: ["articles"] }
);

const getArticleById = async (slug: string, author = false) => {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author,
      },
    });
    if (!article) {
      return undefined;
    }
    return article;
  } catch (error) {
    return undefined;
  }
};

export {
  createArtcle,
  getArticles,
  deleteArticle,
  getArticleById,
  updateArticle,
};
