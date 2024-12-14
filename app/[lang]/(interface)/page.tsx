import { Locale } from "@/i18n-config";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  return <main className="min-h-[90vh] bg-secondary">s</main>;
}
