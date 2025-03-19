import { SelectItem } from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";

async function RoomTypeList() {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_distinct_rooms");

  if (error) {
    return null;
  }

  if (!data || data.length === 0) {
    return (
      <SelectItem disabled value="none">
        No room types available
      </SelectItem>
    );
  }

  return (
    <>
      {data.map(({ room_type }) => (
        <SelectItem key={room_type} value={room_type}>
          {room_type}
        </SelectItem>
      ))}
    </>
  );
}

export { RoomTypeList };
