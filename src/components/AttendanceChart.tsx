"use client";

import Image from "next/image";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", present: 60, absent: 40 },
  { name: "Tue", present: 70, absent: 60 },
  { name: "Wed", present: 90, absent: 75 },
  { name: "Thu", present: 90, absent: 75 },
  { name: "Fri", present: 65, absent: 55 },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-2xl w-full h-full px-4 pt-6 pb-4 shadow-sm hover:shadow-md transition-shadow duration-300 max-w-[600px]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        {/* Заголовок с отступом вправо */}
        <h1 className="text-[18px] font-semibold text-gray-800 ml-3">
          Attendance
        </h1>

        {/* Иконка с отступом влево */}
        <div className="mr-3">
          <Image
            src="/moreDark.png"
            alt="More options"
            width={24}
            height={24}
            className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          />
        </div>
      </div>

      {/* CHART */}
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={24}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
            barGap={6}
            barCategoryGap="15%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#eee"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 13, fontWeight: 600 }}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 13, fontWeight: 600 }}
              domain={[0, 100]}
              tickCount={6}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                borderColor: "lightgray",
                fontWeight: "600",
                fontSize: 14,
              }}
            />
            <Legend
              verticalAlign="top"
              align="center"
              wrapperStyle={{ paddingBottom: 20 }}
              iconType="circle"
              formatter={(value) => (
                <span className="text-gray-700 font-semibold">{value}</span>
              )}
            />
            <Bar
              dataKey="present"
              fill="#FAE27C"
              radius={[10, 10, 0, 0]}
              name="Present"
            />
            <Bar
              dataKey="absent"
              fill="#C3EBFA"
              radius={[10, 10, 0, 0]}
              name="Absent"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
