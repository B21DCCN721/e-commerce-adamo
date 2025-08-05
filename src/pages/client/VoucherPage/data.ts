// data/vouchers.ts
import type { Voucher } from "../../../types/voucher";

export const vouchers: Voucher[] = [
  {
    id: 1,
    code: "SUMMER50",
    description: "Giảm 50% tối đa 100k",
    discountPercent: 50,
    expireAt: "2025-08-30",
  },
  {
    id: 2,
    code: "FREESHIP",
    description: "Miễn phí vận chuyển cho đơn từ 200k",
    discountAmount: 25000,
    expireAt: "2025-09-15",
  },
  {
    id: 3,
    code: "WELCOME10",
    description: "Giảm 10% cho đơn đầu tiên",
    discountPercent: 10,
    expireAt: "2025-12-31",
  },
];
