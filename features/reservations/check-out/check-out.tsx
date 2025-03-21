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
import { useFormContext } from "react-hook-form";
import { useRoom } from "@/utils/store/room-store";
import { formatCurrency } from "@/utils/format-utils";
import { differenceInDays } from "date-fns";
import { PaymentMethodType } from "@/types/global-type";
import { useCheckout } from "../hooks/use-checkout";
import { ActionLabel, ActionTrigger } from "@/components/button";
import { ReservationSchemaType } from "../schema/reservation-schema";

function CheckOut() {
  const {
    watch,
    setValue,
    trigger,
    getValues,
    formState: { isValid: isFormValid,  errors},
  } = useFormContext<ReservationSchemaType>();
  const { isLoading } = useCheckout();

  console.log("errors ", errors);
  console.log("getValues " , getValues());
  


  // Watched form values
  const targetRoomId = watch("roomType");
  const checkInOutDate = watch("checkInOutDate");
  const termsAccepted = watch("termsAccepted");
  const paymentMethod = watch("paymentMethod");

  // Room data
  const room = useRoom(targetRoomId);
  const roomPrice = room?.price || 0;

  // Date validation
  const checkInDate = checkInOutDate?.from
    ? new Date(checkInOutDate.from)
    : null;
  const checkOutDate = checkInOutDate?.to ? new Date(checkInOutDate.to) : null;
  const isValidPeriod =
    checkInDate && checkOutDate && checkInDate < checkOutDate;

  // Calculate stay duration
  const numberOfNights =
    isValidPeriod && checkInDate && checkOutDate
      ? differenceInDays(checkOutDate, checkInDate)
      : 1;

  const totalAmount = roomPrice * numberOfNights;

  // Payment methods configuration
  const PAYMENT_METHODS: {
    id: PaymentMethodType;
    label: string;
    icon: string;
  }[] = [
    { id: "cash", label: "Cash", icon: "/svg/hand-cash.svg" },
    { id: "pos", label: "POS", icon: "/svg/pos.svg" },
    {
      id: "bank_transfer",
      label: "Bank Transfer",
      icon: "/svg/bank-transfer.svg",
    },
  ];

  const handlePaymentMethod = (
    props: ReservationSchemaType["paymentMethod"]
  ) => {
    setValue("paymentMethod", props);
    trigger("paymentMethod");
  };

  return (
    <Card className="shadow-md border-black bg-canvas-cool">
      <CardHeader className="pt-4 px-2 pb-0">
        <CardTitle className="text-green-forest font-extrabold text-sm">
          Checkout
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 pb-4 space-y-2">
        <Description />
        <Separator />

        {/* Total Section */}
        <SectionContainer className="px-2">
          <SectionContent className="w-1/5">
            <SectionParagraph className="font-extrabold">
              Total
            </SectionParagraph>
          </SectionContent>
          <SectionContent className="w-4/5">
            <SectionParagraph className="text-right font-extrabold">
              {isValidPeriod ? formatCurrency(totalAmount) : "Invalid dates"}
            </SectionParagraph>
          </SectionContent>
        </SectionContainer>
        <Separator />

        {/* Terms of Service */}
        <SectionContainer className="px-2">
          <SectionContent className="w-4/5">
            <SectionParagraph>Terms of Service</SectionParagraph>
          </SectionContent>
          <Checkbox
            checked={termsAccepted}
            onCheckedChange={(checked) =>
              setValue(
                "termsAccepted",
                typeof checked === "string" ? false : !!checked
              )
            }
            className="data-[state=checked]:bg-green-forest data-[state=checked]:text-white self-end"
            aria-label="Accept terms of service"
          />
        </SectionContainer>
        <Separator />

        {/* Payment Methods */}
        <SectionContainer className="px-2 flex-col space-y-2">
          <SectionParagraph className="font-bold">
            Payment method
          </SectionParagraph>

          {PAYMENT_METHODS.map((method) => (
            <Button
              key={method.id}
              variant="outline"
              type="button"
              onClick={handlePaymentMethod.bind(null, method.id)}
              className={`w-full h-12 flex justify-between text-black 
                ${paymentMethod === method.id ? "border-2 border-green-forest" : ""}`}
              aria-pressed={paymentMethod === method.id}
            >
              <span>{method.label}</span>
              <Image
                alt={method.label}
                src={method.icon}
                width={32}
                height={32}
                className="h-8 w-8"
                aria-hidden="true"
              />
            </Button>
          ))}
        </SectionContainer>
        <Separator />

        {/* Reservation Button */}
        <section className="px-2">
          <ActionTrigger
            type="submit"
            className="w-full"
            disabled={!isFormValid || isLoading}
            aria-disabled={!isFormValid || isLoading}
          >
            <ActionLabel>RESERVE</ActionLabel>
          </ActionTrigger>
        </section>
      </CardContent>
    </Card>
  );
}

export { CheckOut };
