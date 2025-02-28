import { UserSettingsSchemaType } from "../server/schema/user-settings-schema";

interface UserSettingsFormReturn {
  onSubmit: (delta: UserSettingsSchemaType) => void;
}

const useUserSettings: () => UserSettingsFormReturn = () => {
  const onSubmit = (delta: UserSettingsSchemaType) => {
    console.log("delta: ");
    console.log(delta);
  };

  return {
    onSubmit,
  };
};

export { useUserSettings };
