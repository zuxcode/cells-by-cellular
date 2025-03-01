"use client";

import { CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import Image from "next/image";
import { FormProps } from "../types/type";

function RoomInfoDescription(form: FormProps) {
  return (
    <div className="space-y-1">
      <p className="text-small text-neutral-600 font-semibold">
        Room Description
      </p>
      <CardContent className="p-4 bg-canvas-cool shadow-md space-y-2">
        <div className="flex items-center gap-3">
          <Image
            alt="Price"
            src="/svg/price-tag.svg"
            className="h-5 w-5"
            width={20}
            height={20}
          />
          <span className="text-small text-neutral-600 font-semibold">
            Price:
          </span>
          <span className="text-green-forest text-small font-extrabold">
            N120,000 /Night
          </span>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-neutral-600" />
            <span className="text-small text-neutral-600 font-semibold">
              Max Guest:
            </span>
            <span className="text-white text-small bg-neutral-600 rounded-full h-4 aspect-square flex items-center justify-center">
              3 {/** @todo: Replace with dynamic value */}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Image
              alt="tag"
              src="/svg/bed.svg"
              className="h-5 w-5"
              width={20}
              height={20}
            />
            <span className="text-small text-neutral-600 font-semibold">
              Bed:
            </span>
            <span className="text-white text-small bg-neutral-600 rounded-full h-4 aspect-square flex items-center justify-center">
              3 {/** @todo: Replace with dynamic value */}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Image
            alt="tag"
            src="/svg/bed.svg"
            className="h-5 w-5"
            width={20}
            height={20}
          />
          <span className="text-small text-neutral-600 font-semibold">
            Bed Name
          </span>
          <span className="text-small text-neutral-600 font-semibold">
            {form.getValues("roomType")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Image
            alt="Price"
            src="/svg/status-info.svg"
            className="h-5 w-5"
            width={20}
            height={20}
          />
          <span className="text-small text-neutral-600 font-semibold">
            Condition:
          </span>
          <span className="text-green-forest text-small font-extrabold">
            Commissioned
          </span>
        </div>

        <div className="flex items-start gap-3">
          <Image
            alt="Price"
            src="/svg/note.svg"
            className="h-5 w-5"
            width={20}
            height={20}
          />

          <div className="flex flex-col">
            <span className="text-small text-neutral-600 font-semibold">
              Facility Notes:
            </span>
            <span className="text-neutral-600 text-small font-medium ">
              Ac not working properly, Wash hand Basin not rushing, AC only
              comes up by 1AM
            </span>
          </div>
        </div>
      </CardContent>
    </div>
  );
}

export { RoomInfoDescription };
