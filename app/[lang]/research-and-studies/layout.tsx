import { Cairo, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n-config";
import Header from "../(interface)/components/header";
import Footer from "../(interface)/components/footer";
import uri from "@/lib/uri";

const outfit = Outfit({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });
// **2. Generate Metadata**
export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang;

  const siteInfo = {
    ar: {
      title: "المركز الليبي لبحوث اللدائن | الدراسات و الأنشطة",
    },
    en: {
      title: "Libyan Center for Polymer Research | research and studies",
    },
  };

  const info = siteInfo[lang as "ar" | "en"];
  const logo = "/logo.png"; // Update this path to your actual logo location
  const url =
    process.env.NODE_ENV === "production" ? uri : "http://localhost:3000";

  return {
    title: info.title,
    // description: info.description,
    openGraph: {
      title: info.title,
      // description: info.description,
      url: url,
      images: [
        {
          url: logo,
          alt: info.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: info.title,
      // description: info.description,
      images: [logo],
    },
    alternates: {
      canonical: url,
    },

    // jsonLd: JSON.stringify(jsonLd), // Embeds JSON-LD in the head
  };
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}>) {
  const lang = (await params).lang;
  return (
    <div
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={cn(
        lang === "ar" ? cairo.className : outfit.className,
        "relative",
        lang === "ar" ? "text-right" : "text-left"
      )}
    >
      <Header
        className="border-b border-b-foreground/20"
        lang={lang as Locale}
      />

      <div className="md:mt-[120px] mt-24">{children}</div>
      <Footer className="bg-secondary" lang={lang} />
    </div>
  );
}
