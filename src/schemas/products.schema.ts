import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable().optional(),
  category_id: z.number().int(),
  brand_id: z.number().int(),
  price: z.number(),
  discount_price: z.number().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type Product = z.infer<typeof ProductSchema>;