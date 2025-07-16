import { z } from "zod";

export const ReviewImageSchema = z.object({
  id: z.number().int(),
  review_id: z.number().int(),
  url: z.string().url(),
});
export type ReviewImage = z.infer<typeof ReviewImageSchema>;