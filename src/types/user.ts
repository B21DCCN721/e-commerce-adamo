import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  avatar: z.string(),
  name: z.string(),
  gender: z.string(),
  email: z.string(),
  phone: z.string().min(10).max(11),
  address: z.string(),
  birthday: z.date(),
});
export type User = z.infer<typeof UserSchema>;