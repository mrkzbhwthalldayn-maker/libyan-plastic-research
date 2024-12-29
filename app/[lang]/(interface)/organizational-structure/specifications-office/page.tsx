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
      title: "مكتب المواصفات",
      description:
        "المركز الليبي لبحوث اللدائن هو الجهة الوحيدة في ليبيا لإجراء الاختبارات والتحاليل على المنتجات البلاستيكية ومطابقتها للمواصفات القياسية.",
    },
    en: {
      title: "Specifications Office",
      description:
        "The Libyan Center for Polymer Research is the only entity in Libya conducting tests and analyses on plastic products and ensuring their compliance with standards.",
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

const SpecificationsOfficePage = async ({
  params,
}: {
  params: Promise<{ lang: "ar" | "en" }>;
}) => {
  const { lang } = await params;

  const content = {
    ar: {
      title: "مكتب المواصفات",
      description: `
        المركز الليبي لبحوث اللدائن هو الجهة الوحيدة في ليبيا التي يمكن أن تجري الاختبارات والتحاليل على المنتجات البلاستيكية ومطابقة المواصفات القياسية عليها، وللمشاركة في بناء ليبيا الجديدة، وللرفع من مستوى الصناعات البلاستيكية من ناحية تحسين جودة المنتج باستخدام مواد مناسبة وغير ضارة للإنسان والبيئة ينتج عنه حماية للمستهلك والمحافظة على بيئة سليمة وهذا يؤدي إلى ترشيد واقتصاد للمصروفات في القطاعين الصحي والبيئي، يقوم المركز الليبي لبحوث اللدائن بالاستشارات والنصائح العلمية للمصنعين المحليين، وضبط جودة المنتجات البلاستيكية المصنعة محلياً أو المستوردة من الخارج.

        حيث يُعتبر المركز طرف محايد بين المُصنع والمستهلك (طرف ثالث)، وحَكَم لمدى مطابقة جودة المنتجات البلاستيكية للمواصفات، وقد اكتسب المركز ثقة الجهات العامة والخاصة الوطنية منها والأجنبية (الزبائن) وذلك لتتبعه المنهج العلمي في اجراء الاختبارات، وإعداد التقارير، وتقديم الدعم الفني لمحاولة تدليل الصعاب للمصنعين، والرد على استفسارات الموردين.

        أهدف مكتب المواصفات:
        - مراقبة وضبط جودة المنتجات البلاستيكية المصنعة محلياً والمستوردة من الخارج بإجراء الاختبارات والتحاليل اللازمة طبقاً للمواصفات القياسية الليبية أو الدولية.
        - المشاركة في توطين وخلق مناخ مناسب للرفع من مستوي الصناعات البلاستيكية بالداخل.
        - ضمان استخدام المواد البلاستيكية الصديقة للبيئة والخالية من السموم والمواد الضارة وذلك للمحافظة علي صحة المواطن والبيئة المحيطة.
        - عند تطبيق المواصفات القياسية على المواد المستخدمة في البنية التحتية يمكن الحصول علي جودة عالية وعلى أقصى عمر تشغيلي لها.
        - إعداد التقارير الفنية للمكاتب الاستشارية أو للشركات المصنعة أو الشركات المنفذة لمشاريع البنية التحتية.
        - الدعم الفني والعلمي وتقديم الاستشارات للمصنعين المحليين وذلك بالتعاون مع الإدارات الأخرى بالمركز.
        - توعية المستهلك بخطورة الغش التجاري وتبصيره بالضرر البالغ نتيجة تهافته على شراء السلع الرخيصة المتدنية الجودة وتحفيزه على التأكد من جودة السلعة وسلامتها.

        الاستشارات العلمية والفنية لمكتب المواصفات:
        - اختبار وتحليل عينات مُصنّعة من مواد لدائنيه (بلاستكية) ومطاطية، سواءً كانت على صورة مادة خام أو منتج شبه مُصنع أو مُنتج نهائي.
        - أمثلة على المواد:
          1. المواد الخام المصنعة للمواد البلاستيكية.
          2. المواد البلاستيكية الملامسة للأغذية وتغليفها.
          3. الألعاب والقرطاسية.
          4. الإطارات والنضائد.
          5. مواد البناء والأنابيب البلاستيكية.
      `,
    },
    en: {
      title: "Specifications Office",
      description: `
        The Libyan Center for Polymer Research is the sole entity in Libya capable of conducting tests and analyses on plastic products, ensuring their compliance with standards, and contributing to the development of Libya's plastic industries through improved quality and environmentally friendly materials.

        The center acts as an impartial party between manufacturers and consumers (a third party) and as an adjudicator of the compliance of plastic product quality to standards. It has gained the trust of both national and foreign public and private entities (clients) by adhering to scientific methods in testing, reporting, and providing technical support to resolve challenges for manufacturers and respond to supplier inquiries.

        Goals of the Specifications Office:
        - Monitoring and ensuring the quality of locally manufactured and imported plastic products.
        - Participating in fostering a conducive environment for advancing plastic industries.
        - Ensuring the use of environmentally friendly, non-toxic plastic materials.
        - Applying standards to materials used in infrastructure to achieve high quality and maximum lifespan.
        - Preparing technical reports for consultancy offices, manufacturers, and infrastructure project implementers.
        - Providing scientific and technical support and consultations to local manufacturers.
        - Raising consumer awareness about the dangers of counterfeit goods and encouraging the verification of product quality and safety.

        Scientific and Technical Consulting:
        - Testing and analyzing samples made of plastic and rubber materials, whether in raw, semi-manufactured, or finished forms.
        - Examples of materials include:
          1. Raw materials for plastics.
          2. Food-contact and packaging plastics.
          3. Toys and stationery.
          4. Tires and rubber parts.
          5. Construction materials and plastic pipes.
      `,
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
          <p className="text-foreground/90 whitespace-pre-line">
            {currentContent.description}
          </p>
        </section>
      </div>
    </main>
  );
};

export default SpecificationsOfficePage;
