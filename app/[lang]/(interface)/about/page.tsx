import { CustomLink } from "@/components/custom-link";
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
import { getDictionary } from "@/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "ar" | "en" }>;
}) {
  const { lang } = await params;

  const content = {
    ar: {
      title: "حول",
      description:
        "تعرف على المركز الليبي لبحوث اللدائن وأهدافه في تطوير بحوث البوليمرات والارتقاء بالمجتمع.",
      keywords: [
        "البوليمرات",
        "البلاستيك",
        "البحث العلمي",
        "الصناعات البتروكيميائية",
        "التحديات البيئية",
        "المركز الليبي لبحوث اللدائن",
      ],
    },
    en: {
      title: "About",
      description:
        "Learn about the Libyan Center for Polymer Research and its goals in advancing polymer research and uplifting the community.",
      keywords: [
        "polymers",
        "plastics",
        "scientific research",
        "petrochemical industries",
        "environmental challenges",
        "Libyan Center for Polymer Research",
      ],
    },
  };

  const currentContent = content[lang];

  return {
    title: currentContent.title,
    description: currentContent.description,
    keywords: currentContent.keywords,
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

const AboutPage = async ({
  params,
}: {
  params: Promise<{ lang: "ar" | "en" }>;
}) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return (
    <main className="min-h-screen container">
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
            <BreadcrumbPage>{lang === "ar" ? "حول" : "About"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between phone-only:flex-col phone-only:gap-5 items-start">
        <div id="overview" className="md:flex-[3]">
          <div id="overview">
            <h1 className="my-2 text-xl md:text-3xl font-bold">
              {dictionary.about.title}
            </h1>
            <p>{dictionary.about.description}</p>
          </div>
          <br />
          <Separator />
          <br />
          <LangRenderer
            ar={
              <div id="why">
                <h2>
                  <strong className="my-2">
                    لماذا المركز الليبي لبحوث اللدائن؟
                  </strong>
                </h2>
                <p>
                  <span className="block">
                    {`أصبحت البوليمرات "Polymers"، أو ما يعرف عادة بالبلاستيك،
                    جزءًا أساسيًا من الحياة اليومية للإنسان بسبب خواصها الفريدة
                    والمتميزة. فهي تعد من أهم المواد الأساسية المستخدمة في
                    العديد من الصناعات، مثل مواد البناء، الملابس، المعدات
                    الطبية، وسائل النقل المختلفة، الأجهزة الكهربائية بأنواعها،
                    والأدوات المنزلية.`}
                  </span>
                  <br />
                  <span className="block">
                    {` تشمل استخداماتها مواد التعبئة والتغليف وصناعة القناني
                    والعبوات البلاستيكية التي تستخدم في تعبئة السوائل مثل مواد
                    التنظيف، مواد العناية الشخصية، المياه، المشروبات الغازية،
                    العصائر، زيوت الطعام، وزيوت السيارات.`}
                  </span>
                  <br />
                  <span className="block">
                    {`تكمن أهمية المواد البلاستيكية في ميزاتها الفريدة، مثل سهولة
                    تشكيلها وتصنيعها لتلبية احتياجات الإنسان اليومية، رخص
                    تكلفتها، خفة وزنها، تنوع ألوانها، وإمكانية إعادة تدويرها.
                    بالإضافة إلى ذلك، تجمع بعض المواد البلاستيكية بين ميزات
                    متعددة كالقوة، المرونة، الصلابة، خفة الوزن، والشفافية، مما
                    يجعلها مناسبة لمجالات متنوعة.`}
                  </span>
                  <br />
                  <span className="block">
                    {`يمكن تصنيع نوع واحد من البلاستيك بصفات مختلفة حسب مجال
                    الاستخدام. نتيجة لذلك، يتضاعف الإنتاج العالمي لهذه المواد
                    ويزداد الطلب عليها سنويًا، حتى أن بعض الباحثين أطلقوا على
                    النصف الأخير من القرن الماضي اسم "عصر البلاستيك" أو "عصر
                    البوليمرات".`}
                  </span>
                  <br />
                  <strong className="my-2">
                    الصناعات البتروكيميائية: بوابة نحو التقدم
                  </strong>
                  <span className="block">
                    {`تعتمد صناعة البلاستيك على مواد بتروكيميائية مستخرجة من النفط
                    الخام أو الغاز الطبيعي. أتاح التطور الكبير في الصناعات
                    البتروكيميائية تصنيع البلاستيك بجودة عالية، مما أدى إلى نقلة
                    نوعية في الإنتاج والتسويق.`}
                  </span>
                  <br />
                  <span className="block">
                    {`بالنظر إلى المستقبل، نؤمن بأن على الدولة الليبية تضمين هذا
                    القطاع ضمن استراتيجياتها لتنوع مصادر الدخل القومي، تحقيق
                    الازدهار الاقتصادي، وتقليل الاعتماد على صادرات النفط الخام.
                    كما تمثل الصناعات البتروكيميائية نقطة انطلاق للصناعات
                    الصغيرة والمتوسطة وتوفير فرص العمل، مما يساهم في تحسين دخل
                    المواطن وتعزيز رفاهيته.`}
                  </span>
                  <br />
                  <span className="block">
                    {`تمتلك ليبيا مزايا عدة لدعم الاستثمار في هذا المجال، مثل
                    الموقع الجغرافي المميز والقرب من الأسواق الإقليمية
                    والعالمية، الأمر الذي يتطلب بناء وتأهيل كوادر فنية وعلمية
                    قادرة على الإسهام بفعالية
                  ومهنية.`}
                  </span>
                  <br />
                  <strong className="my-2">التحديات البيئية والصحية</strong>
                  <span className="block">
                    <span className="block">
                      {`رغم الفوائد الكبيرة للبلاستيك، إلا أن سوء تصنيعه واستخدامه
                      قد يؤدي إلى أضرار بيئية وصحية. تشمل هذه الأضرار صعوبة تحلل
                      المواد البلاستيكية وتراكمها كأحد أهم المخلفات الصلبة. يؤدي
                      حرق هذه المخلفات إلى تلوث الهواء، بينما يتسبب دفنها أو
                      رميها في البحار بتلوث التربة والمياه، مما يهدد الثروات
                      النباتية والحيوانية.`}
                    </span>
                  </span>
                  <br />
                  <span className="block">
                    {`يمكن أن تسبب المواد البلاستيكية المستخدمة في تغليف الأغذية
                    أو تصنيع لعب الأطفال أضرارًا صحية بسبب تسرب مكوناتها إلى
                    المواد الغذائية أو نتيجة استخدام مواد مضافة محظورة. لذلك،
                    تحرص الدول على وضع أنظمة صارمة لضمان مطابقة المنتجات
                    البلاستيكية للمواصفات القياسية.`}
                  </span>
                  <br />
                  <strong className="my-2">رؤيتنا</strong>
                  <span className="block">
                    {`نسعى في المركز الليبي لبحوث اللدائن إلى تقديم خدمات بحثية
                    متميزة تسهم في تطوير هذا المجال، مستندين إلى قيم الجودة،
                    التميز، الشفافية، والعمل بروح الفريق. نطمح لأن نكون مركزًا
                    رائدًا يحقق الإسهام الفعّال في الاقتصاد الوطني والرفاهية
                    المجتمعية.`}
                  </span>
                  <br />
                  والله ولي التوفيق.
                  <br />
                  <strong className="my-2">د. أنور ناصر الشيباني</strong>
                  <br />
                  مدير عام المركز
                </p>
              </div>
            }
            en={
              <div id="why">
                <h2>
                  <strong className="my-2">
                    Why the Libyan Center for Polymer Research?
                  </strong>
                </h2>
                <p>
                  <span className="block">
                    {`Polymers, commonly known as plastics, have become an
                    essential part of daily life due to their unique and
                    outstanding properties. They are among the most important
                    basic materials used in numerous industries, such as
                    construction materials, clothing, medical equipment, various
                    transportation methods, electrical devices, and household
                    tools.`}
                  </span>
                  <br />
                  <span className="block">
                    {`Their uses include packaging materials and the production of
                    bottles and plastic containers for packaging liquids like
                    cleaning agents, personal care products, water, soft drinks,
                    juices, cooking oils,
                  and automotive oils.`}
                  </span>
                  <br />
                  <span className="block">
                    {`The significance of plastics lies in their unique features,
                    such as ease of shaping and manufacturing to meet daily
                    human needs, low cost, lightweight, color variety, and
                    recyclability. Additionally, some plastics combine multiple
                    features like strength, flexibility, rigidity, lightness,
                    and transparency, making them suitable for various fields.`}
                  </span>
                  <br />
                  <span className="block">
                    {`A single type of plastic can be manufactured with different
                    attributes depending on its usage. As a result, the global
                    production of these materials has doubled, and demand grows
                    yearly. Some researchers have even dubbed the latter half of
                    the last century the "Plastic Era" or "Polymer Era."`}
                  </span>
                  <br />
                  <strong className="my-2">
                    Petrochemical Industries: A Gateway to Progress
                  </strong>
                  <span className="block">
                    {`The plastic industry relies on petrochemical materials
                    extracted from crude oil or natural gas. Advances in
                    petrochemical industries have enabled the production of
                    high-quality plastics, leading to a significant leap in
                    production and marketing.`}
                  </span>
                  <br />
                  <span className="block">
                    {`Looking to the future, we believe that Libya should include
                    this sector in its strategies to diversify national income
                    sources, achieve economic prosperity, and reduce dependence
                    on crude oil exports. Petrochemical industries also serve as
                    a starting point for small and medium enterprises and job
                    creation, contributing to improving citizens' income and
                    enhancing their welfare.`}
                  </span>
                  <br />
                  <span className="block">
                    {`Libya possesses several advantages to support investment in
                    this field, such as a strategic geographic location near
                    regional and global markets. This necessitates building and
                    training technical and scientific personnel capable of
                    contributing effectively and professionally.`}
                  </span>
                  <br />
                  <strong className="my-2">
                    Environmental and Health Challenges
                  </strong>
                  <span className="block">
                    {`Despite the significant benefits of plastics, improper
                    manufacturing and use can lead to environmental and health
                    hazards. These include the difficulty of decomposing
                    plastics and their accumulation as one of the most critical
                    solid wastes. Burning these wastes pollutes the air, while
                    burying or discarding them in seas pollutes soil and water,
                    threatening plant and animal resources.`}
                  </span>
                  <br />
                  <span className="block">
                    {`Plastics used in food packaging or toy manufacturing can
                    pose health risks due to the leakage of their components
                    into food or the use of prohibited additives. Therefore,
                    countries enforce strict regulations to ensure plastic
                    products meet standard specifications.`}
                  </span>
                  <br />
                  <strong className="my-2">Our Vision</strong>
                  <span className="block">
                    {`At the Libyan Center for Polymer Research, we strive to
                    provide outstanding research services that contribute to the
                    development of this field, grounded in the values of
                    quality, excellence, transparency, and teamwork. We aspire
                    to be a leading center that significantly contributes to the
                    national economy and community welfare.`}
                  </span>
                  <br />
                  May God guide us.
                  <br />
                  <strong className="my-2">Dr. Anwar Nasser Al-Shaibani</strong>
                  <br />
                  Director General of the Center
                </p>
              </div>
            }
          />
        </div>
        <div className="md:flex-1">
          <ol>
            <li>
              <CustomLink
                variant={"link"}
                className="phone-only:whitespace-normal phone-only:my-2"
                href={"#overview"}
              >
                {dictionary.about.title}
              </CustomLink>
              <CustomLink
                className="phone-only:whitespace-normal phone-only:my-2"
                variant={"link"}
                href={"#why"}
              >
                {lang === "ar"
                  ? "لماذا المركز الليبي لبحوث اللدائن؟"
                  : "Why the Libyan Center for Polymer Research?"}
              </CustomLink>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
