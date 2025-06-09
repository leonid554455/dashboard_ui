"use client";

import Pagination from "@/components/Pagination";
import FormModal from "@/components/FormModal";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

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
  {
    header: "Actions",
    accessor: "action",
  },
];

const TeacherListPage = () => {
  const renderRow = (item: Teacher) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
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
      <td className="hidden md:table-cell">{item.teacherId}</td>
      <td className="hidden md:table-cell">{item.subjects.join(", ")}</td>
      <td className="hidden md:table-cell">{item.classes.join(", ")}</td>
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
        <Table columns={columns} renderRow={renderRow} data={teachersData} />
      </div>

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default TeacherListPage;
