import axiosClient from "../configs/axiosClient";
import filterValidItems from "../utils/filterValidItems";
import { NotificationSchema } from "../types/notification";

const getListNotifications = async () => {
  try {
    const response = await axiosClient.get("/notifications.json");
    const returnedData = response.data ?? [];
    return filterValidItems(NotificationSchema, returnedData , "List noti");
  } catch (error) {
    console.warn("Failed to load list noti ", error);
    throw error;
  }
};

export { getListNotifications };
