import ArticleCard from "@/components/article-card";
import EmblaCarousel from "@/components/carsuoel/embla-carousel";
import LangRenderer from "@/components/lang";
import Marquee from "@/components/marquee";
import Carousel from "@/components/ui/carouel";
import { getArticles } from "@/database/articles";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import {
  FaFlask,
  FaBalanceScale,
  FaChalkboardTeacher,
  FaLightbulb,
  FaHandshake,
  FaUsers,
  FaProjectDiagram,
  FaServicestack,
} from "react-icons/fa";
import FieldOfActivityCard from "./components/field-of-activity-card";
import { AnimatedCard, AnimatedCounter } from "@/components/animations";
import ImageTabSection from "./components/image-tabs-section";
import {
  FaLaptopCode,
  FaLanguage,
  FaMicroscope,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

const fieldsOfActivity: FieldOfActivity[] = [
  {
    icon: FaFlask,
    title: {
      en: "Scientific Research",
      ar: "مجال البحث العلمي",
    },
    description: {
      en: "Conducting and supporting research to advance knowledge and innovation.",
      ar: "إجراء ودعم الأبحاث لتعزيز المعرفة والابتكار.",
    },
  },
  {
    icon: FaBalanceScale,
    title: {
      en: "Standards and Specifications",
      ar: "مجال المواصفات والمقاييس",
    },
    description: {
      en: "Developing and implementing quality standards and specifications.",
      ar: "تطوير وتنفيذ معايير ومواصفات الجودة.",
    },
  },
  {
    icon: FaChalkboardTeacher,
    title: {
      en: "Education (to be activated in the future)",
      ar: "مجال التعليم (سيتم تفعيله مستقبلا)",
    },
    description: {
      en: "Providing educational programs and opportunities in the future.",
      ar: "تقديم برامج وفرص تعليمية مستقبلاً.",
    },
  },
  {
    icon: FaHandshake,
    title: {
      en: "Consultations",
      ar: "مجال الاستشارات",
    },
    description: {
      en: "Offering expert advice and solutions to various challenges.",
      ar: "تقديم النصائح والخبرات لحل التحديات المختلفة.",
    },
  },
  {
    icon: FaLightbulb,
    title: {
      en: "Awareness and Guidance",
      ar: "مجال التوعية والترشيد",
    },
    description: {
      en: "Promoting awareness and providing guidance on key issues.",
      ar: "تعزيز الوعي وتقديم الإرشادات حول القضايا المهمة.",
    },
  },
  {
    icon: FaUsers,
    title: {
      en: "Lectures and Training Courses for Center Employees",
      ar: "مجال المحاضرات والدورات التدريبية للعاملين بالمركز",
    },
    description: {
      en: "Organizing lectures and training programs for staff development.",
      ar: "تنظيم محاضرات وبرامج تدريبية لتطوير الموظفين.",
    },
  },
  {
    icon: FaProjectDiagram,
    title: {
      en: "Small Projects (to be activated in the future)",
      ar: "جانب المشاريع الصغيرة (سيتم تفعيله مستقبلا)",
    },
    description: {
      en: "Fostering small-scale projects to support innovation and growth.",
      ar: "تعزيز المشاريع الصغيرة لدعم الابتكار والنمو.",
    },
  },
  {
    icon: FaServicestack,
    title: {
      en: "Community Service",
      ar: "جانب خدمة المجتمع المحلي",
    },
    description: {
      en: "Engaging in activities that benefit and support the local community.",
      ar: "المشاركة في أنشطة تفيد وتدعم المجتمع المحلي.",
    },
  },
];

const trainingCourses: FieldOfActivity[] = [
  {
    icon: FaChalkboardTeacher,
    title: {
      en: "Administrative, Financial, Quality, and Public Relations Training",
      ar: "التدريب في المجالات الإدارية والمالية والجودة والعلاقات العامة",
    },
    description: {
      en: "Training programs in administrative, financial, quality, and public relations fields, conducted in the Hashemite Kingdom of Jordan.",
      ar: "برامج تدريبية في المجالات الإدارية والمالية والجودة والعلاقات العامة تُعقد في المملكة الأردنية الهاشمية.",
    },
  },
  {
    icon: FaLaptopCode,
    title: {
      en: "ICDL Certification Course",
      ar: "دورة للحصول على شهادة الرخصة الدولية لقيادة الحاسب الآلي",
    },
    description: {
      en: "A course to obtain the International Computer Driving License (ICDL) certification.",
      ar: "دورة تدريبية لنيل شهادة الرخصة الدولية لقيادة الحاسب الآلي.",
    },
  },
  {
    icon: FaLanguage,
    title: {
      en: "English Language Courses",
      ar: "دورات في اللغة الإنجليزية",
    },
    description: {
      en: "Comprehensive courses to enhance English language proficiency.",
      ar: "دورات شاملة لتحسين مستوى اللغة الإنجليزية.",
    },
  },
  {
    icon: FaMicroscope,
    title: {
      en: "Mechanical Properties of Polymers",
      ar: "خواص البوليميرات الميكانيكية",
    },
    description: {
      en: "A specialized course on the mechanical properties of polymers, conducted in collaboration with the University of Marrakesh and UNESCO.",
      ar: "دورة متخصصة في الخواص الميكانيكية للبوليميرات بالتعاون مع جامعة مراكش ومنظمة اليونسكو.",
    },
  },
  {
    icon: FaShieldAlt,
    title: {
      en: "Safety and Security Training",
      ar: "دورة في مجال الأمن والسلامة",
    },
    description: {
      en: "Training programs focused on safety and security practices in the workplace.",
      ar: "برامج تدريبية تركز على ممارسات الأمن والسلامة في مكان العمل.",
    },
  },
  {
    icon: FaCheckCircle,
    title: {
      en: "ISO 17025 Quality Training for Engineers and Technicians",
      ar: "تدريب على الجودة ISO 17025 للمهندسين والفنيين",
    },
    description: {
      en: "A course on quality standards ISO 17025, tailored for engineers and technicians.",
      ar: "دورة تدريبية على معايير الجودة ISO 17025 موجهة للمهندسين والفنيين.",
    },
  },
  {
    icon: FaCheckCircle,
    title: {
      en: "ISO 9001 Quality Training for Administrators and Financial Staff",
      ar: "تدريب على الجودة ISO 9001 للإداريين والماليين",
    },
    description: {
      en: "A course on quality standards ISO 9001, designed for administrative and financial personnel.",
      ar: "دورة تدريبية على معايير الجودة ISO 9001 مصممة للإداريين والماليين.",
    },
  },
];

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang);
  const OPTIONS: EmblaOptionsType = { align: "start" };
  const articles = await getArticles({});

  return (
    <main>
      <section>
        <Carousel />
      </section>
      <section className="content-center relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background py-20 md:shadow-xl'">
        <Marquee
          pauseOnHover
          repeat={100}
          reverse={lang === "en"}
          className="[--duration:60s]"
        >
          {dictionary.scientific_and_technical_consultations.map(
            (item, index) => (
              <div
                className="text-foreground/70 mx-6 text-xl hover:text-foreground"
                key={index}
              >
                {item}
              </div>
            )
          )}
        </Marquee>
      </section>
      <section id="our-vision" className="min-h-[50vh] bg-secondary">
        <div className="container flex justify-between phone-only:flex-col phone-only:gap-5 py-20 items-center">
          <div className="grid gap-5">
            <h2 className="font-bold text-primary text-3xl phone-only:text-xl">
              {dictionary.hopes.title}
            </h2>
            <AnimatedCard XorY="x" initialX={lang === "ar" ? 20 : -20}>
              <p
                className={cn(
                  "bg-primary/20 text-secondary-foreground relative before:absolute before:-right-2 before:w-2 before:h-full before:bg-primary before:top-0 w-fit px-2 py-3",
                  lang === "en" && "before:-left-2"
                )}
              >
                {`"${dictionary.hopes.vision}"`}
              </p>
            </AnimatedCard>
            <AnimatedCard XorY="x" initialX={lang === "ar" ? 20 : -20}>
              <p
                className={cn(
                  "bg-primary/20 text-secondary-foreground relative before:absolute before:-right-2 before:w-2 before:h-full before:bg-primary before:top-0 w-fit px-2 py-3",
                  lang === "en" && "before:-left-2"
                )}
              >
                {`"${dictionary.hopes.mission}"`}
              </p>
            </AnimatedCard>
          </div>
          <AnimatedCard
            XorY="x"
            className="relative max-w-sm max-h-96 overflow-hidden"
            initialX={lang === "en" ? 20 : -20}
          >
            <svg className="clipppy absolute -top-[999px] -left-[999px] w-0 h-0">
              <defs>
                <clipPath id="clip-another" clipPathUnits={"objectBoundingBox"}>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.75212 0.0637058C0.746781 0.0531565 0.740564 0.040872 0.737887 0.0334864L0.936579 0.00016607C0.936484 -9.48586e-05 0.936497 -6.66481e-05 0.936705 0.000382241C0.937051 0.00112847 0.937935 0.00303728 0.939758 0.00671297C0.941192 0.00960479 0.942627 0.0124478 0.944264 0.015692C0.945763 0.018661 0.947431 0.021966 0.949423 0.0259519C0.957095 0.0413005 0.966826 0.0613222 0.975597 0.0828921C0.984278 0.104239 0.992659 0.128636 0.996959 0.152724C1.00103 0.175515 1.00276 0.204629 0.990697 0.232208C0.980685 0.255101 0.955521 0.281472 0.908742 0.291922C0.916072 0.299633 0.922806 0.30733 0.928689 0.314918C0.941677 0.331671 0.956287 0.354981 0.957388 0.381047C0.958693 0.411941 0.94036 0.443862 0.896253 0.465044C0.89431 0.465978 0.892362 0.466866 0.890411 0.467711C0.895729 0.471705 0.900782 0.475615 0.905538 0.47943C0.918484 0.489812 0.931099 0.500932 0.94145 0.512321C0.951014 0.522844 0.962993 0.538241 0.967621 0.55657C0.972813 0.577133 0.969151 0.605972 0.936458 0.629605C0.924636 0.638151 0.911497 0.644133 0.898614 0.648344C0.913991 0.658695 0.928984 0.669785 0.941345 0.681191C0.952538 0.69152 0.96827 0.708075 0.97426 0.728748C0.981711 0.75446 0.973011 0.786276 0.933888 0.808864C0.928534 0.811955 0.923002 0.814627 0.917406 0.816938C0.925529 0.83579 0.926948 0.860056 0.908257 0.884087C0.889464 0.908248 0.858704 0.921114 0.835639 0.927997C0.784674 0.943205 0.732693 0.941327 0.689267 0.93407C0.646181 0.926871 0.604385 0.913257 0.566558 0.898286C0.540564 0.887998 0.514111 0.8761 0.487845 0.863426C0.521648 0.900409 0.545067 0.945246 0.545067 1H0.340424C0.340424 0.940284 0.283232 0.903277 0.188247 0.855105C0.183721 0.85281 0.178981 0.850429 0.174078 0.847966C0.135329 0.828502 0.0864189 0.803935 0.0530001 0.776309C0.0324435 0.759317 0.0128082 0.737525 0.00431929 0.710523C-0.00447536 0.68255 0.000431888 0.654497 0.0165653 0.627696C0.0261608 0.611756 0.0413931 0.595372 0.0652466 0.582459C0.0746035 0.577393 0.0844552 0.573315 0.0945665 0.570115C0.0874092 0.56516 0.0806826 0.560142 0.074501 0.555072C0.0519777 0.536603 0.00891492 0.494785 0.0352255 0.444831C0.044106 0.42797 0.0616707 0.40832 0.0942864 0.395567C0.105024 0.391369 0.115836 0.388528 0.126361 0.386704C0.123797 0.384392 0.121313 0.382082 0.118914 0.379775C0.0960358 0.357778 0.0600023 0.316728 0.0777568 0.270221C0.0837298 0.254575 0.0966195 0.234029 0.125381 0.218433C0.156097 0.201778 0.191093 0.198171 0.21915 0.199947C0.226445 0.200409 0.233601 0.201252 0.24058 0.202393C0.226967 0.177725 0.217407 0.141639 0.249005 0.106647C0.262595 0.0915979 0.283519 0.0766241 0.313911 0.0678238C0.344236 0.0590427 0.374021 0.0592941 0.397945 0.062754C0.440583 0.0689203 0.476228 0.0869109 0.500076 0.100634C0.501387 0.101388 0.502702 0.102154 0.504021 0.10293C0.50836 0.0937463 0.51561 0.0843813 0.526996 0.0753472C0.56786 0.0429231 0.623477 0.0442635 0.653879 0.0494569C0.681638 0.0541989 0.705685 0.0640958 0.721623 0.0713381C0.736276 0.0779968 0.751922 0.0861739 0.76724 0.0946149C0.763308 0.0861727 0.759362 0.0781352 0.75567 0.0707486C0.754573 0.0685531 0.75337 0.0661771 0.75212 0.0637058ZM0.888379 0.159516C0.888397 0.159547 0.887838 0.159412 0.886643 0.159018C0.887763 0.159287 0.88836 0.159484 0.888379 0.159516ZM0.431108 0.151577C0.431167 0.151596 0.43143 0.15205 0.431723 0.152878C0.431197 0.151971 0.43105 0.151557 0.431108 0.151577ZM0.27615 0.28809C0.276181 0.288096 0.276351 0.288361 0.27657 0.288868C0.27623 0.288338 0.27612 0.288084 0.27615 0.28809ZM0.226365 0.460855C0.226469 0.460872 0.227057 0.461446 0.227816 0.462522C0.226641 0.461375 0.226262 0.460837 0.226365 0.460855ZM0.827785 0.693178C0.828746 0.693035 0.829286 0.692994 0.829315 0.693009C0.829344 0.693024 0.828864 0.693095 0.827785 0.693178ZM0.725527 0.863334C0.725524 0.863334 0.725478 0.863289 0.725393 0.863199C0.725487 0.863289 0.725529 0.863334 0.725527 0.863334Z"
                    fill="black"
                  />
                </clipPath>
              </defs>
            </svg>
            <figure style={{ clipPath: "url(#clip-another)" }}>
              <Image
                src="/images/vision.avif"
                alt="Description"
                width={1000}
                height={1000}
                className="transition-all h-full duration-300 aspect-[3/4] min-h-full align-top object-fill hover:scale-105 w-full"
              />
            </figure>
          </AnimatedCard>
        </div>
      </section>
      <section dir="ltr" id="atricles" className="min-h-[50vh] py-10">
        <h3 className="font-bold text-primary text-3xl text-center mb-5 phone-only:text-xl">
          <LangRenderer ar="احدث المقالات" en="Latest Articles" />
        </h3>
        <EmblaCarousel
          slides={Array.from(Array(articles.length).keys())}
          options={OPTIONS}
        >
          {articles?.map((article, index) => (
            <ArticleCard
              createdAt={article.createdAt}
              className="h-full"
              key={index}
              title={lang === "ar" ? article.title : article.enTitle}
              body={lang === "ar" ? article.body : article.enBody}
              src={article.poster!}
              views={article.views}
              lang={lang}
            />
          ))}
        </EmblaCarousel>
      </section>
      <section
        id="fields-of-activity"
        className="min-h-[50vh] py-20 bg-secondary"
      >
        <h3 className="font-bold text-primary text-3xl text-center mb-5 phone-only:text-xl">
          <LangRenderer ar="مجالات العمل" en="Field Of Activity" />
        </h3>
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {fieldsOfActivity.map((field, index) => (
            <FieldOfActivityCard
              key={index}
              title={field.title}
              description={field.description}
              lang={lang}
              icon={field.icon}
            />
          ))}
        </div>
      </section>
      <section id="our-goals" className="min-h-[50vh] py-20">
        <div className="container phone-only:gap-10 grid md:grid-cols-2">
          <div className="content-center">
            <h3 className="font-bold text-primary text-3xl mb-5 phone-only:text-xl phone-only:text-center">
              <LangRenderer ar="اهدافنا" en="Our Goals" />
            </h3>
            <ul className="grid gap-2 phone-only:text-center">
              {dictionary.goals.map((goal, i) => (
                <AnimatedCard key={i} initialY={20 + i}>
                  <li className="md:text-lg text-base">- {goal}</li>
                </AnimatedCard>
              ))}
            </ul>
          </div>
          <AnimatedCard
            className={cn(
              "max-w-sm",
              lang === "en"
                ? "md:ml-auto phone-only:mx-auto"
                : "md:mr-auto phone-only:mx-auto"
            )}
          >
            <svg width="0" height="0" className="absolute">
              <clipPath id="clip-goey5" clipPathUnits="objectBoundingBox">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.0249688 0C0.0111789 0 0 0.0112775 0 0.0251889V0.851385C0 0.865297 0.0111789 0.876574 0.0249688 0.876574H0.179775V0.974811C0.179775 0.988723 0.190954 1 0.204744 1H0.975031C0.988821 1 1 0.988723 1 0.974811V0.157431C1 0.143519 0.988821 0.132242 0.975031 0.132242H0.810237V0.0251889C0.810237 0.0112775 0.799058 0 0.785268 0H0.0249688Z"
                  fill="#D9D9D9"
                />
              </clipPath>
            </svg>
            <figure className="p-8 group hover:p-4 transition-all duration-200 bg-gradient-to-b to-[#022641] from-[#356778] rounded-xl">
              <div style={{ clipPath: "url(#clip-goey5)" }}>
                <Image
                  src={"/images/goals.jpg"}
                  alt="goals"
                  width={1000}
                  height={1000}
                  className="transition-all duration-300 align-bottom rounded-lg aspect-square object-cover group-hover:scale-110 w-full"
                />
              </div>
            </figure>
          </AnimatedCard>
        </div>
      </section>
      <div className="sm:gap-4 gap-2 text-center grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-row bg-cardColor px-4 md:px-16 py-10 mb-2 text-foreground bg-secondary">
        <div className="px-2 justify-center hover:bg-background/40 w-full flex flex-col items-center bg-background/60 shadow-md border py-3 rounded-md">
          <h4 className="font-bold text-3xl flex gap-1 sm:justify-start justify-center items-center">
            <AnimatedCounter
              to={dictionary.scientific_events.conferences}
              duration={0.9}
            />{" "}
            +
          </h4>
          <p>
            <LangRenderer
              ar="المؤتمرات العلمية التي نظمها المركز."
              en="Scientific conferences organized by the center."
            />
          </p>
        </div>
        <div className="px-2 justify-center hover:bg-background/40 w-full flex flex-col items-center bg-background/60 shadow-md border py-3 rounded-md">
          <h4 className="font-bold text-3xl flex gap-1 sm:justify-start justify-center items-center">
            <AnimatedCounter to={dictionary.scientific_events.workshops} /> +
          </h4>
          <p>
            <LangRenderer
              ar="ورش العمل التي عقدها المركز."
              en="Workshops conducted by the center."
            />
          </p>
        </div>
        <div className="px-2 justify-center hover:bg-background/40 w-full flex flex-col items-center bg-background/60 shadow-md border py-3 rounded-md">
          <h4 className="font-bold text-3xl flex gap-1 sm:justify-start justify-center items-center">
            <AnimatedCounter
              to={dictionary.scientific_events.scientific_seminars}
            />{" "}
            +
          </h4>
          <p>
            <LangRenderer
              ar="الندوات العلمية التي نظمها المركز."
              en="Scientific seminars held by the center."
            />
          </p>
        </div>
        <div className="px-2 justify-center hover:bg-background/40 w-full flex flex-col items-center bg-background/60 shadow-md border py-3 rounded-md">
          <h4 className="font-bold text-3xl flex gap-1 sm:justify-start justify-center items-center">
            <AnimatedCounter
              to={dictionary.scientific_events.scientific_meetings}
            />{" "}
            +
          </h4>
          <p>
            <LangRenderer
              ar="الاجتماعات العلمية التي تمت في المركز."
              en="Scientific meetings conducted at the center."
            />
          </p>
        </div>
        <div className="px-2 justify-center hover:bg-background/40 w-full flex flex-col items-center bg-background/60 shadow-md border py-3 rounded-md">
          <h4 className="font-bold text-3xl flex gap-1 sm:justify-start justify-center items-center">
            <AnimatedCounter
              to={dictionary.scientific_events.internal_training_courses}
            />{" "}
            +
          </h4>
          <p>
            <LangRenderer
              ar="الدورات التدريبية الداخلية التي نظمها المركز."
              en="Internal training courses organized by the center."
            />
          </p>
        </div>
        <div className="px-2 justify-center hover:bg-background/40 w-full flex flex-col items-center bg-background/60 shadow-md border py-3 rounded-md">
          <h4 className="font-bold text-3xl flex gap-1 sm:justify-start justify-center items-center">
            <AnimatedCounter
              to={dictionary.scientific_events.external_training_courses}
            />{" "}
            +
          </h4>
          <p>
            <LangRenderer
              ar="الدورات التدريبية الخارجية التي حضرها أعضاء المركز."
              en="External training courses attended by center members."
            />
          </p>
        </div>
        <div className="px-2 justify-center hover:bg-background/40 w-full flex flex-col items-center bg-background/60 shadow-md border py-3 rounded-md">
          <h4 className="font-bold text-3xl flex gap-1 sm:justify-start justify-center items-center">
            <AnimatedCounter to={dictionary.scientific_events.lectures} /> +
          </h4>
          <p>
            <LangRenderer
              ar="المحاضرات التي قدمها المركز."
              en="Lectures delivered by the center."
            />
          </p>
        </div>
        <div className="px-2 justify-center hover:bg-background/40 w-full flex flex-col items-center bg-background/60 shadow-md border py-3 rounded-md">
          <h4 className="font-bold text-3xl flex gap-1 sm:justify-start justify-center items-center">
            <AnimatedCounter to={dictionary.scientific_events.open_days} /> +
          </h4>
          <p>
            <LangRenderer
              ar="الأيام المفتوحة التي نظمها المركز."
              en="Open days organized by the center."
            />
          </p>
        </div>
        <div className="px-2 justify-center hover:bg-background/40 w-full flex flex-col items-center bg-background/60 shadow-md border py-3 rounded-md">
          <h4 className="font-bold text-3xl flex gap-1 sm:justify-start justify-center items-center">
            <AnimatedCounter
              to={
                dictionary.scientific_events.national_and_religious_activities
              }
            />{" "}
            +
          </h4>
          <p>
            <LangRenderer
              ar="الأنشطة الوطنية والدينية التي شارك فيها المركز."
              en="National and religious activities participated by the center."
            />
          </p>
        </div>
      </div>
      <section id="q&a" className="py-10">
        <h3 className="font-bold text-primary text-3xl mb-5 phone-only:text-xl text-center">
          <LangRenderer ar="الأسئلة والأجوبة" en="Q & A" />
        </h3>
        <ImageTabSection />
      </section>
      <section
        id="training-courses"
        className="min-h-[50vh] py-20 bg-secondary"
      >
        <h3 className="font-bold text-primary text-3xl text-center mb-5 phone-only:text-xl">
          <LangRenderer ar="الدورات التدريبية" en="Training Courses" />
        </h3>
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trainingCourses.map((field, index) => (
            <FieldOfActivityCard
              key={index}
              title={field.title}
              description={field.description}
              lang={lang}
              icon={field.icon}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
