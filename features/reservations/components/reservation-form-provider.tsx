"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, startOfToday } from "date-fns";
import React from "react";
import {
  reservationSchema,
  ReservationSchemaType,
} from "../schema/reservation-schema";
import { getDefaultDOB } from "../utils/utils";
import { gender, idType, paymentMethod, roomType } from "@/types/global-type";
import { ReservationForm } from "./form-provider";

function ReservationFormProvider({ children }: React.PropsWithChildren) {
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
      <ReservationForm>{children}</ReservationForm>
    </FormProvider>
  );
}

export { ReservationFormProvider };
