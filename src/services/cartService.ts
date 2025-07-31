import axiosClient from "../configs/axiosClient";
import filterValidItems from "../utils/filterValidItems";
import { CartItemSchema, type CartItem } from "../types/cart";

const addItemsToCartServer = async (uid: string, data: CartItem[]) => {
  try {
    const response = await axiosClient.put(`carts/${uid}.json`, data);
    const returnedData = response.data ?? [];
    return filterValidItems(CartItemSchema, returnedData, "Add to cart");
  } catch (error) {
    console.warn("Failed add to cart ", error);
    throw error;
  }
};

const getCartByUserId = async (uid: string) => {
  try {
    const response = await axiosClient.get(`carts/${uid}.json`);
    const returnedData = response.data ?? [];
    return filterValidItems(CartItemSchema, returnedData, "Add to cart");
  } catch (error) {
    console.warn("Failed get cart ", error);
    throw error;
  }
};

export { addItemsToCartServer, getCartByUserId };
