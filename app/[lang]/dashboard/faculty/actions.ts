import { z } from "zod";
import {
  createFacultyMember,
  deleteFacultyMember,
  updateFacultyMember,
} from "@/database/faculty";

export async function createFacultyMemberAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      email: z.string().email("البريد الإلكتروني غير صالح"),
      fullName: z.string().min(4, "الاسم الكامل مطلوب"),
      phoneNumber: z.string().min(9, "رقم الهاتف مطلوب"),
      picture: z.string().optional().nullable(),
    });

    const data = schema.safeParse({
      fullName: formData.get("fullName") || "",
      phoneNumber: formData.get("phoneNumber") || "",
      email: formData.get("email") || "",
      picture: formData.get("picture") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { email, fullName, phoneNumber, picture } = data.data;

    const res = await createFacultyMember({
      fullName,
      phoneNumber: Number(phoneNumber),
      email,
      picture,
    });

    console.log("User created successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in createUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}

// Action to update a user
export async function updateFacultyMemberAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "معرف المستخدم مطلوب"), // "User ID is required"
      email: z.string().email("البريد الإلكتروني غير صالح"),
      fullName: z.string().min(4, "الاسم الكامل مطلوب"),
      phoneNumber: z.string().min(9, "رقم الهاتف مطلوب"),
      picture: z.string().optional().nullable(),
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
      fullName: formData.get("fullName") || "",
      phoneNumber: formData.get("phoneNumber") || "",
      email: formData.get("email") || "",
      picture: formData.get("picture") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { id, email, fullName, phoneNumber, picture } = data.data;

    const res = await updateFacultyMember({
      id,
      fullName,
      phoneNumber: Number(phoneNumber),
      email,
      picture,
    });

    console.log("User updated successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in updateUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later."
  }
}

// Action to delete a user
export async function deleteFacultyMemberAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "معرف المستخدم مطلوب"), // "User ID is required"
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { id } = data.data;

    const res = await deleteFacultyMember({ id });

    console.log("User deleted successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in deleteUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later."
  }
}
