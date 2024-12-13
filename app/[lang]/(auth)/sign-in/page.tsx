import LangRenderer from "../../components/lang";
import { SignInForm } from "../components/forms";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

const page = async ({
  searchParams,
  params,
}: {
  searchParams?: { redirect?: string };
  params: Promise<{ lang: string }>;
}) => {
  const lang = (await params).lang;
  const user = await getSession();
  const redirectLink = searchParams?.redirect;
  // const
  if (user) {
    redirect(redirectLink ?? `/${lang}`);
  }
  return (
    <div className="text-center mx-2 bg-secondary px-2 py-10 rounded-md">
      <h1 className=" font-bold text-xl">
        <LangRenderer
          ar="مرحبًا بك من جديد! سجل الدخول للمتابعة"
          en="Welcome back! Sign in to continue"
        />
      </h1>
      <br />
      <SignInForm href={redirectLink} />
    </div>
  );
};

export default page;
