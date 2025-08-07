import axiosClient from "../configs/axiosClient";
import validateArray from "../utils/validateArray.ts";
import { OrderSchema, type Order } from "../types/order.ts";

const getAllOrders = async () => {
  try {
    const response = await axiosClient.get(`/orders.json`);
    const returnedData = response.data ?? [];
    // Biến object -> mảng phẳng
    const ordersArray = Object.values(returnedData).flat();
    return validateArray(OrderSchema, Object.values(ordersArray), 'Order List');
  } catch (error) {
    console.error('Error fetching all order list:', error);
    throw error;
  }
}
const getListOrdersByUid = async (uid:string, params: Record<string, unknown> = {}) => {
  try {
    const response = await axiosClient.get(`/orders/${uid}.json`, { params });
    const returnedData = response.data ?? [];
    return validateArray(OrderSchema, returnedData, 'Order List');
  } catch (error) {
    console.error('Error fetching order list:', error);
    throw error;
  }
};
const updatedOrder = async (uid:string, data: Order[]) => {
  try {
    const response = await axiosClient.put(`/orders/${uid}.json`, data);
    const returnedData = response.data ?? [];
    return validateArray(OrderSchema, returnedData, 'update Order List');
  } catch (error) {
    console.error('Error fetching updated order:', error);
    throw error;
  }
}
export { getAllOrders, getListOrdersByUid, updatedOrder };