import { MemoizedRoomCard } from "@/features/rooms";

function RoomsPage() {
  return (
    <div className="p-0">
      <MemoizedRoomCard roomsFromServerComponent={[]} />
    </div>
  );
}

export default RoomsPage;
