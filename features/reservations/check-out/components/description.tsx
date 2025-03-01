"use client";

import { format } from "date-fns";
import {
  SectionContainer,
  SectionContent,
  SectionParagraph,
} from "../blocks/block";
import { FormProps } from "../../room-information/types/type";

function Description(form: FormProps) {
  const { from, to } = form.getValues("checkInOutDate");

  const price = 120000; // @todo: should be dynamic
  const numberOfItemsInCart = 2; // @todo: should be dynamic

  const delta = [
    {
      title: form.getValues("roomType"),
      body: `${new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(price)} x ${numberOfItemsInCart}`,
    },
    {
      title: "Check-In",
      body: format(form.getValues("checkInOutDate").from, "haaa, EEE, MMM dd"),
    },
    {
      title: "Check-Out",
      body: format(form.getValues("checkInOutDate").to, "h:mmaaa, EEE, MMM dd"),
    },
    {
      title: "Room No.",
      body: "#125", // @todo: should be dynamic
    },
  ];

  return (
    <section className="space-y-1 px-2">
      {delta.map(({ title, body }) => (
        <SectionContainer key={title}>
          <SectionContent className="w-[40%]">
            <SectionParagraph>{title}</SectionParagraph>
          </SectionContent>

          <SectionContent className="w-3/5">
            <SectionParagraph className="text-right font-semibold">
              {body}
            </SectionParagraph>
          </SectionContent>
        </SectionContainer>
      ))}
    </section>
  );
}

export { Description };
