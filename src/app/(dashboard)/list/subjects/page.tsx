import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import FormModal from "@/components/FormModal";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, Subject, Teacher } from "@prisma/client";
import { role } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

type SubjectList = Subject & {teachers: Teacher[]};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
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

const renderRow = (item: SubjectList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition"
    >
      <td className="p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.teachers.map((teacher) => teacher.name).join(", ")}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
            <FormModal table="subject" type="update" data={item}/>
            <FormModal table="subject" type="delete" id={item.id}/>
            </>
          )}
        </div>
      </td>
    </tr>
  );

const SubjectListPage = async ({
  searchParams,
}:{
  searchParams:{[key:string]:string | undefined};
}) => {
  
  const {page, ...queryParams} = searchParams;

  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITION

  const query: Prisma.SubjectWhereInput = {};

if (queryParams) {
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
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
  prisma.subject.findMany({
    where: query,
    include: {
      teachers: true,
    },
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (p - 1),
  }),
  prisma.subject.count({where:query}),
]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-200 flex-1 mx-4 mt-0">
      {/* TOP */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
          All Subjects
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-3 self-end">
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#D0F0FD] hover:bg-[#B2E8FB] transition shadow-sm">
              <Image src="/filter.png" alt="Filter" width={16} height={16} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#D0F0FD] hover:bg-[#B2E8FB] transition shadow-sm">
              <Image src="/sort.png" alt="Sort" width={16} height={16} />
            </button>
            {role === "admin" && <FormModal table="subject" type="create"/>}
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="mt-6 overflow-x-auto">
        <Table columns={columns} renderRow={renderRow} data={data} />
      </div>

      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default SubjectListPage;
