import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

// Define props for MediaContainer
interface MediaContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Define props for Media
interface MediaProps extends ImageProps {
  className?: string;
}

// MediaContainer component
function MediaContainer({ children, className }: MediaContainerProps) {
  return (
    <div
      className={cn(
        "overflow-hidden mb-4 h-[184px] md:min-w-[240px] rounded-[20px]",
        className
      )}
    >
      {children}
    </div>
  );
}

// Media component
function Media({ alt, src, className, ...rest }: MediaProps) {
  return (
    <Image
      alt={alt}
      src={src}
      width={240}
      height={184}
      className={cn(
        "rounded-[20px] w-full h-full object-cover object-center",
        className
      )}
      {...rest} // Spread remaining props
    />
  );
}

// Assign display names for better debugging
MediaContainer.displayName = "MediaContainer";
Media.displayName = "MediaContainer.Media";

// Assign Media as a subcomponent of MediaContainer
MediaContainer.Media = Media;

export { MediaContainer };
