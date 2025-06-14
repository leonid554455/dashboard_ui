"use client"

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({page,count}:{page:number;count:number}) => {

  const router = useRouter();

  const hasPrev = ITEM_PER_PAGE * (page-1)>0;
  const hasNext = ITEM_PER_PAGE * (page-1) + ITEM_PER_PAGE < count;

  const changePage = (newPage:number)=>{
    const params = new URLSearchParams(window.location.search);
    params.set("page",newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  }

  return (
    <div className="w-full mt-6 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-200 text-gray-600 text-sm">
      <button
        disabled = {!hasPrev}
        className="py-2 px-4 rounded-md bg-gray-100 text-xs font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
        onClick={()=>{
            changePage(page-1);
          }}
      >
        Prev
      </button>
      <div className="flex items-center gap-2">
  {Array.from(
    { length: Math.ceil(count / ITEM_PER_PAGE) },
    (_, index) => {
      const pageIndex = index + 1;
      return (
        <button
          key={pageIndex}
          className={`px-3 py-1.5 rounded-md text-gray-900 font-medium shadow-sm ${page === pageIndex ? "bg-[#C3EBFA]" : ""
          }`}
          onClick={()=>{
            changePage(pageIndex);
          }}
        >
          {pageIndex}
        </button>
      );
    }
  )}
</div>


      <button className="py-2 px-4 rounded-md bg-gray-100 text-xs font-semibold hover:bg-gray-200 transition"
      disabled = {!hasNext} 
      onClick={()=>{
            changePage(page+1);
          }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;