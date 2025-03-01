"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { BlockLayout, Container, Paragraph, Title } from "./ui/block";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const changeEmailSchema = z.object({
  email: z.string().email(),
});

function ChangeEmail() {
  const form = useForm<z.infer<typeof changeEmailSchema>>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof changeEmailSchema>) {
    toast.success("Email updated");
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
            name="email"
            render={({ field }) => (
              <FormItem className="w-4/5">
                <FormLabel className="text-xs">New Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="change email"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    className="bg-neutral-050 border-none focus-visible:ring-[hsl(0,0%,80%)] text-[.625rem] placeholder:text-[.625rem] text-muted-foreground"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-green-forest text-white w-1/2">
            Change
          </Button> 
        </Container>
      </BlockLayout>
    </Form>
  );
}

export { ChangeEmail };
