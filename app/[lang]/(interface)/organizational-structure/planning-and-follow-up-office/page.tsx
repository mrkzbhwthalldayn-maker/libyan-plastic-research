import { Locale } from "@/i18n-config";
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
import { getDictionary } from "@/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const content = {
    ar: {
      title: "التعريف بمكتب التخطيط والمتابعة",
      description:
        "يعتبر مكتب التخطيط والمتابعة أحد الركائز الرئيسية في المركز الليبي لبحوث اللدائن، وهو مسؤول عن تنظيم وتنسيق الخطط داخل المركز.",
    },
    en: {
      title: "Introduction to the Planning and Follow-Up Office",
      description:
        "The Planning and Follow-Up Office is one of the main pillars of the Libyan Center for Polymer Research. It is responsible for organizing and coordinating plans within the center.",
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

const page = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const page = dictionary.organizational_structure_pages[0];

  const content = {
    ar: {
      title: "التعريف بمكتب التخطيط والمتابعة",
      description:
        "يعتبر مكتب التخطيط والمتابعة أحد الركائز الرئيسية في المركز الليبي لبحوث اللدائن، وهو مسؤول عن تنظيم وتنسيق الخطط داخل المركز. يهدف المكتب إلى ضمان تحقيق الخطط والأهداف الاستراتيجية والتشغيلية للمركز من خلال مراقبة الأداء وتقييم النتائج.",
      sections: [
        {
          heading: "وضع الخطط الاستراتيجية:",
          items: [
            "تطوير الخطط التنفيذية والاستراتيجية طويلة الأمد لتحقيق رؤية وأهداف المركز.",
            "العمل على تحديث الخطط الاستراتيجية بناءً على التغيرات.",
            "المشاركة في وضع الميزانيات.",
          ],
        },
        {
          heading: "المتابعة والتقييم:",
          items: [
            "مراقبة تنفيذ الخطط التنفيذية والاستراتيجية والتشغيلية.",
            "تقييم الأداء وتحليل النتائج لتحديد نقاط القوة والضعف.",
          ],
        },
        {
          heading: "إعداد التقارير:",
          items: [
            "إعداد التقارير الدورية حول أداء المركز وتقديمها للإدارة العليا.",
            "توفير البيانات والإحصاءات التي تساعد في اتخاذ القرارات.",
          ],
        },
        {
          heading: "التنسيق بين الوحدات المختلفة:",
          items: [
            "تسهيل التواصل والتنسيق بين مختلف الإدارات والوحدات.",
            "ضمان تكامل الأنشطة وتجنب التكرار غير الضروري.",
          ],
        },
        {
          heading: "تطوير العمليات والإجراءات:",
          items: [
            "مراجعة وتطوير العمليات والإجراءات لضمان الكفاءة والجودة.",
            "تقديم التوصيات لتحسين الأداء وتبسيط الإجراءات.",
          ],
        },
      ],
    },
    en: {
      title: "Introduction to the Planning and Follow-Up Office",
      description:
        "The Planning and Follow-Up Office is one of the main pillars of the Libyan Center for Polymer Research. It is responsible for organizing and coordinating plans within the center. The office aims to ensure the achievement of the center's strategic and operational goals by monitoring performance and evaluating results.",
      sections: [
        {
          heading: "Strategic Planning:",
          items: [
            "Developing long-term operational and strategic plans to achieve the center's vision and goals.",
            "Updating strategic plans based on changes.",
            "Participating in budget preparation.",
          ],
        },
        {
          heading: "Monitoring and Evaluation:",
          items: [
            "Monitoring the implementation of operational, strategic, and executive plans.",
            "Evaluating performance and analyzing results to identify strengths and weaknesses.",
          ],
        },
        {
          heading: "Report Preparation:",
          items: [
            "Preparing periodic reports on the center's performance and presenting them to senior management.",
            "Providing data and statistics to support decision-making.",
          ],
        },
        {
          heading: "Coordination Among Departments:",
          items: [
            "Facilitating communication and coordination between various departments and units.",
            "Ensuring activity integration and avoiding unnecessary duplication.",
          ],
        },
        {
          heading: "Process and Procedure Development:",
          items: [
            "Reviewing and developing processes and procedures to ensure efficiency and quality.",
            "Providing recommendations to improve performance and streamline procedures.",
          ],
        },
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
              <BreadcrumbPage>{page.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-extrabold my-10 md:text-3xl text-2xl">
          {page.title}
        </h1>

        <section
          className={`p-6 container rounded-lg ${
            lang === "ar" ? "text-right" : "text-left"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">{currentContent.title}</h2>
          <p className="text-foreground/90 mb-4">
            {currentContent.description}
          </p>
          {currentContent.sections.map((section, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{section.heading}</h3>
              <ul className="list-disc list-inside space-y-2">
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default page;
