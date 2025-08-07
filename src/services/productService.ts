import axiosClient from "../configs/axiosClient";
import validateArray from "../utils/validateArray.ts";
import { ProductSchema, ProductWithVariantsSchema, type ProductWithVariants } from "../types/product.ts";
const getListProducts = async (params: Record<string, unknown> = {}) => {
  try {
    const response = await axiosClient.get('/products.json', { params });
    const returnedData = response.data ?? [];
    return validateArray(ProductSchema, returnedData, 'Product List');
  } catch (error) {
    console.error('Error fetching product list:', error);
    throw error;
  }
};
const getListProductWithVariants = async (params: Record<string, unknown> = {}) => {
  try {
    const response = await axiosClient.get('/product-variants.json', { params });
    const returnedData = response.data ?? [];
    return validateArray(ProductWithVariantsSchema, returnedData, 'Product List');
  } catch (error) {
    console.error('Error fetching product list:', error);
    throw error;
  }
};
const getProductById = async (id: number) => {
  try {
    const response = await axiosClient.get(`/product-variants/${id}.json`);
    const validItems = validateArray(ProductWithVariantsSchema, [response.data], 'Product Detail');
    return validItems.length > 0 ? validItems[0] : null;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}
const createProduct = async (product: ProductWithVariants) => {
  const res = await axiosClient.post("/products", product);
  return res.data;
};

const updateProduct = async (id: number, product: ProductWithVariants) => {
  const res = await axiosClient.put(`/products/${id}`, product);
  return res.data;
};

const deleteProduct = async (id: number) => {
  const res = await axiosClient.delete(`/products/${id}`);
  return res.data;
};

export {getListProducts,getListProductWithVariants, getProductById, createProduct, updateProduct, deleteProduct};
