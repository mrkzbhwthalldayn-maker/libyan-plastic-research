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
import { getMsgs } from "@/database/contact";
import { msgsColumn } from "./components/msg-column";
import MsgsTable from "@/components/reusable-table";
const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ content?: string }>;
}) => {
  const params = await searchParams;
  const msgs = await getMsgs(params.content);
  return (
    <main>
      <Breadcrumb className="my-2" dir="rtl">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/`}>الرئيسية</Link>
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
            <BreadcrumbPage>طلبات المراسلة</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="my-4 md:container">
        <Suspense fallback={"جاري التحميل"}>
          <MsgsTable
            searchPlaceholder="البحث بالمحتوى"
            data={msgs}
            columns={msgsColumn}
            searchQuery="content"
          ></MsgsTable>
        </Suspense>
      </div>
    </main>
  );
};

export default page;
