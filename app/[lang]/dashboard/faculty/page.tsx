import FacultyTable from "@/components/reusable-table";
import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { facultyTable } from "./components/faculty-column";
import { CreateFacultyMemberForm } from "./components/forms";
import { getFacultyMembers } from "@/database/faculty";

const page = async (props: {
  searchParams: Promise<{ fullName?: string }>;
  params: Promise<{ lang: string }>;
}) => {
  const params = await props.params;
  const { lang } = params;
  const searchParams = await props.searchParams;
  const users = await getFacultyMembers({ fullName: searchParams?.fullName });

  return (
    <main className="phone-only:px-4">
      <div className=" flex md:justify-between  justify-start flex-col  md:flex-row md:items-center md:mx-2 my-2">
        <Breadcrumb className="my-2" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}`}>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/dashboard`}>لوحة التحكم</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ادارة اعضاء هئية التدريس</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CreateFacultyMemberForm />
      </div>
      <div className=" my-4 md:container">
        <Suspense fallback={"جاري التحميل"}>
          <FacultyTable
            searchPlaceholder="البحث بالاسم"
            data={users}
            columns={facultyTable}
            searchQuery="fullName"
          />
        </Suspense>
      </div>
    </main>
  );
};

export default page;
