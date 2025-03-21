import { useFormContext } from "react-hook-form";

import React from "react";
import { useCheckout } from "../hooks/use-checkout";

function ReservationForm({ children }: React.PropsWithChildren) {
  const method = useFormContext();
  const { handleCheckout, isLoading } = useCheckout();

  return (
    <form
      onSubmit={method.handleSubmit(handleCheckout)}
      noValidate
      aria-label="Reservation form"
    >
      {/* Add loading state handling */}
      <fieldset disabled={isLoading}>{children}</fieldset>
    </form>
  );
}

export { ReservationForm };
