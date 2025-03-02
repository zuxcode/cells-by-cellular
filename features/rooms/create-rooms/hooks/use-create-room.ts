import { createClient } from "@/utils/supabase/client";
import { RoomSchemaType } from "../schema/create-room-schema";
import { v4 as uuidv4 } from "uuid";
import { handleServerErrors } from "@/utils/handle-server-error";
import toast from "react-hot-toast";

const useCreateRoom = () => {
    async function onSubmit(data: RoomSchemaType) {
        // Create FormData
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value.toString()); // Ensure all values are strings
        });
    
        // Wait for all file uploads to complete
        // const [result] = await Promise.all(
        //   files.map((file) => uploadFileToStorage(file))
        // );
    
        // if (result.error) {
        //   toast.error(result.error.message);
        //   return;
        // }
        // Send request and handle errors
        // handleServerErrors(await createRoomAction(formData));
      }
}

// File upload function
export async function uploadFileToStorage(
    file: File,
    bucket: string = "rooms"
  ): Promise<{
    data?: { path: string };
    error?: Error;
  }> {
    try {
      const supabase = createClient();
  
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
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