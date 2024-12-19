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
      <div dir="rtl" className="flex justify-between container items-center">
        <ToggleTheme className="phone-only:hidden" />
        <NavigationSheet />
        <NavigationMenuDesktop labs={dictionary.labs} />
        <div className="md:w-24 w-16 overflow-hidden">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={1000}
            height={1000}
            priority
            className="w-full h-full object-center object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
