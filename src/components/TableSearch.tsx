"use client";

import Image from "next/image";

const TableSearch = () => {
  return (
    <div className="w-full max-w-[280px] flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:ring-gray-300">
      <Image
        src="/search.png"
        alt="Search icon"
        width={16}
        height={16}
        className="opacity-70"
      />
      <input
        type="text"
        placeholder="Search..."
        className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
      />
    </div>
  );
};

export default TableSearch;
