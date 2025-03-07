"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";

import {
  signUpSchema,
  SignUpSchemaType,
} from "@/features/auth/schemas/auth-schema";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePasswordVisibility } from "@/hooks/use-password-visibility";
import { ActionLabel, ActionTrigger } from "@/components/button";
import { PasswordVisibilityToggle } from "../components/password-visibility-toggle";
import { useSignUp } from "./hooks/use-sign-up";

function SignUpForm() {
  const { buttonProps, inputType, isVisible, toggle } = usePasswordVisibility();
  const { onSubmit, isLoading } = useSignUp();
  const form = useForm<SignUpSchemaType>({
    mode: 'all',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmitWrapper = async (data: SignUpSchemaType) => {
    onSubmit(data, form);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitWrapper)}
        className="flex-1 flex flex-col min-w-64 gap-2"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input
                  autoComplete="family-name"
                  aria-label="Enter your fullname"
                  placeholder="Enter your fullname"
                  disabled={isLoading}
                  aria-disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  aria-label="Enter your email"
                  placeholder="Enter your email"
                  disabled={isLoading}
                  aria-disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={inputType}
                    autoComplete="password"
                    aria-label="Enter your password"
                    placeholder="Enter your password"
                    disabled={isLoading}
                    aria-disabled={isLoading}
                    {...field}
                  />

                  <PasswordVisibilityToggle
                    isVisible={isVisible}
                    toggle={toggle}
                    buttonProps={buttonProps}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ActionTrigger
          disabled={isLoading || !form.formState.isValid}
          aria-disabled={isLoading || !form.formState.isValid}
          isProcessing={isLoading}
          
        >
          <ActionLabel>Sign up</ActionLabel>
        </ActionTrigger>
      </form>
    </Form>
  );
}

export { SignUpForm };
