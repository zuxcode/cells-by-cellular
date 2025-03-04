import { RoomData } from "./room-store";

const IMG_URL = [
  "/images/intercontinental-lagos.jpg",
  "/images/swimming-pool.jpg",
  "/images/exterior.jpg",
  // "/images/intercontinental-lagos.jpg",
  // "/images/swimming-pool.jpg",
  // "/images/exterior.jpg",
];

const dummyRooms: RoomData[] = [
  {
    id: "1",
    imageUrl: IMG_URL,
    title: "Deluxe Ocean View Suite",
    status: "Commissioned",
    description:
      "A luxurious suite with breathtaking ocean views, perfect for a relaxing getaway.",
    price: "$350",
    maxGuests: 4,
    bedType: "king",
    roomSize: 45,
    totalRooms: 10,
    roomsOccupied: 3,
  },
  {
    id: "2",
    imageUrl: IMG_URL,
    title: "Standard Twin Room",
    status: "Commissioned",
    description:
      "A cozy twin room with modern amenities, ideal for short stays.",
    price: "$150",
    maxGuests: 2,
    bedType: "king",
    roomSize: 25,
    totalRooms: 15,
    roomsOccupied: 15,
  },
  {
    id: "3",
    imageUrl: IMG_URL,
    title: "Executive King Room",
    status: "Not-commissioned",
    description:
      "An elegant king room designed for business travelers, featuring a work desk and high-speed internet.",
    price: "$250",
    maxGuests: 2,
    bedType: "king",
    roomSize: 35,
    totalRooms: 8,
    roomsOccupied: 0,
  },
  {
    id: "4",
    imageUrl: IMG_URL,
    title: "Family Suite",
    status: "Commissioned",
    description:
      "A spacious suite with two bedrooms, perfect for families or groups. A luxurious suite with breathtaking ocean views, perfect for a relaxing getaway. A luxurious suite with breathtaking ocean views, perfect for a relaxing getaway. A luxurious suite with breathtaking ocean views, perfect for a relaxing getaway.",
    price: "$400",
    maxGuests: 6,
    bedType: "queen",
    roomSize: 60,
    totalRooms: 5,
    roomsOccupied: 2,
  },
  {
    id: "5",
    imageUrl: IMG_URL,
    title: "Luxury Penthouse",
    status: "Commissioned",
    description:
      "The ultimate luxury experience with a private terrace, jacuzzi, and panoramic city views.",
    price: "$800",
    maxGuests: 4,
    bedType: "king",
    roomSize: 100,
    totalRooms: 2,
    roomsOccupied: 1,
  },
];

export { dummyRooms };
