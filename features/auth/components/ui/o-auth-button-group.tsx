import { Button, type ButtonProps } from "@/components/ui/button";
import Image from "next/image";
import type { PropsWithChildren } from "react";

interface OAuthProviderProps extends ButtonProps {
  alt: string;
  src: string;
  label: string;
}

/**
 * Compound component for OAuth buttons group.
 */
function OAuthButtonsGroup({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
      {children}
    </div>
  );
}

/**
 * OAuth action button with icon and label.
 */
function OAuthActionButton({
  children,
  label,
  ...props
}: Omit<OAuthProviderProps, "alt" | "src">) {
  return (
    <Button
      variant="outline"
      className="flex-1 rounded-full w-full flex items-center justify-center gap-2"
      aria-label={`Sign in with ${label}`}
      {...props}
    >
      {children}
    </Button>
  );
}

/**
 * OAuth provider icon component.
 */
function OAuthProviderIcon({
  alt,
  src,
}: Pick<OAuthProviderProps, "alt" | "src">) {
  return (
    <Image
      alt={alt}
      src={src}
      width={24}
      height={24}
      quality={100}
      className="object-contain"
      style={{ width: "auto", height: "auto" }}
      onError={(e) => {
        // Fallback in case the image fails to load
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

/**
 * OAuth provider label component.
 */
function OAuthProviderLabel({ label }: Pick<OAuthProviderProps, "label">) {
  return <span className="text-sm font-medium">{label}</span>;
}

/**
 * Compound component for OAuth provider button.
 */
function OAuthProviderButton({ alt, src, label, ...props }: OAuthProviderProps) {
  return (
    <OAuthActionButton label={label} {...props}>
      <OAuthProviderIcon alt={alt} src={src} />
      <OAuthProviderLabel label={label} />
    </OAuthActionButton>
  );
}

// Export all components
export {
  OAuthButtonsGroup,
  OAuthActionButton,
  OAuthProviderIcon,
  OAuthProviderLabel,
  OAuthProviderButton,
};