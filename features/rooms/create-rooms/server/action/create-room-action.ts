"use server";

import { createClient } from "@/utils/supabase/server";
import { ServerResponse } from "@/types/global-type";
import { roomSchema, RoomSchemaType } from "../../schema/create-room-schema";

const transformFormData = (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries());
  return {
    ...rawFormData,
  };
};

const validateFormData = (data: unknown) => {
  const result = roomSchema.safeParse(data);
  if (!result.success) {
    return {
      status: "error" as const,
      message: "Validation failed. Please check your inputs.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }
  return result.data;
};

const createRoomWithSupabase = async (props: RoomSchemaType) => {
  const supabase = await createClient();
  console.log("props: ", props);
  //   const { error } = await supabase.rpc("create_room", {
  //     name,
  //     number,
  //     price,
  //     description,
  //     bedType,
  //     roomStatus,
  //     roomSize,
  //     bedsCount,
  //     maxOccupancy,
  //     roomType,
  //   });

  //   if (error) {
  //     throw new Error(error?.message || "Failed to create room");
  //   }
};

export const createRoomAction = async (
  formData: FormData
): Promise<ServerResponse<RoomSchemaType>> => {
  try {
    const transformedData = transformFormData(formData);
    const validationResult = validateFormData(transformedData);

    if ("fieldErrors" in validationResult) {
      return validationResult;
    }

    await createRoomWithSupabase(validationResult);
    return {
      status: "success",
      message: "Room created successfully.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again later.",
    };
  }
};
