import Pagination from "@/components/Pagination";
import FormModal from "@/components/FormModal";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { role } from "@/lib/utils";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
];

const renderRow = (item: TeacherList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.subjects.map(subject=>subject.name).join(",")}</td>
      <td className="hidden md:table-cell">{item.classes.map(classItem=>classItem.name).join(",")}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#D0F0FD] hover:bg-[#B2E8FB] shadow-sm  transition">
              <Image src="/view.png" alt="" width={17} height={17} />
            </button>
          </Link>
          {role === "admin" && (
            //<button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple hover:brightness-110 transition">
              //<Image src="/delete.png" alt="" width={16} height={16} />
            //</button>
            <FormModal table="teacher" type="delete" id={item.id}/>
          )}
        </div>
      </td>
    </tr>
  );

const TeacherListPage = async ({
  searchParams,
}:{
  searchParams:{[key:string]:string | undefined};
}) => {
  
  const {page, ...queryParams} = searchParams;

  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITION

  const query: Prisma.TeacherWhereInput = {};

if (queryParams) {
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
        case "classId":
          query.lessons = {
            some: {
              classId: parseInt(value),
            },
          };
          break;
          case "search":
            query.name = {contains:value, mode:"insensitive"}
            break;
            default:
            break;
      }
    }
  }
}

  const [data, count] = await prisma.$transaction([
  prisma.teacher.findMany({
    where: query,
    include: {
      subjects: true,
      classes: true,
    },
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (p - 1),
  }),
  prisma.teacher.count({where:query}),
]);


  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-200 flex-1 mx-4 mt-0">
      {/* TOP */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
          All Teachers
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-3 self-end">
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#D0F0FD] hover:bg-[#B2E8FB] transition shadow-sm">
              <Image src="/filter.png" alt="" width={16} height={16} />
            </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#D0F0FD] hover:bg-[#B2E8FB] transition shadow-sm">
              <Image src="/sort.png" alt="" width={16} height={16} />
            </button>
            {role === "admin" && (
              //<button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FFF4D1] hover:bg-yellow-200 transition shadow-sm">
                //<Image src="/plus.png" alt="" width={14} height={14} />
              //</button>
              <FormModal table="teacher" type="create"/>
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="mt-6 overflow-x-auto">
        <Table columns={columns} renderRow={renderRow} data={data} />
      </div>

      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  );
};

export default TeacherListPage;
