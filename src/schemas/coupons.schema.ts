import { z } from "zod";

export const CouponSchema = z.object({
  id: z.number().int(),
  code: z.string(),
  description: z.string().nullable().optional(),
  discount_type: z.enum(["percent", "fixed"]),
  discount_value: z.number(),
  min_order_amount: z.number().nullable().optional(),
  max_uses: z.number().int().nullable().optional(),
  user_limit: z.number().int().nullable().optional(),
  expires_at: z.string().datetime().nullable().optional(),
  is_active: z.boolean().default(true),
});
export type Coupon = z.infer<typeof CouponSchema>;