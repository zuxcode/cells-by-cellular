"use server";

import { v4 } from "uuid";
import { createClient } from "@/utils/supabase/server";
import { ServerResponse } from "@/types/global-type";
import {
  serverRoomSchema,
  ServerRoomSchema,
} from "../../schema/create-room-schema";

interface UploadFileWithSupabaseProps {
  files: any[];
  tenantId: string;
  service?: string;
}

const transformFormData = (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries());
  return {
    ...rawFormData,
    files: formData.getAll("files") as Blob[],
  };
};

const validateFormData = async (data: unknown) => {
  const result = await serverRoomSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      status: "error" as const,
      message: "Validation failed. Please check your inputs.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }
  return result.data;
};

const uploadFilesWithSupabase = async ({
  files,
  tenantId,
  service = "hotel",
}: UploadFileWithSupabaseProps) => {
  const supabase = await createClient();
  const uploadResults = [];
  const uniqueId = v4();
  try {
    for (const file of files) {
      const filePath = `${tenantId}/${service}/${uniqueId}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("tenant")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        uploadResults.push({
          fileName: file.name,
          success: false,
          error: error.message,
        });
        continue;
      }

      const { data: public_url } = supabase.storage
        .from("tenant")
        .getPublicUrl(data.path);

      uploadResults.push({
        fileName: file.name,
        success: true,
        path: data.path,
        url: public_url,
      });
      console.log("public_url: ", public_url);
    }

    return uploadResults;
  } catch (error) {
    console.log(error)
	  throw new Error("File upload operation failed");
  }
};

const createRoomWithSupabase = async (props: ServerRoomSchema) => {
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
    tenantId,
    serviceId,
    staffId
  } = props;
  const supabase = await createClient();

  const uploadResults = await uploadFilesWithSupabase({
    files,
    tenantId,
  });

  const validUrls = uploadResults
    .filter((result) => result.url !== undefined)
    .map((result) => result.url.publicUrl);

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
        roomStatus,
      image_urls: validUrls,
      tenant_id:  tenantId,     
      service_id: serviceId,
      created_by: staffId,
      updated_by: staffId
    },
  ]);

  if (error) {
    throw new Error(error?.message || "Failed to create room");
  }
};

export const createRoomAction = async (
  formData: FormData
): Promise<ServerResponse<ServerRoomSchema>> => {
  try {
    const transformedData = transformFormData(formData);
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
