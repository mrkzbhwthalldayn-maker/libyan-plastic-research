import SearchInput from "@/components/search";
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
import { Separator } from "@/components/ui/separator";
import { CustomLink } from "@/components/custom-link";
import { searchArticles } from "@/database/articles";
import { extractText } from "@/lib/text";
// Define types for centerData structure
interface CenterItem {
  title: string;
  description: string;
  link: string;
}

interface CenterData {
  about: CenterItem;
  goals: CenterItem[];
  hopes: CenterItem;
  organizational_structure: CenterItem[];
  scientific_and_technical_consultations: CenterItem[];
  // scientific_events: CenterItem[];
  labs: CenterItem[];
  // partners: CenterItem[];
}

// Define the structure of the data
const info = {
  ar: {
    about: {
      title: "التعريف بالمركز الليبي لبحوث اللدائن",
      description:
        "هو مؤسسة علمية متخصصة في بحوث وتقنية البوليمرات (اللدائن)، تم إنشاؤه بقرار رقم 625 لسنة 1999م كمركز بحثي متخصص يهدف إلى تحقيق نهضة تقنية وعلمية شاملة في مجال تقنية البوليميرات وتطبيقاتها.",
      link: "/about",
    },
    goals: [
      {
        title: "اهداف المركز",
        description: [
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
        ].join(","),
        link: "/goals",
      },
    ],
    hopes: {
      title: "رؤيتنا و مُهمتنا",
      description:
        "أن نكون مركزاً بحثياً متميزاً في مجال البوليمرات (اللدائن) وشريكاً في التنمية وصمام الأمان للبيئة وصحة المواطن | نشر بحوث ودراسات علمية في مجال البوليمرات تهدف إلى الاستفادة من موارد الوطن الطبيعية وحماية البيئة وصحة المواطن وتعزيز الاقتصاد.",
      link: "/#our-vision",
    },

    organizational_structure: [
      {
        title: "مدير عام المركز | General Director",
        description:
          "المسؤول عن الإدارة... | Responsible for the overall management...",
        link: "/organizational-structure#item-0",
      },
    ],
    labs: [
      {
        title: "مختبر كيمياء البوليمر",
        description:
          "مختبر متخصص في إجراء التجارب الكيميائية الكلاسيكية لتحضير البوليمرات وتعديل خواصها لتناسب تطبيقات مختلفة مثل التغليف، والمواد اللاصقة، والطلاء.",
        link: "/labs#polymer-chemistry-lab",
      },
      {
        title: "مختبر التحليل الحراري",
        description:
          "يهتم هذا المختبر بدراسة استقرار البوليمرات عند درجات الحرارة المختلفة وقياس خصائصها الحرارية مثل درجة الانتقال الزجاجي ودرجة الانصهار لضمان جودتها في الاستخدامات الصناعية.",
        link: "/labs#thermal-analysis-lab",
      },
      {
        title: "مختبر التحليل الجزيئي",
        description:
          "يعمل على تحليل الخصائص الجزيئية للبوليمرات من خلال قياس اللزوجة والكثافة ونفاذية بخار الماء لتحديد خصائص المواد المستخدمة في التغليف أو العزل.",
        link: "/labs#molecular-analysis-lab",
      },
      {
        title: "مختبر التحليل الطيفي",
        description:
          "يقوم المختبر بإجراء الاختبارات الطيفية باستخدام الأشعة تحت الحمراء والأشعة فوق البنفسجية وطيف الامتصاص الذري لتحليل تركيب المواد وتحديد نقاوتها.",
        link: "/labs#spectral-analysis-lab",
      },
      {
        title: "مختبر التحليل المجهري",
        description:
          "يوفر هذا المختبر تحليلًا دقيقًا للبنية المجهرية للبوليمرات واختبار الخواص السطحية مثل التوزيع الحبيبي والملمس، مما يساعد في تطوير المواد.",
        link: "/labs#microscopic-analysis-lab",
      },
      {
        title: "مختبر التطبيقات التقنية للبوليمرات",
        description:
          "يركز على تطبيق التكنولوجيا المتقدمة مثل الطباعة ثلاثية الأبعاد والغزل الكهربائي لإنتاج ألياف دقيقة تستخدم في التطبيقات الطبية والهندسية.",
        link: "/labs#polymer-technical-applications-lab",
      },
      {
        title: "مختبر تشكيل البوليمر",
        description:
          "يختص بتشكيل البوليمرات في أشكال محددة مثل الأفلام أو الألياف وتحضير عينات دقيقة لاستخدامها في الاختبارات الميكانيكية والفيزيائية.",
        link: "/labs#polymer-shaping-lab",
      },
      {
        title: "مختبر الخواص الميكانيكية",
        description:
          "يهتم بقياس مقاومة البوليمرات للقوى الميكانيكية مثل الشد والانضغاط والانحناء لضمان ملاءمتها للتطبيقات الهندسية المختلفة.",
        link: "/labs#mechanical-properties-lab",
      },
    ],
    scientific_and_technical_consultations: [
      {
        title: "الاستشارات العلمية والفنية",
        description:
          `
      
          نظراً لتخصصه الدقيق في علوم البوليمرات والبلاستيك والبيئة، ونظراً للصدى العلمي الذي حققهُ في مجال البُحوث العلمية التي تخدم الإنسان والبيئة، فإن مركز بحوث اللدائن يتلقى عدداً كبيراً من الإستشارات الفنية العلمية من جهاتٍ عامة وخاصة تتمثل في بعض الأفراد والشركات والجامعات والمراكز البحثية من مُختلف مناطق ليبيا.
          
          هذه الاستشارات تتعلق بتحديد الهوية الكيميائية لبعض المواد البلاستيكية مجهولة الهوية ودراسة خواصها، كما قام المركز بتقديم إستشارات فنية لعدد من الشركات الأجنبية العاملة في ليبيا في مجال الانشاءات والبنية التحتية، بالإضافة لبعض الأفراد، والمؤسسات، والشركات، والجهات الرقابية حول خطر بعض المواد أو تصاعد غازات أبخرة من بعض مصانع البلاستيك.
        
      ` +
          "بعض الجهات العامة والخاصة والشركات والمصانع الوطنية والأجنبية التى تم تقديم الإستشارات الفنية لها" +
          [
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
          ].join(","),
        link: "/scientific-and-technical-consultations",
      },
    ],
  },
  en: {
    about: {
      title: "Introduction to the Libyan Polymer Research Center",
      description:
        "A scientific institution specializing in polymer (plastic) research and technology. Established by decision No. 625 of 1999 as a specialized research center aimed at achieving a comprehensive scientific and technical renaissance in polymer technology and its applications.",
      link: "/about",
    },
    goals: [
      {
        title: "Center Goals",
        description: [
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
        ].join(","),
        link: "/goals",
      },
    ],
    hopes: {
      title: "Our Mission And Vision",
      description:
        "To be a distinguished research center in the field of polymers (plastics), a partner in development, and a safeguard for the environment and public health. | To publish scientific research and studies in the field of polymers aimed at utilizing natural resources, protecting the environment and public health, and enhancing the economy.",
      link: "/#our-vision",
    },

    organizational_structure: [
      {
        title: "مدير عام المركز | General Director",
        description:
          "المسؤول عن الإدارة... | Responsible for the overall management...",
        link: "/organizational-structure#item-0",
      },
    ],
    labs: [
      {
        title: "Polymer Chemistry Lab",
        link: "/labs#polymer-chemistry-lab",
        description:
          "A specialized lab conducting classical chemical experiments for synthesizing and modifying polymers to suit various applications such as packaging, adhesives, and coatings.",
      },
      {
        title: "Thermal Analysis Lab",
        link: "/labs#thermal-analysis-lab",
        description:
          "This lab focuses on studying the stability of polymers at different temperatures and measuring their thermal properties, such as glass transition and melting points, to ensure their quality in industrial applications.",
      },
      {
        title: "Molecular Analysis Lab",
        link: "/labs#molecular-analysis-lab",
        description:
          "Analyzes the molecular properties of polymers by measuring viscosity, density, and water vapor permeability, determining the characteristics of materials used in packaging or insulation.",
      },
      {
        title: "Spectral Analysis Lab",
        link: "/labs#spectral-analysis-lab",
        description:
          "Performs spectral tests using infrared, ultraviolet, and atomic absorption spectroscopy to analyze the composition of materials and determine their purity.",
      },
      {
        title: "Microscopic Analysis Lab",
        link: "/labs#microscopic-analysis-lab",
        description:
          "Provides detailed analysis of the microscopic structure of polymers and surface properties, such as grain distribution and texture, aiding in material development.",
      },
      {
        title: "Polymer Technical Applications Lab",
        link: "/labs#polymer-technical-applications-lab",
        description:
          "Focuses on applying advanced technologies such as 3D printing and electrospinning to produce fine fibers for medical and engineering applications.",
      },
      {
        title: "Polymer Shaping Lab",
        link: "/labs#polymer-shaping-lab",
        description:
          "Specializes in shaping polymers into specific forms like films or fibers and preparing precise samples for mechanical and physical testing.",
      },
      {
        title: "Mechanical Properties Lab",
        link: "/labs#mechanical-properties-lab",
        description:
          "Measures the resistance of polymers to mechanical forces such as tensile, compression, and bending to ensure their suitability for various engineering applications.",
      },
    ],
    scientific_and_technical_consultations: [
      {
        title: "Scientific and Technical Consultations",
        description:
          `Given its specialization in polymer, plastic, and environmental sciences, and the scientific reputation it has achieved in research benefiting humanity and the environment, the Polymer Research Center receives numerous scientific and technical consultations from public and private entities, including individuals, companies, universities, and research centers across Libya.
  
          These consultations involve identifying the chemical nature of unknown plastic materials and studying their properties. The center has also provided technical consultations to several foreign companies operating in Libya in the fields of construction and infrastructure, as well as individuals, institutions, companies, and regulatory authorities about the risks associated with certain materials or emissions from some plastic factories.
          
        ` +
          "Some public and private entities, companies, and factories that have received technical consultations" +
          [
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
          ].join(","),
        link: "/scientific-and-technical-consultations",
      },
    ],
  },
};

