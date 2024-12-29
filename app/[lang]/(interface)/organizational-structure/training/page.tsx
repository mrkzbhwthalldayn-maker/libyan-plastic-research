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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "ar" | "en" }>;
}) {
  const { lang } = await params;

  const content = {
    ar: {
      title: "التدريب",
      description:
        "تحت شعار بالتدريب ننهض ونتطور، يعمل المركز الليبي لبحوث اللدائن على تطوير كفاءات الموظفين من خلال دورات داخلية وخارجية وفقاً لخطط سنوية.",
    },
    en: {
      title: "Training",
      description:
        "Under the motto 'With training, we rise and progress,' the Libyan Center for Polymer Research develops employee skills through internal and external courses based on annual plans.",
    },
  };

  const currentContent = content[lang];

  return {
    title: currentContent.title,
    description: currentContent.description,
    openGraph: {
      title: currentContent.title,
      description: currentContent.description,
      type: "article",
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title: currentContent.title,
      description: currentContent.description,
    },
  };
}

const TrainingPage = async ({
  params,
}: {
  params: Promise<{ lang: "ar" | "en" }>;
}) => {
  const { lang } = await params;

  const content = {
    ar: {
      title: "التدريب",
      description:
        "منذ تأسيسه وتحت شعار بالتدريب ننهض ونتطور ونرتقي يحرص المركز الليبي لبحوث اللدائن وبشكل مستمر من خلال مكتب التدريب العمل على الرفع من كفاءة الموظفين والعاملين والبحاث بالمركز في كافة التخصصات الفنية والإدارية والعلمية وذلك بإلحاقهم بدورات تدريبية في مجالات مختلفة داخلية وخارجية وفقاً للخطط التدريبية السنوية للمركز.",
      goals: [
        "ترشيح الموظفين للدورات المناسبة بالتعاون مع مؤسسات محلية.",
        "إقامة دورات اللغة الإنجليزية ومهارات الحاسب الآلي.",
        "إيفاد الموظفين للدراسة والتدريب في دول عربية وأجنبية.",
        "تطوير المهارات والكفاءات لتحسين الأداء والمخرجات.",
      ],
    },
    en: {
      title: "Training",
      description:
        "Since its establishment and under the motto 'With training, we rise and progress,' the Libyan Center for Polymer Research continuously works through its Training Office to enhance the efficiency of employees, researchers, and staff across all technical, administrative, and scientific disciplines by enrolling them in various internal and external training courses according to the center's annual training plans.",
      goals: [
        "Nominating employees for suitable courses in collaboration with local institutions.",
        "Organizing English language and computer skills courses.",
        "Sending employees abroad for study and training in Arab and foreign countries.",
        "Developing skills and competencies to improve performance and outcomes.",
      ],
    },
  };

  const currentContent = content[lang];

  return (
    <main className="min-h-[50vh] bg-secondary">
      <div className="container">
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
              <BreadcrumbPage>{currentContent.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-extrabold my-10 md:text-3xl text-2xl">
          {currentContent.title}
        </h1>
        <section
          className={`p-6 container rounded-lg ${
            lang === "ar" ? "text-right" : "text-left"
          }`}
        >
          <p className="text-foreground/90 mb-4">
            {currentContent.description}
          </p>
          <ul className="list-disc list-inside space-y-4">
            {currentContent.goals.map((goal, idx) => (
              <li key={idx}>{goal}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default TrainingPage;
