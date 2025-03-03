import { cn } from "@/lib/utils";
import { RoomStatus } from "../../stores";

// Room Specifications Component
const RoomSpecifications = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4 text-sm text-gray-600">
    {children}
  </div>
);

// Room Specification Item Component
type RoomSpecificationItemProps = {
  icon: React.ElementType;
  label: string;
  value: string | number;
};

const RoomSpecificationItem = ({
  icon: Icon,
  label,
  value,
}: RoomSpecificationItemProps) => (
  <span className="flex items-center gap-1" aria-label={label}>
    <Icon className="w-4 h-4" />
    {value}
  </span>
);

// Room Status Badge Component
const RoomStatusBadge = ({ status }: { status: RoomStatus }) => (
  <span
    className={cn(
      "text-sm px-2 py-1 rounded-md inline-block",
      status === "Not-commissioned"
        ? "bg-red-100 text-red-600"
        : "bg-[#F1FFF6] text-[#03432F]"
    )}
  >
    {status}
  </span>
);

// Room Price Component
const RoomPrice = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => (
  <p className={cn("text-lg font-bold text-gray-800", className)}>{value}</p>
);

export {
  RoomPrice,
  RoomStatusBadge,
  RoomSpecificationItem,
  RoomSpecifications,
};
