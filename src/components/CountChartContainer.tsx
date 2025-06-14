import prisma from "@/lib/prisma";
import Image from "next/image";
import CountChart from "./CountChart";

const CountChartContainer = async () => {

    const data = await prisma.student.groupBy({
        by: ["sex"],
        _count: true,
    });

    const boys = data.find(d=>d.sex === "MALE")?._count || 0;
    const girls = data.find(d=>d.sex === "FEMALE")?._count || 0;

  return (
    <div className="bg-white rounded-2xl w-full h-full p-6 shadow-sm hover:shadow-md transition-shadow duration-300 max-w-[340px]">
      
      {/* TITLE */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-[18px] font-semibold text-gray-800">Students</h1>
        <Image
          src="/moreDark.png"
          alt="More options"
          width={24}
          height={24}
          className="opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* CHART */}
      <CountChart boys={boys} girls={girls}/>

      {/* LEGEND */}
      <div className="flex justify-center gap-10 mt-4">
        <div className="flex flex-col items-center gap-1">
          <div className="w-4 h-4 bg-lamaSky rounded-full border border-gray-300" />
          <h1 className="text-[17px] font-bold text-gray-800">{boys}</h1>
          <h2 className="text-[13px] text-gray-500 font-medium">Boys ({Math.round((boys / (boys + girls)) * 100)}%)</h2>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-4 h-4 bg-lamaYellow rounded-full border border-gray-300" />
          <h1 className="text-[17px] font-bold text-gray-800">{girls}</h1>
          <h2 className="text-[13px] text-gray-500 font-medium">Girls ({Math.round((girls / (boys + girls)) * 100)}%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
