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
      title: "إدارة الشؤون الإدارية والمالية",
      description:
        "تختص هذه الإدارة بتنظيم وتنفيذ الأعمال الإدارية والمالية وضمان الامتثال للقوانين واللوائح، مع إعداد التقارير المالية وتوفير الصيانة اللازمة للمباني.",
    },
    en: {
      title: "Administrative and Financial Affairs Department",
      description:
        "Responsible for organizing and executing administrative and financial tasks, ensuring compliance with laws, preparing financial reports, and providing necessary maintenance for facilities.",
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

const AdministrativeAndFinancialAffairsPage = async ({
  params,
}: {
  params: Promise<{ lang: "ar" | "en" }>;
}) => {
  const { lang } = await params;

  const content = {
    ar: {
      title: "إدارة الشؤون الإدارية والمالية",
      description:
        "تختص هذه الإدارة بتنظيم وتنفيذ الأعمال الإدارية والمالية وضمان الامتثال للقوانين واللوائح، مع إعداد التقارير المالية وتوفير الصيانة اللازمة للمباني.",
      tasks: [
        "إعداد الميزانية التقديرية للمركز.",
        "إعداد الوضع المالي والموقف المالي للمركز بصفة دورية.",
        "إعداد الحساب الختامي في نهاية كل سنة مالية.",
        "القيام بالأعمال والإجراءات المتعلقة بالشؤون الوظيفية ومتابعة التغيير.",
        "المشاركة في إعداد الملاك الوظيفي.",
        "إعداد تقارير الكفاءة السنوية للموظفين وتحديد المرشحين منهم للترقية والعلاوات السنوية.",
        "القيام بأعمال خدمات الصيانة للمبنى ومرافقه.",
        "ما يستجد من أعمال.",
      ],
    },
    en: {
      title: "Administrative and Financial Affairs Department",
      description:
        "Responsible for organizing and executing administrative and financial tasks, ensuring compliance with laws, preparing financial reports, and providing necessary maintenance for facilities.",
      tasks: [
        "Preparing the center's estimated budget.",
        "Preparing periodic financial and status reports for the center.",
        "Preparing the final accounts at the end of each fiscal year.",
        "Handling personnel-related affairs and tracking changes.",
        "Participating in the preparation of the staffing structure.",
        "Preparing annual performance reports for employees and identifying candidates for promotions and annual bonuses.",
        "Carrying out maintenance services for the building and its facilities.",
        "Managing additional tasks as they arise.",
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
            {currentContent.tasks.map((task, idx) => (
              <li key={idx}>{task}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default AdministrativeAndFinancialAffairsPage;
