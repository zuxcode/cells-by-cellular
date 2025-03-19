import { RoomDetailsCard } from "./room-information";
import { ContactDetails } from "./components/contact-details";
import { CheckOut } from "./check-out";

function Reservations() {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Room Details - 55% Width */}
      <div className="w-full md:w-[55%]">
        <RoomDetailsCard />
      </div>

      {/* Contact Details - 45% Width */}
      <div className="w-full md:w-[45%]">{/* <ContactDetails /> */}</div>

      {/* Checkout - 35% Width */}
      <div className="w-full md:w-[35%] md:sticky md:top-4">
        {/* <CheckOut /> */}
      </div>
    </div>
  );
}

export { Reservations };