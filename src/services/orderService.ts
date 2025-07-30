import axiosClient from "../configs/axiosClient";
import filterValidItems from "../helper/filterValidItems.ts";
import { OrderSchema } from "../types/order.ts";
const getListOrders = async (params: Record<string, unknown> = {}) => {
  try {
    const response = await axiosClient.get('/orders.json', { params });
    return filterValidItems(OrderSchema, response.data, 'Order List');
  } catch (error) {
    console.error('Error fetching order list:', error);
    throw error;
  }
};
const updatedOrder = async (data: unknown) => {
  try {
    await axiosClient.put(`/orders.json`, data);
  } catch (error) {
    console.error('Error fetching updated order:', error);
    throw error;
  }
}
export { getListOrders, updatedOrder };