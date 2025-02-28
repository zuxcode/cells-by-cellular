"use client";

import { Form } from "@/components/ui/form";
import { UserSettingsForm } from "./components/user-settings-form";
import { UserSettingsHeader } from "./components/user-settings-header";
import { useUserSettings } from "./hooks/use-use-settings";
import { useForm } from "react-hook-form";
import { UserSettingsSchemaType } from "./server/schema/user-settings-schema";

function UserSettings() {
  const { onSubmit } = useUserSettings();
  const form = useForm<UserSettingsSchemaType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      phoneNumber: "",
      gender: "Male",
      dateOfBirth: new Date(),
      city: "",
      state: "",
      roleOrPosition: "Staff",
      country: "",
      LGA: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <UserSettingsHeader />
        <UserSettingsForm {...form} />
      </form>
    </Form>
  );
}

export { UserSettings };
