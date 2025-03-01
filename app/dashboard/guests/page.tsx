import { Card, CardContent } from "@/components/ui/card";
import { tableColumns, ColumnsSchemaType } from "@/features/guest";
import { GuestDataTable } from "@/features/guest/table-data";

const guest: ColumnsSchemaType[] = [
  {
    guest: { name: "John Doe", id: "GUEST95203" },
    room: "Room226",
    request: "Late check-out",
    duration: "3 nights",
    roomType: "Standard",
    check: {
      in: "2024-12-06T13:00:00Z",
      out: "2024-12-09T11:00:00Z",
    },
    status: "pending",
    actions: "View details",
  },
  {
    guest: { name: "Jane Smith", id: "GUEST89712" },
    room: "Room129",
    request: "Extra pillows",
    duration: "2 nights",
    roomType: "Deluxe",
    check: {
      in: "2024-12-02T14:00:00Z",
      out: "2024-12-04T12:00:00Z",
    },
    status: "confirmed",
    actions: "View details",
  },
  {
    guest: { name: "Bob Brown", id: "GUEST35673" },
    room: "Room307",
    request: "King-sized bed",
    duration: "1 night",
    roomType: "Suite",
    check: {
      in: "2024-12-07T15:00:00Z",
      out: "2024-12-08T11:00:00Z",
    },
    status: "rejected",
    actions: "View details",
  },
  {
    guest: { name: "Alice Johnson", id: "GUEST12094" },
    room: "Room217",
    request: "Accessible room",
    duration: "3 nights",
    roomType: "Standard",
    check: {
      in: "2024-12-04T12:00:00Z",
      out: "2024-12-07T11:00:00Z",
    },
    status: "processing",
    actions: "View details",
  },
  {
    guest: { name: "Charlie Davis", id: "GUEST74685" },
    room: "Room305",
    request: "Vegetarian meal",
    duration: "4 nights",
    roomType: "Deluxe",
    check: {
      in: "2024-12-09T13:00:00Z",
      out: "2024-12-13T11:00:00Z",
    },
    status: "confirmed",
    actions: "View details",
  },
  {
    guest: { name: "John Doe", id: "GUEST60251" },
    room: "Room102",
    request: "Extra pillows",
    duration: "2 nights",
    roomType: "Deluxe",
    check: {
      in: "2024-12-08T14:00:00Z",
      out: "2024-12-10T12:00:00Z",
    },
    status: "rejected",
    actions: "View details",
  },
  {
    guest: { name: "Jane Smith", id: "GUEST31786" },
    room: "Room408",
    request: "Late check-out",
    duration: "3 nights",
    roomType: "Suite",
    check: {
      in: "2024-12-01T15:00:00Z",
      out: "2024-12-04T11:00:00Z",
    },
    status: "pending",
    actions: "View details",
  },
  {
    guest: { name: "Bob Brown", id: "GUEST23849" },
    room: "Room113",
    request: "King-sized bed",
    duration: "2 nights",
    roomType: "Standard",
    check: {
      in: "2024-12-03T12:00:00Z",
      out: "2024-12-05T11:00:00Z",
    },
    status: "confirmed",
    actions: "View details",
  },
  {
    guest: { name: "Charlie Davis", id: "GUEST78901" },
    room: "Room415",
    request: "Vegetarian meal",
    duration: "4 nights",
    roomType: "Deluxe",
    check: {
      in: "2024-12-06T14:00:00Z",
      out: "2024-12-10T12:00:00Z",
    },
    status: "processing",
    actions: "View details",
  },
  {
    guest: { name: "Alice Johnson", id: "GUEST11223" },
    room: "Room323",
    request: "Extra pillows",
    duration: "2 nights",
    roomType: "Suite",
    check: {
      in: "2024-12-09T15:00:00Z",
      out: "2024-12-11T11:00:00Z",
    },
    status: "pending",
    actions: "View details",
  },
  {
    guest: { name: "John Doe", id: "GUEST31597" },
    room: "Room207",
    request: "King-sized bed",
    duration: "2 nights",
    roomType: "Standard",
    check: {
      in: "2024-12-10T16:00:00Z",
      out: "2024-12-12T11:00:00Z",
    },
    status: "confirmed",
    actions: "View details",
  },
  {
    guest: { name: "Jane Smith", id: "GUEST47865" },
    room: "Room405",
    request: "Accessible room",
    duration: "1 night",
    roomType: "Deluxe",
    check: {
      in: "2024-12-02T14:00:00Z",
      out: "2024-12-03T12:00:00Z",
    },
    status: "rejected",
    actions: "View details",
  },
  {
    guest: { name: "Bob Brown", id: "GUEST34902" },
    room: "Room503",
    request: "Late check-out",
    duration: "3 nights",
    roomType: "Suite",
    check: {
      in: "2024-12-04T15:00:00Z",
      out: "2024-12-07T12:00:00Z",
    },
    status: "pending",
    actions: "View details",
  },
  {
    guest: { name: "Alice Johnson", id: "GUEST56019" },
    room: "Room102",
    request: "Extra pillows",
    duration: "2 nights",
    roomType: "Deluxe",
    check: {
      in: "2024-12-11T15:00:00Z",
      out: "2024-12-13T11:00:00Z",
    },
    status: "confirmed",
    actions: "View details",
  },
  {
    guest: { name: "Charlie Davis", id: "GUEST94657" },
    room: "Room130",
    request: "King-sized bed",
    duration: "4 nights",
    roomType: "Standard",
    check: {
      in: "2024-12-05T16:00:00Z",
      out: "2024-12-09T11:00:00Z",
    },
    status: "processing",
    actions: "View details",
  },
];

export default function Page() {
  return (
    <Card>
      <CardContent>
        <GuestDataTable columns={tableColumns} data={guest} />
      </CardContent>
    </Card>
  );
}
