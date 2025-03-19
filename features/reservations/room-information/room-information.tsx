import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

import {
  GuestCounterProvider,
  GuestCounterControls,
  GuestCounterLabel,
} from "./ui/guest-counter";

import { CheckInOutField } from "./ui/check-in-out-field";
import { RoomInfoDescription } from "./ui/room-info-description";
import { RoomType } from "./ui/room-type";
import { RoomInfoFooter } from "./ui/room-info-footer";
import { RoomTypeList } from "./ui/room-type-list";

function RoomDetailsCard() {
  return (
    <Card className="shadow-md">
      <CardHeader className="p-4">
        <CardTitle className="text-[1.2rem] font-medium text-green-forest">
          Room Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <RoomType>
              <RoomTypeList />
            </RoomType>
          </div>

          <div className="flex justify-between">
            <CheckInOutField />
            <div className="w-1/4">
              <GuestCounterProvider>
                <GuestCounterLabel icon={Users}>Guests</GuestCounterLabel>
                <GuestCounterControls name="maxOccupancy" />
              </GuestCounterProvider>
            </div>
          </div>
        </div>

        <RoomInfoDescription />

        <RoomInfoFooter />
      </CardContent>
    </Card>
  );
}
export { RoomDetailsCard };
