import axiosClient from "../configs/axiosClient";
import filterValidItems from "../helper/filterValidItems";
import validateObject from "../helper/validateObject";
import { AddressSchema } from "../types/address";
import { UserSchema } from "../types/user";

const getProflie = async (userId: string) => {
  try {
    const response = await axiosClient.get(`/users/${userId}.json`);
    return validateObject(UserSchema, response.data, 'Get user profile');
  } catch (error) {
    console.error("Failed to fetch user profile", error);
    throw error;
  }
}
const updateProfile = async (userId: string, data: unknown) => {
  try {
    const response = await axiosClient.put(`/users/${userId}.json`, data);
    return validateObject(UserSchema, response.data, 'Update user profile');
  } catch (error) {
    console.error("Failed to update user profile", error);
    throw error;
  }
}
const createProfile = async (userId: string, data: unknown) => {
  try {
    const response = await axiosClient.put(`/users/${userId}.json`, data);
    return validateObject(UserSchema, response.data, 'Create user profile');
  } catch (error) {
    console.error("Failed to create user profile", error);
    throw error;
  }
}
const addAdress = async (userId: string, data: unknown) => {
  try {
    const response = await axiosClient.put(`/addresses/${userId}.json`, data);
    return filterValidItems(AddressSchema, response.data, 'Create user address');
  } catch (error) {
    console.error("Failed to create user address", error);
    throw error;
  }
}
const getAddressByUserId = async (userId: string) => {
  try {
    const response = await axiosClient.get(`/addresses/${userId}.json`);
    return response.data===null? []: filterValidItems(AddressSchema, response.data, 'Get user address');
  } catch (error) {
    console.error("Failed to fetch user address", error);
    throw error;
  }
}
const updateAddress = async (userId: string, data: unknown) => {
  try {
    const response = await axiosClient.put(`/addresses/${userId}.json`, data);
    return filterValidItems(AddressSchema, response.data, 'Update user address');
  } catch (error) {
    console.error("Failed to update user address", error);
    throw error;
  }
}
const deleteAddress = async (userId: string, addressId: number) => {
  try {
    await axiosClient.delete(`/addresses/${userId}/${addressId}.json`);
  } catch (error) {
    console.error("Failed to delete user address", error);
    throw error;
  } 
}
export { getProflie, updateProfile, createProfile, addAdress, getAddressByUserId, deleteAddress, updateAddress };