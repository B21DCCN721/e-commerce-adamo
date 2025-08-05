import axiosClient from "../configs/axiosClient";
import filterValidItems from "../utils/filterValidItems";
import validateObject from "../utils/validateObject";
import { AddressSchema, type Address } from "../types/address";
import { UserSchema, type User } from "../types/user";

const getProflie = async (uid: string) => {
  try {
    const response = await axiosClient.get(`/users/${uid}.json`);
    return validateObject(UserSchema, response.data, 'Get user profile');
  } catch (error) {
    console.error("Failed to fetch user profile", error);
    throw error;
  }
}
const updateProfile = async (uid: string, data: User) => {
  try {
    const response = await axiosClient.put(`/users/${uid}.json`, data);
    return validateObject(UserSchema, response.data, 'Update user profile');
  } catch (error) {
    console.error("Failed to update user profile", error);
    throw error;
  }
}
const createProfile = async (uid: string, data: User) => {
  try {
    const response = await axiosClient.put(`/users/${uid}.json`, data);
    return validateObject(UserSchema, response.data, 'Create user profile');
  } catch (error) {
    console.error("Failed to create user profile", error);
    throw error;
  }
}
const addAdress = async (uid: string, data: Address[]) => {
  try {
    const response = await axiosClient.put(`/addresses/${uid}.json`, data);
    return filterValidItems(AddressSchema, response.data, 'Create user address');
  } catch (error) {
    console.error("Failed to create user address", error);
    throw error;
  }
}
const getAddressByUserId = async (uid: string) => {
  try {
    const response = await axiosClient.get(`/addresses/${uid}.json`);
    return response.data===null? []: filterValidItems(AddressSchema, response.data, 'Get user address');
  } catch (error) {
    console.error("Failed to fetch user address", error);
    throw error;
  }
}
const updateAddress = async (uid: string, data: Address[]) => {
  try {
    const response = await axiosClient.put(`/addresses/${uid}.json`, data);
    return filterValidItems(AddressSchema, response.data, 'Update user address');
  } catch (error) {
    console.error("Failed to update user address", error);
    throw error;
  }
}
const deleteAddress = async (uid: string, addressId: number) => {
  try {
    await axiosClient.delete(`/addresses/${uid}/${addressId}.json`);
  } catch (error) {
    console.error("Failed to delete user address", error);
    throw error;
  } 
}
export { getProflie, updateProfile, createProfile, addAdress, getAddressByUserId, deleteAddress, updateAddress };