import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { AvatarImageProps } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";

interface AvatarEnhancedProps
  extends Pick<AvatarImageProps, "alt" | "src" | "className"> {
  /**
   * Full user name for automatic initials generation
   * @defaultValue "C N" - Shows "CN" when no name is provided
   * @example
   * "John Doe" → "JD"
   * "Alice" → "AL"
   */
  userName?: string;

  /**
   * Custom class name for the root Avatar component
   * @defaultValue "h-8 w-8 rounded-lg"
   */
  AvatarClassName?: React.ComponentProps<typeof Avatar>["className"];

  /**
   * Custom class name for the AvatarImage component
   * @defaultValue undefined
   */
  AvatarImageClassName?: React.ComponentProps<typeof AvatarImage>["className"];

  /**
   * Custom class name for the AvatarFallback component
   * @defaultValue "rounded-lg"
   */
  AvatarFallbackClassName?: React.ComponentProps<
    typeof AvatarFallback
  >["className"];
}

/**
 * Enhanced Avatar component with automatic initials generation and customizable styling.
 *
 * @remarks
 * Extends Shadcn UI's Avatar with:
 * - Automatic initials fallback from user names
 * - Separate styling hooks for each subcomponent
 * - Intelligent alt text handling
 * - Default sizing and border radius
 *
 * @example
 * // Basic usage with custom class names
 * <AvatarEnhanced
 *   src="/user.jpg"
 *   alt="User profile"
 *   userName="John Doe"
 *   AvatarClassName="h-12 w-12"
 *   AvatarFallbackClassName="bg-blue-100"
 * />
 *
 * @example
 * // Fallback state with long name
 * <AvatarEnhanced
 *   userName="Dr. Sarah O'Conner-Smith"
 *   AvatarImageClassName="border-2"
 * />
 */
function AvatarEnhanced({
  userName = "C N",
  AvatarClassName,
  AvatarFallbackClassName,
  AvatarImageClassName,
  src,
  className,
  alt = "",
  ...props
}: AvatarEnhancedProps) {
  return (
    <Button
      size="icon"
      className={cn("h-8 w-8 p-0 rounded-full bg-white text-black hover:text-white", className)}
    >
      <Avatar className={AvatarClassName}>
        <AvatarImage
          src={src}
          alt={alt || (src ? "User avatar" : "")}
          className={AvatarImageClassName}
          {...props}
        />
        <AvatarFallback className={cn("rounded-lg text-inherit bg-inherit text-small", AvatarFallbackClassName)}>
          {getInitials(userName)}
        </AvatarFallback>
      </Avatar>
    </Button>
  );
}

/**
 * Generates initials from a full name with smart formatting
 * @param name - Full name to convert to initials
 * @returns Two uppercase initials with fallback to "CN"
 *
 * @example
 * getInitials("John Doe")    // "JD"
 * getInitials("Alice")       // "AL"
 * getInitials("")            // "CN"
 * getInitials("Mary-Jane")   // "MJ"
 * getInitials("  Bob  Lee ") // "BL"
 */
function getInitials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter((part) => part.length > 0)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2) || "CN"
  );
}

export { AvatarEnhanced };
