import axiosClient from "../configs/axiosClient";
import filterValidItems from "../utils/filterValidItems.ts";
import { ReviewSchema, type Review } from "../types/review.ts";
const getListReviews = async (params: Record<string, unknown> = {}) => {
  try {
    const response = await axiosClient.get('/reviews.json', { params });
    const returnedData = Object.values(response.data) ?? [];
    return filterValidItems(ReviewSchema, returnedData, 'Review List');
  } catch (error) {
    console.error('Error fetching product list:', error);
    throw error;
  }
};
const addReview = async (data: Review) => {
  try {
    await axiosClient.post('/reviews.json', data);
  } catch (error) {
    console.error('Error add review:', error)
    throw error
  }
}

export { getListReviews, addReview };