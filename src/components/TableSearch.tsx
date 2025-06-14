"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const TableSearch = () => {

  const router = useRouter();

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{

    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;

    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[280px] flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:ring-gray-300">
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
    </form>
  );
};

export default TableSearch;
