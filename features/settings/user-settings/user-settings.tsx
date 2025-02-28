"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { UserSettingsForm } from "./components/user-settings-form";
import { SettingCommonHeader } from "../common/setting-common-header";
import { useUserSettings } from "./hooks/use-use-settings";
import { useForm } from "react-hook-form";
import { userBaseSchema, type UserBaseSchemaType } from "@/utils/zod-schema";

function UserSettings() {
  const { onSubmit } = useUserSettings();
  const form = useForm<UserBaseSchemaType>({
    resolver: zodResolver(userBaseSchema),
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
      role: "Staff",
      country: "",
      LGA: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <SettingCommonHeader title="Personal Information" />
        <UserSettingsForm {...form} />
      </form>
    </Form>
  );
}

export { UserSettings };
