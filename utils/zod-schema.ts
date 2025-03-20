// import libphonenumber from "google-libphonenumber";
// import { z } from "zod";
// import { postcodeValidator } from "postcode-validator";
// import { GenderSchema, RoleSchema } from "@/types/global-type";

// const phoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();

// // Helper function for phone number validation
// function isValidPhoneNumber(number: string): boolean {
//   try {
//     const parsedNumber = phoneNumberUtil.parse(number);
//     return phoneNumberUtil.isValidNumber(parsedNumber);
//   } catch {
//     return false;
//   }
// }

// const basePasswordSchema = z
//   .string()
//   .trim()
//   .nonempty("Password is required")
//   .min(8, "Password must be at least 8 characters")
//   .max(64, "Password cannot exceed 64 characters")
//   .superRefine((password, ctx) => {
//     const validationChecks = {
//       hasUppercase: /[A-Z]/.test(password),
//       hasLowercase: /[a-z]/.test(password),
//       hasNumber: /[0-9]/.test(password),
//       hasSpecialChar: /[^A-Za-z0-9]/.test(password),
//       noWhitespace: !/\s/.test(password),
//     };

//     if (!validationChecks.hasUppercase) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Must contain at least one uppercase letter (A-Z)",
//       });
//     }

//     if (!validationChecks.hasLowercase) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Must contain at least one lowercase letter (a-z)",
//       });
//     }

//     if (!validationChecks.hasNumber) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Must contain at least one number (0-9)",
//       });
//     }

//     if (!validationChecks.hasSpecialChar) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Must contain at least one special character (!@#$%^&*)",
//       });
//     }

//     if (!validationChecks.noWhitespace) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Cannot contain spaces",
//       });
//     }
//   });

// const phoneNumberSchema = z
//   .string()
//   .nonempty({ message: "Phone number is required" })
//   .refine(isValidPhoneNumber, { message: "Invalid phone number" });

// // TODO: Improve this Logic, it's not working properly
// const addressSchema = z
//   .object({
//     country: z
//       .string()
//       .min(2, "Country must be at least 2 characters")
//       .max(50, "Country cannot exceed 50 characters"),
//     postalCode: z.string().transform((str) => str.trim()),
//   })
//   .superRefine(({ country, postalCode }, ctx) =>
//     postcodeValidator(postalCode, country)
//   );

// const contactLocationSchema = z.object({
//   city: z
//     .string()
//     .nonempty("City is required")
//     .min(2, "City must be at least 2 characters")
//     .max(50, "City cannot exceed 50 characters"),
//   state: z
//     .string()
//     .nonempty("State is required")
//     .min(2, "State must be at least 2 characters")
//     .max(50, "State cannot exceed 50 characters"),
//   email: z
//     .string()
//     .nonempty("Email is required")
//     .email("Please enter a valid email address")
//     .max(100, "Email cannot exceed 100 characters"),
//   phoneNumber: phoneNumberSchema,
//   country: z
//     .string()
//     .nonempty("Country is required")
//     .min(2, "Country must be at least 2 characters")
//     .max(50, "Country cannot exceed 50 characters"),
//   // Local Government Area
//   LGA: z
//     .string()
//     .nonempty("Local government area is required")
//     .min(2, "Local government area must be at least 2 characters")
//     .max(50, "Local government area cannot exceed 50 characters"),
// });

// const socialMediaSchema = contactLocationSchema.extend({
//   website: z.string().url(),
//   facebook: z.string().url(),
//   twitter: z.string().url(),
//   instagram: z.string().url(),
//   linkedin: z.string().url(),
//   youtube: z.string().url(),
//   tiktok: z.string().url(),
//   pinterest: z.string().url(),
// });

// const userBaseSchema = contactLocationSchema.extend({
//   firstName: z
//     .string()
//     .nonempty("First name is required")
//     .trim()
//     .min(2, "First name must be at least 2 characters")
//     .max(50, "First name cannot exceed 50 characters")
//     .regex(
//       /^[A-Za-z'-]+$/,
//       "First name can Only contain letters, apostrophes, and hyphens"
//     ),

//   lastName: z
//     .string()
//     .nonempty("Last name is required")
//     .trim()
//     .min(2, "Last name must be at least 2 characters")
//     .max(50, "Last name cannot exceed 50 characters")
//     .regex(
//       /^[A-Za-z'-]+$/,
//       "Last name can Only contain letters, apostrophes, and hyphens"
//     ),

//   middleName: z
//     .string()
//     .nonempty("Middle name is required")
//     .trim()
//     .max(50, "Middle name cannot exceed 50 characters")
//     .regex(
//       /^[A-Za-z'-]+$/,
//       "Middle name can Only contain letters, apostrophes, and hyphens"
//     ),

//   gender: GenderSchema,

//   dateOfBirth: z.coerce
//     .date()
//     .min(new Date(1800, 0, 1), "Birth date cannot be before 1800")
//     .max(new Date(), "Cannot be born in the future"),
//   role: RoleSchema,
// });

// export {
//   userBaseSchema,
//   phoneNumberSchema,
//   contactLocationSchema,
//   addressSchema,
//   socialMediaSchema,
//   phoneNumberUtil,
//   basePasswordSchema,
// };

// type UserBaseSchemaType = z.infer<typeof userBaseSchema>;
// type PhoneNumberSchemaType = z.infer<typeof phoneNumberSchema>;
// type ContactLocationSchemaType = z.infer<typeof contactLocationSchema>;
// type AddressSchemaType = z.infer<typeof addressSchema>;
// type SocialMediaSchemaType = z.infer<typeof socialMediaSchema>;
// type BasePasswordSchemaType = z.infer<typeof basePasswordSchema>;

