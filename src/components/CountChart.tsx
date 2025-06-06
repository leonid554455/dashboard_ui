"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 106,
    fill: "white",
  },
  {
    name: "Girls",
    count: 53,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 53,
    fill: "#C3EBFA",
  },
];

const CountChart = () => {
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
      <div className="relative w-full h-[200px] mb-5">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="100%"
            barSize={26}
            data={data}
          >
            <RadialBar background dataKey="count" cornerRadius={8} />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt="Gender icon"
          width={44}
          height={44}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-10">
        <div className="flex flex-col items-center gap-1">
          <div className="w-4 h-4 bg-lamaSky rounded-full border border-gray-300" />
          <h1 className="text-[17px] font-bold text-gray-800">1,234</h1>
          <h2 className="text-[13px] text-gray-500 font-medium">Boys (55%)</h2>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-4 h-4 bg-lamaYellow rounded-full border border-gray-300" />
          <h1 className="text-[17px] font-bold text-gray-800">1,234</h1>
          <h2 className="text-[13px] text-gray-500 font-medium">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
