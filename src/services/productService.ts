import axiosClient from "../configs/axiosClient";
import filterValidItems from "../utils/filterValidItems.ts";
import { ProductSchema, ProductWithVariantsSchema } from "../types/product.ts";
const getListProducts = async (params: Record<string, unknown> = {}) => {
  try {
    const response = await axiosClient.get('/products.json', { params });
    const returnedData = response.data ?? [];
    return filterValidItems(ProductSchema, returnedData, 'Product List');
  } catch (error) {
    console.error('Error fetching product list:', error);
    throw error;
  }
};
const getProductById = async (id: number) => {
  try {
    const response = await axiosClient.get(`/product-variants/${id}.json`);
    const validItems = filterValidItems(ProductWithVariantsSchema, [response.data], 'Product Detail');
    return validItems.length > 0 ? validItems[0] : null;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}

export {getListProducts, getProductById};
