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

        حيث يُعتبر المركز طرف محايد بين المُصنع والمستهلك (طرف ثالث)، وحَكَم لمدى مطابقة جودة المنتجات البلاستيكية للمواصفات، وقد اكتسب المركز ثقة الجهات العامة والخاصة الوطنية منها والأجنبية (الزبائن) وذلك لتتبعه المنهج العلمي في اجراء الاختبارات، وإعداد التقارير، وتقديم الدعم الفني لمحاولة تدليل الصعاب للمصنعين، والرد على استفسارات الموردين.  `,
    },
    en: {
      title: "Specifications Office",
      description: `
        The Libyan Center for Polymer Research is the sole entity in Libya capable of conducting tests and analyses on plastic products, ensuring their compliance with standards, and contributing to the development of Libya's plastic industries through improved quality and environmentally friendly materials.

        The center acts as an impartial party between manufacturers and consumers (a third party) and as an adjudicator of the compliance of plastic product quality to standards. It has gained the trust of both national and foreign public and private entities (clients) by adhering to scientific methods in testing, reporting, and providing technical support to resolve challenges for manufacturers and respond to supplier inquiries.
      `,
    },
  };
  const entities = [
    { ar: "الإدارة الفنية للجمارك", en: "Technical Administration of Customs" },
    {
      ar: "الشركات الوطنية والأجنبية المشاركة في مشاريع البنية التحتية",
      en: "National and foreign companies participating in infrastructure projects",
    },
    {
      ar: "المكاتب الاستشارية الوطنية والأجنبية",
      en: "National and foreign consultancy offices",
    },
    {
      ar: "التجار والموردون للمواد البلاستيكية",
      en: "Traders and suppliers of plastic materials",
    },
    { ar: "جهاز الإسكان والمرافق", en: "Housing and Utilities Authority" },
    {
      ar: "المصنعين المحليين للمنتجات البلاستيكية",
      en: "Local manufacturers of plastic products",
    },
    {
      ar: "الهيئات قضائية (كخبير قضائي للفصل في بعض قضايا التزوير الصناعي)",
      en: "Judicial authorities (as a forensic expert for industrial forgery cases)",
      images: [],
    },
  ];

  const goals = [
    {
      ar: "مراقبة وضبط جودة المنتجات البلاستيكية المصنعة محلياً والمستوردة من الخارج بإجراء الاختبارات والتحاليل اللازمة طبقاً للمواصفات القياسية الليبية أو الدولية.",
      en: "Monitoring and controlling the quality of locally manufactured and imported plastic products by conducting the necessary tests and analyses according to Libyan or international standards.",
    },
    {
      ar: "المشاركة في توطين وخلق مناخ مناسب للرفع من مستوي الصناعات البلاستيكية بالداخل.",
      en: "Participating in localizing and creating a suitable environment to improve the level of plastic industries domestically.",
    },
    {
      ar: "ضمان استخدام المواد البلاستيكية الصديقة للبيئة والخالية من السموم والمواد الضارة وذلك للمحافظة علي صحة المواطن والبيئة المحيطة.",
      en: "Ensuring the use of environmentally friendly plastic materials free of toxins and harmful substances to protect the health of citizens and the surrounding environment.",
    },
    {
      ar: "عند تطبيق المواصفات القياسية على المواد المستخدمة في البنية التحتية يمكن الحصول علي جودة عالية وعلى أقصى عمر تشغيلي لها.",
      en: "By applying standards to materials used in infrastructure, high quality and maximum operational lifespan can be achieved.",
    },
    {
      ar: "إعداد التقارير الفنية للمكاتب الاستشارية أو للشركات المصنعة أو الشركات المنفذة لمشاريع البنية التحتية.",
      en: "Preparing technical reports for consultancy offices, manufacturing companies, or companies executing infrastructure projects.",
    },
    {
      ar: "الدعم الفني والعلمي وتقديم الاستشارات للمصنعين المحليين وذلك بالتعاون مع الإدارات الأخرى بالمركز.",
      en: "Providing technical and scientific support and consulting services to local manufacturers in collaboration with other departments at the center.",
    },
    {
      ar: "توعية المستهلك بخطورة الغش التجاري وتبصيره بالضرر البالغ نتيجة تهافته على شراء السلع الرخيصة المتدنية الجودة وتحفيزه على التأكد من جودة السلعة وسلامتها.",
      en: "Raising consumer awareness about the dangers of commercial fraud and educating them on the severe harm caused by purchasing cheap, low-quality goods, encouraging them to verify product quality and safety.",
    },
    {
      ar: "يشارك بعض موظفي المركز في لجان اعداد المواصفات القياسية الليبية الخاصة بالمنتجات البلاستيكية التي يشكلها المركز الوطني للمواصفات والمعايير القياسية.",
      en: "Some center employees participate in committees for developing Libyan standards for plastic products formed by the National Center for Standards and Specifications.",
    },
  ];

  const testingAreas = [
    {
      ar: "المواد الخام المصنعة للمواد البلاستيكية",
      en: "Raw materials used in plastic manufacturing.",
    },
    {
      ar: "الإطارات والنضائد",
      en: "Tires and seals.",
    },
    {
      ar: "المواد البلاستيكية الملامسة للأغذية وتغليفها",
      en: "Plastic materials in contact with food and their packaging.",
    },
    {
      ar: "ألعاب الأطفال",
      en: "Children's toys.",
    },
    {
      ar: "مواد البناء والأنابيب البلاستيكية",
      en: "Building materials and plastic pipes.",
    },
  ];

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
        <h1 className="font-extrabold my-5 md:text-3xl text-2xl">
          {currentContent.title}
        </h1>
        <section
          className={`p-2 container rounded-lg ${
            lang === "ar" ? "text-right" : "text-left"
          }`}
        >
          <p className="text-foreground/90 whitespace-pre-line">
            {currentContent.description}
          </p>

          <br />
          <h2 className="font-bold text-xl text-start mb-2">
            <LangRenderer
              ar={"أهداف مكتب المواصفات:"}
              en={"Goals of the Specifications Office:"}
            />
          </h2>
          <ul>
            {goals.map((goal, index) => (
              <li key={index} className="list-decimal my-2 px-3">
                <LangRenderer ar={goal.ar} en={goal.en} />
              </li>
            ))}
          </ul>
          <br />
          <h3 className="font-bold text-xl text-start mb-2">
            <LangRenderer
              ar={
                "ومن الجهات التي قامت بالتواصل والتعامل مع المركز في مجال اختصاصه هي:"
              }
              en={
                "Entities that have communicated and interacted with the center in its field of expertise include:"
              }
            />
          </h3>
          <ul>
            {entities.map((entity, index) => (
              <li key={index} className="list-decimal my-2 px-3">
                <LangRenderer ar={entity.ar} en={entity.en} />
              </li>
            ))}
          </ul>
          <h3 className="font-bold text-xl text-start mb-2">
            <LangRenderer
              ar={
                "وقد اعتمد العمل بالمركز على مهندسين وفنيين وطنيين متخصصين لاختبار وتحاليل المنتجات البلاستيكية المختلفة مثل: "
              }
              en={
                "The work at the center has relied on national engineers and technicians specialized in testing and analyzing various plastic products, such as: "
              }
            />
          </h3>
          <ul>
            {testingAreas.map((area, index) => (
              <li key={index} className="list-decimal my-2 px-3">
                <LangRenderer ar={area.ar} en={area.en} />
              </li>
            ))}
          </ul>
          <div className="my-2">
            <h2 className="font-bold text-xl text-start mb-2">
              <LangRenderer
                ar={"الاستشارات العلمية والفنية لمكتب المواصفات "}
                en={
                  "Scientific and technical consultations for the Standards Office."
                }
              />
            </h2>
            <LangRenderer
              ar={
                "كما هو معلوم بأن المركز الليبي لبحوث اللدائن متخصص في دراسة واختبار وتحليل عينات مُصنّعة من مواد لدائنيه (بلاستكية) ومطاطية، سواءً كانت على صورة مادة خام أو منتج شبه مُصنع أو مُنتج نهائي، فعلى سبيل الذكر وليس الحصر نذكر بعض من المُنتجات والعينات التي تم اختبارها في المركز حسب مجال تطبيقها واستخدامها كما يلي: "
              }
              en={
                "As is well known, the Libyan Center for Polymer Research specializes in studying, testing, and analyzing samples made of polymeric (plastic) and rubber materials, whether in the form of raw materials, semi-manufactured products, or final products. For example, and not limited to, we mention some of the products and samples that have been tested at the center according to their application and usage field as follows: "
              }
            />
            <p></p>
          </div>
          <SpecificationsOfficeDetails />
        </section>
      </div>
    </main>
  );
};

export default SpecificationsOfficePage;

interface Section {
  title: {
    ar: string;
    en: string;
  };
  items: {
    ar: string;
    en: string;
  }[];
  images: string[];
}

const SpecificationsOfficeDetails: React.FC = () => {
  const sections: Section[] = [
    {
      title: {
        ar: "أولاً: المواد الخام المصنعة للمواد البلاستيكية.",
        en: "First: Raw materials used for manufacturing plastic materials.",
      },
      items: [
        {
          ar: "مادة PVC",
          en: "PVC material.",
        },
        {
          ar: "مادة عديد إيثيلين (PE)",
          en: "Polyethylene (PE).",
        },
        {
          ar: "مادة عديد إيثيلين منخفض الكثافة (LDPE)",
          en: "Low-Density Polyethylene (LDPE).",
        },
        {
          ar: "مادة عديد إيثيلين عالي الكثافة (HDPE)",
          en: "High-Density Polyethylene (HDPE).",
        },
        {
          ar: "مادة عديد إيثيلين تيرفثالات (PET)",
          en: "Polyethylene Terephthalate (PET).",
        },
        {
          ar: "مادة عديد بروبيلين (PP)",
          en: "Polypropylene (PP).",
        },
        {
          ar: "مادة عديد ستايرين (PS)",
          en: "Polystyrene (PS).",
        },
        {
          ar: "مادة عديد يوريثان (PUR)",
          en: "Polyurethane (PUR).",
        },
        {
          ar: "الصبغات والألوان",
          en: "Pigments and colors.",
        },
        {
          ar: "المواد المضافة (المالئة)",
          en: "Additives (fillers).",
        },
        {
          ar: "الراتنجات (Resins) وتستخدم في الطلاء, المواد اللاصقة والعوازل",
          en: "Resins used in coatings, adhesives, and insulations.",
        },
      ],
      images: ["1.jpg", "3.jpg", "4.webp", "9.jpg"],
    },
    {
      title: {
        ar: "ثانياً: المواد البلاستيكية الملامسة للأغذية وتغليفها.",
        en: "Secondly: Plastic materials in contact with food and their packaging.",
      },
      items: [
        {
          ar: "القنينات المصنعة من مادة عديد إيثيلين تيرفثالات (PET)",
          en: "Bottles made from Polyethylene Terephthalate (PET).",
        },
        {
          ar: "الأكواب والصحون المصنعة من مادة عديد ستايرين (PS)",
          en: "Cups and plates made from Polystyrene (PS).",
        },
        {
          ar: "نيلون لتغليف الأغذية (سيلوفان) مصنع من PVC))",
          en: "Nylon for food packaging (cellophane) made from PVC.",
        },
        {
          ar: "الحافظات المصنعة من مادة عديد بروبيلين (PP)",
          en: "Containers made from Polypropylene (PP).",
        },
        {
          ar: "مستلزمات الأم والطفل",
          en: "Mother and child supplies.",
        },
        {
          ar: "أوعية بلاستيكية لنقل السوائل مختلفة الأحجام مصنعة من مادة عديد إيثيلين (PE)",
          en: "Plastic containers for transporting liquids of various sizes made from Polyethylene (PE).",
        },
        {
          ar: "الأكياس المصنعة من اللدائن",
          en: "Bags made from plastics.",
        },
        {
          ar: "صناديق حاويات ناقل الخضار واللحوم",
          en: "Crates for transporting vegetables and meats.",
        },
        {
          ar: "الأجزاء البلاستيكية للأجهزة الكهرو منزلية المصنعة من مادة عديد بروبيلين (PP)",
          en: "Plastic parts for household electrical appliances made from Polypropylene (PP).",
        },
      ],
      images: ["5.jpg", "6.jpeg", "7.jpg", "8.webp"],
    },
    {
      title: {
        ar: "ثالثاً: الألعاب والقرطاسية.",
        en: "Thirdly: Toys and stationery.",
      },
      items: [
        {
          ar: "كل الألعاب المصنعة من اللدائن",
          en: "All toys made from plastics.",
        },
        {
          ar: "كل الألعاب المصنعة من المطاط",
          en: "All toys made from rubber.",
        },
        {
          ar: "أدوات القرطاسية",
          en: "Stationery items.",
        },
      ],
      images: ["10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg"],
    },
    {
      title: {
        ar: "رابعاً: الإطارات والنضائد.",
        en: "Fourthly: Tires and seals.",
      },
      items: [
        {
          ar: "الإطارات الخارجية بكل قياساتها",
          en: "External tires of all sizes.",
        },
        {
          ar: "الأنابيب الداخلية للإطارات",
          en: "Inner tubes for tires.",
        },
        {
          ar: "مانع التسرب المصنع من المطاط",
          en: "Rubber sealants.",
        },
        {
          ar: "قطع الغيار والأرضيات المطاطية",
          en: "Rubber spare parts and flooring.",
        },
        {
          ar: "السيور الناقلة المصنعة من المطاط",
          en: "Rubber conveyor belts.",
        },
        {
          ar: "الجزء البلاستيكي للنضائد",
          en: "Plastic parts for seals.",
        },
      ],
      images: ["15.png", "16.jpg"],
    },
    {
      title: {
        ar: "خامساً: مواد البناء والأنابيب البلاستيكية.",
        en: "Fifthly: Building materials and plastic pipes.",
      },
      items: [
        {
          ar: "أنابيب مياه الشرب المصنعة من (PE,PPR) وملحقاتها",
          en: "Drinking water pipes made from (PE, PPR) and their accessories.",
        },
        {
          ar: "أنابيب المستخدم في شبكة المجاري والبنية التحتية المصنعة من (UPVC,PE) وملحقاتها",
          en: "Pipes used in sewage and infrastructure networks made from (UPVC, PE) and their accessories.",
        },
        {
          ar: "أنابيب نقل الغاز المنزلي",
          en: "Pipes for transporting household gas.",
        },
        {
          ar: "أنابيب الألياف الزجاجية",
          en: "Fiberglass pipes.",
        },
        {
          ar: "أنابيب التمديدات الكهربائية المموجة والعادية وملحقاتها",
          en: "Corrugated and regular electrical conduit pipes and their accessories.",
        },
        {
          ar: "العوازل المستخدمة في البناء (الخفاف) المصنعة من (PS)",
          en: "Insulation materials used in construction (foam) made from (PS).",
        },
        {
          ar: "الأبواب والنوافذ المصنعة من (PVC)",
          en: "Doors and windows made from (PVC).",
        },
        {
          ar: "خزانات مياه الشرب المصنعة من (PE)",
          en: "Drinking water tanks made from (PE).",
        },
      ],
      images: [
        "17.jpg",
        "18.jpg",
        "19.jpg",
        "20.jpg",
        "21.jpg",
        "22.jpg",
        "23.jpg",
        "24.jpg",
        "25.jpg",
      ],
    },
  ];

  return sections.map((section, sectionIndex) => (
    <div className="my-5 w-full" key={sectionIndex}>
      <h4 className="font-bold text-xl text-start mb-2">
        <LangRenderer ar={section.title.ar} en={section.title.en} />
      </h4>
      <ul>
        {section.items.map((item, itemIndex) => (
          <li key={itemIndex} className="list-decimal my-2 px-3">
            <LangRenderer ar={item.ar} en={item.en} />
          </li>
        ))}
      </ul>

      {section.images.length > 0 && (
        <div className="lg:columns-3 sm:columns-2  overflow-hidden  px-5 pb-5 my-4">
          {section.images.map((image, index) => (
            <div key={index} className={`relative pb-4`}>
              <div className="max-w-sm h-64 max-h-96">
                <Image
                  src={`/images/spec/${image}`}
                  alt={"image"}
                  height={600}
                  width={1200}
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  ));
};
