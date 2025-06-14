import prisma from "@/lib/prisma";
import Image from "next/image";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const data = await modelMap[type].count();

  return (
    <div className="rounded-2xl odd:bg-lamaSky even:bg-lamaYellow p-6 flex-1 min-w-[160px] shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[11px] bg-white px-3 py-1 rounded-full text-emerald-600 font-semibold shadow-sm">
          2024 / 25
        </span>
        <Image
          src="/more1.png"
          alt="More"
          width={24}
          height={24}
          className="opacity-70 hover:opacity-100 transition-opacity duration-200"
        />
      </div>

      <h1 className="text-[24px] font-bold text-gray-700 drop-shadow-sm mb-1">
        {data}
      </h1>
      <h2 className="capitalize text-sm font-medium text-gray-600">
        {type}s
      </h2>
    </div>
  );
};

export default UserCard;