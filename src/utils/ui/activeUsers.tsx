import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const activeUserData = [
  { day: "Mon", users: 200 },
  { day: "Tue", users: 240 },
  { day: "Wed", users: 180 },
  { day: "Thu", users: 300 },
  { day: "Fri", users: 270 },
  { day: "Sat", users: 220 },
  { day: "Sun", users: 250 },
];

export function ActiveUsersCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full col-span-6">
      <h2 className="text-2xl font-semibold mb-4">Active Users This Week</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activeUserData}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#04ce9c" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#04ce9c"
              fillOpacity={1}
              fill="url(#colorUsers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
