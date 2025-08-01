import { z } from "zod";
import { SizeEnum } from "./size";

// CartItem
export const CartItemSchema = z.object({
  id: z.number(),
  productId: z.number(),
  selected: z.boolean(),
  name: z.string().nonempty('Tên sản phẩm không được là chuỗi rỗng'),
  price: z.number().positive('Giá sản phẩm phải là số dương'),
  oldPrice: z.number().positive('Giá sản phẩm phải là số dương').optional(),
  category: z.string().min(1, 'Danh mục sản phẩm trong giỏ hàng không phải chuỗi rỗng'),
  quantity: z.number().int('Số lượng sản phẩm trong giỏ hàng phải là số nguyên.').positive('Số lượng sản phẩm trong giỏ hàng phải là số dương.'),
  image: z.string(),
  description: z.string().nonempty('Chi tiết sản phẩm không được là chuỗi rỗng.'),
  size: SizeEnum,
  color: z.string(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
