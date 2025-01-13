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
import Image from "next/image";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> => {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang);
  const title =
    lang === "en"
      ? "Scientific and Technical Consultations - Libyan Polymer Research Center"
      : "الاستشارات العلمية والفنية - المركز الليبي لبحوث اللدائن";
  const description =
    lang === "en"
      ? "Explore our specialized laboratories focusing on polymer chemistry, thermal analysis, molecular analysis, and more. Discover advanced research and technologies."
      : "تعرف على مختبراتنا المتخصصة في كيمياء البوليمر، التحليل الحراري، التحليل الجزيئي، والمزيد. اكتشف أحدث الأبحاث والتقنيات.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/scientific-and-technical-consultations`,
    },
    openGraph: {
      title: title,
      description,
      url: `/${lang}/scientific-and-technical-consultations`,
      images: [
        ...dictionary.labs.map((lab) => ({
          url: lab.image,
          width: 1200,
          height: 630,
          alt: lab.title,
        })),
      ],
      locale: lang,
      siteName:
        lang === "en"
          ? "Scientific and Technical Consultations"
          : "الاستشارات العلمية والفنية",
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
const ConsultationsPage = async (props: {
  params: Promise<{ lang: Locale }>;
}) => {
  const params = await props.params;
  const lang = params.lang;

  const content = {
    ar: {
      title: "الاستشارات العلمية والفنية",
      description: `
          نظراً لتخصصه الدقيق في علوم البوليمرات والبلاستيك والبيئة، ونظراً للصدى العلمي الذي حققهُ في مجال البُحوث العلمية التي تخدم الإنسان والبيئة، فإن مركز بحوث اللدائن يتلقى عدداً كبيراً من الإستشارات الفنية العلمية من جهاتٍ عامة وخاصة تتمثل في بعض الأفراد والشركات والجامعات والمراكز البحثية من مُختلف مناطق ليبيا.
          
          هذه الاستشارات تتعلق بتحديد الهوية الكيميائية لبعض المواد البلاستيكية مجهولة الهوية ودراسة خواصها، كما قام المركز بتقديم إستشارات فنية لعدد من الشركات الأجنبية العاملة في ليبيا في مجال الانشاءات والبنية التحتية، بالإضافة لبعض الأفراد، والمؤسسات، والشركات، والجهات الرقابية حول خطر بعض المواد أو تصاعد غازات أبخرة من بعض مصانع البلاستيك.
        `,
      clientsTitle:
        "بعض الجهات العامة والخاصة والشركات والمصانع الوطنية والأجنبية التى تم تقديم الإستشارات الفنية لها",
      clients: [
        "الجهات القضائية (النيابة العامة)",
        "جهاز تنفيذ مشروعات الإسكان والمرافق.",
        "الشركة الليبية البرازيلية للإنشاءات.",
        "شركة الدرع الأهلية لصناعة المواسير",
        "مكتب التميز للاستشارات الهندسية.",
        "شركة ساينوهيدر الصينية للإنشاءات.",
        "شركة جيوسان التشيكية للإنشاءات.",
        "شركة الإنماء (مصنع جنزور للمواسير).",
        "شركة تكنوبل السولفينية لصناعة مواسير GRP.",
        "شركة الوسيط لخدمات النظافة العامة وحماية البيئة.",
        "شركة الوفير لخدمات النظافة العامة ونقل المخلفات.",
        "شركة أميتك ليبيا لصناعة GRP.",
        "شركة جنكيز التركية للإنشاءات.",
        "الشركة المتميزة لصناعة المواسير.",
        "شركة الأمان الصناعي والأعمال الهندسية.",
        "شركة النخبة للصناعات البلاستيكية.",
        "شركة سلطان للصناعات البلاستيكية.",
        "مصنع النبع لتعبئة المياه.",
        "مصنع الغويل لصناعة الأكياس البلاستيكية.",
        "مصنع أبو دبوس لصناعة القوارير البلاستيكية.",
        "منظمة مصنعي المواد البلاستيكية.",
        "تشاركية الساقي لتعبئة المياه.",
        "شركة التقنية للصناعات الغذائية.",
        "شركة دافق للصناعات الغذائية.",
        "شركة لوسين للإستيراد والتصدير.",
        "الإفراجات الجمركية.",
      ],
    },
    en: {
      title: "Scientific and Technical Consultations",
      description: `
          Given its specialization in polymer, plastic, and environmental sciences, and the scientific reputation it has achieved in research benefiting humanity and the environment, the Polymer Research Center receives numerous scientific and technical consultations from public and private entities, including individuals, companies, universities, and research centers across Libya.
  
          These consultations involve identifying the chemical nature of unknown plastic materials and studying their properties. The center has also provided technical consultations to several foreign companies operating in Libya in the fields of construction and infrastructure, as well as individuals, institutions, companies, and regulatory authorities about the risks associated with certain materials or emissions from some plastic factories.
        `,
      clientsTitle:
        "Some public and private entities, companies, and factories that have received technical consultations",
      clients: [
        "Judicial authorities (Public Prosecution).",
        "Housing and Utilities Projects Implementation Agency.",
        "Libyan-Brazilian Construction Company.",
        "Al-Deraa Al-Ahliya Pipe Manufacturing Company.",
        "Al-Tamayouz Engineering Consulting Office.",
        "Sinohydro Chinese Construction Company.",
        "Geosan Czech Construction Company.",
        "Al-Inmaa Company (Janzour Pipe Factory).",
        "Technobell Slovenian GRP Pipe Manufacturing Company.",
        "Al-Waseet Company for Public Cleaning and Environmental Protection.",
        "Al-Wafeer Company for Public Cleaning and Waste Transportation.",
        "Amitech Libya GRP Manufacturing Company.",
        "Cengiz Turkish Construction Company.",
        "Distinguished Pipe Manufacturing Company.",
        "Industrial Safety and Engineering Works Company.",
        "Elite Plastic Industries Company.",
        "Sultan Plastic Industries Company.",
        "Al-Naba Water Bottling Factory.",
        "Al-Ghuwail Plastic Bag Manufacturing Factory.",
        "Abu Dabous Plastic Bottle Manufacturing Factory.",
        "Plastic Material Manufacturers Organization.",
        "Al-Saqi Water Bottling Partnership.",
        "Techno Food Industries Company.",
        "Dafiq Food Industries Company.",
        "Lucine Import and Export Company.",
        "Customs Clearances.",
      ],
    },
  };

  const { title, description, clientsTitle, clients } = content[lang];

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
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-extrabold my-10 md:text-4xl text-2xl">{title}</h1>
        <p className="mb-8 md:text-xl text-lg">{description}</p>
        <h2 className="font-bold mt-10 mb-5 text-lg md:text-xl">
          {clientsTitle}
        </h2>
        <div className="md:flex justify-between">
          <ul className="grid gap-4">
            {clients.map((client, index) => (
              <li key={index} className="mb-2">
                {`${index + 1} - `} {client}
              </li>
            ))}
          </ul>
          <div className="my-2 grid grid-cols-1 md:grid-cols-2 h-fit lg:grid-cols-2 phone-only:gap-4 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-lg max-h-60">
                <Image
                  src={`/images/consultations/${index + 1}.jpg`}
                  alt={`Consultation-image ${index + 1}`}
                  width={400}
                  height={400}
                  className="rounded-lg object-cover w-full h-full phone-only:w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ConsultationsPage;
