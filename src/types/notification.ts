import { z } from 'zod';
import { OrderStatusEnum } from './order';
// Định nghĩa enum cho loại thông báo
export const NotificationTypeEnum = z.enum(['sale', 'voucher', 'system', 'order']);


// Base schema áp dụng cho tất cả loại thông báo
const BaseNotificationSchema = z.object({
  id: z.number(),
  orderCode: z.string().optional(),
  title: z.string(),
  content: z.string(),
  image: z.string(),
  highlight: z.string().optional(),
  time: z.string().optional(),
  type: NotificationTypeEnum,
  isRead: z.boolean().default(false),
});

// Schema mở rộng nếu là loại `order`
const OrderExtraFields = z.object({
  orderStatus: OrderStatusEnum,
});

// Gộp schema chính với conditional logic
export const NotificationSchema = BaseNotificationSchema.and(
  z.discriminatedUnion('type', [
    z.object({ type: z.literal('order') }).merge(OrderExtraFields),
    z.object({ type: z.literal('voucher') }),
    z.object({ type: z.literal('system') }),
    z.object({ type: z.literal('sale') }),
  ])
);

export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationType = z.infer<typeof NotificationTypeEnum>;
