import { ServerResponse, UploadFileProps } from "@/types/global-type";
import {
  reservationSchema,
  ReservationSchemaType,
} from "../../server/schema/reservation-schema";
import { createClient } from "@/utils/supabase/server";
import { v4 } from "uuid";

const transformFormData = (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries());
  return {
    ...rawFormData,
    files: formData.get("files") as Blob,
  };
};

const validateFormData = async (data: unknown) => {
  const result = await reservationSchema.safeParseAsync(data);
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
    idDocument,
  tenantId,
  service = "hotel",
}: Omit<UploadFileProps, 'files'> & Pick<ReservationSchemaType, 'idDocument'>) => {
  const supabase = await createClient();
  const uploadResults = [];
  const uniqueId = v4();
  try {
      const filePath = `id_card/${tenantId}/${service}/${uniqueId}-${idDocument.name}`;
      const { data, error } = await supabase.storage
        .from("tenant")
        .upload(filePath, idDocument, {
          cacheControl: "3600",
          upsert: false,
          contentType: idDocument.type,
        });
      
    // for (const file of files) {


    //   if (error) {
    //     console.error(`Failed to upload ${file.name}:`, error);
    //     uploadResults.push({
    //       fileName: file.name,
    //       success: false,
    //       error: error.message,
    //     });
    //     continue;
    //   }

      const { data: public_url } = supabase.storage
        .from("tenant")
        .getPublicUrl(data.path);

    //   uploadResults.push({
    //     fileName: file.name,
    //     success: true,
    //     path: data.path,
    //     url: public_url,
    //   });
    //   console.log("public_url: ", public_url);
    }

    // return uploadResults;
  } catch (error) {
    console.log(error);
    throw new Error("File upload operation failed");
  }
};

const checkoutWithSupabase = async (props: ReservationSchemaType) => {
  const {} = props;
  const supabase = await createClient();

  const uploadResults = await uploadFilesWithSupabase({
    files: props.idDocument,
    tenantId,
  });

  const validUrls = uploadResults
    .filter((result) => result.url !== undefined)
    .map((result) => result.url.publicUrl);

  const { error, data } = await supabase.rpc("create_booking", {
    p_address: props.address,
  });

  if (error) {
    throw new Error(error?.message || "Failed to book room");
  }
};

export const checkoutAction = async (
  formData: FormData
): Promise<ServerResponse<ReservationSchemaType>> => {
  try {
    const transformedData = transformFormData(formData);
    const validationResult = await validateFormData(transformedData);

    if ("fieldErrors" in validationResult) {
      return validationResult;
    }

    await checkoutWithSupabase(validationResult);
    return {
      status: "success",
      message: "Room booked successfully.",
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
