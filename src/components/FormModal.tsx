"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
//import TeacherForm from "./forms/TeacherForm";
//import StudentForm from "./forms/StudentForm";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />
};



const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-9 h-9" : "w-8 h-8";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form className="flex flex-col items-center gap-6 text-center px-4">
        <span className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
          Are you absolutely sure?
        </span>
        <p className="text-gray-500 text-sm md:text-base max-w-md leading-6">
          This action cannot be undone. It will permanently delete this{" "}
          <strong className="text-red-600">{table}</strong> and remove all of its data.
        </p>
        <button
          className="mt-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-8 py-3 rounded-full shadow-md hover:shadow-xl hover:from-red-600 hover:to-red-800 transition-all duration-300 text-base font-semibold tracking-wide"
        >
          Yes, delete it
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition shadow-sm`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={17} height={17} />
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
          <div className="relative bg-gradient-to-br from-white via-neutral-50 to-gray-100 rounded-3xl shadow-2xl p-10 w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] border border-gray-200 animate-scale-in transition-all">
            <div
              className="absolute top-4 right-5 cursor-pointer hover:rotate-90 transition-transform duration-300"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="Close" width={18} height={18} className="opacity-70 hover:opacity-100" />
            </div>
            <Form />
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
