import {z} from "zod";
export const BrandSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});
export type Brand = z.infer<typeof BrandSchema>;