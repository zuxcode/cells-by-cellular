import { contactLocationSchema, userBaseSchema } from "@/utils/zod-schema";
import { z } from "zod";
import {
  fileSchema,
  IDTypeSchema,
  PaymentMethodSchema,
  RoomTypeSchema,
  tenantIdentity,
} from "@/types/global-type";

// Base schema extensions
const baseSchema = userBaseSchema.pick({
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
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (dayDiff < 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Check-out must be at least 1 full day after check-in",
      path: ["checkInOutDate.to"],
    });
  }

  if (normCheckOut < normCheckIn) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Check-out date cannot precede check-in date",
      path: ["checkInOutDate.to"],
    });
  }
};

// Main schema
const reservationBaseSchema = z.object({
  // Personal Information
  ...baseSchema.shape,

  // Contact Information
  ...contactLocationSchema.pick({ city: true, state: true }).shape,
  postalCode: z
    .string()
    .trim()
    .min(3, "Postal code must be 3-10 characters")
    .max(10)
    .regex(/^[a-zA-Z0-9\- ]+$/, "Invalid postal code format"),

  // Identification Details
  nationality: z.string().min(2, "Nationality must be 2-50 characters").max(50),
  address: z
    .string()
    .min(5, "Address must be 5-100 characters")
    .max(100)
    .regex(/^[\w\s\-\/,.'#]+$/, "Contains invalid characters"),
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
      .min(new Date(), "Check-in date cannot be in the past"),
    to: z.coerce.date(),
  }),
  roomType: RoomTypeSchema.optional(),
  specialRequests: z.string().optional(),
  guest: z.coerce.number().positive(),

  // Payment & Agreement
  paymentMethod: PaymentMethodSchema,
  termsAccepted: z.boolean(),
});

const reservationServerSchema = reservationBaseSchema
  .merge(tenantIdentity.pick({ tenantId: true }).extend({
    amount: z.coerce.number().nonnegative(),
    totalAmount: z.coerce.number().nonnegative(),
    room_id: z.string().nonempty()
  }))
  .superRefine(({ checkInOutDate }, ctx) => {
    validateDateRange(checkInOutDate.from, checkInOutDate.to, ctx);
  })
  .refine(({ checkInOutDate }) => checkInOutDate.to > checkInOutDate.from, {
    message: "Check-out date must be after check-in date",
    path: ["checkInOutDate.to"],
  });

const reservationSchema = reservationBaseSchema
  .superRefine(({ checkInOutDate }, ctx) => {
    validateDateRange(checkInOutDate.from, checkInOutDate.to, ctx);
  })
  .refine(({ checkInOutDate }) => checkInOutDate.to > checkInOutDate.from, {
    message: "Check-out date must be after check-in date",
    path: ["checkInOutDate.to"],
  });

export type ReservationSchemaType = z.infer<typeof reservationSchema>;
export type ReservationServerSchemaType = z.infer<typeof reservationServerSchema>;

export { reservationSchema, reservationServerSchema };
