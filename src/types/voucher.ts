import { z } from "zod";

export const VoucherSchema = z.object({
  id: z.number(),
  code: z.string().min(6, "Mã giảm giá ít nhất 6 ký tự"),
  description: z.string().nonempty(),
  discountPercent: z.number().positive('Phần trăm giảm giá là số dương').optional(),
  discountAmount: z.number().positive('Lượng tiền giảm giá là số dương').optional(),
  expireAt: z.string(),
});

export type Voucher = z.infer<typeof VoucherSchema>;
