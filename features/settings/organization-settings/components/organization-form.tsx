import { UseFormReturn } from "react-hook-form";
import csc from "countries-states-cities";

import {
  LEGAL_ENTITIES,
  ORGANIZATIONS,
  type OrganizationSchemaType,
} from "../server/schema/organization-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { keyExtractor } from "@/utils/key-extractor";

type UserSettingsFormProps = UseFormReturn<OrganizationSchemaType>;

const NUMBER_OF_EMPLOYEES = Array.from({ length: 30 }, (_, i) => i + 10);

function OrganizationForm({
  control,
  getValues,
  formState,
}: UserSettingsFormProps) {
  return (
    <div className="space-y-4">
      {/* Row 1: Organization Name and Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Organization Name"
                  disabled={formState.isSubmitting}
                  aria-disabled={formState.isSubmitting}
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground  "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Service</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground">
                    <SelectValue defaultValue={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ORGANIZATIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Row 2: Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={formState.isSubmitting}
                  aria-disabled={formState.isSubmitting}
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  placeholder="Email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  disabled={formState.isSubmitting}
                  aria-disabled={formState.isSubmitting}
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  placeholder="+234 818 8945 858"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="telPhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telephone Number(Optional)</FormLabel>
              <FormControl>
                <Input
                  disabled={formState.isSubmitting}
                  aria-disabled={formState.isSubmitting}
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  placeholder="+234 818 8945 858"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Row 3: Location Info */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Legal Entity</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground">
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Limited Liability Company"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LEGAL_ENTITIES.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="regNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Number</FormLabel>
              <FormControl>
                <Input
                  disabled={formState.isSubmitting}
                  aria-disabled={formState.isSubmitting}
                  placeholder="234567"
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="taxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Identification Number(Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="234567"
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="numberOfEmployees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Employees</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value as unknown as string}
              >
                <FormControl>
                  <SelectTrigger className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground">
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="10 - 36"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {NUMBER_OF_EMPLOYEES.map((option) => (
                    <SelectItem key={option} value={`${option}`}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Row 3: Location Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground">
                    <SelectValue placeholder="country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {csc.getAllCountries().map((option) => {
                    return (
                      <SelectItem
                        key={option.name}
                        value={option.id.toString()}
                      >
                        {option.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    disabled={!getValues("country")}
                    className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  >
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {csc
                    .getStatesOfCountry(Number(getValues("country")))
                    .map((option, index) => (
                      <SelectItem
                        key={keyExtractor(option.state_code, index)}
                        value={option.name}
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    disabled={!getValues("state")}
                    className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  >
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {csc
                    .getCitiesOfState(Number(getValues("state")))
                    .map((option, index) => (
                      <SelectItem
                        key={keyExtractor(option.state_code, index)}
                        value={option.name}
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className="w-[40%]">
              <FormControl>
                <Input
                  placeholder="Postal code"
                  disabled={formState.isSubmitting}
                  aria-disabled={formState.isSubmitting}
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export { OrganizationForm };