// export type {
//   UserBaseSchemaType,
//   PhoneNumberSchemaType,
//   ContactLocationSchemaType,
//   AddressSchemaType,
//   SocialMediaSchemaType,
//   BasePasswordSchemaType,
// };



import libphonenumber from "google-libphonenumber";
import { z } from "zod";
import { postcodeValidator } from "postcode-validator";
import { GenderSchema, RoleSchema } from "@/types/global-type";

const phoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();

// Enhanced phone number validation with country code support
function validatePhoneNumber(number: string, countryCode?: string) {
  try {
    const parsedNumber = phoneNumberUtil.parse(number, countryCode);
    return phoneNumberUtil.isValidNumber(parsedNumber);
  } catch {
    return false;
  }
}

const phoneNumberSchema = z.string().trim().superRefine((val, ctx) => {
  if (!val) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Phone number is required",
    });
    return;
  }

  if (!validatePhoneNumber(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid or unrecognized phone number format",
    });
  }
});

// Enhanced password validation with configurable rules
const createPasswordSchema = (options: {
  minLength?: number;
  maxLength?: number;
  requireSpecialChar?: boolean;
}) => {
  const {
    minLength = 8,
    maxLength = 64,
    requireSpecialChar = true
  } = options;

  return z.string().trim().superRefine((password, ctx) => {
    const validationRules = {
      length: password.length >= minLength && password.length <= maxLength,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: requireSpecialChar ? /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) : true,
      noWhitespace: !/\s/.test(password),
    };

    if (!validationRules.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Password must be between ${minLength} and ${maxLength} characters`,
      });
    }

    if (!validationRules.hasUppercase) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must contain at least one uppercase letter",
      });
    }

    if (!validationRules.hasLowercase) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must contain at least one lowercase letter",
      });
    }

    if (!validationRules.hasNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must contain at least one number",
      });
    }

    if (!validationRules.hasSpecialChar) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must contain at least one special character (!@#$%^&*)",
      });
    }

    if (!validationRules.noWhitespace) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cannot contain whitespace",
      });
    }
  });
};

// Base password schema with default rules
const basePasswordSchema = createPasswordSchema({});

// Improved address validation with country-specific postal codes
const addressSchema = z.object({
  country: z.string()
    .min(2, "Country code must be at least 2 characters")
    .max(50, "Country code cannot exceed 50 characters"),
  postalCode: z.string().trim().transform(val => val.replace(/\s+/g, '')),
}).superRefine(({ country, postalCode }, ctx) => {
  if (!postcodeValidator(postalCode, country)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Invalid postal code format for ${country}`,
      path: ["postalCode"],
    });
  }
});

// Enhanced contact schema with improved validation
const contactLocationSchema = z.object({
  city: z.string().trim()
    .min(2, "City must be at least 2 characters")
    .max(50, "City cannot exceed 50 characters")
    .regex(/^[\p{L}\s\-']+$/u, "Invalid city name"),
  
  state: z.string().trim()
    .min(2, "State must be at least 2 characters")
    .max(50, "State cannot exceed 50 characters")
    .regex(/^[\p{L}\s\-']+$/u, "Invalid state name"),
  
  email: z.string().trim()
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
  
  phoneNumber: phoneNumberSchema,
  
  country: z.string()
    .min(2, "Country code must be 2 characters")
    .max(50, "Country code must be 50 characters"),
  
  LGA: z.string().trim()
    .min(2, "Local government area must be at least 2 characters")
    .max(50, "Local government area cannot exceed 50 characters")
    .regex(/^[\p{L}\s\-']+$/u, "Invalid characters in LGA name"),
});

// Social media schema with platform-specific validation
const socialMediaSchema = contactLocationSchema.extend({
  website: z.string().url().regex(/^https?:\/\//, "URL must include http:// or https://"),
  facebook: z.string().url().includes('facebook.com'),
  twitter: z.string().url().includes('twitter.com'),
  instagram: z.string().url().includes('instagram.com'),
  linkedin: z.string().url().includes('linkedin.com'),
  youtube: z.string().url().includes('youtube.com'),
  tiktok: z.string().url().includes('tiktok.com'),
  pinterest: z.string().url().includes('pinterest.com'),
});

// Enhanced user schema with cultural name validation
const userBaseSchema = contactLocationSchema.extend({
  firstName: z.string().trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[\p{L}\s'\-]+$/u, "Invalid characters in first name"),
  
  lastName: z.string().trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[\p{L}\s'\-]+$/u, "Invalid characters in last name"),
  
  middleName: z.string().trim()
    .max(50, "Middle name cannot exceed 50 characters")
    .regex(/^[\p{L}\s'\-]*$/u, "Invalid characters in middle name")
    .optional(),
  
  gender: GenderSchema,
  
  dateOfBirth: z.coerce.date()
    .min(new Date(1900, 0, 1), "Birth year must be after 1900")
    .max(new Date(), "Birth date cannot be in the future")
    .refine(dob => {
      const today = new Date();
      const minAgeDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return dob <= minAgeDate;
    }, "Must be at least 18 years old"),
  
  role: RoleSchema,
});

// Export types and schemas
export {
  userBaseSchema,
  phoneNumberSchema,
  contactLocationSchema,
  addressSchema,
  socialMediaSchema,
  basePasswordSchema,
  createPasswordSchema,
};

type SchemaTypes = {
  UserBaseSchema: z.infer<typeof userBaseSchema>;
  PhoneNumberSchema: z.infer<typeof phoneNumberSchema>;
  ContactLocationSchema: z.infer<typeof contactLocationSchema>;
  AddressSchema: z.infer<typeof addressSchema>;
  SocialMediaSchema: z.infer<typeof socialMediaSchema>;
  BasePasswordSchema: z.infer<typeof basePasswordSchema>;
};

export type { SchemaTypes };