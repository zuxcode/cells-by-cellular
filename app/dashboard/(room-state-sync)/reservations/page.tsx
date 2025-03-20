import { Reservations, ReservationFormProvider } from "@/features/reservations";

export default function Page() {
  return (
    <ReservationFormProvider>
      <Reservations />
    </ReservationFormProvider>
  );
}
