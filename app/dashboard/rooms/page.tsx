import { MemoizedRoomCard } from "@/features/rooms";
import { getRoomsRsc } from "@/features/rooms/server/get-rooms-rsc";

async function RoomsPage() {
  const data = await getRoomsRsc();
  console.log("<<<<", data)
  return (
    <div className="p-0">
      <MemoizedRoomCard roomsFromServerComponent={data} />
    </div>
  );

}

export default RoomsPage;
