"use client";
import { useForm, FormProvider } from "react-hook-form";
import {
  reservationSchema,
  ReservationSchemaType,
} from "./server/schema/reservation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaultDOB } from "./utils/utils";
import { addDays } from "date-fns";
import { Form } from "@/components/ui/form";
import { useReservation } from "./hooks/use-reservation";


function ReservationFormProvider({ children }: React.PropsWithChildren) {
  const { onSubmit } = useReservation();

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
      idDocument: undefined,
      idNumber: "",
      idType: "National ID",
      lastName: "",
      middleName: "",
      nationality: "",
      phoneNumber: "",
      postalCode: "",
      state: "",
      checkInOutDate: {
        from: new Date(),
        to: addDays(new Date(), 1),
      },
      roomType: "single",
    },
  });

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {children}
        </form>
      </Form>
    </FormProvider>
  );
}

export { ReservationFormProvider };
