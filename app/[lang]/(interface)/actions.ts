import { createMsg } from "@/database/contact";
import { z } from "zod";

export async function newContactAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      content: z.string(),
      fullName: z.string().min(1),
      phone: z.string().min(9),
      email: z.string().min(3),
    });

    const data = schema.safeParse({
      content: formData.get("content"),
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
    });
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    const { content, fullName, phone, email } = data.data;
    const res = await createMsg({
      content,
      fullName,
      phone: Number(phone),
      email,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
