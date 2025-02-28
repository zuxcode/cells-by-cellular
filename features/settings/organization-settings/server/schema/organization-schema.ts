import {
  contactLocationSchema,
  phoneNumberSchema,
  phoneNumberUtil,
} from "@/utils/zod-schema";
import { PhoneNumber, PhoneNumberType } from "google-libphonenumber";
import { z } from "zod";

const ORGANIZATIONS = ["hotel", "restaurant", "cafe", "other"] as const;
const LEGAL_ENTITIES = ["sole proprietor", "partnership", "other"] as const;

const organizationSchema = contactLocationSchema.extend({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(150, "Name cannot exceed 150 characters")
    .nonempty("Organization name is required"),

  type: z.enum(ORGANIZATIONS, {
    errorMap: () => ({ message: "Please select a valid organization type" }),
  }),

  telPhoneNumber: phoneNumberSchema.refine(
    (num) =>
      phoneNumberUtil.getNumberType(num as unknown as PhoneNumber) ===
      PhoneNumberType.FIXED_LINE,
    { message: "Must be a valid landline number" }
  ),

  regNumber: z
    .string()
    .trim()
    .min(2, "Registration number must be at least 2 characters")
    .max(50, "Registration number cannot exceed 50 characters")
    .regex(/^[A-Z0-9-]+$/i, "Only alphanumeric characters and hyphens allowed"),

  taxId: z
    .string()
    .trim()
    .min(2, "Tax ID must be at least 2 characters")
    .max(50, "Tax ID cannot exceed 50 characters")
    .regex(/^[A-Z0-9-]+$/i, "Only alphanumeric characters and hyphens allowed"),

  numberOfEmployees: z
    .number()
    .int("Must be a whole number")
    .min(10, "Must have at least 1 employee")
    .max(36, "Cannot exceed 36 employees")
    .nonnegative("Employee count cannot be negative"),

  legalEntity: z.enum(LEGAL_ENTITIES, {
    errorMap: () => ({ message: "Please select a valid legal entity type" }),
  }),

  // TODO: Add postcode validation (from postcode-validator in zod-schema.ts)
  postalCode: z.string().transform((str) => str.trim()),
});

export { organizationSchema, LEGAL_ENTITIES, ORGANIZATIONS };

type OrganizationSchemaType = z.infer<typeof organizationSchema>;
export type { OrganizationSchemaType };
