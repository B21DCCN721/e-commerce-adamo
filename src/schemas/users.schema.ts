import { z } from "zod";
export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  email: z.string().email(),
  password_hash: z.string(),
  avatar: z.string().nullable().optional(),
//   z.string()
//   .startsWith("data:image/")
//   .max(1_000_000) // tối đa khoảng 1MB, tuỳ nhu cầu
//   .nullable()
//   .optional()
  phone: z.string().optional(),
  role: z.enum(["customer", "admin"]).default("customer"),
  created_at: z.string().datetime().optional(),
});
export type User = z.infer<typeof UserSchema>;