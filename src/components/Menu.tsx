"use client";

import Image from "next/image";
import { role } from "@/lib/data";
import Link from "next/link";
import { useEffect } from "react";

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: "/home.png", label: "Dashboard", href: "/", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/teacher.png", label: "Teachers", href: "/list/teachers", visible: ["admin", "teacher"] },
      { icon: "/student.png", label: "Students", href: "/list/students", visible: ["admin", "teacher"] },
      { icon: "/parent.png", label: "Parents", href: "/list/parents", visible: ["admin", "teacher"] },
      { icon: "/subject.png", label: "Subjects", href: "/list/subjects", visible: ["admin"] },
      { icon: "/class.png", label: "Classes", href: "/list/classes", visible: ["admin", "teacher"] },
      { icon: "/lesson.png", label: "Lessons", href: "/list/lessons", visible: ["admin", "teacher"] },
      { icon: "/exam.png", label: "Exams", href: "/list/exams", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/assignment.png", label: "Work", href: "/list/assignments", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/result.png", label: "Results", href: "/list/results", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/attendance.png", label: "Attendance", href: "/list/attendance", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/calendar.png", label: "Events", href: "/list/events", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/message.png", label: "Messages", href: "/list/messages", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/announcement.png", label: "Notices", href: "/list/announcements", visible: ["admin", "teacher", "student", "parent"] },
    ],
  },
  {
    title: "OTHER",
    items: [
      { icon: "/profile.png", label: "Profile", href: "/profile", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/setting.png", label: "Settings", href: "/settings", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/logout.png", label: "Logout", href: "/logout", visible: ["admin", "teacher", "student", "parent"] },
    ],
  },
];

const Menu = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div
      className="p-4 mt-2 mb-6 text-sm rounded-2xl bg-white/30 backdrop-blur-md shadow-md border border-white/10 w-full max-w-[240px] transition-all duration-300"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {menuItems.map((section) => (
        <div className="mb-6" key={section.title}>
          <h3 className="text-gray-500 text-[10px] font-semibold uppercase mb-3 px-2 tracking-wider">
            {section.title}
          </h3>
          <div className="flex flex-col gap-0.5">
            {section.items.map((item) =>
              item.visible.includes(role) ? (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center gap-3 px-3 py-[10px] rounded-xl hover:bg-[#e5f6ff] transition-all duration-200 group"
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={24}
                    height={24}
                    className="opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  />
                  <span
                    style={{ fontSize: "13.5px" }}
                    className="text-gray-600 group-hover:text-black text-sm whitespace-nowrap overflow-hidden text-ellipsis ml-0.5 mt-1"
                  >
                    {item.label}
                  </span>
                </Link>
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
