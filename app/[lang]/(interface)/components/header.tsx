import LangRenderer from "@/components/lang";
import LocaleSwitcher from "@/components/locale-switcher";
import ToggleTheme from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import React from "react";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import NavigationSheet, { NavigationMenuDesktop } from "./navigation";
import Image from "next/image";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import Link from "next/link";
import { CustomLink } from "@/components/custom-link";
import { IoSearchOutline } from "react-icons/io5";

const Header = async ({
  lang,
  className,
}: {
  lang: Locale;
  className?: string;
}) => {
  const dictionary = await getDictionary(lang);
  return (
    <header
      className={cn(
        "fixed z-[1000] w-full bg-background top-0 left-0",
        className
      )}
    >
      <div className="bg-primary selection:bg-secondary selection:text-foreground text-white px-4 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <LangRenderer
            ar={
              <>
                <span>218928666458+</span>
                <MdOutlinePermPhoneMsg size={24} />
              </>
            }
            en={
              <>
                <MdOutlinePermPhoneMsg size={24} />
                <span>+218928666458</span>
              </>
            }
          />
        </div>
        <LocaleSwitcher
          arTitle="عربي"
          className={cn(
            "text-white/80 font-normal hover:text-white pl-14",
            lang === "en" && "pl-0"
          )}
          enTitle="English"
          varians={"link"}
        />
      </div>
      <div
        dir="rtl"
        className="flex justify-between xl:container px-4 items-center"
      >
        <div className="hidden lg:flex justify-center gap-2 items-center">
          <CustomLink href={`/${lang}/search`} size={"icon"} variant={"ghost"}>
            <IoSearchOutline className="w-4 h-4" />
          </CustomLink>
          <ToggleTheme />
        </div>
        <div className="md:hidden flex justify-center gap-2 items-center">
          <CustomLink href={`/${lang}/search`} size={"icon"} variant={"ghost"}>
            <IoSearchOutline className="w-4 h-4" />
          </CustomLink>
          <NavigationSheet />
        </div>
        <NavigationMenuDesktop labs={dictionary.labs} />
        <Link
          href={`/${lang}`}
          className="md:w-[138px] my-1.5 phone-only:my-2 w-20 overflow-hidden"
        >
          <Image
            src={"/logo.png"}
            alt="logo"
            width={1000}
            height={1000}
            priority
            className="w-full h-full object-center object-cover"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
