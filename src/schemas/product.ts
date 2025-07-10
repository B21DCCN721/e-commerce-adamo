import {z} from "zod";

// Size enum
export const SizeEnum = z.enum(["S", "M", "L", "XL"]);
export type Size = z.infer<typeof SizeEnum>;

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

// ProductWithSizes schema
export const ProductWithSizesSchema = ProductSchema.extend({
  sizes: z.array(z.object({
    size: SizeEnum,
    quantity: z.number().int().positive(),
  })),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductWithSizes = z.infer<typeof ProductWithSizesSchema>;
