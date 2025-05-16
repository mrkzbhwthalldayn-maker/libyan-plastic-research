// app/sitemap.ts

import { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";

const BASE_URL = "https://prc.ly"; // Replace with your actual base URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "about",
    "contact-us",
    "faculty-cvs",
    "goals",
    "labs",
    "organizational-structure",
    "regulations",
    "scientific-and-technical-consultations",
    "search",
    "train-courses",
  ];

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of i18n.locales) {
    for (const route of staticRoutes) {
      const path = route ? `/${locale}/${route}` : `/${locale}`;
      urls.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            i18n.locales.map((altLocale) => [
              altLocale,
              `${BASE_URL}/${altLocale}${route ? `/${route}` : ""}`,
            ])
          ),
        },
      });
    }
  }

  return urls;
}
