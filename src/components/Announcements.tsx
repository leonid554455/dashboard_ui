import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  const { userId, sessionClaims } = await auth(); // async!
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  return (
    <div className="bg-white rounded-xl w-full max-w-[480px] p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-lg font-semibold text-gray-800">Announcements</h1>
        <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          View All
        </button>
      </div>

      {/* ANNOUNCEMENTS LIST */}
      <div className="flex flex-col gap-3">
        {data.map((announcement, i) => {
          // Выбираем цвет фона по индексу
          const bgColor =
            i === 0
              ? "bg-lamaSkyLight"
              : i === 1
              ? "bg-lamaPurpleLight"
              : "bg-lamaYellowLight";

          return (
            <div
              key={announcement.id}
              className={`rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer ${bgColor}`}
            >
              <div className="flex justify-between items-center mb-1">
                <h2 className="font-medium text-gray-700 text-sm">{announcement.title}</h2>
                <span className="text-[10px] text-gray-400 bg-white rounded-md px-2 py-0.5 select-none">
                  {new Intl.DateTimeFormat("en-GB").format(announcement.date)}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-snug">{announcement.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
