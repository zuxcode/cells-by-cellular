"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import React from "react";

import { usePasswordVisibility } from "@/hooks/use-password-visibility";
import { ActionTrigger, ActionLabel } from "@/components/button/action-trigger";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { signInSchema, SignInSchemaType } from "../schemas/auth-schema";
import { PasswordVisibilityToggle } from "../components/password-visibility-toggle";
import { useSignIn } from "./hooks/use-sign-in";

function SignInForm() {
  const { isVisible, toggle, buttonProps, inputType } = usePasswordVisibility();
  const { onSubmit } = useSignIn();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmitWrapper = async (data: SignInSchemaType) => {
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  id="email"
                  autoComplete="email"
                  aria-label="Enter your email"
                  placeholder="Enter your email"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
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
                    id="password"
                    autoComplete="password"
                    aria-label="Enter your password"
                    placeholder="Enter your password"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
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

        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    className="data-[state=checked]:bg-blue-600 border-blue-600"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Remember me</FormLabel>
                </div>
              </div>

              <Link
                aria-label="Forgot password?"
                passHref
                href="/account/forgot-password"
              >
                <Button
                  variant="link"
                  className="text-sm font-medium leading-none text-muted-foreground hover:text-blue-600"
                >
                  Forgot password?
                </Button>
              </Link>
            </FormItem>
          )}
        />

        <ActionTrigger
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          aria-disabled={form.formState.isSubmitting || !form.formState.isValid}
          isProcessing={form.formState.isSubmitting}
        >
          <ActionLabel>Sign in</ActionLabel>
        </ActionTrigger>
      </form>
    </Form>
  );
}

export { SignInForm };
