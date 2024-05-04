import { z } from "zod";

export const UserSchema = z.object({
  name: z.string({
    required_error: 'The name is required'
  }).min(1, 'The name is required'),
  email: z.string().min(1, 'The email is required').email(),
  password: z.string().min(8)
})

export const LoginSchema = UserSchema.omit({
  name: true
})