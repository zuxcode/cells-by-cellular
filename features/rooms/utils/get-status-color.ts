import { RoomStatus } from "@/types/global-type";

const getStatusColor = (status: RoomStatus) => {
  switch (status) {
    case "commissioned":
      return "bg-[#F1FFF6] text-[#03432F]";
    case "not_commissioned":
      return "bg-red-100 text-red-600";
    default:
      return "bg-[#F1FFF6] text-[#03432F]";
  }
};

export { getStatusColor };
