"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Description } from "./components/description";
import {
  SectionContainer,
  SectionContent,
  SectionParagraph,
} from "./blocks/block";
import { FormProps } from "../room-information/types/type";
import toast from "react-hot-toast";

function CheckOut(form: FormProps) {
  return (
    <Card className="shadow-md border-black bg-canvas-cool">
      <CardHeader className="pt-4 px-2 pb-0">
        <CardTitle className="text-green-forest font-extrabold text-sm">
          Checkout
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4 space-y-2">
        <Description {...form} />
        <Separator />

        <SectionContainer className="px-2">
          <SectionContent className="w-1/5">
            <SectionParagraph className="font-extrabold">
              Total
            </SectionParagraph>
          </SectionContent>

          <SectionContent className="w-4/5">
            <SectionParagraph className="text-right font-extrabold">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(240000)}
            </SectionParagraph>
          </SectionContent>
        </SectionContainer>
        <Separator />

        <SectionContainer className="px-2">
          <SectionContent className="w-4/5">
            <SectionParagraph>Terms of Service</SectionParagraph>
          </SectionContent>

          <Checkbox
            className="data-[state=checked]:bg-green-forest  data-[state=checked]:text-white self-end"
            defaultChecked
          />
        </SectionContainer>
        <Separator />

        <SectionContainer className="px-2 flex-col space-y-2">
          <SectionParagraph className="font-bold">
            Payment method
          </SectionParagraph>

          <Button
            variant="outline"
            type="button"
            className="w-full h-12 flex justify-between text-black"
          >
            <span>CASH</span>
            <Image
              alt="CASH"
              src="/svg/hand-cash.svg"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full h-12 flex justify-between text-black"
          >
            <span>POS</span>
            <Image
              alt="POS"
              className="h-8 w-8"
              src="/svg/pos.svg"
              width={32}
              height={32}
            />
          </Button>

          <Button
            variant="outline"
            type="button"
            className="w-full h-12 flex justify-between text-black"
          >
            <span>BANK TRANSFER</span>
            <Image
              alt="BANK TRANSFER"
              src="/svg/bank-transfer.svg"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </Button>
        </SectionContainer>
        <Separator />
        <section className="px-2">
          <Button
            type="button"
            className="w-full bg-green-forest font-bold"
            onClick={() => toast.success("Successfully reserved")}
          >
            RESERVE
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}

export { CheckOut };
