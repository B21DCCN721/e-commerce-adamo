import type { Dayjs } from "dayjs";
import { z } from "zod";

export const UserSchema = z.object({
  avatar: z.string().optional(),
  name: z.string(),
  gender: z.string().optional(),
  email: z.string(),
  birthday: z.custom<Dayjs>().optional(),
});
export type User = z.infer<typeof UserSchema>;