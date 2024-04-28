'use server';

import { ResponseMainFormAction } from "@/types";
import { LoginSchema, UserSchema } from "./schemas";
import bcrypt from 'bcrypt-edge'
import { registerUser } from "./data";

export async function SignupAction(formData: FormData): Promise<ResponseMainFormAction> {
  const parsedData = UserSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: 'Complete the fields for sign up',
      success: false
    }
  }

  const { name, email, password } = parsedData.data;

  const passwordHashed = bcrypt.hashSync(password, 12);

  try {

    await registerUser({
      name,
      email,
      password: passwordHashed
    })

  }catch (e) {
    console.error(e);
    return {
      message: (e as any).message as string,
      success: false
    }
  }

  return {
    message: 'Email verification was sent',
    success: true
  }
}

export async function SignInAction(formData: FormData): Promise<ResponseMainFormAction | void> {
  const parsedData = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: 'Complete the fields for sign up',
      success: false
    }
  }

  const { email, password } = parsedData.data;

  // TODO: Make the login action
}