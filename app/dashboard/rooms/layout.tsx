import { Card, CardContent } from "@/components/ui/card";
import { RoomHeader } from "@/features/rooms";
import { CreateRoomCard } from "@/features/rooms/create-rooms";
import { SelectedRoom } from "@/features/rooms/selected-room";

function RoomsLayout({ children }: React.PropsWithChildren) {
  return (
    <section className="w-full pl-4 md:pl-11 pr-4 pt-4 flex flex-col gap-4 bg-canvas-cool">
      <RoomHeader />
      <Card className="shadow-none bg-inherit md:bg-white border-0 md:border-1 mb-6">
        <CardContent className="grid md:grid-cols-[2fr_1.3fr] p-4 gap-4">
          <div className="overflow-y-auto w-full md:h-[calc(100vh_-_160px)]">
            {children}
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh_-_160px)]">
            <SelectedRoom />
            <CreateRoomCard />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default RoomsLayout;
