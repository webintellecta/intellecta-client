import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  userRegistrationData: {
    day: { date: string; count: number }[];
    week: { date: string; count: number }[];
    month: { date: string; count: number }[];
    year: { date: string; count: number }[];
  };
}

export default function RegistrationStatsCard({ userRegistrationData }: Props) {
  const [range, setRange] = useState<"day" | "week" | "month" | "year">("week");

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full col-span-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-2xl">Recent Admissions</h1>
        <div className="flex gap-2">
          {["day", "week", "month", "year"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r as any)}
              className={`px-3 py-1 rounded-full text-sm ${
                range === r
                  ? "bg-[#04ce9c] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Last {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={userRegistrationData[range]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#04ce9c" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
