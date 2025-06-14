"use client";

import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";

const SingleStudentPage = () => {
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
                src="https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Student"
                width={160}
                height={160}
                className="w-40 h-40 rounded-full object-cover shadow-md border-4 border-white"
              />
            </div>
            <div className="flex-1 flex flex-col justify-start gap-2 z-10">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-gray-800">Cameron Moran</h1>
                <FormModal
                  table="student"
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
                Enthusiastic student passionate about learning and creativity.
              </p>
              <div className="grid grid-cols-2 gap-y-2 mt-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Image src="/blood.png" alt="Blood Type" width={16} height={16} />
                  <span>A+</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/date.png" alt="Enrollment" width={16} height={16} />
                  <span>January 2025</span>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer group"
                  title="student@email.com"
                  onClick={() => navigator.clipboard.writeText("student@email.com")}
                >
                  <Image src="/mail.png" alt="Email" width={16} height={16} />
                  <span className="truncate max-w-[120px] group-hover:underline">
                    student@email.com
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer group"
                  title="+1 987 654"
                  onClick={() => navigator.clipboard.writeText("+1 987 654")}
                >
                  <Image src="/phone.png" alt="Phone" width={16} height={16} />
                  <span className="truncate max-w-[100px] group-hover:underline">
                    +1 987 654
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[
              { icon: "/singleAttendance.png", label: "Attendance", value: "90%" },
              { icon: "/singleBranch.png", label: "Grade", value: "6th" },
              { icon: "/singleLesson.png", label: "Lessons", value: "18" },
              { icon: "/singleClass.png", label: "Class", value: "6A" },
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
          <h2 className="text-[22px] font-semibold text-gray-800 mb-4 pl-4">
            Student's Schedule
          </h2>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* SHORTCUTS - Elegant Redesign */}
        <div className="bg-white p-6 rounded-2xl hover:shadow-md transition duration-300">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Shortcuts</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-800">
            <Link
              className="h-20 w-full rounded-xl bg-lamaSkyLight flex items-center justify-center text-center font-medium hover:shadow hover:scale-[1.02] transition duration-200 ease-in-out"
              href={`/list/lessons?classId=${2}`}
            >
              Student&apos;s<br />Lessons
            </Link>
            <Link
              className="h-20 w-full rounded-xl bg-lamaPurpleLight flex items-center justify-center text-center font-medium hover:shadow hover:scale-[1.02] transition duration-200 ease-in-out"
              href={`/list/teachers?classId=${2}`}
            >
              Student&apos;s<br />Teachers
            </Link>
            <Link
              className="h-20 w-full rounded-xl bg-pink-50 flex items-center justify-center text-center font-medium hover:shadow hover:scale-[1.02] transition duration-200 ease-in-out"
              href={`/list/exams?classId=${2}`}
            >
              Student&apos;s<br />Exams
            </Link>
            <Link
              className="h-20 w-full rounded-xl bg-lamaSkyLight flex items-center justify-center text-center font-medium hover:shadow hover:scale-[1.02] transition duration-200 ease-in-out"
              href={`/list/assignments?classId=${2}`}
            >
              Student&apos;s<br />Assignments
            </Link>
            <Link
              className="h-20 w-full rounded-xl bg-lamaYellowLight flex items-center justify-center text-center font-medium hover:shadow hover:scale-[1.02] transition duration-200 ease-in-out"
              href={`/list/results?studentId=${"student2"}`}
            >
              Student&apos;s<br />Results
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

export default SingleStudentPage;