import { ArticleType } from "@prisma/client";

const parseArticleType = (type: ArticleType, language: "en" | "ar"): string => {
  const labels = {
    en: {
      [ArticleType.news]: "News",
      [ArticleType.conference]: "Conference",
      [ArticleType.research]: "Research",
    },
    ar: {
      [ArticleType.news]: "أخبار",
      [ArticleType.conference]: "مؤتمر",
      [ArticleType.research]: "بحث",
    },
  };

  return labels[language][type];
};

export { parseArticleType };
