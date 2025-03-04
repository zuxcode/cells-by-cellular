import { ImageGallerySection } from "@/features/auth/components/image-gallery";
import Image from "next/image";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-svh w-svw overflow-x-hidden grid md:grid-cols-2">
      <div className="text-muted-foreground grid gap-4 place-items-center pb-4">
        <div className="w-[90%] grid gap-4 lg:w-[70%] md:gap-10">
          <div className="pt-5 w-24 h-24 flex items-center justify-center">
            <Image
              src="/images/cells.png"
              alt="cells Logo"
              width={64}
              height={64}
              className="aspect-square h-full resize-none object-center object-contain"
            />
          </div>
          <div className="flex flex-col gap-7 w-full">{children}</div>
        </div>
      </div>
      <ImageGallerySection />;
    </div>
  );
}
