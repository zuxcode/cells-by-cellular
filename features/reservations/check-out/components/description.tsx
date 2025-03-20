"use client";

import { format, differenceInDays, isValid } from "date-fns";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";
import {
  SectionContainer,
  SectionContent,
  SectionParagraph,
} from "../blocks/block";
import { useRoom } from "@/utils/store/room-store";

// Utility functions
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);

const formatDate = (date: Date) =>
  isValid(date) ? format(date, "haaa, EEE, MMM dd") : "Invalid date";

function BookingDetails() {
  const methods = useFormContext();
  const { getValues } = methods;

  // Form values
  const targetRoomId = getValues("roomType");
  const checkINOutDate = getValues("checkInOutDate");
  const checkInDate = new Date(checkINOutDate?.from || 0);
  const checkOutDate = new Date(checkINOutDate?.to || 0);

  console.log("checkINOutDate", checkINOutDate);

  // Room data
  const room = useRoom(targetRoomId);
  const roomPrice = room?.price || 0;
  const roomNumber = room?.number || "#N/A";

  // Date calculations
  const isValidPeriod = checkInDate < checkOutDate;
  const numberOfNights = isValidPeriod
    ? differenceInDays(checkOutDate, checkInDate)
    : 0;

  // Memoized details to prevent unnecessary recalculations
  const bookingDetails =
    useMemo(
    () => [
      {
        title: room?.name || "Not selected",
        value: `${formatCurrency(roomPrice)} × ${numberOfNights} nights`,
      },
      {
        title: "Check-In",
        value: formatDate(checkInDate),
      },
      {
        title: "Check-Out",
        value: formatDate(checkOutDate),
      },
      {
        title: "Room Number",
        value: roomNumber,
      },
    ],
    [room, roomPrice, numberOfNights, checkInDate, checkOutDate, roomNumber]
  );

  return (
    <section className="space-y-1 px-2">
      {bookingDetails.map(({ title, value }, index) => (
        <SectionContainer key={`${title}-${index}`}>
          <SectionContent className="w-[40%]">
            <SectionParagraph className="font-medium text-gray-600">
              {title}
            </SectionParagraph>
          </SectionContent>

          <SectionContent className="w-3/5">
            <SectionParagraph className="text-right font-semibold">
              {value}
            </SectionParagraph>
          </SectionContent>
        </SectionContainer>
      ))}
    </section>
  );
}

export { BookingDetails as Description };
