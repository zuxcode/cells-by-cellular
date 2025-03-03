import { Element } from "@/types/global-type";

const RoomListPageLayout = ({
  as: comp = "div",
  className,
  ...rest
}: Element<"div">) => (
  <div
    className="grid grid-cols-2 md:grid-cols-1  gap-4 h-full"
    role="list"aria-label="List of available rooms"
    {...rest}
  />
);

export { RoomListPageLayout };
