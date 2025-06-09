"use client";

const Pagination = () => {
  return (
    <div className="w-full mt-6 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-200 text-gray-600 text-sm">
      {/* Prev button */}
      <button
        disabled
        className="py-2 px-4 rounded-md bg-gray-100 text-xs font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Prev
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 rounded-md bg-[#C3EBFA] text-gray-900 font-medium shadow-sm">
          1
        </button>
        <button className="px-3 py-1.5 rounded-md hover:bg-gray-100 transition">2</button>
        <button className="px-3 py-1.5 rounded-md hover:bg-gray-100 transition">3</button>
        <span className="px-2 text-gray-400">...</span>
        <button className="px-3 py-1.5 rounded-md hover:bg-gray-100 transition">10</button>
      </div>

      {/* Next button */}
      <button className="py-2 px-4 rounded-md bg-gray-100 text-xs font-semibold hover:bg-gray-200 transition">
        Next
      </button>
    </div>
  );
};

export default Pagination;
