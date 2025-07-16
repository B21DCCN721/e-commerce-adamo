import { z } from "zod";

export const SizeEnum = z.enum(["S", "M", "L", "XL"]);
export type Size = z.infer<typeof SizeEnum>;