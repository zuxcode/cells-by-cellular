import { useImageUploaderStore } from "../stores/image-uploader-store";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";

function UploadPreview() {
  const { previews, resetImage } = useImageUploaderStore();
  const fileIds = Array.from(previews.keys());

  return (
    <div
      className={cn(
        "w-full h-40 flex items-center gap-2 overflow-x-auto p-2 transition-all",
        fileIds.length <= 0 && "hidden"
      )}
    >
      {fileIds.map((fileId) => {
        const previewUrl = previews.get(fileId);
        if (!previewUrl) return null;

        return (
          <div
            key={fileId}
            className="w-[111px] h-[111px] rounded-sm relative shrink-0"
          >
            <Image
              alt={`Upload preview for ${fileId}`}
              className="object-cover rounded-lg"
              src={previewUrl}
              fill
              sizes="(max-width: 768px) 111px, 111px"
              priority={false}
            />
            <Button
              type="button"
              size="icon"
              className="absolute -top-2 -right-2 bg-destructive/80 hover:bg-destructive text-white rounded-full p-1 h-6 w-6"
              onClick={() => resetImage(fileId)}
              aria-label={`Remove image ${fileId}`}
            >
              <Trash className="h-3 w-3" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export { UploadPreview };
