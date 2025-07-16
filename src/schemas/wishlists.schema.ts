import { z } from "zod";

export const WishlistSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  product_id: z.number().int(),
  added_at: z.string().datetime().optional(),
});
export type Wishlist = z.infer<typeof WishlistSchema>;