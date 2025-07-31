import type { CartItem } from "../types/cart";

export const mergeCarts = (local: CartItem[], server: CartItem[]): CartItem[] => {
  const merged = [...server, ...local];

  // local.forEach((localItem) => {
  //   const index = merged.findIndex(
  //     (item) =>
  //       item.productId === localItem.productId &&
  //       item.size === localItem.size &&
  //       item.color === localItem.color
  //   );

  //   if (index !== -1) {
  //     merged[index].quantity += localItem.quantity;
  //   } else {
  //     merged.push(localItem);
  //   }
  // });

  return merged;
};
