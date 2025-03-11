"use server";

import { createClient } from "@/utils/supabase/server";
import { ServerResponse } from "@/types/global-type";
import { roomSchema, RoomSchemaType } from "../../schema/create-room-schema";

const transformFormData = (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries());
  return {
    ...rawFormData,
    files: formData.getAll("files") as Blob[],
  };
};

const validateFormData = async (data: unknown) => {
  const result = await roomSchema.safeParseAsync(data);
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
  const {
    bedType,
    bedsCount,
    description,
    features,
    files,
    maxOccupancy,
    name,
    number,
    price,
    roomSize,
    roomStatus,
    roomType,
  } = props;
  const supabase = await createClient();
  const { error } = await supabase.from("hotel_rooms").insert([
    {
      name,
      features,
      description,
      bed_type: bedType,
      room_type: roomType,
      bed_max: Number(bedsCount),
      guest_max: Number(maxOccupancy),
      number: Number(number),
      price: Number(price),
      size: Number(roomSize),
      status:
        roomStatus === "Commissioned" ? "commissioned" : "not_commissioned",
      // image_urls: "files",
      tenant_id: "f54f2714-c54c-4940-9d4b-8b902828c39c",
      service_id: "1b0c05e3-4a79-43d5-b3b3-210e1d819076",
      created_by: "367098a4-c3ba-4a8c-8372-3faf113fd450",
    },
  ]);

  if (error) {
    console.log("error: ", error);
    throw new Error(error?.message || "Failed to create room");
  }
};

export const createRoomAction = async (
  formData: FormData
): Promise<ServerResponse<RoomSchemaType>> => {
  try {
    const transformedData = transformFormData(formData);
    console.log(transformedData.files[0].type);
    const validationResult = await validateFormData(transformedData);

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
