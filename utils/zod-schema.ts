import libphonenumber from "google-libphonenumber";
import { z } from "zod";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Other",
  "Prefer not to say",
] as const;

const ROLE_OPTIONS = ["Super Admin", "Admin", "Marketer", "Staff"] as const;

const phoneNumberSchema = z
  .string()
  .nonempty({ message: "Mobile number is required" })
  .refine(
    (number) => {
      try {
        const phoneNumber = phoneUtil.parse(number);
        return phoneUtil.isValidNumber(phoneNumber);
      } catch (error) {
        return false;
      }
    },
    { message: "Invalid mobile number" }
  );

const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .regex(
      /^[A-Za-z'-]+$/,
      "First name can Only contain letters, apostrophes, and hyphens"
    ),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(
      /^[A-Za-z'-]+$/,
      "Last name can Only contain letters, apostrophes, and hyphens"
    ),

  middleName: z
    .string()
    .trim()
    .max(50, "Middle name cannot exceed 50 characters")
    .regex(
      /^[A-Za-z'-]+$/,
      "Middle name can Only contain letters, apostrophes, and hyphens"
    )
    .optional(),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email cannot exceed 100 characters"),

  phoneNumber: phoneNumberSchema,

  gender: z.enum(GENDER_OPTIONS, {
    errorMap: () => ({ message: "Please select a valid gender option" }),
  }),

  dateOfBirth: z
    .date()
    .min(new Date(Date.UTC(1900, 0, 1)), "Birth date cannot be before 1900")
    .max(
      (() => {
        // Create date without time component for fair comparison
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate());
      })(),
      "Cannot be born in the future"
    )
    .refine((dob) => {
      // Precise age calculation accounting for birth anniversary
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }

      return age >= 18;
    }, "You must be at least 18 years old"),

  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City cannot exceed 50 characters"),

  state: z
    .string()
    .min(2, "State must be at least 2 characters")
    .max(50, "State cannot exceed 50 characters"),

  roleOrPosition: z.enum(ROLE_OPTIONS, {
    errorMap: () => ({ message: "Please select a valid role option" }),
  }),
});

export { userSchema, GENDER_OPTIONS, ROLE_OPTIONS, phoneNumberSchema };
