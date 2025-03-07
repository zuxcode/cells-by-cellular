import libphonenumber from "google-libphonenumber";
import { z } from "zod";
import { postcodeValidator } from "postcode-validator";

const phoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();

const GENDERS = ["Male", "Female", "Other", "Prefer not to say"] as const;

const ROLES = ["Super Admin", "Admin", "Marketer", "Staff"] as const;

// Helper function for phone number validation
function isValidPhoneNumber(number: string): boolean {
  try {
    const parsedNumber = phoneNumberUtil.parse(number);
    return phoneNumberUtil.isValidNumber(parsedNumber);
  } catch {
    return false;
  }
}

const basePasswordSchema = z
  .string()
  .trim()
  .nonempty("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password cannot exceed 64 characters")
  .superRefine((password, ctx) => {
    const validationChecks = {
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password),
      noWhitespace: !/\s/.test(password),
    };

    if (!validationChecks.hasUppercase) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must contain at least one uppercase letter (A-Z)",
      });
    }

    if (!validationChecks.hasLowercase) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must contain at least one lowercase letter (a-z)",
      });
    }

    if (!validationChecks.hasNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must contain at least one number (0-9)",
      });
    }

    if (!validationChecks.hasSpecialChar) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must contain at least one special character (!@#$%^&*)",
      });
    }

    if (!validationChecks.noWhitespace) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cannot contain spaces",
      });
    }
  });

const phoneNumberSchema = z
  .string()
  .nonempty({ message: "Phone number is required" })
  .refine(isValidPhoneNumber, { message: "Invalid phone number" });

// TODO: Improve this Logic, it's not working properly
const addressSchema = z
  .object({
    country: z
      .string()
      .min(2, "Country must be at least 2 characters")
      .max(50, "Country cannot exceed 50 characters"),
    postalCode: z.string().transform((str) => str.trim()),
  })
  .superRefine(({ country, postalCode }, ctx) =>
    postcodeValidator(postalCode, country)
  );

const contactLocationSchema = z.object({
  city: z
    .string()
    .nonempty("City is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City cannot exceed 50 characters"),
  state: z
    .string()
    .nonempty("State is required")
    .min(2, "State must be at least 2 characters")
    .max(50, "State cannot exceed 50 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email cannot exceed 100 characters"),
  phoneNumber: phoneNumberSchema,
  country: z
    .string()
    .nonempty("Country is required")
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country cannot exceed 50 characters"),
  // Local Government Area
  LGA: z
    .string()
    .nonempty("Local government area is required")
    .min(2, "Local government area must be at least 2 characters")
    .max(50, "Local government area cannot exceed 50 characters"),
});

const socialMediaSchema = contactLocationSchema.extend({
  website: z.string().url(),
  facebook: z.string().url(),
  twitter: z.string().url(),
  instagram: z.string().url(),
  linkedin: z.string().url(),
  youtube: z.string().url(),
  tiktok: z.string().url(),
  pinterest: z.string().url(),
});

const userBaseSchema = contactLocationSchema.extend({
  firstName: z
    .string()
    .nonempty("First name is required")
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .regex(
      /^[A-Za-z'-]+$/,
      "First name can Only contain letters, apostrophes, and hyphens"
    ),

  lastName: z
    .string()
    .nonempty("Last name is required")
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(
      /^[A-Za-z'-]+$/,
      "Last name can Only contain letters, apostrophes, and hyphens"
    ),

  middleName: z
    .string()
    .nonempty("Middle name is required")
    .trim()
    .max(50, "Middle name cannot exceed 50 characters")
    .regex(
      /^[A-Za-z'-]+$/,
      "Middle name can Only contain letters, apostrophes, and hyphens"
    ),

  gender: z.enum(GENDERS, {
    errorMap: () => ({ message: "Please select a valid gender" }),
  }),

  dateOfBirth: z.coerce
    .date()
    .min(new Date(1800, 0, 1), "Birth date cannot be before 1800")
    .max(new Date(), "Cannot be born in the future"),
  role: z.enum(ROLES, {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
});

export {
  userBaseSchema,
  GENDERS,
  ROLES,
  phoneNumberSchema,
  contactLocationSchema,
  addressSchema,
  socialMediaSchema,
  phoneNumberUtil,
  basePasswordSchema,
};

type UserBaseSchemaType = z.infer<typeof userBaseSchema>;
type PhoneNumberSchemaType = z.infer<typeof phoneNumberSchema>;
type ContactLocationSchemaType = z.infer<typeof contactLocationSchema>;
type AddressSchemaType = z.infer<typeof addressSchema>;
type SocialMediaSchemaType = z.infer<typeof socialMediaSchema>;
type BasePasswordSchemaType = z.infer<typeof basePasswordSchema>;

export type {
  UserBaseSchemaType,
  PhoneNumberSchemaType,
  ContactLocationSchemaType,
  AddressSchemaType,
  SocialMediaSchemaType,
  BasePasswordSchemaType,
};
