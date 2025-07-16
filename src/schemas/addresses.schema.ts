import { z } from "zod";

export const AddressSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  receiver: z.string(),
  phone: z.string(),
  address_line: z.string(),
  city: z.string(),
  district: z.string(),
  ward: z.string(),
  is_default: z.boolean().optional(),
});
export type Address = z.infer<typeof AddressSchema>;