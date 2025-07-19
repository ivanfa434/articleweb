// schemas/RegisterSchema.ts
import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(1, { message: "Username field cannot be empty" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  role: z.enum(["User", "Admin"], {
    // Mengganti errorMap dengan properti 'message' langsung
    // Ini akan digunakan saat nilai yang diberikan bukan salah satu dari enum yang valid
    message: "Please select a role",
  }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
