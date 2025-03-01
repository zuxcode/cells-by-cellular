import { ReservationSchemaType } from "../server/schema/reservation-schema";

interface useReservationReturn {
  onSubmit: (delta: ReservationSchemaType) => void;
}

function useReservation(): useReservationReturn {
  const onSubmit = (delta: ReservationSchemaType) => {
    console.log("delta: ");
    console.log(delta);
  };
  return {
    onSubmit,
  };
}

export { useReservation };
