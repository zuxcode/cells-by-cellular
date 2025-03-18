import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormProps } from "../types/type";
import { createClient } from "@/utils/supabase/client";
import React from "react";

function RoomTypeList() {
  const [roomTypes, setRoomTypes] = React.useState([]);

  const getRoomTypes = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("hotel_rooms")
      .select("room_type", { distinct: true });

    if (error || !data) return;

    setRoomTypes(data);
  };

  React.useEffect(() => {
    getRoomTypes();
  }, [roomTypes, setRoomTypes]);

  return (
    <>
      {roomTypes.map(({ room_type }) => (
        <SelectItem key={room_type} value={room_type}>
          {room_type}
        </SelectItem>
      ))}
    </>
  );
}

const MemoizedRoomTypeList = React.memo(RoomTypeList);

function RoomType(form: FormProps) {
  return (
    <FormField
      control={form.control}
      name="roomType"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-small text-neutral-600 font-semibold">
            Choose Room
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <MemoizedRoomTypeList />
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { RoomType };
