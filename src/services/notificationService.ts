import axiosClient from "../configs/axiosClient";
import validateArray from "../utils/validateArray";
import { NotificationSchema } from "../types/notification";

const getListNotifications = async (uid: string) => {
  try {
    const response = await axiosClient.get(`/notifications/${uid}.json`);
    const returnedData = response.data ?? [];
    return validateArray(NotificationSchema, returnedData , "List noti");
  } catch (error) {
    console.warn("Failed to load list noti ", error);
    throw error;
  }
};

export { getListNotifications };
