import axiosClient from "../configs/axiosClient";
import filterValidItems from "../helper/filterValidItems.ts";
import { ReviewSchema } from "../types/review.ts";
const getListReviews = async (params: Record<string, unknown> = {}) => {
  try {
    const response = await axiosClient.get('/reviews.json', { params });
    return filterValidItems(ReviewSchema, Object.values(response.data), 'Review List');
  } catch (error) {
    console.error('Error fetching product list:', error);
    throw error;
  }
};
const addReview = async (data: unknown) => {
  try {
    await axiosClient.post('/reviews.json', data);
  } catch (error) {
    console.error('Error add review:', error)
    throw error
  }
}

export { getListReviews, addReview };