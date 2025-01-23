"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "@/components/form";
import { newContactAction } from "../actions";
import { Textarea } from "@/components/ui/textarea";
import LangRenderer from "@/components/lang";
import { useParams } from "next/navigation";

const ContactUsForm = () => {
  const { lang } = useParams();
  return (
    <Form action={newContactAction} dontReplace submit="ارسال">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">
            <LangRenderer ar="الاسم" en="Full Name" />
          </Label>
          <Input
            required
            placeholder={lang === "ar" ? "اسمك" : "Your Name"}
            type="text"
            name="fullName"
            id="fullName"
            className="mt-2"
          />
          <span className="text-xs mt-1">
            <LangRenderer ar="ادخل اسمك هنا" en="Enter your name here" />
          </span>
        </div>
        <div>
          <Label htmlFor="phone">
            <LangRenderer ar="رقم الهاتف" en="Phone Number" />
          </Label>
          <Input
            dir="rtl"
            required
            placeholder={lang === "ar" ? "رقم هاتفك" : "Your Phone Number"}
            type="tel"
            name="phone"
            id="phone"
            className="mt-2"
          />
          <span className="text-xs mt-1">
            <LangRenderer
              ar="ادخل رقم هاتفك هنا"
              en="Enter your phone number here"
            />
          </span>
        </div>
        <div>
          <Label htmlFor="email">
            <LangRenderer ar="البريد الإلكتروني" en="Email" />
          </Label>
          <Input
            required
            placeholder={lang === "ar" ? "بريدك الإلكتروني" : "Your Email"}
            type="email"
            name="email"
            id="email"
            className="mt-2"
          />
          <span className="text-xs mt-1">
            <LangRenderer
              ar="ادخل بريدك الإلكتروني هنا"
              en="Enter your email here"
            />
          </span>
        </div>
        <div>
          <Label htmlFor="content">
            <LangRenderer ar="المحتوى" en="Content" />
          </Label>
          <Textarea
            name={"content"}
            required
            placeholder={
              lang === "ar" ? "ادخل المحتوى الخاص بك" : "Enter your content"
            }
            id="content"
            className="mt-2"
          />
          <span className="text-xs mt-1">
            <LangRenderer
              ar="يمكنك إدخال أي ملاحظات أو تفاصيل هنا"
              en="You can enter any notes or details here"
            />
          </span>
        </div>
      </div>
    </Form>
  );
};

export default ContactUsForm;
