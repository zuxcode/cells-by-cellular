import { useCurrentTenant, useCurrentService } from "@/utils/store/tenant";
import { ServerResponse } from "@/types/global-type";

import { useFormContext } from "react-hook-form";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { ReservationSchemaType } from "../schema/reservation-schema";
import { useReservationStore } from "../stores/reservation-store";
import { checkoutAction } from "../actions/checkout-action";

type CheckoutHandler = () => Promise<void>;

type UseCheckoutReturn = {
  handleCheckout: CheckoutHandler;
  isLoading: boolean;
};

export const useCheckout = (): UseCheckoutReturn => {
  const { getValues, reset, setError } = useFormContext();
  const { fileState, removeFile } = useReservationStore();
  const [isLoading, setIsLoading] = useState(false);
  const tenant = useCurrentTenant();
  const service = useCurrentService();

  const validateContext = () => {
    const missing = [];
    if (!tenant) missing.push("organization context");
    if (!service) missing.push("service context");

    if (missing.length > 0) {
      toast.error(`Missing ${missing.join(" and ")}`);
      return false;
    }
    return true;
  };

  const handleFormErrors = (result: ServerResponse<ReservationSchemaType>) => {
    if (result.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([field, messages]) => {
        setError(field as keyof ReservationSchemaType, {
          type: "server",
          message: messages?.join(". ") || "Invalid value",
        });
      });
    }
  };

  const serializeFormData = (data: ReservationSchemaType): FormData => {
    const formData = new FormData();
    const { checkInOutDate, dateOfBirth, ...rest } = data;

    // Append dates as ISO strings
    formData.append("checkInOutDate.from", checkInOutDate.from.toISOString());
    formData.append("checkInOutDate.to", checkInOutDate.to.toISOString());
    formData.append("dateOfBirth", dateOfBirth.toISOString());

    // Append other fields with type preservation
    Object.entries(rest).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (typeof value === "number") {
        formData.append(key, value.toString());
      } else if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else {
        formData.append(key, String(value));
      }
    });

    // Append file if exists
    if (fileState?.file) {
      formData.append("idDocument", fileState.file);
    }

    // Append context information
    if (tenant && service) {
      formData.append("tenantId", tenant.id);
      formData.append("serviceId", service.id);
      formData.append("staffId", tenant.staffId);
      formData.append("roleId", tenant.roleId);
    }

    return formData;
  };

  const handleCheckout = React.useCallback<CheckoutHandler>(async () => {
    try {
      setIsLoading(true);

      const data = getValues() as ReservationSchemaType;

      if (!validateContext()) return;

      const formData = serializeFormData(data);
      const result = await checkoutAction(formData);

      if (result.status === "success") {
        toast.success(result.message);
        removeFile();
        reset();
        return;
      }

      handleFormErrors(result);
      toast.error(result.message || "Booking submission failed");
    } catch (error) {
      console.error("Checkout error:", error);
      const message =
        error instanceof Error ? error.message : "Failed to process booking";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [fileState, removeFile, tenant, service]);

  return { isLoading, handleCheckout };
};
