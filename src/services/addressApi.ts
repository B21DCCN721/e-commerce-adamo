import axios from "axios";
import {
  ProvinceSchema,
  DistrictSchema,
} from "../types/address";
import { z } from "zod";

export const getProvinces = async () => {
  const res = await axios.get("https://provinces.open-api.vn/api/p");
  const result = z.array(ProvinceSchema).safeParse(res.data);

  if (!result.success) {
    console.error("Invalid provinces data:", result.error.format());
    throw new Error("Dữ liệu tỉnh/thành không hợp lệ");
  }

  return result.data;
};

export const getDistricts = async (provinceCode: string) => {
  const res = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
  const result = ProvinceSchema.safeParse(res.data);

  if (!result.success) {
    console.error("Invalid province data when fetching districts:", result.error.format());
    throw new Error("Dữ liệu quận/huyện không hợp lệ");
  }

  return result.data.districts ?? [];
};

export const getWards = async (districtCode: string) => {
  const res = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
  const result = DistrictSchema.safeParse(res.data);

  if (!result.success) {
    console.error("Invalid district data when fetching wards:", result.error.format());
    throw new Error("Dữ liệu phường/xã không hợp lệ");
  }

  return result.data.wards ?? [];
};
