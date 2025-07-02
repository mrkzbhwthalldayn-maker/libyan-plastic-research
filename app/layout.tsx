import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./[lang]/globals.css";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./css/base.css";
import "./css/embla.css";
// import PaymentRequiredPage from "./new-page";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  appleWebApp: {
    title: "prc",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = "ar";
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={cn(cairo.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <PaymentRequiredPage /> */}
          {children}
          <Toaster />
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}
