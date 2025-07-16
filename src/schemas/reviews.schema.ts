import { z } from "zod";

export const ReviewSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  product_id: z.number().int(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type Review = z.infer<typeof ReviewSchema>;