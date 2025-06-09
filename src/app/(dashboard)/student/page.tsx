import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";

const StudentPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h1
            className="text-xl font-semibold mb-4 pl-4 mt-2"
            style={{ fontFamily: '"Inter", sans-serif', fontWeight: 700 }}
          >
            Schedule (4A)
          </h1>
          <BigCalendar />
        </div>
      </div>
      
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
