'use server';

import { ResponseMainFormAction, ResponseVerificationAction } from "@/types";
import { LoginSchema, UserSchema } from "./schemas";
import bcrypt from 'bcrypt-edge'
import { changeImage, generateVerificationToken, getUserByEmail, registerUser } from "./data";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { sendVerificationEmail } from "./mail";
import { revalidatePath } from "next/cache";

export async function LoginOAuthAction(provider: 'github' | 'google') {
  await signIn(provider, {
    redirect: true,
    redirectTo: DEFAULT_REDIRECT
  })
}

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

    const isUserExists = await getUserByEmail(email);

    if (isUserExists) {
      return {
        errors: {
          email: ['Try with other email']
        },
        message: 'That email is already exists',
        success: false
      }
    }

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

  const existingUser = await getUserByEmail(email);
  const comparePassword = existingUser?.password && bcrypt.compareSync(password, existingUser.password)

  if (!existingUser || !existingUser.email || !existingUser.password || !comparePassword) {
    return {
      message: 'Invalid credentials',
      success: false
    }
  }

  if (!existingUser.emailVerified) {
    const token = await generateVerificationToken(email);

    await sendVerificationEmail(token.identifier, token.token)
    
    return {
      message: "Email confirmation sent",
      success: false,
    };
  }

  try {
    
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      redirectTo: DEFAULT_REDIRECT
    })

  }catch (e) {
    
    if (e instanceof AuthError) {
      switch(e.type) {
        case 'CredentialsSignin':
          return {
            message: 'Invalid credentials',
            success: false
          }
      }
    }

    throw e;
  }

  return {
    message: 'Sign in success!',
    success: true
  }
}

export async function ChangeProfilePhotoAction(email: string, image: string): Promise<ResponseVerificationAction> {
  try {

    await changeImage(image, email)

    revalidatePath('/messenger');

    return {
      success: 'Profile photo edited!'
    }
  }catch (e) {
    console.error(e);
    return {
      error: 'Something went wrong'
    }
  }
}