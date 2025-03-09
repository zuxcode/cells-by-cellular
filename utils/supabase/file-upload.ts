import { v4 } from "uuid";
import { createClient } from "./client";

interface FileUploadResponse {
  data?: { path: string };
  error?: Error;
}

interface FileUploadProps {
  file: File;
  bucket: string;
}

// File upload function
export async function uploadFileToStorage({
  bucket = "rooms",
  file,
}: FileUploadProps): Promise<FileUploadResponse> {
  try {
    const supabase = createClient();
    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${v4()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file to storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        upsert: true,
        cacheControl: "3600",
        contentType: file.type,
      });

    if (error) throw error;

    return { data: { path: filePath } };
  } catch (error) {
    return { error: error as Error };
  }
}
