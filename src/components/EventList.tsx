import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });
  return data.map((event, i) => (
          <div
            key={event.id}
            className={`p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 ${
              i % 2 === 0 ? "border-t-lamaSky" : "border-t-lamaYellow"
            } border-t-[4px]`}
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-[15px] font-semibold text-gray-700">
                {event.title}
              </h3>
              <span className="text-[12px] text-gray-400">{event.startTime.toLocaleTimeString("en-GB",{
                timeZone: "Europe/Chisinau",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}</span>
            </div>
            <p className="text-[13px] text-gray-500">{event.description}</p>
          </div>
        ));
};

export default EventList