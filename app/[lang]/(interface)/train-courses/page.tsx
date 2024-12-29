import LangBreadcrumbSeparator from "@/components/breadcrumb-separator";
import LangRenderer from "@/components/lang";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Metadata } from "next";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { CustomLink } from "@/components/custom-link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> => {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang);
  const title =
    lang === "en"
      ? "Train Courses - Libyan Polymer Research Center"
      : "الدورات التدريبية - المركز الليبي لبحوث اللدائن";
  const description =
    lang === "en"
      ? "Explore our specialized laboratories focusing on polymer chemistry, thermal analysis, molecular analysis, and more. Discover advanced research and technologies."
      : "تعرف على مختبراتنا المتخصصة في كيمياء البوليمر، التحليل الحراري، التحليل الجزيئي، والمزيد. اكتشف أحدث الأبحاث والتقنيات.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/goals`,
    },
    openGraph: {
      title: title,
      description,
      url: `/${lang}/goals`,
      images: [
        ...dictionary.labs.map((lab) => ({
          url: lab.image,
          width: 1200,
          height: 630,
          alt: lab.title,
        })),
      ],
      locale: lang,
      siteName: lang === "en" ? "Train Courses" : "الدورات التدريبية",
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

const GoalsPage = async (props: { params: Promise<{ lang: Locale }> }) => {
  const params = await props.params;
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  const { projects, other_projects } = dictionary;
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
                {lang === "en" ? "Train Courses" : "الدورات التدريبية"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-extrabold my-10 md:text-3xl text-2xl">
          {lang === "en" ? "Train Courses" : "الدورات التدريبية"}
        </h1>
        <div className="flex justify-between phone-only:flex-col-reverse gap-10 items-start">
          <section className="md:flex-[3]">
            {projects.map((project, i) => (
              <div key={i} id={project.slug} className={cn(i !== 0 && "mt-20")}>
                <div className="flex justify-between phone-only:flex-col phone-only:gap-1 phone-only:items-start items-center mb-5">
                  <h3 className="font-extrabold text-2xl">
                    {`${i + 1}. `}
                    {project.title}
                  </h3>
                  <span className="text-sm text-foreground/80">
                    {project.period} <LangRenderer ar={"شهر"} en={"month"} />
                  </span>
                </div>
                <p>
                  <span className="font-bold text-xl">
                    <LangRenderer ar="الأهداف" en="Goals" />
                  </span>{" "}
                  :{" "}
                  {
                    <span
                      className="my-5"
                      dangerouslySetInnerHTML={{
                        __html: project.goals.replace(/\n/g, `<br  />`),
                      }}
                    />
                  }
                </p>
                <p className="mt-5">
                  <span className="font-bold text-xl">
                    <LangRenderer ar="المحاور الرئيسية" en="Key Topics" />
                  </span>{" "}
                  :{" "}
                  {
                    <span
                      className="my-5 block"
                      dangerouslySetInnerHTML={{
                        __html: project.description.replace(/\n/g, `<br  />`),
                      }}
                    />
                  }
                </p>
                <Separator className="bg-foreground/50" />
              </div>
            ))}

            {other_projects && (
              <div id="other-projects" className="mt-20">
                <h2 className="font-extrabold text-2xl">
                  {lang === "en" ? "Other Projects" : "مشاريع أخرى"}
                </h2>
                <p
                  className="my-5"
                  dangerouslySetInnerHTML={{
                    __html: other_projects.replace(/\n/g, `<br  />`),
                  }}
                />
              </div>
            )}
          </section>
          <section className="md:flex-1 ">
            <ol>
              {projects.map((project, i) => (
                <li key={i} className="w-full block">
                  <CustomLink
                    variant={"link"}
                    className="phone-only:whitespace-normal phone-only:my-2"
                    href={`#${project.slug}`}
                  >
                    {i + 1} {" - "}
                    {project.title}
                  </CustomLink>
                </li>
              ))}
              <li>
                <CustomLink
                  className=""
                  variant={"link"}
                  href={`#other-projects`}
                >
                  {projects.length + 1} {" - "}
                  {lang === "en" ? "Other Projects" : "مشاريع أخرى"}
                </CustomLink>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
};

export default GoalsPage;
