import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string({
    invalid_type_error: 'Ingresa un email válido'
  }).min(1, 'Ingresa un email').email("El email no es válido"),
  password: z.string({
    invalid_type_error: 'Ingresa un tipo válido'
  }).min(8, "Se necesita un contraseña de al menos 8 caracteres")
})