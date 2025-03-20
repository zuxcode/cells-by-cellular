// import { contactLocationSchema, userBaseSchema } from "@/utils/zod-schema";
// import { z } from "zod";
// import { Database } from "@/utils/supabase/db-type"
// import { roomType } from "@/types/global-type";

// const reservationBaseSchema = userBaseSchema.pick({
//   firstName: true,
//   middleName: true,
//   lastName: true,
//   gender: true,
//   email: true,
//   dateOfBirth: true,
//   phoneNumber: true,
//   country: true,
// });

// const reservationSchema = z
//   .object({
//     postalCode: z.string().transform((str) => str.trim()),
//     nationality: z
//       .string()
//       .min(2, "Nationality must be at least 2 characters")
//       .max(50, "Nationality cannot exceed 50 characters"),

//     address: z
//       .string()
//       .min(5, "Address must be at least 5 characters")
//       .max(100, "Address cannot exceed 100 characters")
//       .regex(/^[a-zA-Z0-9\s\-\/,.'#]+$/, "Contains invalid characters"),
//     idType: z.enum(ID_TYPES, {
//       errorMap: () => ({ message: "Please select a valid ID type" }),
//     }),
//     idNumber: z
//       .string()
//       .min(3, "ID number must be at least 3 characters")
//       .max(20, "ID number cannot exceed 20 characters")
//       .regex(
//         /^[a-zA-Z0-9\-]+$/,
//         "Only letters, numbers, and hyphens are allowed"
//       ),

//     idDocument: z.string().nonempty({ message: "File is required" }),
//     termsAccepted: z.boolean(),
//     paymentMethod: z.

//     // ROOM  INFORMATION SCHEMA
//     checkInOutDate: z
//       .object({
//         from: z.coerce.date(), // Converts string input to Date
//         to: z.coerce.date(),
//       })
//       .superRefine(({ from, to }, ctx) => {
//         const normCheckIn = new Date(from);
//         normCheckIn.setHours(0, 0, 0, 0);

//         const normCheckOut = new Date(to);
//         normCheckOut.setHours(0, 0, 0, 0);

//         const timeDiff = normCheckOut.getTime() - normCheckIn.getTime();
//         const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

//         if (dayDiff < 1) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: "Check-out must be at least 1 day after check-in",
//             path: ["to"],
//           });
//         }

//         if (normCheckOut < normCheckIn) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: "Check-out date cannot precede check-in date",
//             path: ["to"],
//           });
//         }
//       }),

//     roomType: z.enum(roomType, {
//       errorMap: () => ({ message: "Please select a valid room type" }),
//     }),
//   })
//   .merge(
//     reservationBaseSchema.merge(
//       contactLocationSchema.pick({ city: true, state: true })
//     )
//   );

// export type ReservationSchemaType = z.infer<typeof reservationSchema>;

// export { reservationSchema };

import { contactLocationSchema, userBaseSchema } from "@/utils/zod-schema";
import { z } from "zod";
import {
  fileSchema,
  IDTypeSchema,
  PaymentMethodSchema,
  RoomTypeSchema,
} from "@/types/global-type";

// Base schema extensions
const reservationBaseSchema = userBaseSchema.pick({
  firstName: true,
  middleName: true,
  lastName: true,
  gender: true,
  email: true,
  dateOfBirth: true,
  phoneNumber: true,
  country: true,
});

// Date validation helpers
const validateDateRange = (from: Date, to: Date, ctx: z.RefinementCtx) => {
  const normCheckIn = new Date(from);
  normCheckIn.setHours(0, 0, 0, 0);

  const normCheckOut = new Date(to);
  normCheckOut.setHours(0, 0, 0, 0);

  const timeDiff = normCheckOut.getTime() - normCheckIn.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  if (dayDiff < 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        "Minimum stay requirement: Check-out must be at least 1 full day after check-in",
      path: ["to"],
    });
  }

  if (normCheckOut < normCheckIn) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Check-out date cannot be earlier than check-in date",
      path: ["to"],
    });
  }
};

// Main schema
const reservationSchema = z
  .object({
    // Personal Information
    ...reservationBaseSchema.shape,

    // Contact Information
    ...contactLocationSchema.pick({ city: true, state: true }).shape,
    postalCode: z
      .string()
      .trim()
      .min(3, "Postal code must be at least 3 characters")
      .max(10, "Postal code cannot exceed 10 characters"),

    // Identification Details
    nationality: z
      .string()
      .min(2, "Nationality must be 2-50 characters")
      .max(50),
    address: z
      .string()
      .min(5, "Address must be 5-100 characters")
      .max(100)
      .regex(
        /^[\w\s\-\/,.'#]+$/,
        "Contains invalid characters (allowed: letters, numbers, -/,.'#)"
      ),
    idType: IDTypeSchema,
    idNumber: z
      .string()
      .min(3, "ID number must be 3-20 characters")
      .max(20)
      .regex(/^[\w\-]+$/, "Only letters, numbers, and hyphens allowed"),
    idDocument: fileSchema,

    // Reservation Details
    checkInOutDate: z.object({
      from: z.coerce
        .date()
        .min(new Date(), "Check-in date cannot be in the past"), // Converts string input to Date
      to: z.coerce.date(),
    }),
    roomType: RoomTypeSchema,

    // Payment & Agreement
    paymentMethod: PaymentMethodSchema,
    termsAccepted: z.literal<boolean>(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine(({ checkInOutDate }) => checkInOutDate.to > checkInOutDate.from, {
    message: "Check-out date must be after check-in date",
    path: ["checkOutDate"],
  })
  .superRefine(({ checkInOutDate }, ctx) => {
    validateDateRange(checkInOutDate.from, checkInOutDate.to, ctx);
  });

export type ReservationSchemaType = z.infer<typeof reservationSchema>;
export { reservationSchema };
