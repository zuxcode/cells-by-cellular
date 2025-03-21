"use client";

import csc from "countries-states-cities";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useFormContext } from "react-hook-form";

import { keyExtractor } from "@/utils/key-extractor";
import { ACCEPTED_FILE_TYPES, gender, idType } from "@/types/global-type";
import { useReservation } from "../hooks/use-reservation";

function ContactDetails() {
  const method = useFormContext();
  const { handleOnChangeFile } = useReservation();

  return (
    <Card className="shadow-md">
      <CardHeader className="p-4">
        <CardTitle className="text-green-forest font-extrabold text-sm">
          Contact Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="flex gap-4">
          <FormField
            control={method.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    disabled={method.formState.isSubmitting}
                    aria-disabled={method.formState.isSubmitting}
                    className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] placeholder:text-[#696969]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={method.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    disabled={method.formState.isSubmitting}
                    aria-disabled={method.formState.isSubmitting}
                    className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] placeholder:text-[#696969]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 w-full">
          <FormField
            control={method.control}
            name="middleName"
            render={({ field }) => (
              <FormItem className="w-[60%]">
                <FormControl>
                  <Input
                    placeholder="Middle Name"
                    disabled={method.formState.isSubmitting}
                    aria-disabled={method.formState.isSubmitting}
                    className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] placeholder:text-[#696969]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={method.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-[40%]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] text-[#696969]">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {gender.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 w-full">
          <FormField
            control={method.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-[70%]">
                <FormControl>
                  <Input
                    placeholder="Email"
                    disabled={method.formState.isSubmitting}
                    aria-disabled={method.formState.isSubmitting}
                    className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] placeholder:text-[#696969]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={method.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="w-[30%]">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className="bg-[#F4F5F7] border-[#D9D9D9] text-[#696969] w-full"
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
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
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 w-full">
          <FormField
            control={method.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-[60%]">
                <FormControl>
                  <Input
                    placeholder="Phone Number"
                    disabled={method.formState.isSubmitting}
                    aria-disabled={method.formState.isSubmitting}
                    className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] placeholder:text-[#696969]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={method.control}
            name="nationality"
            render={({ field }) => (
              <FormItem className="w-[40%]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] text-[#696969]">
                      <SelectValue placeholder="Nationality" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {csc.getAllCountries().map((option) => (
                      <SelectItem key={option.name} value={option.name}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 w-full">
          <FormField
            control={method.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-[60%]">
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    method.resetField("state");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] text-[#696969]">
                      <SelectValue placeholder="Country of Residence" />
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
              </FormItem>
            )}
          />

          <FormField
            control={method.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="w-[40%]">
                <FormControl>
                  <Input
                    placeholder="Postal Code"
                    disabled={method.formState.isSubmitting}
                    aria-disabled={method.formState.isSubmitting}
                    className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] placeholder:text-[#696969]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 w-full">
          <FormField
            control={method.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    placeholder="Address"
                    disabled={method.formState.isSubmitting}
                    aria-disabled={method.formState.isSubmitting}
                    autoComplete="street-address"
                    className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] placeholder:text-[#696969] min-h-2 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 w-full">
          <FormField
            control={method.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormControl>
                  <Input
                    placeholder="City/Town"
                    disabled={method.formState.isSubmitting}
                    aria-disabled={method.formState.isSubmitting}
                    className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] placeholder:text-[#696969]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={method.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      disabled={!method.getValues("country")}
                      className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] text-[#696969]"
                    >
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {csc
                      .getStatesOfCountry(Number(method.getValues("country")))
                      .map((option) => (
                        <SelectItem key={option.state_code} value={option.name}>
                          {option.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 w-full">
          <FormField
            control={method.control}
            name="idType"
            render={({ field }) => (
              <FormItem className="w-[40%]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] text-[#696969]">
                      <SelectValue placeholder="ID Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {idType.map((option, index) => (
                      <SelectItem
                        key={keyExtractor(option, index)}
                        value={option}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={method.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem className="w-[60%]">
                <FormControl>
                  <Input
                    placeholder="ID Number"
                    disabled={method.formState.isSubmitting}
                    aria-disabled={method.formState.isSubmitting}
                    className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] placeholder:text-[#696969]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 w-full">
          <FormField
            control={method.control}
            name="idDocument"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">Upload Document</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Browse..."
                    disabled={method.formState.isSubmitting}
                    aria-disabled={method.formState.isSubmitting}
                    multiple
                    accept={ACCEPTED_FILE_TYPES.join(",")}
                    onChange={(e) => {
                      onChange(e);
                      handleOnChangeFile(e);
                    }}
                    className="bg-[#F4F5F7] border-[#D9D9D9] focus-visible:ring-[#D9D9D9] placeholder:text-[#696969]"
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { ContactDetails };
