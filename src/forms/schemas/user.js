import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'O e-mail é inválido' })
    .trim()
    .min(1, { message: 'O e-mail é obrigatório' }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'O campo senha deve conter no mínimo 6 caracteres' }),
})
