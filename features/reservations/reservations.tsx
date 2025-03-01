"use client";
import { useForm } from "react-hook-form";
import {
  reservationSchema,
  ReservationSchemaType,
} from "./server/schema/reservation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaultDOB } from "./utils/utils";
import { addDays } from "date-fns";
import { Form } from "@/components/ui/form";
import { useReservation } from "./hooks/use-reservation";
import { RoomDetailsCard } from "./room-information";
import { ContactDetails } from "./components/contact-details";
import { CheckOut } from "./check-out";

function Reservations() {
  const { onSubmit } = useReservation();

  const form = useForm<ReservationSchemaType>({
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 md:flex-row"
      >
        {/* Room Details - 55% Width */}
        <div className="w-full md:w-[55%]">
          <RoomDetailsCard {...form} />
        </div>

        {/* Contact Details - 45% Width */}
        <div className="w-full md:w-[45%]">
          <ContactDetails {...form} />
        </div>

        {/* Checkout - 35% Width */}
        <div className="w-full md:w-[35%] md:sticky md:top-4">
          <CheckOut {...form} />
        </div>
      </form>
    </Form>
  );
}

export { Reservations };
