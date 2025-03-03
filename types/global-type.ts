import { Database } from "@/utils/supabase/db-type";
import { z } from "zod";

export type Element<T extends React.ElementType = "div"> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
  };

export type SeverState<F = undefined> =
  z.typeToFlattenedError<F>["fieldErrors"] & {
    status: "success" | "error";
    message: string;
  };

// type roomStatus = Database["public"]["Enums"]["room_status_enum"];
// type bedType = Database["public"]["Enums"]["bed_type_enum"];
// type roomType = Database["public"]["Enums"]["room_type_enum"];

const bedType = ["single", "double", "queen", "king"] as const;
const roomStatus = ["Commissioned", "Not-commissioned"] as const;
const roomType = ["single", "double", "suite", "family"] as const;

export { bedType, roomStatus, roomType };
