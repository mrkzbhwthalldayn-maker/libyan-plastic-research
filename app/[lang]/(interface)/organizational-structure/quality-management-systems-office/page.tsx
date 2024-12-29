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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const content = {
    ar: {
      title: "التعريف بمكتب نظم إدارة الجودة",
      description:
        "يُعد مكتب نظم إدارة الجودة جزءًا رئيسيًا من الهيكل الوظيفي للمركز الليبي لبحوث اللدائن، ويهتم بضمان الجودة وتطبيق المواصفات القياسية العالمية.",
    },
    en: {
      title: "Introduction to the Quality Management Systems Office",
      description:
        "The Quality Management Systems Office is a key part of the organizational structure of the Libyan Center for Polymer Research, focusing on quality assurance and the application of international standards.",
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
  const content = {
    ar: {
      title: "التعريف بمكتب نظم إدارة الجودة",
      description:
        "الهيكل الوظيفي للمركز الليبي لبحوث اللدائن يوجد به مكتب يهتم بضمان الجودة تحت مسمى مكتب نظم إدارة الجودة، والذي يعمل على وضع الخطط والاستراتيجيات الملائمة لتأسيس نظام إدارة الجودة الشاملة، ومتابعة وتحسين الأداء وتطويره، وتطبيق المواصفات العالمية القياسية. يقوم بتسيير العمل في مكتب نظم إدارة الجودة موظفين أكفاء تم تدريبهم وتأهيلهم عن طريق الدورات التدريبية وورش العمل والمحاضرات الدورية والتوعوية المتعلقة بنظم إدارة الجودة، حتى يكونوا قادرين على بناء وتأسيس نظام الجودة الشاملة داخل المركز. ",
      sections: [
        {
          heading: "مهام مكتب نظم إدارة الجودة:",
          items: [
            "تأسيس نظام إدارة الجودة الشاملة ومتابعة تطبيقه وتحسينه وتطويره وفق المواصفات العالمية.",
            "إعداد النماذج الإدارية المعتمدة التي تسهل عمل الإدارات والمكاتب.",
            "الاتصال بالجهات الداخلية والخارجية فيما يخص إنشاء وتطبيق إدارة الجودة الشاملة.",
            "الإشراف والمتابعة للمراجعات الداخلية والخارجية والجهات المانحة الخاصة بنظام الجودة الشاملة.",
            "تحديد لجان للتدقيق الداخلي لتأكيد الجودة في كافة الإدارات.",
            "تحديد أسس الرقابة والمتابعة والتقييم الدوري لنظام إدارة الجودة للاعتماد والتطوير المستمر.",
            "دراسة وتحليل التقارير الواردة من فريق التدقيق الداخلي.",
            "إعداد التقارير الدورية والسنوية الخاصة بأداء نظام إدارة الجودة الشاملة ورفعها إلى المدير العام.",
            "توعية الموظفين بأهمية تطبيق نظام الجودة من خلال إعطاء المحاضرات وورش العمل وكذلك طباعة المطويات ووضع اللافتات التي تتضمن مقولات عن أهمية الجودة.",
            "اقتراح دورات تدريبية على إدارة المركز لوضعها ضمن الخطة السنوية للتدريب.",
          ],
        },
      ],
    },
    en: {
      title: "Introduction to the Quality Management Systems Office",
      description: `The organizational structure of the Libyan Center for Plastics Research includes an office dedicated to quality assurance, known as the Quality Management Systems Office. This office is responsible for developing appropriate plans and strategies to establish a total quality management system, monitoring, improving, and developing performance, and implementing international standard specifications.

The work of the Quality Management Systems Office is carried out by competent employees who have been trained and qualified through training courses, workshops, and regular awareness lectures related to quality management systems. This ensures they are capable of building and establishing a comprehensive quality system within the center.`,
      sections: [
        {
          heading: "Responsibilities of the Quality Management Systems Office:",
          items: [
            "Establishing and continuously improving a comprehensive quality management system in compliance with international standards.",
            "Preparing standardized administrative templates to facilitate work within departments and offices.",
            "Communicating with internal and external entities regarding the implementation of the quality management system.",
            "Supervising and following up on internal and external audits related to the quality management system.",
            "Appointing internal audit committees to ensure quality across all departments.",
            "Defining criteria for monitoring, follow-up, and periodic evaluation of the quality management system for continuous improvement.",
            "Reviewing and analyzing reports from the internal audit team.",
            "Preparing periodic and annual reports on the quality management system's performance and submitting them to senior management.",
            "Raising awareness among employees about the importance of quality management through workshops, lectures, and printed materials.",
            "Recommending training courses to be included in the annual training plan.",
          ],
        },
      ],
      slug: "quality-management-systems-office",
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

        <section
          className={`p-6 container rounded-lg ${
            lang === "ar" ? "text-right" : "text-left"
          }`}
        >
          <h1 className="text-2xl font-bold mb-4">{currentContent.title}</h1>
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
