import { z } from "zod";

export const OrderItemSchema = z.object({
  id: z.number().int(),
  order_id: z.number().int(),
  variant_id: z.number().int(),
  quantity: z.number().int(),
  price_each: z.number(),
});
export type OrderItem = z.infer<typeof OrderItemSchema>;