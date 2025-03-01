import { UseFormReturn } from "react-hook-form";
import { ReservationSchemaType } from "../../server/schema/reservation-schema";

export type FormProps = UseFormReturn<ReservationSchemaType>;