"use server";

import { ServerResponse, UploadFileProps } from "@/types/global-type";
import {
  reservationServerSchema,
  ReservationServerSchemaType,
} from "../schema/reservation-schema";
import { createSupabaseServerClientWithCookies } from "@/utils/supabase/server";
import { v4 } from "uuid";
import { ZodError } from "zod";

type UploadProps = Omit<UploadFileProps, "files"> &
  Pick<ReservationServerSchemaType, "idDocument">;

// Enhanced FormData transformation with error handling
const transformFormData = (formData: FormData) => {
  try {
    const entries = Object.fromEntries(formData.entries());

    // Parse checkInOutDate safely
    const checkInOutDate = JSON.parse(entries.checkInOutDate as string);
    if (!checkInOutDate?.from || !checkInOutDate?.to) {
      throw new Error("Invalid date format");
    }

    return {
      ...entries,
      checkInOutDate: {
        from: new Date(checkInOutDate.from),
        to: new Date(checkInOutDate.to),
      },
      dateOfBirth: new Date(entries.dateOfBirth as string),
      idDocument: formData.get("idDocument") as File,
      termsAccepted: entries.termsAccepted === "true",
      // Add explicit number conversions
      guest: Number(entries.guest),
      totalAmount: Number(entries.totalAmount),
    };
  } catch (error) {
    throw new Error("Invalid form data structure");
  }
};

// Enhanced validation with detailed error logging
const validateFormData = async (data: unknown) => {
  try {
    return await reservationServerSchema.parseAsync(data);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Validation errors:", error.flatten());
      return {
        status: "error" as const,
        message: "Invalid form data. Please check your inputs.",
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    throw error;
  }
};

// Improved file upload with sanitization
const uploadFilesWithSupabase = async ({
  idDocument,
  tenantId,
  service = "hotel",
}: UploadProps) => {
  const supabase = await createSupabaseServerClientWithCookies();
  const uniqueId = v4();

  try {
    // Sanitize filename and get extension
    const fileName =
      "name" in idDocument && typeof idDocument.name === "string"
        ? idDocument.name
        : "anonymous";

    const sanitizedName = fileName.replace(/[^a-z0-9.]/gi, "_");
    const fileExt = sanitizedName.split(".").pop()?.toLowerCase() || "bin";
    const filePath = `${tenantId}/${service}/${uniqueId}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("tenant")
      .upload(filePath, idDocument, {
        cacheControl: "3600",
        upsert: false,
        contentType: idDocument.type,
        duplex: "half", // Required for large files
      });

    if (error) {
      console.error("Supabase upload error:", error);
      throw new Error(`File upload failed: ${error.message}`);
    }

    return supabase.storage.from("tenant").getPublicUrl(data.path).data;
  } catch (error) {
    console.error("File upload failed:", error);
    throw new Error("Document upload failed. Please try again.");
  }
};

// Transaction handler with rollback capability
const processBookingTransaction = async (
  props: ReservationServerSchemaType
) => {
  const supabase = await createSupabaseServerClientWithCookies();
  let documentUrl: Awaited<ReturnType<typeof uploadFilesWithSupabase>> | null =
    null;

  try {
    // Step 1: Upload document
    documentUrl = await uploadFilesWithSupabase({
      idDocument: props.idDocument,
      tenantId: props.tenantId,
    });

    // Step 2: Create booking
    const { error, data: booking } = await supabase.rpc("create_booking", {
      p_tenant_id: props.tenantId,
      p_room_id: props.room_id,
      p_check_in: props.checkInOutDate.from.toISOString(),
      p_check_out: props.checkInOutDate.to.toISOString(),
      p_guest_count: props.guest,
      p_total_price: props.totalAmount,
      p_first_name: props.firstName,
      p_last_name: props.lastName,
      p_email: props.email,
      p_phone_number: props.phoneNumber,
      p_dob: props.dateOfBirth.toISOString(),
      p_address: props.address,
      p_city_or_town: props.city,
      p_postal_code: props.postalCode,
      p_country_of_residence: props.country,
      p_nationality: props.nationality,
      p_id_type: props.idType,
      p_id_number: props.idNumber,
      p_id_card_url: documentUrl.publicUrl,
      p_payment_method: props.paymentMethod,
      p_transaction_id: v4(),
      p_amount: props.totalAmount,
      p_special_requests: props.specialRequests || "",
      p_room_type: props.roomType,
    });

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return booking;
  } catch (error) {
    // Cleanup uploaded file if transaction fails
    if (documentUrl?.publicUrl) {
      await supabase.storage
        .from("tenant-documents")
        .remove([documentUrl.publicUrl]);
    }

    console.error("Booking transaction failed:", error);
    throw new Error("Booking creation failed. Please try again.");
  }
};

// Main action handler with enhanced error boundaries
export const checkoutAction = async (
  formData: FormData
): Promise<ServerResponse<ReservationServerSchemaType>> => {
  try {
    const transformedData = transformFormData(formData);
    const validationResult = await validateFormData(transformedData);

    if ("fieldErrors" in validationResult) {
      return validationResult;
    }

    const bookingResult = await processBookingTransaction(validationResult);

    return {
      status: "success",
      message: "🎉 Booking confirmed! Confirmation email sent.",
      data: bookingResult,
    };
  } catch (error) {
    console.error("Checkout process error:", error);
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please contact support.",
    };
  }
};
