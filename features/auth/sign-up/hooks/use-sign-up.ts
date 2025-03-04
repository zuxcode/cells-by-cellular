import { UseFormReturn } from "react-hook-form";
import { SignUpSchemaType } from "../../schemas/auth-schema";
import { signUpAction } from "../server/actions/sign-up-action";
import toast from "react-hot-toast";
import { useCallback } from "react";

type OnSubmitHandler = (
  data: SignUpSchemaType,
  form: UseFormReturn<SignUpSchemaType>
) => Promise<void>;

type UseSignInReturn = {
  onSubmit: OnSubmitHandler;
};

/**
 * Custom hook for handling the sign-up form submission.
 * @returns An object containing the `onSubmit` handler and a loading state.
 */
const useSignUp = (): UseSignInReturn => {
  const onSubmit = useCallback<OnSubmitHandler>(async (data, form) => {
    const formData = new FormData();

    // Append form data to FormData object
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    try {
      const result = await signUpAction(formData);

      // Handle success
      if (result.status === "success") {
        form.reset();
        toast.success("Account created successfully!");
        return;
      }

      // Handle field errors
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            form.setError(field as keyof SignUpSchemaType, {
              type: "server",
              message: messages.join(", "), // Combine multiple error messages
            });
          }
        });
      }

      // Handle generic error message
      if (result.message) {
        form.setError("root", {
          type: "server",
          message: result.message,
        });
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    }
  }, []);

  return { onSubmit };
};

export { useSignUp };
