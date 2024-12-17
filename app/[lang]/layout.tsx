import { i18n } from "@/i18n-config";
import React, { Fragment, ReactNode } from "react";
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
const layout = ({ children }: { children: ReactNode }) => {
  return <Fragment>{children}</Fragment>;
};

export default layout;
