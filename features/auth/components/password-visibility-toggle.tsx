import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

// Password Visibility Toggle Button
export const PasswordVisibilityToggle = ({
  isVisible,
  toggle,
  buttonProps,
}: {
  isVisible: boolean;
  toggle: () => void;
  buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) => (
  <Button
    type="button"
    variant="ghost"
    onClick={toggle}
    {...buttonProps}
    className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent [&_svg]:size-5"
    aria-label={isVisible ? "Hide password" : "Show password"}
  >
    {isVisible ? <EyeOffIcon /> : <EyeIcon />}
  </Button>
);
