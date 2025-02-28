import { OrganizationSchemaType } from "../server/schema/organization-schema";

interface OrganizationFormReturn {
  onSubmit: (delta: OrganizationSchemaType) => void;
}

function useOrganization(): OrganizationFormReturn {
  const onSubmit = (delta: OrganizationSchemaType) => {
    console.log("delta: ");
    console.log(delta);
  };
    return {
      onSubmit,
    };
}

export { useOrganization };
