import LangBreadcrumbSeparator from "@/components/breadcrumb-separator";
import LangRenderer from "@/components/lang";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Link from "next/link";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> => {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang);
  const title =
    lang === "en"
      ? "Center Goals - Libyan Polymer Research Center"
      : "أهداف المركز - المركز الليبي لبحوث اللدائن";
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
      siteName: lang === "en" ? "Center Goals" : "أهداف المركز",
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

export const GoalsPage = async (props: {
  params: Promise<{ lang: Locale }>;
}) => {
  const params = await props.params;
  const lang = params.lang;

  const content = {
    ar: {
      goals: [
        "إعداد الكوادر الوطنية في مجال تقنية المواد البوليمرية.",
        "إجراء التحاليل الفيزيائية والكيميائية والميكانيكية والحرارية للمواد البوليمرية والبلاستيكية.",
        "وضع وتنفيذ البرامج البحثية والتدريبية المتعلقة بالمواد البوليمرية والبلاستيكية.",
        "التعاون مع المؤسسات الوطنية والأجنبية ذات العلاقة.",
        "تقديم المساعدات والاستشارات الفنية للجهات العامة والخاصة.",
        "التعاون مع الجهات ذات الاختصاص في إعداد المواصفات القياسية الليبية للعديد من المنتجات البلاستيكية.",
        "التوعية بالمخاطر البيئية والاقتصادية للمخلفات البلاستيكية ومحاولة توطين إعادة تدوير هذه المخلفات.",
        "ضمان جودة المنتجات البلاستيكية المصنعة محلياً والموردة من الخارج.",
        "إعداد برامج لنقل المعرفة والتقنية المستخدمة في مجال اللدائن.",
        "إنتاج وتحسين المواد البلاستيكية من خلال تطويع التقنيات الحديثة والاستفادة من الموارد المحلية.",
        "إقامة وتنفيذ المشاريع والدراسات والبرامج التدريبية بالتعاون مع المؤسسات العلمية والصناعية في ليبيا.",
        "وضع البرامج التدريبية الخاصة بمهن اللدائن والتي تتعلق بـ:",
        "البرامج المتعلقة بنقل تقنيات اللدائن.",
        'التطبيقات الصناعية "تصنيع واستخدام" لتقنيات الأغشية.',
        "طرق البلمرة وإنتاج العوامل المساعدة المستخدمة في الصناعات النفطية.",
        "طرق إجراء التحاليل (الكيميائية والفيزيائية) المستخدمة في علوم اللدائن.",
        "تقنيات وعلوم وصناعة وإنتاج مواد الطلاء.",
        "إنتاج وتصنيع البولي إثيلين والبولي بروبيلين.",
        "تقنيات علوم إنتاج وتحويل اللدائن عن طريق القوالب.",
        "طرق إنتاج مواد الألياف الزجاجية المركبة.",
        "إقامة وتنفيذ البحوث والدراسات والبرامج التدريبية بالتعاون مع المؤسسات الصناعية وتشمل الصناعات النفطية واللدائن والمواد البلاستيكية والطلاء لغرض تحسين وتطوير هذه الصناعات المقامة حالياً.",
        "تشجيع إقامة البرامج البحثية المتعلقة بنشاط المركز بالتعاون مع الجامعات والمراكز المهنية والبحثية الأخرى.",
        "التعاون مع مراكز اليونسكو المتخصصة لوضع البرامج الخاصة بالتدريبات طويلة الأجل والبرامج التدريبية في مجال علوم وتقنيات اللدائن.",
        "كما يقوم المركز بتحقيق بعض الأهداف الأخرى مثل:",
        "إجراء التحاليل الكيميائية والفيزيائية والميكانيكية المستخدمة في علوم اللدائن للتأكد من جودة المنتجات البلاستيكية.",
        "إجراء البحوث العلمية ومشاريع التخرج لطلبة الجامعات والمعاهد العليا.",
        "المساعدة في حل المشاكل التي قد يتعرض لها القطاع الصناعي (الخاص والعام) في هذا المجال.",
      ],
    },
    en: {
      goals: [
        "Prepare national cadres in the field of polymer materials technology.",
        "Conduct physical, chemical, mechanical, and thermal analyses of polymeric and plastic materials.",
        "Develop and implement research and training programs related to polymeric and plastic materials.",
        "Collaborate with national and international institutions in related fields.",
        "Provide assistance and technical consultations to public and private entities.",
        "Collaborate with relevant organizations to establish Libyan standards for various plastic products.",
        "Raise awareness of the environmental and economic risks of plastic waste and promote recycling.",
        "Ensure the quality of locally manufactured and imported plastic products.",
        "Develop programs to transfer knowledge and technology used in polymer science.",
        "Produce and improve plastic materials by utilizing modern technologies and local resources.",
        "Conduct projects, studies, and training programs in collaboration with scientific and industrial institutions in Libya.",
        "Develop training programs specific to polymer professions, including:",
        "Programs for transferring polymer technologies.",
        "Industrial applications for the manufacture and use of membranes.",
        "Polymerization methods and production of additives for the oil industry.",
        "Methods of conducting chemical and physical analyses in polymer science.",
        "Techniques and sciences of paint production and manufacturing.",
        "Production and manufacturing of polyethylene and polypropylene.",
        "Techniques for polymer processing through molds.",
        "Methods for producing composite fiberglass materials.",
        "Conduct research, studies, and training programs with industrial institutions, including the oil, plastic, and paint industries, to improve and develop existing industries.",
        "Encourage research programs related to the center's activities in collaboration with universities and other research institutions.",
        "Collaborate with UNESCO specialized centers to develop long-term training programs in polymer science and technology.",
        "The center also achieves other goals such as:",
        "Conduct chemical, physical, and mechanical analyses used in polymer sciences to ensure the quality of plastic products.",
        "Conduct scientific research and graduation projects for university and college students.",
        "Assist in solving problems faced by the industrial sector (private and public) in this field.",
      ],
    },
  };

  const { goals } = content[lang ?? "ar"];

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
                {lang === "en" ? "Center Goals" : "أهداف المركز"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-extrabold my-10 md:text-3xl text-2xl">
          {lang === "en" ? "Center Goals" : "أهداف المركز"}
        </h1>
        <ul className="grid gap-3 phone-only:gap-5">
          {goals.map((goal, index) => (
            <li key={index} className="mb-2">
              {index + 1}
              {" - "}
              {goal}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default GoalsPage;
