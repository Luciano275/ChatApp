import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().min(1).email(),
  password: z.string().min(8)
})

export const LoginSchema = UserSchema.omit({
  name: true
})