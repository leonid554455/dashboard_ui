"use client";

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

const AttendanceChart = ({
  data,
}: {
  data: { name: string; present: number; absent: number }[];
}) => {
  return (
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
            tick={{
              fill: "#9ca3af",
              fontSize: 13,
              fontWeight: 600,
            }}
            padding={{ left: 0, right: 0 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 13,
              fontWeight: 600,
            }}
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
  );
};

export default AttendanceChart;
