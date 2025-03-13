import { MemoizedRoomCard } from "@/features/rooms";
import { getRoomsRsc } from "@/features/rooms/server/get-rooms-rsc";

async function RoomsPage() {
  const data = await getRoomsRsc();
  // const { data, error } = await supabase.from("hotel_rooms").select("*").limit(10);

  // if (error ) {
  //   <div className="p-0">
  //   <MemoizedRoomCard roomsFromServerComponent={[]} />
  // </div>
  // }

  return (
    <div className="p-0">
      <MemoizedRoomCard roomsFromServerComponent={data} />
    </div>
  );
  return (
    <div className="p-0">
      <MemoizedRoomCard roomsFromServerComponent={[]} />
    </div>
  );
}

export default RoomsPage;
