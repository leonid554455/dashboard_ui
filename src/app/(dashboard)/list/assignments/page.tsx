import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import FormModal from "@/components/FormModal";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { currentUserId, role } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";


type AssignmentList = Assignment & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" || role === "teacher"
  ? [
      {
        header: "Actions",
        accessor: "action",
      },
    ]
  : []),
];

const renderRow = (item: AssignmentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition"
    >
      <td className="p-4">{item.lesson.subject.name}</td>
      <td>{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
      <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-GB").format(item.dueDate)}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" || role === "teacher" && (
  <>
    <FormModal table="assignment" type="update" data={item} />
    <FormModal table="assignment" type="delete" id={item.id} />
  </>
          )}
        </div>
      </td>
    </tr>
  );

const AssignmentListPage = async ({
  searchParams,
}:{
  searchParams:{[key:string]:string | undefined};
}) => {
  
  const {page, ...queryParams} = searchParams;

  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITION

  const query: Prisma.AssignmentWhereInput = {};

  query.lesson = {};

if (queryParams) {
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
          case "classId":
            query.lesson.classId = parseInt(value);
            break;
            case "teacherId":
            query.lesson.teacherId = value;
            break;
          case "search":
            query.lesson.subject = {
                name: { contains: value, mode: "insensitive"},
              };
            break;
            default:
            break;
      }
    }
  }
}

// ROLE CONDITIONS
switch (role) {
  case "admin":
    break;
  case "teacher":
    query.lesson.teacherId = currentUserId!
    break;
case "student":
  query.lesson.class={
    students: {
      some: {
        id: currentUserId!,
      },
    },
  };
  break;
  case "parent":
  query.lesson.class={
    students: {
      some: {
        parentId: currentUserId!,
      },
    },
  };
  break;
  default:
    break;
}

  const [data, count] = await prisma.$transaction([
  prisma.assignment.findMany({
    where: query,
    include: {
      lesson:{
        select:{
          subject: { select: {name: true } },
          teacher: { select: {name: true, surname: true } },
          class: { select: {name: true } },
        }
      }
    },
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (p - 1),
  }),
  prisma.assignment.count({where:query}),
]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-200 flex-1 mx-4 mt-0">
      {/* TOP */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
          All Assignments
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
            {(role === "admin" || role === "teacher")&& (
              <FormModal table="assignment" type="create"/>
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

export default AssignmentListPage;