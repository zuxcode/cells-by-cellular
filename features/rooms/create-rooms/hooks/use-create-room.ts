import { RoomSchemaType } from "../schema/create-room-schema";
import toast from "react-hot-toast";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { createRoomAction } from "../server/action/create-room-action";
import { useImageUploaderStore } from "../stores/image-uploader-store";

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
  const { files } = useImageUploaderStore();

  const onSubmit = React.useCallback<OnSubmitHandler>(async (data, form) => {
    setIsLoading(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    
    files.forEach((fileWithId) => {
      formData.append("files", fileWithId);
    });


    try {
      const result = await createRoomAction(formData);

      if (result.status === "success") {
        toast.success(result.message);
        form.reset();
        return;
      }

      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            form.setError(field as keyof RoomSchemaType, {
              type: "server",
              message: messages.join(", "),
            });
          }
        });
      }

      if (result.message) {
        form.setError("root", {
          type: "server",
          message: result.message,
        });
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { onSubmit, isLoading };
};
