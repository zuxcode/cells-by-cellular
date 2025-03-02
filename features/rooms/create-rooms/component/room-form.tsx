"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { BedDouble, Users } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roomSchema, RoomSchemaType } from "../schema/create-room-schema";
import { RoomCounter } from "./room-counter";
import { bedType, roomStatus } from "../../type";
import { ActionLabel, ActionTrigger } from "@/components/button";

function CreateRoomForm() {
  const form = useForm<RoomSchemaType>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: "",
      number: "",
      price: "",
      description: "",
      beds_name: "single",
      room_status: "available",
      room_size: "",
      beds_count: "1",
      max_occupancy: "1",
      room_type: "single",
      features: "",
    },
  });

  const bedsCount = form.watch("beds_count");
  const maxOccupancy = form.watch("max_occupancy");

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 flex flex-col min-w-64 gap-4"
      >
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-[65%] space-y-1">
                <FormLabel className="text-small text-neutral-600">
                  Room Name
                </FormLabel>
                <FormControl>
                  <Input
                    aria-label="Room Name"
                    placeholder="Deluxe Suite"
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
            name="number"
            render={({ field }) => (
              <FormItem className="w-[35%] space-y-1">
                <FormLabel className="text-small text-neutral-600">
                  Room Number
                </FormLabel>
                <FormControl>
                  <Input
                    aria-label="Room Number"
                    placeholder="101"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <RoomCounter
            name="max_occupancy"
            label="Guests"
            value={Number(maxOccupancy)}
            onIncrement={() =>
              form.setValue(
                "max_occupancy",
                (() => {
                  const computeValue = Number(maxOccupancy) + 1;
                  return String(computeValue);
                })()
              )
            }
            onDecrement={() =>
              form.setValue(
                "max_occupancy",
                (() => {
                  const computeValue = Number(maxOccupancy) - 1;
                  return String(computeValue);
                })()
              )
            }
            icon={Users}
            form={form}
          />

          <RoomCounter
            name="beds_count"
            label="Beds"
            form={form}
            value={Number(bedsCount)}
            onIncrement={() =>
              form.setValue(
                "beds_count",
                (() => {
                  const computeValue = Number(bedsCount) + 1;
                  return String(computeValue);
                })()
              )
            }
            onDecrement={() =>
              form.setValue(
                "beds_count",
                (() => {
                  const computeValue = Number(bedsCount) - 1;
                  return String(computeValue);
                })()
              )
            }
            icon={BedDouble}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel className="flex items-center text-small gap-2 text-neutral-600 space-x-1">
                  <Image
                    alt="tag"
                    src="/svg/price-tag.svg"
                    className="h-5 w-5"
                    width={20}
                    height={20}
                  />
                  Room Price/Night
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="0.00"
                    disabled={form.formState.isSubmitting}
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="beds_name"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel className="flex items-center text-small gap-2 text-neutral-600 space-x-1">
                  <Image
                    alt="bed name"
                    src="/svg/bed.svg"
                    className="h-5 w-5"
                    width={20}
                    height={20}
                  />
                  Bed Name
                </FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bedType.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="room_size"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel className="flex items-center text-small gap-2 text-neutral-600 space-x-1">
                  <Image
                    alt="room size"
                    src="/svg/chair.svg"
                    className="h-5 w-5"
                    width={20}
                    height={20}
                  />
                  Size/M
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="44"
                    disabled={form.formState.isSubmitting}
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="room_status"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
               <FormLabel className="flex items-center text-small gap-2 text-neutral-600 space-x-1">
                  <Image
                    alt="room size"
                    src="/svg/status-info.svg"
                    className="h-5 w-5"
                    width={20}
                    height={20}
                  />
                  Condition
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roomStatus.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel className="flex items-center text-small gap-2 text-neutral-600 space-x-1">
                  <Image
                    alt="room size"
                    src="/svg/chair.svg"
                    className="h-5 w-5"
                    width={20}
                    height={20}
                  />
                Room Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the room features and amenities... "
                  disabled={form.formState.isSubmitting}
                  className="max-h-[70px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
               <FormLabel className="flex items-center text-small gap-2 text-neutral-600 space-x-1">
                  <Image
                    alt="room size"
                    src="/svg/star.svg"
                    className="h-5 w-5"
                    width={20}
                    height={20}
                  />
                Room Features
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the room features and amenities... "
                  disabled={form.formState.isSubmitting}
                  className="max-h-[70px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <RoomImageUpload /> */}
        <ActionTrigger>
          <ActionLabel>Create Room</ActionLabel>
        </ActionTrigger>
      </form>
    </Form>
  );
}

export { CreateRoomForm };
