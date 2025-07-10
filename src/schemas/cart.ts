import { z } from "zod";
import { SizeEnum } from "./product";

// CartItem
export const CartItemSchema = z.object({
  id: z.number(),
  productId: z.number(),
  selected: z.boolean(),
  name: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  image: z.string(),
  description: z.string(),
  size: SizeEnum,
});

export type CartItem = z.infer<typeof CartItemSchema>;
