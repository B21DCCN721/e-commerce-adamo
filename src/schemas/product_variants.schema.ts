import { z } from "zod";

export const ProductVariantSchema = z.object({
  id: z.number().int(),
  product_id: z.number().int(),
  color: z.string().nullable().optional(),
  size: z.enum(["S", "M", "L", "XL", "XXL"]),
  stock_quantity: z.number().int(),
  sku: z.string(),
});
export type ProductVariant = z.infer<typeof ProductVariantSchema>;