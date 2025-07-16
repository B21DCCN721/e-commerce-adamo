import { z } from "zod";

// Định nghĩa enum trạng thái đơn hàng
export const OrderStatusEnum = z.enum([
  "pending",
  "shipped",
  "delivered",
  "canceled",
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
});

// Đơn hàng tổng thể
export const OrderSchema = z.object({
  id: z.number(),
  customerId: z.number(),
  paymentMethod: z.string(),
  customerAddress: z.string(),
  customerPhone: z.string(),
  status: OrderStatusEnum,
  isPaid: z.boolean(),
  deliverySuccessAt: z.string().optional(),
  totalAmount: z.number().nonnegative(),
  items: z.array(OrderItemSchema),
});
export type OrderStatus = z.infer<typeof OrderStatusEnum>;
export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
