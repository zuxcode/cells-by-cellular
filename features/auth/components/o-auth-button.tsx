"use client";

import { useState } from "react";
import { signinWithGoogle } from "@/features/auth/actions/o-auth-actions";
import {
  OAuthButtonsGroup,
  OAuthActionButton,
  OAuthProviderIcon,
  OAuthProviderLabel,
} from "@/features/auth/components/ui/o-auth-button-group";
import toast from "react-hot-toast";
import { SeverResponse } from "@/types/global-type";

interface OAuthButtonProps {
  label: string;
  iconSrc: string;
  iconAlt: string;
  formAction?: () => Promise<SeverResponse>;
}

function OAuthButton({
  label,
  iconSrc,
  iconAlt,
  formAction,
}: OAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!formAction) return;

    setIsLoading(true);
    try {
      const result = await formAction();
      if (result.status === "error") {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
    } catch (error) {
      console.error(`Error signing in with ${label}:`, error);
      toast.error("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OAuthActionButton
      label={label}
      onClick={handleClick}
      disabled={isLoading}
      aria-disabled={isLoading}
    >
      <OAuthProviderIcon alt={iconAlt} src={iconSrc} />
      <OAuthProviderLabel label={label} />
      {isLoading && <span className="ml-2">Loading...</span>}
    </OAuthActionButton>
  );
}

function OAuthButtons() {
  return (
    <OAuthButtonsGroup>
      <OAuthButton
        label="Continue with Google"
        iconSrc="/images/google.png"
        iconAlt="Google login icon"
        formAction={signinWithGoogle}
      />

      <OAuthButton
        label="Continue with Facebook"
        iconSrc="/images/fb.png"
        iconAlt="Facebook login icon"
        // formAction={signinWithFacebook} // Uncomment when Facebook action is implemented
      />
    </OAuthButtonsGroup>
  );
}

export { OAuthButtons };