// Define the type for search results
type SearchResult = CenterItem;

// Function to search data
function searchCenterData(query: string, lang: Locale): SearchResult[] {
  if (typeof query !== "string") {
    throw new Error("Query must be a non-empty string.");
  }
  // || !query.trim()
  const results: SearchResult[] = [];
  const addResult = (
    title: string,
    description: string,
    link: string
  ): void => {
    results.push({ title, description, link });
  };
  const data = info[lang];

  // Search "about"
  if (
    data.about.title.includes(query) ||
    data.about.description.includes(query)
  ) {
    addResult(data.about.title, data.about.description, data.about.link);
  }

  // Search "goals"
  data.goals.forEach((goal) => {
    if (goal.title.includes(query) || goal.description.includes(query)) {
      addResult(goal.title, `${goal.description.slice(0, 200)}...`, goal.link);
    }
  });

  // Search "hopes"
  if (
    data.hopes.title.includes(query) ||
    data.hopes.description.includes(query)
  ) {
    addResult(data.hopes.title, data.hopes.description, data.hopes.link);
  }

  // Search "organizational_structure"
  data.organizational_structure.forEach((item) => {
    if (item.title.includes(query) || item.description.includes(query)) {
      addResult(item.title, item.description, item.link);
    }
  });

  // Search "scientific_and_technical_consultations"
  data.scientific_and_technical_consultations.forEach((consultation) => {
    if (
      consultation.title.includes(query) ||
      consultation.description.includes(query)
    ) {
      addResult(
        consultation.title,
        consultation.description,
        consultation.link
      );
    }
  });

  // Search "labs"
  data.labs.forEach((lab) => {
    if (lab.title.includes(query) || lab.description.includes(query)) {
      addResult(lab.title, lab.description, lab.link);
    }
  });

  // Search "partners"
  // centerData.partners.forEach((partner) => {
  //   if (partner.title.includes(query) || partner.description.includes(query)) {
  //     addResult(partner.title, partner.description, partner.link);
  //   }
  // });

  return results;
}

