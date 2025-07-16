import { z } from "zod";

export const NotificationSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int().nullable().optional(),
  title: z.string(),
  message: z.string(),
  type: z.enum(["order", "promotion", "system"]),
  is_read: z.boolean().default(false),
  created_at: z.string().datetime().optional(),
});
export type Notification = z.infer<typeof NotificationSchema>;