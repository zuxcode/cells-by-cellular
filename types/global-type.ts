import { z } from "zod";

export type Element<T extends React.ElementType = "div"> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
  };

 export type SeverState<F = undefined> =  z.typeToFlattenedError<F>["fieldErrors"] & {
    status: "success" | "error";
    message: string;
  };