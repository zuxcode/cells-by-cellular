import { SeverState } from "@/types/global-type";
import { FieldValues, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";

const handleServerErrors = <T, U extends FieldValues>(
  state: SeverState<T>,
  form: UseFormReturn<U>
) => {
  console.log("state: ", state);

  if (state.status === "success") {
    toast.success(state.message);
    return;
  }

  // Handle field errors
  Object.entries(state).forEach(([field, messages]) => {
    if (messages[0]) {
      form.setError(field as keyof U, {
        type: "server",
        message: messages[0],
      });
    }
  });

  // Handle form-level errors
  if (state.message) {
    toast.error(state.message);
  }

  if (form.formState.isValid) {
    form.reset();
  }
};

export { handleServerErrors };
