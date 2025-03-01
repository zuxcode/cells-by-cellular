import { RoomCardList } from "@/features/rooms";

function RoomsPage() {
  return (
    <div className="p-1">
      <RoomCardList roomsFromServerComponent={[]} />
    </div>
  );
}

export default RoomsPage;
