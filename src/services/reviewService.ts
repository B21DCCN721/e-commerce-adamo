import axiosClient from "../configs/axiosClient";
import validateArray from "../utils/validateArray.ts";
import { ReviewSchema, type Review } from "../types/review.ts";
const getListReviews = async (productId: string, params: Record<string, unknown> = {}) => {
  try {
    const response = await axiosClient.get(`/reviews/${productId}.json`, { params });
    const rawData = response.data ?? {};
    const returnedData = Object.values(rawData);
    return validateArray(ReviewSchema, returnedData, 'Review List');
  } catch (error) {
    console.error('Error fetching product list:', error);
    throw error;
  }
};
const addReview = async (productId: string, data: Review) => {
  try {
    await axiosClient.post(`/reviews/${productId}.json`, data);
  } catch (error) {
    console.error('Error add review:', error)
    throw error
  }
}

export { getListReviews, addReview };