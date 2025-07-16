import { z } from "zod";
import { SizeEnum } from "./size";

// CartItem
export const CartItemSchema = z.object({
  id: z.number(),
  productId: z.number(),
  selected: z.boolean(),
  name: z.string(),
  price: z.number().nonnegative(),
  oldPrice: z.number().nonnegative().optional(),
  category: z.string(),
  quantity: z.number().int().positive(),
  image: z.string(),
  description: z.string(),
  size: SizeEnum,
  color: z.string(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
