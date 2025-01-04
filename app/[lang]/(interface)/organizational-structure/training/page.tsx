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
      title: "التدريب",
      description:
        "تحت شعار بالتدريب ننهض ونتطور، يعمل المركز الليبي لبحوث اللدائن على تطوير كفاءات الموظفين من خلال دورات داخلية وخارجية وفقاً لخطط سنوية.",
    },
    en: {
      title: "Training",
      description:
        "Under the motto 'With training, we rise and progress,' the Libyan Center for Polymer Research develops employee skills through internal and external courses based on annual plans.",
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

const TrainingPage = async ({
  params,
}: {
  params: Promise<{ lang: "ar" | "en" }>;
}) => {
  const { lang } = await params;

  const content = {
    ar: {
      title: "التدريب",
      description: `
منذ تأسيسه وتحت شعار "بالتدريب ننهض ونتطور ونرتقي"، يحرص المركز الليبي لبحوث اللدائن وبشكل مستمر من خلال مكتب التدريب العمل على الرفع من كفاءة الموظفين والعاملين والبحاث بالمركز في كافة التخصصات الفنية والإدارية والعلمية، وذلك بإلحاقهم بدورات تدريبية في مجالات مختلفة داخلية وخارجية وفقاً للخطط التدريبية السنوية للمركز.
<br/>
<br/>
يتابع مكتب التدريب ترشيح الموظفين للدورات التي تتناسب مع وظائفهم وتخصصاتهم والموصى بها المدراء المباشرون، وذلك بالتعاون مع مؤسسات محلية كالمعهد الوطني للإدارة ومركز ضمان جودة المعايير المهنية وبعض الجهات الأخرى. وتقام هذه الدورات إما خارج المركز أو داخله، حيث يحتوي المركز على قاعة تدريب مجهزة ومكتبة.
<br/>
<br/>
كما يحرص مكتب التدريب على إقامة دورات اللغة الإنجليزية ومهارات الحاسب الآلي ودورات التأهيل الإداري ودورات الأمن والسلامة والصحة المهنية بصفة مستمرة لضمان الرفع من كفاءة الموظفين وتسهيل سير العمل في بيئة صحية ومناسبة. كما يقوم المركز حسب الإمكانيات المتاحة لديه بإيفاد العديد من الموظفين إلى عدد من الدول العربية والأجنبية للدراسة والتدريب على الأجهزة المعملية.
<br/>
<br/>
نطمح من خلال البرامج والدورات التدريبية التي تنفذ داخل المركز أو خارجه تطوير المهارات والكفاءات وزيادة التفاعل والتعاون وحسن إدارة الوقت وتحسين الأداء والمخرجات وزيادة مستوى الرضا للعملاء وتعزيز سمعة المركز.
      `,
    },
    en: {
      title: "Training",
      description: `
Since its establishment and under the slogan "With training, we rise, evolve, and excel," the Libyan Center for Plastic Research continuously strives, through its Training Office, to enhance the efficiency of its employees, staff, and researchers in all technical, administrative, and scientific fields. This is achieved by enrolling them in various training courses, both locally and internationally, according to the center's annual training plans.
<br/>
<br/>
The Training Office oversees the nomination of employees for courses that match their roles and specializations, as recommended by their direct supervisors, in collaboration with local institutions such as the National Institute of Administration, the Center for Quality Assurance of Professional Standards, and other entities. These courses are conducted either outside or inside the center, which houses a fully equipped training hall and library.
<br/>
<br/>
The Training Office also ensures the regular organization of English language courses, computer skills training, administrative qualification courses, and occupational health and safety training. This is done to guarantee the improvement of employees’ efficiency and to facilitate smooth workflows in a healthy and suitable environment. Additionally, depending on its available resources, the center sends many employees to several Arab and foreign countries for study and training on laboratory equipment.
<br/>
<br/>
Through the training programs and courses conducted inside or outside the center, we aspire to develop skills and competencies, increase interaction and collaboration, improve time management, enhance performance and outcomes, raise customer satisfaction levels, and bolster the center's reputation.
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
        <h1 className="font-extrabold my-5 md:text-3xl text-2xl">
          {currentContent.title}
        </h1>
        <section
          className={`p-2 container rounded-lg ${
            lang === "ar" ? "text-right" : "text-left"
          }`}
        >
          <p
            className="text-foreground/90"
            dangerouslySetInnerHTML={{ __html: currentContent.description }}
          />
        </section>
      </div>
    </main>
  );
};

export default TrainingPage;
