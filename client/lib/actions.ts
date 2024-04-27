'use server';

import { ResponseMainFormAction } from "@/types";
import { LoginSchema } from "./schemas";

export async function SignupAction(formData: FormData): Promise<ResponseMainFormAction> {
  const parsedData = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: 'Complete the fields for sign up',
      success: false
    }
  }

  const { email, password } = parsedData.data;

  return {
    message: 'Email verification was sent',
    success: true
  }
}