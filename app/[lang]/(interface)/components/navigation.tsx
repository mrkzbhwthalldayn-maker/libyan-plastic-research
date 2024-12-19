"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import LangRenderer from "@/components/lang";
import { useParams, usePathname } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CustomLink } from "@/components/custom-link";
import ToggleTheme from "@/components/theme-toggle";
import { FaBars } from "react-icons/fa";

const about: {
  title: string;
  href: string;
  description: string;
  enTitle: string;
  enDesc: string;
}[] = [
  {
    title: "حول المركز",
    href: `/about#about`,
    description:
      "تعريف شامل بالمركز الليبي لبحوث اللدائن ودوره في البحث العلمي وتطوير الصناعات.",
    enTitle: "About the Center",
    enDesc:
      "A comprehensive overview of the Libyan Center for Plastic Research, its role in scientific research, and industrial development.",
  },
  {
    title: "كلمة مدير المركز",
    href: "/about#director-message",
    description:
      "رسالة ترحيبية من مدير المركز تبرز رؤية المركز وأهدافه الاستراتيجية.",
    enTitle: "Director's Message",
    enDesc:
      "A welcoming message from the director highlighting the center's vision and strategic goals.",
  },
  {
    title: "السيرة الذاتية لأعضاء هيئة التدريس",
    href: "/about#faculty-cv",
    description:
      "عرض معلومات عن السيرة الذاتية والخبرة العلمية لأعضاء هيئة التدريس بالمركز.",
    enTitle: "Faculty Members' CVs",
    enDesc:
      "Details about the academic and professional experience of the center's faculty members.",
  },
];

const structure: {
  title: string;
  href: string;
  description: string;
  enTitle: string;
  enDesc: string;
}[] = [
  {
    title: "إدارة الشؤون الإدارية",
    href: `/organizational-structure#administration`,
    description:
      "القسم المسؤول عن تنظيم الشؤون الإدارية وضمان سير العمل بسلاسة.",
    enTitle: "Administrative Affairs",
    enDesc:
      "The department responsible for organizing administrative matters and ensuring smooth operations.",
  },
  {
    title: "إدارة الشؤون البحثية",
    href: "/organizational-structure#research",
    description: "الإشراف على الأنشطة البحثية والتطويرية داخل المركز.",
    enTitle: "Research Affairs",
    enDesc: "Overseeing research and development activities within the center.",
  },
  {
    title: "إدارة المعامل والتحاليل",
    href: "/organizational-structure#labs",
    description:
      "إدارة المختبرات وتقديم خدمات التحاليل اللازمة لدعم البحث العلمي.",
    enTitle: "Laboratories and Analysis",
    enDesc:
      "Managing laboratories and providing analytical services to support scientific research.",
  },
  {
    title: "إدارة الموارد البشرية",
    href: "/organizational-structure#hr",
    description: "مسؤولية إدارة القوى العاملة وتعزيز الكفاءات البشرية بالمركز.",
    enTitle: "Human Resources",
    enDesc:
      "Responsible for workforce management and enhancing the center's human capital.",
  },
  {
    title: "مطابقة المواصفات",
    href: "/organizational-structure#compliance",
    description:
      "ضمان توافق المنتجات والخدمات مع المعايير والمواصفات المعتمدة.",
    enTitle: "Compliance with Standards",
    enDesc:
      "Ensuring products and services comply with approved standards and specifications.",
  },
  {
    title: "متابعة نظام الجودة",
    href: "/organizational-structure#quality",
    description: "الإشراف على تطبيق نظام الجودة ومراقبة الأداء داخل المركز.",
    enTitle: "Quality Assurance",
    enDesc:
      "Supervising the implementation of quality systems and performance monitoring within the center.",
  },
];

export function NavigationMenuDesktop() {
  const { lang } = useParams();
  const pathname = usePathname();

  return (
    <NavigationMenu
      className="hidden md:flex"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <NavigationMenuList className="gap-5">
        <NavigationMenuItem>
          <Link
            href={`/${lang}`}
            passHref
            className={cn(
              navigationMenuTriggerStyle(),
              pathname === `/${lang}` && "bg-primary text-white"
            )}
          >
            <NavigationMenuLink
              asChild // Render as a span instead of an anchor when inside <Link>
            >
              <LangRenderer en="Home" ar="الرئيسية" />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <LangRenderer en="About" ar="حول" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] ">
              {about.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={`/${lang}/${component.href}`}
                  enDescription={component.enDesc}
                  enTitle={component.enTitle}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <LangRenderer en="organizational structure" ar="الهيكل التنظيمي" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] ">
              {structure.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={`/${lang}/${component.href}`}
                  enDescription={component.enDesc}
                  enTitle={component.enTitle}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href={`/${lang}/research-and-studies`}
            passHref
            className={cn(
              navigationMenuTriggerStyle(),
              pathname === `/${lang}/research-and-studies` &&
                "bg-primary text-white",
              pathname.startsWith(`/${lang}/research-and-studies`) &&
                "bg-primary text-white"
            )}
          >
            <NavigationMenuLink
              asChild // Render as a span instead of an anchor when inside <Link>
            >
              <LangRenderer en="Research and Studies" ar="البحوث و الدراسات" />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`/${lang}/news-and-activities`}
            passHref
            className={cn(
              navigationMenuTriggerStyle(),
              pathname === `/${lang}/news-and-activities` &&
                "bg-primary text-white",
              pathname.startsWith(`/${lang}/news-and-activities`) &&
                "bg-primary text-white"
            )}
          >
            <NavigationMenuLink
              asChild // Render as a span instead of an anchor when inside <Link>
            >
              <LangRenderer en="News and Activities" ar="الأخبار و الأنشطة" />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`/${lang}/articles`}
            passHref
            className={cn(
              navigationMenuTriggerStyle(),
              pathname === `/${lang}/articles` && "bg-primary text-white",
              pathname.startsWith(`/${lang}/articles`) &&
                "bg-primary text-white"
            )}
          >
            <NavigationMenuLink asChild>
              <LangRenderer en="All Articles" ar="كل المقالات" />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    enTitle: string;
    enDescription: string;
  }
