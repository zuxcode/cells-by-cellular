import { CardFooter } from "@/components/ui/card";

function RoomInfoFooter() {
  return (
    <div className="space-y-1">
      <p className="text-small text-neutral-600 font-semibold">Notes</p>
      <CardFooter className="p-4 bg-canvas-cool shadow-md">
        <span>
          We will be needing logistics from the airport, Kindly call this
          contact 081xxxxxxxx for the pickup time
        </span>
      </CardFooter>
    </div>
  );
}

export { RoomInfoFooter };
