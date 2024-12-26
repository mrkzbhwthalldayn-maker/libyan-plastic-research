"use client";

import AccessibleDialogForm from "@/components/accible-dialog-form";
import { FacultyMember } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  createFacultyMemberAction,
  deleteFacultyMemberAction,
  updateFacultyMemberAction,
} from "../actions";

export const CreateFacultyMemberForm = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="إنشاء"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<Button>إضافة مستخدم جديد</Button>}
      action={createFacultyMemberAction}
      title="إضافة مستخدم جديد"
    >
      <div className="grid gap-4">
        <div>
          <Label htmlFor="fullName">الاسم الكامل</Label>
          <Input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="أدخل الاسم الكامل"
            required
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">رقم الهاتف</Label>
          <Input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="أدخل رقم الهاتف"
            required
            dir="rtl"
          />
        </div>
        <div>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="أدخل البريد الإلكتروني"
            required
          />
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const UpdateFacultyMemberForm = ({ user }: { user: FacultyMember }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="تحديث"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>تحديث مستخدم</button>}
      action={updateFacultyMemberAction}
      title="تحديث معلومات المستخدم"
    >
      <Input type="hidden" name="id" id="id" defaultValue={user.id} readOnly />
      <div className="grid gap-4">
        <div>
          <Label htmlFor="fullName">الاسم الكامل</Label>
          <Input
            type="text"
            name="fullName"
            id="fullName"
            defaultValue={user.fullName}
            placeholder="أدخل الاسم الكامل"
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">رقم الهاتف</Label>
          <Input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            defaultValue={user.phoneNumber}
            placeholder="أدخل رقم الهاتف"
            dir="rtl"
          />
        </div>
        <div>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            type="email"
            name="email"
            id="email"
            defaultValue={user.email}
            placeholder="أدخل البريد الإلكتروني"
          />
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const DeleteFacultyMemberForm = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="حذف"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>حذف مستخدم</button>}
      action={deleteFacultyMemberAction}
      title="حذف مستخدم"
      discardVariant={"default"}
      submitVariant={"outline"}
      description="من خلال هذا النموذج، يمكنك حذف المستخدم بسهولة. بمجرد الإرسال، سيتم حذف المستخدم بشكل نهائي."
    >
      <Input type="hidden" name="id" id="id" readOnly value={id} required />
    </AccessibleDialogForm>
  );
};
