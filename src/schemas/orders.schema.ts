import { z } from "zod";

export const OrderStatusEnum = z.enum([
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
]);
export const PaymentStatusEnum = z.enum(["unpaid", "paid", "refunded"]);
export const OrderSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  total_amount: z.number(),
  status: OrderStatusEnum.default("pending"),
  payment_method: z.string().nullable().optional(),
  payment_status: PaymentStatusEnum.default("unpaid"),
  coupon_id: z.number().int().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type Order = z.infer<typeof OrderSchema>;