import { z } from "zod";

export const CartSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  variant_id: z.number().int(),
  quantity: z.number().int().min(1),
  updated_at: z.string().datetime().optional(),
});
export type Cart = z.infer<typeof CartSchema>;