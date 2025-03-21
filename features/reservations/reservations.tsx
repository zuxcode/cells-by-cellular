import { ReservationFormProvider } from "./components";
import { ContactFrom } from "./contact-form";
import { RoomDetailsCard } from "./room-information";
import { CheckOut } from "./check-out";

function Reservations() {
  return (
    <ReservationFormProvider>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-[55%]">
          <RoomDetailsCard />
        </div>

        <div className="w-full md:w-[45%]">
          <ContactFrom />
        </div>

        <div className="w-full md:w-[35%] md:sticky md:top-4">
          <CheckOut />
        </div>
      </div>
    </ReservationFormProvider>
  );
}

export { Reservations };
