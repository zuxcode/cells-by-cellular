import Image from "next/image";
import React from "react";

type ImageProps = {
  url: string;
  span: string;
  alt: string;
};

const images: ImageProps[] = [
  { url: "/images/outdoor.jpg", span: "row-span-2", alt: "Outdoor view" },
  {
    url: "/images/the-white-orchid-hotel.jpg",
    span: "col-span-2",
    alt: "The White Orchid Hotel",
  },
  {
    url: "/images/intercontinental-lagos.jpg",
    span: "col-span-2",
    alt: "Intercontinental Lagos",
  },
  { url: "/images/exterior.jpg", span: "col-span-2", alt: "Exterior view" },
  { url: "/images/swimming-pool.jpg", span: "", alt: "Swimming pool" },
];

/**
 * Reusable component for rendering an image in the gallery.
 */
function GalleryImage({ url, span, alt }: ImageProps) {
  return (
    <div className={`relative rounded-3xl overflow-hidden ${span}`}>
      <Image
        src={url}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

function ImageGallerySection() {
  return (
    <section className="hidden md:flex flex-col items-center justify-center gap-8 overflow-hidden bg-secondary-background py-12">
      <div className="grid grid-cols-[2fr_1fr_1fr] grid-rows-[repeat(3,_minmax(50px,_1fr))] gap-4 md:h-[350px] lg:h-[500px] w-4/5">
        {images.map((image, index) => (
          <GalleryImage key={index} {...image} />
        ))}
      </div>

      <article className="w-2/3 text-center">
        <h3 className="text-2xl font-bold">
          Find your perfect stay and book with confidence
        </h3>
        <p className="mt-4 text-xs text-muted-foreground">
          Elevate your travel experience with our seamless booking platform.{" "}
          <br />
          Explore curated hotels, compare options, and secure the ideal room for
          your journey.
        </p>
      </article>
    </section>
  );
}

export { ImageGallerySection };