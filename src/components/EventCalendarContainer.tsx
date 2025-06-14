

import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { date } = searchParams;
  return (
    <div className="bg-white rounded-2xl w-full h-full p-6 shadow-sm hover:shadow-md transition-shadow duration-300 max-w-[440px]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-[18px] font-semibold text-gray-800">Calendar</h1>
        <Image
          src="/moreDark.png"
          alt="More options"
          width={24}
          height={24}
          className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
        />
      </div>

      {/* CALENDAR */}
      <div className="rounded-xl overflow-hidden border border-gray-200 mb-5"> 
  <EventCalendar  />
</div>

      {/* EVENTS */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[16px] font-semibold text-gray-800">Events</h2>
      </div>

      <div className="flex flex-col gap-4">
        <EventList dateParam={date}/>
      </div>
    </div>
  )
}

export default EventCalendarContainer