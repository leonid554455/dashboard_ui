import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";

const SingleTeacherPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/* LEFT SIDE */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* PROFILE CARD */}
          <div className="bg-lamaSky p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex items-center gap-6 relative overflow-hidden max-w-[525px] w-full mx-auto">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full z-0" />
            <div className="relative z-10">
              <Image
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Teacher"
                width={160}
                height={160}
                className="w-40 h-40 rounded-full object-cover shadow-md border-4 border-white"
              />
            </div>
            <div className="flex-1 flex flex-col justify-start gap-2 z-10">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-gray-800">Leonard Snyder</h1>
                <FormModal
                  table="teacher"
                  type="update"
                  data={{
                    id: 1,
                    username: "deanguerrero",
                    email: "deanguerrero@gmail.com",
                    password: "password",
                    firstName: "Dean",
                    lastName: "Guerrero",
                    phone: "+1 234 555 99",
                    address: "1222 Main St, Anytown, USA",
                    bloodType: "A+",
                    dateOfBirth: "2000-01-01",
                    sex: "male",
                    img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                  }}
                />
              </div>
              <p className="text-sm text-gray-700 leading-snug">
                Passionate educator with over 10 years of experience in modern teaching.
              </p>
              <div className="grid grid-cols-2 gap-y-2 mt-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Image src="/blood.png" alt="Blood Type" width={16} height={16} />
                  <span>A+</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/date.png" alt="Date" width={16} height={16} />
                  <span>January 2025</span>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer group"
                  title="user@gmail.com"
                  onClick={() => navigator.clipboard.writeText("user@gmail.com")}
                >
                  <Image src="/mail.png" alt="Email" width={16} height={16} />
                  <span className="truncate max-w-[120px] group-hover:underline">
                    user@gmail.com
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer group"
                  title="+1 234 567"
                  onClick={() => navigator.clipboard.writeText("+1 234 567")}
                >
                  <Image src="/phone.png" alt="Phone" width={16} height={16} />
                  <span className="truncate max-w-[100px] group-hover:underline">
                    +1 234 567
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[
              { icon: "/singleAttendance.png", label: "Attendance", value: "90%" },
              { icon: "/singleBranch.png", label: "Branches", value: "2" },
              { icon: "/singleLesson.png", label: "Lessons", value: "6" },
              { icon: "/singleClass.png", label: "Classes", value: "6" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition duration-300"
              >
                <Image src={item.icon} alt={item.label} width={24} height={24} />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.value}</h2>
                  <p className="text-sm text-gray-500">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CALENDAR */}
        <div className="bg-white rounded-2xl p-6 shadow-sm h-[1150px] mt-2">
          <h2 className="text-[22px] font-semibold text-gray-800 mb-4 pl-4">Teacher's Schedule</h2>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* SHORTCUTS (updated design) */}
        <div className="bg-white p-6 rounded-2xl hover:shadow-md transition duration-300">
          <h2 className="text-gray-900 font-semibold mb-6 text-xl">Shortcuts</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <Link
              className="bg-lamaSkyLight hover:bg-blue-200 px-5 py-3 rounded-lg shadow-sm text-gray-800 font-medium transition transform hover:scale-105 hover:shadow-lg flex items-center justify-center w-full sm:w-auto text-center"
              href={`/list/classes?supervisorId=${"teacher2"}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="bg-lamaPurpleLight hover:bg-purple-200 px-5 py-3 rounded-lg shadow-sm text-gray-800 font-medium transition transform hover:scale-105 hover:shadow-lg flex items-center justify-center w-full sm:w-auto text-center"
              href={`/list/students?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="bg-lamaYellowLight hover:bg-yellow-200 px-5 py-3 rounded-lg shadow-sm text-gray-800 font-medium transition transform hover:scale-105 hover:shadow-lg flex items-center justify-center w-full sm:w-auto text-center"
              href={`/list/lessons?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="bg-pink-50 hover:bg-pink-100 px-5 py-3 rounded-lg shadow-sm text-gray-800 font-medium transition transform hover:scale-105 hover:shadow-lg flex items-center justify-center w-full sm:w-auto text-center"
              href={`/list/exams?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="bg-lamaSkyLight hover:bg-blue-200 px-5 py-3 rounded-lg shadow-sm text-gray-800 font-medium transition transform hover:scale-105 hover:shadow-lg flex items-center justify-center w-full sm:w-auto text-center"
              href={`/list/assignments?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>

        {/* PERFORMANCE */}
        <div className="bg-white rounded-2xl px-4 py-3 hover:shadow-md transition duration-300">
          <Performance />
        </div>

        {/* ANNOUNCEMENTS */}
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
