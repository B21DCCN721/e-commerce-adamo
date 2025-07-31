import axiosClient from "../configs/axiosClient";
import filterValidItems from "../utils/filterValidItems.ts";
import { OrderSchema, type Order } from "../types/order.ts";
const getListOrders = async (params: Record<string, unknown> = {}) => {
  try {
    const response = await axiosClient.get('/orders.json', { params });
    const returnedData = response.data ?? [];
    return filterValidItems(OrderSchema, returnedData, 'Order List');
  } catch (error) {
    console.error('Error fetching order list:', error);
    throw error;
  }
};
const updatedOrder = async (data: Order[]) => {
  try {
    await axiosClient.put(`/orders.json`, data);
  } catch (error) {
    console.error('Error fetching updated order:', error);
    throw error;
  }
}
export { getListOrders, updatedOrder };