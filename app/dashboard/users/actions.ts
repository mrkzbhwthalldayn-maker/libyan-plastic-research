import { createUser } from "@/database/users";
import { Roles } from "@prisma/client";
import { z } from "zod";

export async function createUserAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      email: z.string().email("البريد الإلكتروني غير صالح"),
      fullName: z.string().min(4, "الاسم الكامل مطلوب"),
      phoneNumber: z.string().min(9, "رقم الهاتف مطلوب"),
      password: z.string().min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل"),
      role: z.nativeEnum(Roles),
      verified: z.string(),
    });

    const data = schema.safeParse({
      fullName: formData.get("fullName") || "",
      phoneNumber: formData.get("phoneNumber") || "",
      password: formData.get("password") || "",
      email: formData.get("email") || "",
      role: formData.get("role") || "admin",
      verified: formData.get("verified") || "false",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { email, fullName, phoneNumber, password, role, verified } =
      data.data;

    const res = await createUser({
      fullName,
      password,
      role,
      phoneNumber: Number(phoneNumber),
      verified: verified === "true",
      email,
    });

    console.log("User created successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in createUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}
