import { UserBaseSchemaType } from "@/utils/zod-schema";

interface UserSettingsFormReturn {
  onSubmit: (delta: UserBaseSchemaType) => void;
}

const useUserSettings: () => UserSettingsFormReturn = () => {
  const onSubmit = (delta: UserBaseSchemaType) => {
    console.log("delta: ");
    console.log(delta);
  };

  return {
    onSubmit,
  };
};

export { useUserSettings };
