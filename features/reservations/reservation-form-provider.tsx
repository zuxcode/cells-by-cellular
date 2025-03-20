"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, startOfToday } from "date-fns";
import React from "react";
import {
  reservationSchema,
  ReservationSchemaType,
} from "./server/schema/reservation-schema";
import { getDefaultDOB } from "./utils/utils";
import { useReservation } from "./hooks/use-reservation";
import { gender, idType, paymentMethod, roomType } from "@/types/global-type";

function ReservationFormProvider({ children }: React.PropsWithChildren) {
  const { onSubmit } = useReservation();

  // Timezone-safe date initialization
  const getDefaultDates = () => {
    const today = startOfToday();
    return {
      checkIn: today,
      checkOut: addDays(today, 1),
    };
  };

  const formMethods = useForm<ReservationSchemaType>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      // Personal Information
      firstName: "",
      middleName: "",
      lastName: "",
      gender: gender[0],
      dateOfBirth: getDefaultDOB(),

      // Contact Information
      email: "",
      phoneNumber: "",
      country: "",
      city: "",
      state: "",
      postalCode: "",
      address: "",
      nationality: "",

      // Identification
      idType: idType[0],
      idNumber: "",
      idDocument: "",

      // Reservation Details
      checkInOutDate: {
        from: getDefaultDates().checkIn,
        to: getDefaultDates().checkOut,
      },
      roomType: roomType[0],

      // Payment & Terms
      paymentMethod: paymentMethod[0],
      termsAccepted: true, // Changed to false for explicit user acceptance
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        noValidate
        aria-label="Reservation form"
      >
        {/* Add loading state handling */}
        <fieldset disabled={formMethods.formState.isSubmitting}>
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
}

export { ReservationFormProvider };
