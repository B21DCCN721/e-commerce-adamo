import { z } from "zod";

export const ProvinceSchema = z.object({
  name: z.string(),
  code: z.number(),
  division_type: z.string(),
  codename: z.string(),
  phone_code: z.number(),
  districts: z.array(
    z.object({
      name: z.string(),
      code: z.number(),
      division_type: z.string(),
      codename: z.string(),
      province_code: z.number(),
      wards: z.array(
        z.object({
          name: z.string(),
          code: z.number(),
          division_type: z.string(),
          codename: z.string(),
          district_code: z.number(),
        })
      ),
    })
  ).optional(), // districts có thể rỗng
});

export const DistrictSchema = z.object({
  name: z.string(),
  code: z.number(),
  division_type: z.string(),
  codename: z.string(),
  province_code: z.number(),
  wards: z.array(
    z.object({
      name: z.string(),
      code: z.number(),
      division_type: z.string(),
      codename: z.string(),
      district_code: z.number(),
    })
  ).optional(), // wards có thể rỗng
});

export const WardSchema = z.object({
  name: z.string(),
  code: z.number(),
  division_type: z.string(),
  codename: z.string(),
  district_code: z.number(),
});

export const AddressSchema = z.object({
  id: z.number(),
  fullName: z.string().min(1, "Họ và tên không được để trống"),
  phone: z
    .string()
    .min(9, "Số điện thoại phải có ít nhất 9 chữ số")
    .max(11, "Số điện thoại không được vượt quá 11 chữ số")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ chứa số"),
  addressDetail: z.string().min(1, "Địa chỉ không được để trống"),
  provinceName: z.string().min(1, "Tỉnh/Thành phố không được để trống"),
  districtName: z.string().min(1, "Quận/Huyện không được để trống"),
  wardName: z.string().min(1, "Phường/Xã không được để trống"),
  isDefault: z.boolean().default(false),
});

// TypeScript type tương ứng
export type Address = z.infer<typeof AddressSchema>;
export type Ward = z.infer<typeof WardSchema>;
export type District = z.infer<typeof DistrictSchema>;
export type Province = z.infer<typeof ProvinceSchema>;