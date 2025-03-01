"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { basePasswordSchema } from "@/utils/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { BlockLayout, Container, Paragraph, Title } from "./ui/block";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const changePasswordSchema = z.object({
  currentPassword: z.string().nonempty(),
  newPassword: basePasswordSchema,
  confirmNewPassword: basePasswordSchema,
});

function ChangePassword() {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof changePasswordSchema>) {
    toast.success("Password updated");
  }

  return (
    <Form {...form}>
      <BlockLayout onSubmit={form.handleSubmit(onSubmit)}>
        <Container>
          <Title>Email</Title>
          <Paragraph>Set a new email</Paragraph>
        </Container>

        <Container>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="w-4/5">
                <FormLabel className="text-xs">Current Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter current password"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)] text-[.625rem] placeholder:text-[.625rem] text-muted-foreground"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Container className="flex gap-4 w-full space-y-0">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-4/5">
                  <FormLabel className="text-xs">New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter new password"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)] text-[.625rem] placeholder:text-[.625rem] text-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem className="w-4/5 h-10">
                  <FormLabel className="text-xs">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="confirm new password"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)] text-[.625rem] placeholder:text-[.625rem] text-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Container>
          <Button type="submit" className="bg-green-forest text-white w-1/2">
            Change
          </Button>
        </Container>
      </BlockLayout>
    </Form>
  );
}

export { ChangePassword };
