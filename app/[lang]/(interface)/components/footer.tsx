import { CustomLink } from "@/components/custom-link";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiMail } from "react-icons/ci";
import { FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { IconType } from "react-icons/lib";
import { PiTiktokLogo } from "react-icons/pi";

const Footer = async ({
  className,
  lang = "ar",
}: {
  className?: string;
  lang?: string;
}) => {
  const isArabic = lang === "ar";

  const quickLinks = [
    { title: isArabic ? "الرئيسية" : "Home", href: "" },
    { title: isArabic ? "حولنا" : "About Us", href: "/about" },
    {
      title: isArabic ? "البحوث و الدراسات" : "Research & Studies",
      href: "/research-and-studies",
    },
    {
      title: isArabic ? "الأخبار و الأنشطة" : "News & Activities",
      href: "/news-and-activities",
    },
    {
      title: isArabic ? "المختبرات" : "Labs",
      href: "/labs",
    },
    {
      title: isArabic ? "المقالات" : "Articles",
      href: "/articles",
    },
  ];

  const socialLinks = [
    {
      Icon: FiFacebook,
      title: isArabic ? "فيسبوك" : "Facebook",
      href: "https://www.facebook.com/LibyanPolymerResearchCenter",
    },
    { Icon: FaInstagram, title: isArabic ? "انستا" : "Instagram" },
    { Icon: FaXTwitter, title: isArabic ? "اكس" : "X" },
    { Icon: PiTiktokLogo, title: isArabic ? "تيك توك" : "TikTok" },
    {
      Icon: CiMail,
      title: isArabic ? "البريد" : "Mail",
      href: "mailto:info@prc.ly",
    },
    {
      Icon: FaMapMarkerAlt,
      title: isArabic ? "الخريطة" : "Map",
      href: "https://maps.app.goo.gl/nqkMA42Z8zLwmdRC9",
    },
  ];
  const dictionary = await getDictionary(lang as Locale);

  return (
    <footer
      className={cn("bg-background", className)}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="container grid md:grid-cols-2 lg:grid-cols-3 py-20 gap-10">
        {/* Logo and Description */}
        <div className="text-center sm:text-right">
          <div className="w-fit mx-auto sm:w-full">
            <Link
              href={`/${lang}`}
              className="md:w-[340px] mx-auto max-w-full md:h-[200px]"
            >
              <Image
                src={"/logo.png"}
                priority
                alt="logo"
                width={1000}
                height={1000}
                className="w-full h-full object-cover aspect-auto"
              />
            </Link>
          </div>
          <p className="my-2 text-sm text-foreground/80">
            {dictionary.about.description}{" "}
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-fit text-center mx-auto">
          <h3 className="text-center font-semibold">
            {isArabic ? "روابط سريعة" : "Quick Links"}
          </h3>
          <nav>
            <ul className="my-4">
              {quickLinks.map((link, index) => (
                <SocailMediaLink
                  lang={lang}
                  key={index}
                  title={link.title}
                  href={link.href}
                />
              ))}
            </ul>
          </nav>
        </div>

        {/* Social Media */}
        <div className="w-fit mx-auto text-center">
          <h3 className="text-center font-semibold">
            {isArabic ? "وسائل التواصل الإجتماعي" : "Social Media"}
          </h3>
          <nav>
            <ul className="my-4">
              {socialLinks.map((link, index) => (
                <SocailMediaLink
                  lang={lang}
                  key={index}
                  Icon={link.Icon}
                  title={link.title}
                  href={link.href}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <p className="mx-auto w-fit text-foreground/90 text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-foreground">
          {isArabic
            ? "المركز الليبي لبحوث اللدائن"
            : "The Libyan Center for Polymer Research"}
        </span>{" "}
        {isArabic ? "كل الحقوق محفوظة." : "All rights reserved."}
      </p>
    </footer>
  );
};

const SocailMediaLink = ({
  Icon,
  title,
  href = "#",
  lang,
  target = "_blank",
}: {
  Icon?: IconType;
  title: string;
  href?: string;
  lang: string;
  target?: "_self" | "_blank" | "_parent" | "_top" | undefined;
}) => {
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";
  return (
    <li className="w-full">
      <CustomLink
        target={target}
        dir="rtl"
        variant={"ghost"}
        className={cn("text-foreground/80 group")}
        href={href}
      >
        {Icon && (
          <Icon className="ml-3 text-foreground/80 group-hover:text-foreground" />
        )}
        {title}
      </CustomLink>
    </li>
  );
};

export default Footer;
