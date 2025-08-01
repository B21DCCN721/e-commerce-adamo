import axiosClient from "../configs/axiosClient";
import filterValidItems from "../utils/filterValidItems.ts";
import { OrderSchema, type Order } from "../types/order.ts";
const getListOrdersByUid = async (uid:string, params: Record<string, unknown> = {}) => {
  try {
    const response = await axiosClient.get(`/orders/${uid}.json`, { params });
    const returnedData = response.data ?? [];
    return filterValidItems(OrderSchema, returnedData, 'Order List');
  } catch (error) {
    console.error('Error fetching order list:', error);
    throw error;
  }
};
const updatedOrder = async (uid:string, data: Order[]) => {
  try {
    const response = await axiosClient.put(`/orders/${uid}.json`, data);
    const returnedData = response.data ?? [];
    return filterValidItems(OrderSchema, returnedData, 'update Order List');
  } catch (error) {
    console.error('Error fetching updated order:', error);
    throw error;
  }
}
export { getListOrdersByUid, updatedOrder };