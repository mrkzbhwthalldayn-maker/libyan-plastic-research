import LangBreadcrumbSeparator from "@/components/breadcrumb-separator";
import LangRenderer from "@/components/lang";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";

import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> => {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang);
  const title =
    lang === "en"
      ? "Laboratories - Libyan Polymer Research Center"
      : "المختبرات - المركز الليبي لبحوث اللدائن";
  const description =
    lang === "en"
      ? "Explore our specialized laboratories focusing on polymer chemistry, thermal analysis, molecular analysis, and more. Discover advanced research and technologies."
      : "تعرف على مختبراتنا المتخصصة في كيمياء البوليمر، التحليل الحراري، التحليل الجزيئي، والمزيد. اكتشف أحدث الأبحاث والتقنيات.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/labs`,
    },
    openGraph: {
      title: title,
      description,
      url: `/${lang}/labs`,
      images: [
        ...dictionary.labs.map((lab) => ({
          url: lab.image,
          width: 1200,
          height: 630,
          alt: lab.title,
        })),
      ],
      locale: lang,
      siteName: lang === "en" ? "Research Center" : "مركز البحوث",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        ...dictionary.labs.map((lab) => ({
          url: lab.image,
          alt: lab.title,
        })),
      ],
    },
  };
};

const page = async (props: { params: Promise<{ lang: Locale }> }) => {
  const params = await props.params;
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  const labs = dictionary.labs;
  return (
    <main className="bg-secondary min-h-screen">
      <div className="container py-2">
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
              <BreadcrumbPage>
                <LangRenderer ar={"المقالات"} en={"Articles"} />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-extrabold my-10 md:text-5xl text-2xl">
          {lang === "en" ? "Laboratories" : "المختبرات"}
        </h1>
        <div className="grid gap-10">
          {labs.map((lab, index) => {
            return (
              <div key={index}>
                <div className="flex phone-only:flex-col w-full justify-between items-start gap-10 phone-only:mb-2">
                  <div className="md:w-2/3">
                    <h4 id={lab.slug} className="font-bold md:text-3xl text-xl">
                      {lab.title}
                    </h4>
                    <p className="my-4">{lab.description}</p>
                  </div>
                  <div className="md:w-1/4 h-full w-full rounded-lg overflow-hidden">
                    <Image
                      src={lab.image}
                      alt={lab.title}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <Separator className="bg-foreground/50 " />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default page;
