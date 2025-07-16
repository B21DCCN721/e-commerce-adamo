import { z } from "zod";

export const ProductImageSchema = z.object({
  id: z.number().int(),
  product_id: z.number().int(),
  url: z.string().url(),
  is_thumbnail: z.boolean().optional(),
});
export type ProductImage = z.infer<typeof ProductImageSchema>;