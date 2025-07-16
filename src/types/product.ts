import {z} from "zod";
import { SizeEnum } from "./size";

// Product schema
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  price: z.number().nonnegative(),
  oldPrice: z.number().nonnegative().optional(),
  description: z.string(),
  image: z.string(),
  inStock: z.boolean(),
  rating: z.number().min(1).max(5),
  tags: z.array(z.string()),
});

// ProductWithVariants schema
export const ProductWithVariantsSchema = ProductSchema.extend({
  variants: z.array(z.object({
    color: z.string(), // có thể là tên hoặc mã hex (#fff)
    sizes: z.array(z.object({
      size: SizeEnum,
      quantity: z.number().int().nonnegative(),
    })),
  })),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductWithVariants = z.infer<typeof ProductWithVariantsSchema>;

