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
import { ActionLabel, ActionTrigger } from "@/components/button";
import { bedType, roomStatus, roomType } from "@/types/global-type";
import { keyExtractor } from "@/utils/key-extractor";
import { useCreateRoom } from "../hooks/use-create-room";
import { Uploader } from "./uploader";

function CreateRoomForm() {
  const { onSubmit, isLoading } = useCreateRoom();
  const form = useForm<RoomSchemaType>({
    mode: "all",
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: "",
      number: "",
      price: "",
      description: "",
      bedType: "water_bed",
      roomStatus: "commissioned",
      roomSize: "",
      bedsCount: "1",
      maxOccupancy: "1",
      roomType: "single",
      features: "",
    },
  });

  const bedsCount = form.watch("bedsCount");
  const maxOccupancy = form.watch("maxOccupancy");

  const onSubmitWrapper = async (data: RoomSchemaType) => {
    onSubmit(data, form);
  };

  return (
    <Form {...form}>
      <form
        encType="multipart/form-data"
        onSubmit={form.handleSubmit(onSubmitWrapper)}
        className="flex-1 flex flex-col min-w-64 gap-4"
      >
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-[47%] space-y-1">
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
            name="roomType"
            render={({ field }) => (
              <FormItem className="w-1/4 space-y-1">
                <FormLabel className="text-small text-neutral-600">
                  type
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
                    {roomType.map((type, index) => (
                      <SelectItem key={keyExtractor(type, index)} value={type}>
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
            name="number"
            render={({ field }) => (
              <FormItem className="w-[18%] space-y-1">
                <FormLabel className="text-small text-neutral-600">
                  #No
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
            name="maxOccupancy"
            label="Guests"
            value={Number(maxOccupancy)}
            onIncrement={() =>
              form.setValue(
                "maxOccupancy",
                (() => {
                  const computeValue = Number(maxOccupancy) + 1;
                  return String(computeValue);
                })()
              )
            }
            onDecrement={() =>
              form.setValue(
                "maxOccupancy",
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
            name="bedsCount"
            label="Beds"
            form={form}
            value={Number(bedsCount)}
            onIncrement={() =>
              form.setValue(
                "bedsCount",
                (() => {
                  const computeValue = Number(bedsCount) + 1;
                  return String(computeValue);
                })()
              )
            }
            onDecrement={() =>
              form.setValue(
                "bedsCount",
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
            name="bedType"
            render={({ field }) => (
              <FormItem className="w-[36%] space-y-1">
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
                    {bedType.map((type, index) => (
                      <SelectItem key={keyExtractor(type, index)} value={type}>
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
            name="roomSize"
            render={({ field }) => (
              <FormItem className="w-[25%] space-y-1">
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
            name="roomStatus"
            render={({ field }) => (
              <FormItem className="w-[40%] space-y-1">
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
                    {roomStatus.map((status, index) => (
                      <SelectItem
                        key={keyExtractor(status, index)}
                        value={status}
                      >
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

        <Uploader form={form} />
        <ActionTrigger
          disabled={isLoading || !form.formState.isValid}
          type="submit"
          isProcessing={isLoading}
        >
          <ActionLabel>Create Room</ActionLabel>
        </ActionTrigger>
      </form>
    </Form>
  );
}

export { CreateRoomForm };
