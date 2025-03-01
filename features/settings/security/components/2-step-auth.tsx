"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { BlockLayout, Container, Paragraph, Title } from "./ui/block";

const twoStepAuthSchema = z.object({
  twoStepAuth: z.boolean().default(false),
});

function TwoStepAuth() {
  const form = useForm<z.infer<typeof twoStepAuthSchema>>({
    resolver: zodResolver(twoStepAuthSchema),
    defaultValues: {
      twoStepAuth: false,
    },
  });

  function onSubmit(data: z.infer<typeof twoStepAuthSchema>) {
    toast.success("Two-step verification updated");
  }

  return (
    <Form {...form}>
      <BlockLayout
        // onSubmit={form.handleSubmit(onSubmit)}
      >
        <Container>
          <Title>Two-step verification</Title>
          <Paragraph>
            We recommend requiring a verification code in addition to your
            password.
          </Paragraph>
        </Container>

        <Container>
          <FormField
            control={form.control}
            name="twoStepAuth"
            render={({ field }) => (
              <FormItem className="flex flex-row-reverse space-y-0 gap-4 items-center w-4/5 h-10">
                <FormLabel className="text-xs">Two-step Verification</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    onClick={form.handleSubmit(onSubmit)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Container>
      </BlockLayout>
    </Form>
  );
}

export { TwoStepAuth };
