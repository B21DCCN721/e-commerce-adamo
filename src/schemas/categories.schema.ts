import { z } from "zod";
export const CategorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  parent_id: z.number().int().nullable().optional(),
});
export type Category = z.infer<typeof CategorySchema>;