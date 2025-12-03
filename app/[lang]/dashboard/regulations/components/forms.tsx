"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  createFormAction,
  updateFormAction,
  deleteFormAction,
} from "../actions";
import AccessibleDialogForm from "@/components/accible-dialog-form";
import { CustomDropzoneUploadPdf } from "@/components/custom-dropzone";
import { Form } from "@prisma/client";

// === Create New Form with inline validation ===
export const CreateNewForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<Button>إنشاء نموذج</Button>}
      success="تم إنشاء النموذج بنجاح"
      replaceLink="/dashboard/forms"
      className="w-full"
      action={async (formData: any) => {
        const name = formData.get("name")?.trim();
        const enName = formData.get("enName")?.trim();

        if (!name && !enName) {
          setError("يجب تعبئة الاسم إما بالعربية أو بالإنجليزية");
          throw new Error("Validation error");
        }

        setError(""); // إزالة الرسالة عند النجاح
        return await createFormAction(formData);
      }}
      submit="إنشاء"
    >
      <div className="flex gap-4 phone-only:flex-col justify-between">
        <div className="w-full flex flex-col gap-4 justify-center">
          <div>
            <Label htmlFor="name">الاسم</Label>
            <Input type="text" name="name" id="name" placeholder="أدخل الاسم" />
          </div>
          <div>
            <Label htmlFor="enName">الاسم بالإنجليزية</Label>
            <Input
              type="text"
              name="enName"
              id="enName"
              placeholder="أدخل الاسم بالإنجليزية"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
          <div className="my-2">
            <CustomDropzoneUploadPdf
              name="url"
              title="الملف"
              dropClassName="border-forground/50"
              responsive
            />
          </div>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

// === Update Form with inline validation ===
export const UpdateForm = ({ form }: { form: Form }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>تحديث النموذج</button>}
      success="تم تحديث النموذج بنجاح"
      replaceLink="/dashboard/forms"
      className="w-full"
      action={async (formData: any) => {
        const name = formData.get("name")?.trim();
        const enName = formData.get("enName")?.trim();

        if (!name && !enName) {
          setError("يجب تعبئة الاسم إما بالعربية أو بالإنجليزية");
          throw new Error("Validation error");
        }

        setError("");
        return await updateFormAction(formData);
      }}
      submit="تحديث"
    >
      <Input type="hidden" value={form.id} name="id" readOnly />

      <div className="flex gap-4 phone-only:flex-col justify-between">
        <div className="w-full flex flex-col gap-4 justify-center">
          <div>
            <Label htmlFor="name">الاسم</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="أدخل الاسم"
              defaultValue={form.name || ""}
            />
          </div>
          <div>
            <Label htmlFor="enName">الاسم بالإنجليزية</Label>
            <Input
              type="text"
              name="enName"
              id="enName"
              placeholder="أدخل الاسم بالإنجليزية"
              defaultValue={form.enName || ""}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
          <div className="my-2">
            <CustomDropzoneUploadPdf
              name="url"
              title="الملف"
              dropClassName="border-forground/50"
              responsive
              defaultPdf={form.url}
            />
          </div>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

