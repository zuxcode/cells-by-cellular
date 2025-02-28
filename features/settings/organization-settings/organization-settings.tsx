"use client";

import { Form } from "@/components/ui/form";
import { SettingCommonHeader } from "../common/setting-common-header";
import { useForm } from "react-hook-form";
import { organizationSchema, OrganizationSchemaType } from "./server/schema/organization-schema";
import { useOrganization } from "./hooks/use-organization";
import { OrganizationForm } from "./components/organization-form";
import { zodResolver } from "@hookform/resolvers/zod";

function OrganizationSettings() {
  const { onSubmit } = useOrganization();
  const form = useForm<OrganizationSchemaType>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      city: "",
      state: "",
      email: "",
      phoneNumber: "",
      country: "",
      LGA: "",
      legalEntity: "sole proprietor",
      taxId: "",
      regNumber: "",
      name: "",
      type: "hotel",
      telPhoneNumber: "",
      numberOfEmployees: 1,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <SettingCommonHeader title="Organization Information" />
        <OrganizationForm {...form} />
      </form>
    </Form>
  );
}

export { OrganizationSettings };
