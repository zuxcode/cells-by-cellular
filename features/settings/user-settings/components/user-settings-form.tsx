import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GENDERS, ROLES, UserBaseSchemaType } from "@/utils/zod-schema";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

type UserSettingsFormProps = UseFormReturn<UserBaseSchemaType>;

function UserSettingsForm(form: UserSettingsFormProps) {
  return (
    <div className="space-y-4">
      {/* Row 1: Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="First name"
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground  "
                  {...field}
                  aria-describedby="firstName-error"
                />
              </FormControl>
              <FormMessage id="firstName-error" className="min-h-[1.25rem]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name (Optional)</FormLabel>
              <FormControl>
                <Input
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  placeholder="Middle name"
                  {...field}
                  aria-describedby="middleName-error"
                />
              </FormControl>
              <FormMessage id="middleName-error" className="min-h-[1.25rem]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name (Surname)</FormLabel>
              <FormControl>
                <Input
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  placeholder="Last name"
                  {...field}
                  aria-describedby="lastName-error"
                />
              </FormControl>
              <FormMessage id="lastName-error" className="min-h-[1.25rem]" />
            </FormItem>
          )}
        />
      </div>

      {/* Row 2: Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  placeholder="Email address"
                  {...field}
                  aria-describedby="email-error"
                />
              </FormControl>
              <FormMessage id="email-error" className="min-h-[1.25rem]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  placeholder="Phone number"
                  {...field}
                  aria-describedby="phoneNumber-error"
                />
              </FormControl>
              <FormMessage id="phoneNumber-error" className="min-h-[1.25rem]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GENDERS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage id="gender-error" className="min-h-[1.25rem]" />
            </FormItem>
          )}
        />
      </div>

      {/* Row 3: Location Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input
                  placeholder="Country"
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  {...field}
                  aria-describedby="country-error"
                />
              </FormControl>
              <FormMessage id="country-error" className="min-h-[1.25rem]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input
                  placeholder="State"
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  {...field}
                  aria-describedby="state-error"
                />
              </FormControl>
              <FormMessage id="state-error" className="min-h-[1.25rem]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  placeholder="City"
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  {...field}
                  aria-describedby="city-error"
                />
              </FormControl>
              <FormMessage id="city-error" className="min-h-[1.25rem]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="LGA"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local Government</FormLabel>
              <FormControl>
                <Input
                  placeholder="LGA"
                  className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground"
                  {...field}
                  aria-describedby="lga-error"
                />
              </FormControl>
              <FormMessage id="lga-error" className="min-h-[1.25rem]" />
            </FormItem>
          )}
        />
      </div>

      {/* Row 4: Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="ghost"
                      className={cn(
                        "pl-3 text-left font-normal",
                        "bg-neutral-050 focus-visible:ring-[hsl(0,0%,80%)] text-muted-foreground",

                        !field.value && "text-muted-foreground"
                      )}
                      aria-describedby="dateOfBirth-error"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select date of birth</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage id="dateOfBirth-error" className="min-h-[1.25rem]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position / Role</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)]   text-muted-foreground">
                    <SelectValue placeholder="Select position/role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ROLES.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage
                id="roleOrPosition-error"
                className="min-h-[1.25rem]"
              />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export { UserSettingsForm };
