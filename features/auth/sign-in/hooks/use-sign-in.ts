import { UseFormReturn } from "react-hook-form";
import { SignInSchemaType } from "../../schemas/auth-schema";
import { signInAction } from "../server/actions/sign-in-action";
import toast from "react-hot-toast";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

type OnSubmitHandler = (
  data: SignInSchemaType,
  form: UseFormReturn<SignInSchemaType>
) => Promise<void>;

type UseSignInReturn = {
  onSubmit: OnSubmitHandler;
  isLoading: boolean;
};

/**
 * Custom hook for handling the sign-in form submission.
 * @returns An object containing the `onSubmit` handler.
 */
const useSignIn = (): UseSignInReturn => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit = useCallback<OnSubmitHandler>(async (data, form) => {
    setIsLoading(true);
    const formData = new FormData();
    // Append form data to FormData object
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    try {
      const result = await signInAction(formData);

      // Handle success
      if (result.status === "success") {
        toast.success("Signed in successfully!");
        router.replace("/dashboard");
        form.reset();
        return;
      }

      // Handle field errors
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            form.setError(field as keyof SignInSchemaType, {
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
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { onSubmit, isLoading };
};

export { useSignIn };