>(({ className, title, children, enDescription, enTitle, ...props }, ref) => {
  const { lang } = useParams();
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">
            {lang === "ar" ? title : enTitle}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {lang === "ar" ? children : enDescription}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface LinkProps {
  link: string;
  ar: string;
  en: string;
}

const links = [
  {
    title: "About",
    ar: "حول",
    subLinks: [
      {
        link: "/about#about",
        ar: "حول المركز",
        en: "About the Center",
      },
      {
        link: "/about#director-message",
        ar: "كلمة مدير المركز",
        en: "Director's Message",
      },
      {
        link: "/about#faculty-cv",
        ar: "السيرة الذاتية لأعضاء هيئة التدريس",
        en: "Faculty Members' CVs",
      },
    ],
  },
  {
    title: "Organizational Structure",
    ar: "الهيكل التنظيمي",
    subLinks: [
      {
        link: "/organizational-structure#administration",
        ar: "إدارة الشؤون الإدارية",
        en: "Administrative Affairs",
      },
      {
        link: "/organizational-structure#research",
        ar: "إدارة الشؤون البحثية",
        en: "Research Affairs",
      },
      {
        link: "/organizational-structure#labs",
        ar: "إدارة المعامل والتحاليل",
        en: "Laboratories and Analysis",
      },
    ],
  },
];

export default function NavigationSheet() {
  const { lang } = useParams();
  const [open, setOpen] = React.useState<boolean>(false);
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="hidden phone-only:flex"
          size={"icon"}
        >
          <FaBars size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="z-[10000]"
        side={lang === "en" ? "left" : "right"}
        dir={lang === "en" ? "ltr" : "rtl"}
      >
        <SheetHeader>
          <SheetTitle>
            <VisuallyHidden>navigation bar</VisuallyHidden>
          </SheetTitle>
          <SheetDescription>
            <VisuallyHidden>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </VisuallyHidden>
          </SheetDescription>

          <CustomLink
            variant={pathname === `/${lang}` ? "default" : "ghost"}
            href={`/${lang}`}
            className="text-start block px-2 shadow"
            onClick={() => setOpen(!open)}
          >
            <LangRenderer en="Home" ar="الرئيسية" />
          </CustomLink>
          <Accordion
            dir={lang === "en" ? "ltr" : "rtl"}
            type="single"
            collapsible
          >
            {links.map((item) => (
              <AccordionItem
                key={item.title}
                className="border-none "
                value={item.title}
              >
                <AccordionTrigger className="border-none my-1 hover:bg-accent px-2 rounded-md py-2 shadow">
                  {lang === "ar" ? item.ar : item.title}
                </AccordionTrigger>
                <AccordionContent>
                  {item.subLinks ? (
                    <ul className="ml-4 flex flex-col items-start gap-1 space-y-2">
                      {item.subLinks.map((subLink, i) => (
                        <SheetLink
                          key={i}
                          link={subLink.link}
                          ar={subLink.ar}
                          en={subLink.en}
                          setOpen={setOpen}
                          open={open}
                        />
                      ))}
                    </ul>
                  ) : (
                    <></>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <CustomLink
            variant={
              pathname === `/${lang}/research-and-studies` ||
              pathname.startsWith(`/${lang}/research-and-studies`)
                ? "default"
                : "ghost"
            }
            href={`/${lang}/research-and-studies`}
            className="text-start block px-2 shadow"
            onClick={() => setOpen(!open)}
          >
            <LangRenderer en="Research and Studies" ar="البحوث و الدراسات" />
          </CustomLink>

          <CustomLink
            variant={
              pathname === `/${lang}/news-and-activities` ||
              pathname.startsWith(`/${lang}/news-and-activities`)
                ? "default"
                : "ghost"
            }
            href={`/${lang}/news-and-activities`}
            className="text-start block px-2 shadow"
            onClick={() => setOpen(!open)}
          >
            <LangRenderer en="News and Activities" ar="الأخبار و الأنشطة" />
          </CustomLink>
          <CustomLink
            variant={
              pathname === `/${lang}/articles` ||
              pathname.startsWith(`/${lang}/articles`)
                ? "default"
                : "ghost"
            }
            href={`/${lang}/articles`}
            className="text-start block px-2 shadow"
            onClick={() => setOpen(!open)}
          >
            <LangRenderer en="All Articles" ar="كل المقالات" />
          </CustomLink>
        </SheetHeader>
        <SheetFooter>
          <ToggleTheme className="my-4 mx-auto" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const SheetLink = ({
  ar,
  en,
  link,
  open,
  setOpen,
}: LinkProps & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) => {
  const { lang } = useParams();
  return (
    <li
      key={link}
      onClick={() => setOpen(!open)}
      className="w-full text-right flex"
    >
      <CustomLink
        variant={"link"}
        className="w-full block"
        href={`/${lang}${link}`}
      >
        {lang === "ar" ? ar : en}
      </CustomLink>
    </li>
  );
};
