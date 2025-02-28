import { userSchema } from "@/utils/zod-schema";
import { z } from "zod";

const userSettingsSchema = userSchema.extend({
  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country cannot exceed 50 characters"),
  // Local Government Area
  LGA: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country cannot exceed 50 characters"),
});

export { userSettingsSchema };

type UserSettingsSchemaType = z.infer<typeof userSettingsSchema>;

export type { UserSettingsSchemaType };