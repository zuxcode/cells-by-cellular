// import { FieldValues } from "react-hook-form";
// import { z } from "zod";


export type Element<T extends React.ElementType = "div"> = React.ComponentPropsWithoutRef<T> & {
    as?: T;
  }

// export type ServerState<F extends FieldValues = FieldValues> = {
//     fieldErrors: z.typeToFlattenedError<F> // Partial<Record<keyof F, string[]>>; // Ensures proper key mapping
//     //status: "success" | "error";
//  //   message: string;
//   };