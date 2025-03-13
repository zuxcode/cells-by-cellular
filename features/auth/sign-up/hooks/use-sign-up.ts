import { UseFormReturn } from "react-hook-form";
import { SignUpSchemaType } from "../../schemas/auth-schema";
import { signUpAction } from "../server/actions/sign-up-action";
import toast from "react-hot-toast";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTenantActions } from "@/utils/store/tenant";

type OnSubmitHandler = (
  data: SignUpSchemaType,
  form: UseFormReturn<SignUpSchemaType>
) => Promise<void>;

type UseSignInReturn = {
  onSubmit: OnSubmitHandler;
  isLoading: boolean;
};

/**
 * Custom hook for handling the sign-up form submission.
 * @returns An object containing the `onSubmit` handler and a loading state.
 */
const useSignUp = (): UseSignInReturn => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { addTenant, selectTenant } = useTenantActions();


  const onSubmit = useCallback<OnSubmitHandler>(
    async (data, form) => {
      setIsLoading(true);
      const formData = new FormData();

      // Append form data to FormData object
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      try {
        const result = await signUpAction(formData);
        // Handle success
        if (result.status === "success") {
           toast.success("Account created successfully!");
           router.replace("/dashboard");
           form.reset();

          addTenant({
            id: result.data.tenant_id,
            staffId:  result.data.staff_id,
            roleId:   result.data.role_id,
	    service: {
	       id: result.data.service_id,
               name: "hotel"
             }
          });

          selectTenant(result.data.tenant_id, result.data.service_id);
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

        if (result.message) {
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
    },
    [setIsLoading]
  );

  return { onSubmit, isLoading };
};

export { useSignUp };
