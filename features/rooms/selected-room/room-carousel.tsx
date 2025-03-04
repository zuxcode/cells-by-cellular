"use client";

import { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { useRoomStore } from "../stores";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { keyExtractor } from "@/utils/key-extractor";

// Define the Carousel context type
type CarouselContextType = {
  images: string[];
  currentIndex: number;
  next: () => void;
  prev: () => void;
  setIndex: (index: number) => void;
};

// Create the Carousel context
const CarouselContext = createContext<CarouselContextType | null>(null);

// Custom hook to use the Carousel context
const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be wrapped in <Carousel>");
  }
  return context;
};

// Define Carousel props
type CarouselProps = {
  images: string[];
  children: React.ReactNode;
};

// Main Carousel component
function Carousel({ images, children }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const setIndex = (index: number) =>
    setCurrentIndex(Math.max(0, Math.min(index, images.length - 1)));

  return (
    <CarouselContext.Provider
      value={{ images, currentIndex, next, prev, setIndex }}
    >
      <div className="space-y-4">{children}</div>
    </CarouselContext.Provider>
  );
}

// Carousel main image component
const CarouselMainImage = ({ className }: { className?: string }) => {
  const { images, currentIndex } = useCarousel();
  return (
    <div
      className={cn(
        "relative h-64 w-full overflow-hidden rounded-lg",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={images[currentIndex]}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt="Main carousel image"
            fill
            quality={100}
            className="object-cover rounded-lg"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Carousel thumbnails component
const CarouselThumbnails = ({ windowSize = 3 }: { windowSize?: number }) => {
  const { images, currentIndex, setIndex } = useCarousel();

  const localizeImageLength = images.length > 3 ? windowSize : images.length;

  const getVisibleIndices = () => {
    const start = Math.max(
      0,
      Math.min(
        currentIndex - Math.floor(localizeImageLength / 2),
        images.length - localizeImageLength
      )
    );
    return Array.from(
      { length: localizeImageLength },
      (_, i) => (start + i) % images.length
    );
  };

  return (
    <div className="flex gap-2">
      {getVisibleIndices().map((index, keyIndex) => (
        <motion.button
          key={keyExtractor(images[index], keyIndex)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
            currentIndex === index
              ? "border-green-forest"
              : "border-transparent opacity-75 hover:opacity-100"
          )}
          onClick={() => setIndex(index)}
        >
          <Image
            src={images[index]}
            alt={`Thumbnail ${index + 1}`}
            width={80}
            height={80}
            quality={100}
            className="object-cover w-full h-full"
          />
        </motion.button>
      ))}
    </div>
  );
};

// Carousel button component
const CarouselButton = ({
  direction,
  className,
}: {
  direction: "prev" | "next";
  className?: string;
}) => {
  const { prev, next } = useCarousel();
  const icon = direction === "prev" ? "◀" : "▶";

  return (
    <Button
      variant="ghost"
      aria-label={`${direction === "prev" ? "Previous" : "Next"} image`}
      className={cn(
        "px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg transition",
        className
      )}
      onClick={direction === "prev" ? prev : next}
    >
      {icon}
    </Button>
  );
};

// Compound component composition
Carousel.Main = CarouselMainImage;
Carousel.Thumbnails = CarouselThumbnails;
Carousel.PrevButton = () => <CarouselButton direction="prev" />;
Carousel.NextButton = () => <CarouselButton direction="next" />;

// RoomImageCarousel component
function RoomImageCarousel() {
  const { selectedRoom } = useRoomStore();

  if (!selectedRoom || !selectedRoom.imageUrl?.length) return null;

  return (
    <Carousel images={selectedRoom.imageUrl}>
      <Carousel.Main />

      <div className="flex items-center justify-center gap-2">
        <Carousel.PrevButton />
        <Carousel.Thumbnails windowSize={3} />
        <Carousel.NextButton />
      </div>
    </Carousel>
  );
}

export { RoomImageCarousel };
