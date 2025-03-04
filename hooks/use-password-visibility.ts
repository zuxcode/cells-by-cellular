import { useState, useCallback } from "react";

interface PasswordVisibilityHandlers {
  /** Indicates whether the password is currently visible */
  isVisible: boolean;
  /** Toggles the password visibility state */
  toggle: () => void;
  /** Type of the input field (changes between "text" and "password") */
  inputType: "text" | "password";
  /** Props to spread on the visibility toggle button */
  buttonProps: {
    "aria-label": string;
    role: "button";
    tabIndex: 0;
  };
}

/**
 * Custom hook for managing password visibility state
 * @param initialVisibility - Optional initial visibility state (default: false)
 * 
 * @example
 * const { isVisible, toggle, inputType, buttonProps } = usePasswordVisibility();
 * return (
 * <div>
 *  <input type={inputType} />
 *  <button onClick={toggle} {...buttonProps}>
 *    {isVisible ? "👁️" : "👁️🗨️"}
 *  </button>
 * </div>
  );
 */
const usePasswordVisibility = (
  initialVisibility: boolean = false
): PasswordVisibilityHandlers => {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  const toggle = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  return {
    isVisible,
    toggle,
    inputType: isVisible ? "text" : "password",
    buttonProps: {
      "aria-label": isVisible ? "Hide password" : "Show password",
      role: "button",
      tabIndex: 0,
    },
  };
};

export { usePasswordVisibility };
