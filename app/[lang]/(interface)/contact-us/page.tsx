import LangRenderer from "@/components/lang";
import React from "react";
import ContactUsForm from "../components/contact-form";
import { AnimatedCard } from "@/components/animations";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import LangBreadcrumbSeparator from "@/components/breadcrumb-separator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "ar" | "en" }>;
}) {
  const { lang } = await params;

  const content = {
    ar: {
      title: "تواصل معنا",
    },
    en: {
      title: "Contact Us",
    },
  };

  const currentContent = content[lang];

  return {
    title: currentContent.title,
    openGraph: {
      title: currentContent.title,
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title: currentContent.title,
    },
  };
}

const page = async ({ params }: { params: Promise<{ lang: "ar" | "en" }> }) => {
  const { lang } = await params;

  return (
    <section id="contact-us" className="h-full py-10 container">
      <Breadcrumb className="mb-4">
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
              {lang === "ar" ? "تواصل معنا" : "Contact Us"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <div className="w-fit mx-auto">
          <h3 className="font-semibold text-2xl md:text-3xl">
            <LangRenderer ar="تواصل معنا" en="Contact Us" />
          </h3>
          <p className="mb-2 mt-4 leading-6 text-foreground/80 text-base">
            <LangRenderer
              ar="أي استفسارات ؟  تفضل!"
              en="Any inquiries ?  Go ahead!"
            />
          </p>
        </div>
        <div className="flex justify-between phone-only:flex-col-reverse gap-10 items-start">
          <div className="w-full md:w-3/4">
            <ContactUsForm />
          </div>
          <AnimatedCard
            XorY="x"
            initialX={-20}
            className="bg-accent block py-10 px-4 phone-only:w-full rounded-md mx-auto"
          >
            <h3 className="font-semibold mt-4">
              <LangRenderer ar="عنوان المركز:" en="Center Address:" />
            </h3>
            <p>
              <LangRenderer
                ar="طريق الشط، تاجوراء، ليبيا"
                en="Shat Road, Tajoura, Libya"
              />
            </p>
            <h3 className="font-semibold mt-4">
              <LangRenderer ar="إتصل بنا:" en="Contact Us:" />
            </h3>
            <p>
              <LangRenderer ar="الهاتف:" en="Phone:" />{" "}
              <Link href={"tel:+218912637380"}>912637380</Link> (218+)
            </p>
            <p>
              <LangRenderer ar="البريد الإلكتروني:" en="Email:" />{" "}
              <Link href={"mailto:info@prc.ly"}>info@prc.ly</Link>
            </p>
            <h3 className="font-semibold mt-4">
              <LangRenderer ar="ساعات العمل:" en="Working Hours:" />
            </h3>
            <p>
              <LangRenderer
                ar="الأحد - الخميس: 8.00 صباحاً إلى 3.00 مساءاً"
                en="Sunday - Thursday: 8.00 AM to 3.00 PM"
              />
            </p>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
};

export default page;