// Example Usage
let query = "                             "; // Search term in Arabic or English
// try {
//   const searchResults = searchCenterData(query);
//   console.log(searchResults);
// } catch (error) {
//   console.error(error.message);
// }

const SearchPage = async ({
  searchParams,
  params,
}: {
  searchParams?: Promise<{
    query?: string;
  }>;
  params: Promise<{
    lang: Locale;
  }>;
}) => {
  const lang = (await params).lang;
  const searchParam = await searchParams;
  if (searchParam && searchParam.query) {
    query = searchParam.query;
  }
  const articles = await searchArticles({
    content: searchParam?.query,
    start: typeof searchParam?.query === "string",
  });
  const searchResults = searchCenterData(query, lang);
  const results: SearchResult[] = [
    ...searchResults,
    ...articles.map((article) => ({
      title: lang === "en" ? article.enTitle : article.title,
      description:
        lang === "en"
          ? extractText(article.enBody, 200)
          : extractText(article.body, 200),
      link: `/articles/${article.slug}`,
    })),
  ];
  return (
    <main className="min-h-screen">
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
              <BreadcrumbPage>
                {lang === "en" ? "Search" : "البحث"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex my-10 justify-between items-center phone-only:flex-col phone-only:justify-start phone-only:items-start">
          <h1 className="font-extrabold md:text-4xl text-2xl">
            {lang === "en" ? "Search" : "البحث"}
          </h1>

          <SearchInput
            className="max-w-sm"
            query={"query"}
            placeholder={lang === "en" ? "search here ..." : "ابحث هنا ..."}
          />
        </div>

        <p>
          {lang === "en" ? "Search Results" : "نتائج البحث"}
          {"  "}
          {results.length}
        </p>

        {results.length > 0 ? (
          <ul className="grid gap-5 my-10 md:w-1/2 mx-auto">
            {results.map((result, index) => (
              <li className="py-4" key={index}>
                <Link
                  // variant={"link"}
                  className="grid gap-2 hover:underline"
                  href={`/${lang}${result.link}`}
                >
                  <span className="text-xl">{result.title}</span>
                  <span className="text-sm text-foreground/70">
                    {result.description.slice(0, 200)}
                  </span>
                  <Separator />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No matches found for the term.</p>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
