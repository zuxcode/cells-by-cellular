import { Card, CardContent } from "@/components/ui/card";
import { ReservationHeader } from "@/features/reservations";
import React from "react";

function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full h-full pl-4 md:pl-11 pr-4 pt-4 flex flex-col gap-4 bg-canvas-cool">
      <ReservationHeader />
      <Card className="shadow-none bg-inherit md:bg-white border-0 md:border-1 mb-6">
        <CardContent className="flex flex-col md:flex-row p-4 gap-4">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}

export default Layout;
