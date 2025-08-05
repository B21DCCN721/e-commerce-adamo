import { z } from "zod";
import { SizeEnum } from "./size";

// Định nghĩa enum trạng thái đơn hàng
export const OrderStatusEnum = z.enum([
  "pending",
  "shipping",
  "delivered",
  "canceled",
  "confirmed",
]);

// Thông tin từng sản phẩm trong đơn hàng
export const OrderItemSchema = z.object({
  productId: z.number(),
  productName: z.string(),
  productImage: z.string(),
  productCategory: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
  oldPrice: z.number().nonnegative().optional(),
  isReview: z.boolean().default(false),
  productColor: z.string(),
  description: z.string(),
  size: SizeEnum,
});

// Đơn hàng tổng thể
export const OrderSchema = z.object({
  id: z.number(),
  customerId: z.number(),
  paymentMethod: z.string().default('cash'),
  customerAddress: z.string(),
  customerPhone: z
    .string()
    .min(9, "Số điện thoại phải có ít nhất 9 chữ số")
    .max(11, "Số điện thoại không được vượt quá 11 chữ số")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ chứa số"),
  status: OrderStatusEnum,
  isPaid: z.boolean().default(false),
  createdAt: z.string().optional(),
  updatedAt: z.string(),
  totalAmount: z.number().nonnegative('Tổng giá trị phải là số không âm'),
  items: z.array(OrderItemSchema),
});
export type OrderStatus = z.infer<typeof OrderStatusEnum>;
export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
