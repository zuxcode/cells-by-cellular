import { RoomSchemaType } from "../schema/create-room-schema";
import toast from "react-hot-toast";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { createRoomAction } from "../server/action/create-room-action";
import { useImageUploaderStore } from "../stores/image-uploader-store";
import { useCurrentTenant } from "@/utils/store/tenant";
import { ServerResponse } from "@/types/global-type";

type OnSubmitHandler = (
  data: RoomSchemaType,
  form: UseFormReturn<RoomSchemaType>
) => Promise<void>;

type UseCreateRoomReturn = {
  onSubmit: OnSubmitHandler;
  isLoading: boolean;
};

export const useCreateRoom = (): UseCreateRoomReturn => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { files, resetImage } = useImageUploaderStore();

  const tenant = useCurrentTenant();
  const services = tenant.services;
  const serviceKey =  Object.keys(services)[0]

  const validateContext = () => {
    if (tenant.length <= 0) {
      toast.error("Missing organization context");
      return false;
    }
    return true;
  };

  const handleFormErrors = (
    form: UseFormReturn<RoomSchemaType>,
    result: ServerResponse<RoomSchemaType>
  ) => {
    if (result.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([field, messages]) => {
        const key = field as keyof RoomSchemaType;
        if (Object.keys(form.formState.errors).includes(key)) {
          form.setError(key, { message: messages?.join(", ") });
        }
      });
    }
  };

  const onSubmit = React.useCallback<OnSubmitHandler>(
    async (data, form) => {
      setIsLoading(true);

      if (!validateContext()) {
        setIsLoading(false)
        return;
      }

      const formData = new FormData();
      const { files: _, ...rest } = data;

      Object.entries(rest).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      files.forEach((file) => {
        if (file instanceof File) {
          formData.append("files", file);
        }
      });

      formData.append("tenantId", tenant.id);
      formData.append("serviceId", services[serviceKey].id);
      formData.append("staffId", tenant.staffId);
      formData.append("roleId", tenant.roleId);

      try {
        const result = await createRoomAction(formData);

        if (result.status === "success") {
          toast.success(result.message);
          resetImage();
          form.reset();
          return;
        }

        handleFormErrors(form, result);
        toast.error(result.message || "Operation failed");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [files, tenant, resetImage]
  );

  return { onSubmit, isLoading };
};
