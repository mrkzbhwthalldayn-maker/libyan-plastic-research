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
import Image from "next/image";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "ar" | "en" }>;
}) {
  const { lang } = await params;

  const content = {
    ar: {
      title: "إدارة المعامل والمختبرات",
      description:
        "تختص هذه الإدارة بالتخطيط وتنظيم وإجراء الاختبارات المعملية في مجال علم البوليمرات من خلال مختبرات مجهزة بأحدث الأجهزة العلمية لتلبية احتياجات البوليمرات.",
    },
    en: {
      title: "Laboratory and Testing Department",
      description:
        "Specializes in planning, organizing, and conducting laboratory tests in polymer science through advanced labs equipped for polymer-specific needs.",
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

const LaboratoryAndTestingPage = async ({
  params,
}: {
  params: Promise<{ lang: "ar" | "en" }>;
}) => {
  const content = {
    ar: {
      title: "إدارة المعامل والمختبرات",
      description:
        "تختص هذه الإدارة بالتخطيط وتنظيم وإجراء الاختبارات المعملية في مجال علم البوليمرات من خلال مختبرات مجهزة بأحدث الأجهزة العلمية لتلبية احتياجات البوليمرات. المختبرات موزعة كالتالي:",
      labs: [
        {
          heading: "مختبر كيمياء البوليمرات",
          description:
            "يختص بإجراء التجارب الكيميائية الكلاسيكية وتحضير البوليمرات وتحويرها.",
        },
        {
          heading: "مختبر التحليل الحراري",
          description:
            "يختص بإجراء اختبارات التحليل الحراري مثل درجة الانتقال الزجاجي والانصهار.",
        },
        {
          heading: "مختبر التحليل الجزيئي",
          description: "يقيس اللزوجة والكثافة ونفاذية بخار الماء.",
        },
        {
          heading: "مختبر التحليل الطيفي",
          description:
            "يُجري اختبارات الطيف الضوئي، الأشعة تحت الحمراء، والامتصاص الذري.",
        },
        {
          heading: "مختبر التحليل المجهري",
          description: "يفحص الخصائص السطحية والفحوصات المجهرية.",
        },
        {
          heading: "مختبر التطبيقات التقنية للبوليمرات",
          description:
            "يركز على التقنيات الحديثة كالغزل الكهربائي والطباعة ثلاثية الأبعاد.",
        },
        {
          heading: "مختبر تشكيل البوليمرات",
          description: "يهتم بتشكيل البوليمرات وتحضير العينات للاختبارات.",
        },
        {
          heading: "مختبر الخواص الميكانيكية",
          description: "يجري اختبارات الشد والانضغاط والصلادة.",
        },
      ],
    },
    en: {
      title: "Laboratory and Testing Department",
      description:
        "Specializes in planning, organizing, and conducting laboratory tests in polymer science through advanced labs equipped for polymer-specific needs. The labs are distributed as follows:",
      labs: [
        {
          heading: "Polymer Chemistry Lab",
          description:
            "Conducts classic chemical experiments and polymer preparation and modification.",
        },
        {
          heading: "Thermal Analysis Lab",
          description:
            "Handles thermal testing of polymers, such as glass transition and melting points.",
        },
        {
          heading: "Molecular Analysis Lab",
          description:
            "Measures viscosity, density, and water vapor permeability.",
        },
        {
          heading: "Spectroscopy Lab",
          description:
            "Performs tests like infrared, ultraviolet, and atomic absorption spectroscopy.",
        },
        {
          heading: "Microscopic Analysis Lab",
          description:
            "Examines surface properties and conducts microscopic tests.",
        },
        {
          heading: "Technical Applications Lab for Polymers",
          description:
            "Focuses on modern techniques such as 3D printing and high-voltage electrospinning.",
        },
        {
          heading: "Polymer Molding Lab",
          description:
            "Specializes in polymer molding and sample preparation for tests.",
        },
        {
          heading: "Mechanical Properties Lab",
          description:
            "Conducts tensile, compression, fracture, penetration, and hardness tests.",
        },
      ],
    },
  };
  const { lang } = await params;

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
            {currentContent.labs.map((lab, idx) => (
              <li key={idx}>
                <strong>{lab.heading}:</strong> {lab.description}
              </li>
            ))}
          </ul>
        </section>
        <div className="container mx-auto p-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 7 }).map((_, idx) => (
              <Image
                key={idx}
                src={`/images/lab/${`word_media_image${idx + 1}.jpeg`}`}
                alt={`word_media_image${idx + 1}.jpeg`}
                width={1000}
                height={1000}
                className="mt-2 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LaboratoryAndTestingPage;
