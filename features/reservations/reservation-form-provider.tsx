"use client";
import { useForm, FormProvider } from "react-hook-form";
import {
  reservationSchema,
  ReservationSchemaType,
} from "./server/schema/reservation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaultDOB } from "./utils/utils";
import { addDays, startOfToday } from "date-fns";
import { Form } from "@/components/ui/form";
import { useReservation } from "./hooks/use-reservation";
import React from "react";

function ReservationFormProvider({ children }: React.PropsWithChildren) {
  const { onSubmit } = useReservation();

  // Timezone-aware date initialization
  const defaultCheckIn = startOfToday();
  const defaultCheckOut = addDays(defaultCheckIn, 1);

  const methods = useForm<ReservationSchemaType>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      address: "",
      city: "",
      country: "",
      dateOfBirth: getDefaultDOB(),
      email: "",
      firstName: "",
      gender: "Male",
      idDocument: "",
      idNumber: "",
      idType: "National ID",
      lastName: "",
      middleName: "",
      nationality: "",
      phoneNumber: "",
      postalCode: "",
      state: "",
      checkInOutDate: {
        from: defaultCheckIn,
        to: defaultCheckOut,
      },
      roomType: "single",
    },
  });

  const { watch } = methods;

  React.useEffect(() => {
    const { unsubscribe } = watch();

    return () => unsubscribe();
  }, [watch]);

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          {children}
        </form>
      </Form>
    </FormProvider>
  );
}

export { ReservationFormProvider };
