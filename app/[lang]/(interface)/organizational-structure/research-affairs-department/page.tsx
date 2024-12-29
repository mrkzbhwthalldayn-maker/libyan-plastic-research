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
      title: "إدارة الشؤون البحثية",
      description:
        "تختص هذه الإدارة بوضع الخطط والاستراتيجيات العامة للبحوث والدراسات المتعلقة بالبوليمرات مع تقديم الاستشارات ونشر الوعي الصناعي والبحثي في ليبيا.",
    },
    en: {
      title: "Research Affairs Department",
      description:
        "Responsible for developing strategies for polymer research, providing consultations, publishing scientific materials, and raising awareness in Libya's research and industrial sectors.",
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

const ResearchAffairsPage = async ({
  params,
}: {
  params: Promise<{ lang: "ar" | "en" }>;
}) => {
  const { lang } = await params;

  const content = {
    ar: {
      title: "إدارة الشؤون البحثية",
      description:
        "تختص هذه الادارة بوضع الخطط والاستراتيجيات العامة للبحوث والدراسات مختلفة المدى ذات العلاقة بتخصص المركز (البوليمرات او ما يعرف باللدائن) مع وضع معايير واساليب تنفيذها بالمعايير العلمية الصحيحة. كما تقوم الادارة بتقديم الاستشارات العلمية والفنية الى الجامعات والمعاهد والمراكز البحثية الاخرى والقطاع الصناعي (العام والخاص).  بالإضافة لذلك, تعمل الادارة على اصدار ونشر الكتيبات والمطويات العلمية التي تخدم المجال البحثي والصناعي في ليبيا والمشاركة في توعية المواطنين والمصنعين والموردين بأهمية المواد والمنتجات البلاستيكية والطرق المناسبة والامنة لاستخدامها والتخلص منها. تقوم الإدارة ايضاً بالإشراف على أعضاء هيئة التدريس والباحثين العلميين بالمركز ومتابعة أبحاثهم، بالإضافة إلى المساهمة في توفير الاحتياجات البحثية من مواد ومعدات وغيرها بما يضمن قيامهم بالتجارب والقياسات المعملية والتحاليل اللازمة لتحقيق أهداف المركز. يتبع الإدارة عدة اقسام ووظائف حيث يتولى كل قسم إجراء ومتابعة البحوث والدراسات في مجال معين لغرض تطوير هذا المجال في ليبيا مع التركيز على المشاريع والبحوث التي تهتم بالبيئة واعادة التدوير واستخدام الموارد المحلية وتقييم المنتجات البلاستيكية المتوفرة في السوق الليبي. كما تعمل الإدارة على تبنى مشاريع التخرج لطلبة الجامعات والمعاهد في مجال البوليمرات وتطبيقاتها لما له من دور حيوي في تطوير البحث العلمي. يتبع الإدارة عدة اقسام كما يلي:  ",
      divisions: [
        "قسم البوليمرات الصناعية والهندسية",
        "قسم المواد البوليميرية المركبة والمتطورة",
        "قسم الأغشية البوليميرية",
        "قسم الاستشارات وخدمة القطاع الصناعي",
        "المكتبة",
        "أمين أرشفة الإنتاج العلمي",
      ],
    },
    en: {
      title: "Research Affairs Department",
      description: `This department specializes in developing general plans and strategies for research and studies of various scopes related to the center's specialization (polymers, also known as plastics), while establishing standards and methods for their implementation in accordance with proper scientific criteria. The department also provides scientific and technical consultations to universities, institutes, other research centers, and the industrial sector (both public and private).

Additionally, the department works on issuing and publishing scientific booklets and brochures that serve the research and industrial fields in Libya, as well as raising awareness among citizens, manufacturers, and suppliers about the importance of plastic materials and products, as well as the proper and safe methods for their use and disposal.

The department also supervises the faculty members and scientific researchers at the center and monitors their research activities. Furthermore, it contributes to providing research requirements such as materials, equipment, and other necessities to ensure the successful execution of experiments, laboratory measurements, and analyses required to achieve the center's objectives.

The department includes several divisions and roles, each responsible for conducting and monitoring research and studies in a specific field, aiming to develop that field in Libya. Special emphasis is placed on projects and research focusing on the environment, recycling, utilizing local resources, and evaluating the plastic products available in the Libyan market.

The department also adopts graduation projects for university and institute students in the field of polymers and their applications, recognizing their vital role in advancing scientific research. The department consists of the following divisions:`,
      divisions: [
        "Industrial and Engineering Polymers Division",
        "Composite and Advanced Polymeric Materials Division",
        "Polymeric Membranes Division",
        "Consulting and Industrial Sector Services Division",
        "Library",
        "Scientific Production Archiving Coordinator",
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
          <ul className="list-decimal list-inside space-y-4">
            {currentContent.divisions.map((division, idx) => (
              <li key={idx}>{division}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default ResearchAffairsPage;
