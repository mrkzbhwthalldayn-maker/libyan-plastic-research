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

// ==================== Create Form ====================
export const CreateNewForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<Button>إنشاء نموذج</Button>}
      success="تم إنشاء النموذج بنجاح"
      replaceLink="/dashboard/forms"
      className="w-full"
      action={async (formData: FormData) => {
        const name = formData.get("name")?.toString().trim() || null;
        const enName = formData.get("enName")?.toString().trim() || null;

        if (!name && !enName) {
          setError("يجب تعبئة الاسم إما بالعربية أو بالإنجليزية");
          throw new Error("Validation error");
        }

        setError("");

        // أضف ملف PDF إلى FormData إذا موجود
        if (pdfFile) {
          formData.set("url", pdfFile);
        }

        // تأكد إرسال null إذا الحقول فارغة
        formData.set("name", name);
        formData.set("enName", enName);

        return await createFormAction(formData);
      }}
      submit="إنشاء"
    >
      <div className="flex flex-col gap-4">
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

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <div className="my-2">
          <CustomDropzoneUploadPdf
            name="url"
            title="الملف"
            dropClassName="border-forground/50"
            responsive
            onChange={(file: File) => setPdfFile(file)}
          />
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

// ==================== Update Form ====================
export const UpdateForm = ({ form }: { form: Form }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>تحديث النموذج</button>}
      success="تم تحديث النموذج بنجاح"
      replaceLink="/dashboard/forms"
      className="w-full"
      action={async (formData: FormData) => {
        const name = formData.get("name")?.toString().trim() || null;
        const enName = formData.get("enName")?.toString().trim() || null;

        if (!name && !enName) {
          setError("يجب تعبئة الاسم إما بالعربية أو بالإنجليزية");
          throw new Error("Validation error");
        }

        setError("");

        if (pdfFile) {
          formData.set("url", pdfFile);
        }

        formData.set("name", name);
        formData.set("enName", enName);

        return await updateFormAction(formData);
      }}
      submit="تحديث"
    >
      <Input type="hidden" value={form.id} name="id" readOnly />

      <div className="flex flex-col gap-4">
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

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <div className="my-2">
          <CustomDropzoneUploadPdf
            name="url"
            title="الملف"
            dropClassName="border-forground/50"
            responsive
            defaultPdf={form.url}
            onChange={(file: File) => setPdfFile(file)}
          />
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

// ==================== Delete Form ====================
export const DeleteForm = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="حذف"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>حذف النموذج</button>}
      action={deleteFormAction}
      title="حذف النموذج"
      discardVariant="default"
      submitVariant="outline"
      description="سيتم حذف النموذج بشكل نهائي."
    >
      <Input type="hidden" name="id" id="id" readOnly value={id} />
    </AccessibleDialogForm>
  );
};
