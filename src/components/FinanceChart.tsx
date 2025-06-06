"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 1398 },
  { name: "Mar", income: 2000, expense: 9800 },
  { name: "Apr", income: 2780, expense: 3908 },
  { name: "May", income: 1890, expense: 4800 },
  { name: "Jun", income: 2390, expense: 3800 },
  { name: "Jul", income: 3490, expense: 4300 },
  { name: "Aug", income: 3490, expense: 4300 },
  { name: "Sep", income: 3490, expense: 4300 },
  { name: "Oct", income: 3490, expense: 4300 },
  { name: "Nov", income: 3490, expense: 4300 },
  { name: "Dec", income: 3490, expense: 4300 },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-2xl w-full h-full p-6 shadow-md hover:shadow-lg transition-shadow duration-300 min-h-[500px] max-w-[1000px] mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[20px] font-semibold text-gray-800 ml-2">
          Finance Overview
        </h1>
        <Image
          src="/moreDark.png"
          alt="More options"
          width={24}
          height={24}
          className="opacity-80 hover:opacity-100 cursor-pointer mr-2"
        />
      </div>

      {/* CHART */}
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 14, fontWeight: 600 }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 14, fontWeight: 600 }}
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
            <Line
              type="monotone"
              dataKey="income"
              stroke="#FAE27C"
              strokeWidth={3.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Income"
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#C3EBFA"
              strokeWidth={3.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Expense"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceChart;
