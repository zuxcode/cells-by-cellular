"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { UploadPreview } from "./preview";
import { useImageUploaderStore } from "../stores/image-uploader-store";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RoomSchemaType } from "../schema/create-room-schema";
import { ACCEPTED_FILE_TYPES } from "@/types/global-type";

function Uploader({ form }: { form: UseFormReturn<RoomSchemaType> }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { setImage } = useImageUploaderStore();

  const handleInputClick = () => {
    inputRef.current?.click();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      files.forEach((file) => setImage(file));
      form.setValue("files", files, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      e.target.value = "";
    }
  };

  return (
    <section>
      <h5 className="text-neutral-600 text-sm">Photos</h5>
      <Card>
        <CardContent className="p-2">
          <div className="flex items-center gap-4">
            <p className="text-neutral-600 text-xs">Upload Room Images</p>
            <FormField
              control={form.control}
              name="files"
              render={({ field: { onChange, ref, value, ...rest } }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="sr-only">Upload images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept={ACCEPTED_FILE_TYPES.join(",")}
                      className="sr-only"
                      ref={(e) => {
                        ref(e);
                        inputRef.current = e;
                      }}
                      onChange={(e) => {
                        onChange(e);
                        handleOnChange(e);
                      }}
                      {...rest}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#D9D9D9] hover:bg-black hover:text-[#D9D9D9] text-xs"
                    onClick={handleInputClick}
                  >
                    Browse Files
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <UploadPreview />
        </CardContent>
      </Card>
    </section>
  );
}

export { Uploader };
