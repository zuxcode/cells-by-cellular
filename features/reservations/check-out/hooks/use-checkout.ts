import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ReservationSchemaType } from "../../server/schema/reservation-schema";
import { ServerResponse } from "@/types/global-type";

interface CheckoutData {
  reservationId: string;
  paymentMethod: string;
  additionalNotes?: string;
}

interface UseCheckoutResult {
  isLoading: boolean;
  error: string | null;
  handleCheckout: (data: CheckoutData) => Promise<void>;
}

export const useCheckout = (): UseCheckoutResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormErrors = (
    form: UseFormReturn<ReservationSchemaType>,
    result: ServerResponse<ReservationSchemaType>
  ) => {
    if (result.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([field, messages]) => {
        const key = field as keyof ReservationSchemaType;
        if (Object.keys(form.formState.errors).includes(key)) {
          form.setError(key, { message: messages?.join(", ") });
        }
      });
    }
  };

  const handleCheckout = async (data: CheckoutData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to process checkout");
      }

      // Handle success (e.g., show confirmation, update state)
      console.log("Checkout successful");
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleCheckout,
  };
};
