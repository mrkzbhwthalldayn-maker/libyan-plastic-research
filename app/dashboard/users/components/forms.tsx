"use client";

import AccessibleDialogForm from "@/components/accible-dialog-form";
import { User } from "@prisma/client";
// import { updateUserRoleActoin } from "../actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
// import { roleToText } from "../../components/roles";
import { useParams } from "next/navigation";
import SubmitButton from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Locale } from "@/i18n-config";
import PhoneInput from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { createUserAction } from "../actions";

export const UpdateUserRoleForm = ({ user }: { user: User }) => {
  const { lang }: { lang: Locale } = useParams();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      trigger={<button>تحديث المستخدم</button>}
      action={createUserAction}
      title="تحديث المستخدم"
      submit="تحديث"
      submitClass="mt-4 w-fit mx-auto"
    >
      <Input name="id" value={user.id} type={"hidden"} />
      <div className="flex flex-col gap-2 my-2 md:flex-row justify-between items-center">
        <Label htmlFor="role">اختيار دور جديد</Label>
        <Select
          name="role"
          dir={lang === "ar" ? "rtl" : "ltr"}
          defaultValue={user.role}
        >
          <SelectTrigger id="role" className="md:w-[180px] w-full">
            <SelectValue placeholder="الدور" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">
              {/* {roleToText({ role: "user", lang })} */}
            </SelectItem>
            <SelectItem value="admin">
              {/* {roleToText({ role: "admin", lang })} */}
            </SelectItem>
            <SelectItem value="superAdmin">
              {/* {roleToText({ role: "superAdmin", lang })} */}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </AccessibleDialogForm>
  );
};
export const CreateUserForm = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="انشاء"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<Button>انشاء مشرف</Button>}
      action={createUserAction}
      title="انشاء مشرف جديد"
    >
      <div className="grid gap-4">
        <div>
          <Label htmlFor="fullName">الاسم الثلاثي</Label>
          <Input type="text" name="fullName" id="fullName" required />
        </div>
        <div>
          <Label htmlFor="phoneNumber">رقم الهاتف</Label>
          <PhoneInput
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            required
            dir="rtl"
          />
        </div>
        <div>
          <Label htmlFor="email">البريد</Label>
          <Input type="email" name="email" id="email" required />
        </div>
        <div>
          <Label htmlFor="password">كلمة السر</Label>
          <Input type="password" name="password" id="password" required />
        </div>
        <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start  md:justify-between md:items-center">
          <Label htmlFor="role">اختيار دور جديد</Label>
          <Select name="role" dir={"rtl"} defaultValue={"admin"}>
            <SelectTrigger id="role" className="md:w-[180px] w-full">
              <SelectValue placeholder="الدور" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">مشرف</SelectItem>
              <SelectItem value="superAdmin">مدير </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start  md:justify-between md:items-center">
          <Label htmlFor="verified">تم توثيق البريد</Label>
          <Select name="verified" dir={"rtl"} defaultValue={"false"}>
            <SelectTrigger id="verified" className="md:w-[180px] w-full">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">نعم</SelectItem>
              <SelectItem value="false">لا </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};
