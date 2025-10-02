import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import type { CallRecord } from "@/types/call";

type CallsChartProps = {
  calls: CallRecord[];
};

// If you want, you can generate chart data from actual calls:
const generateChartDataFromCalls = (calls: CallRecord[]) => {
  // Aggregate calls per day
  const map: Record<string, number> = {};
  calls.forEach(c => {
    const date = new Date(c.call_sid ? c.call_sid : Date.now()); // or actual call date if you have
    const day = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    map[day] = (map[day] || 0) + 1;
  });
  return Object.entries(map).map(([date, calls]) => ({ date, calls }));
};

// fallback chart data for 30 days if you don’t want to use live data yet
const generateSampleData = () => {
  const data = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseAmount = isWeekend ? 8 : 15;
    const variance = Math.random() * 8;
    const calls = Math.round(baseAmount + variance);
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      calls,
    });
  }
  return data;
};

export function CallsChart({ calls }: CallsChartProps) {
  const chartData = calls.length ? generateChartDataFromCalls(calls) : generateSampleData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="dashboard-card p-6 mb-8 hover-lift"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Calls Handled Per Day</h3>
          <p className="text-sm text-muted-foreground">Last 30 days performance</p>
        </div>
        <div className="text-right">
          <div className="metric-value text-primary">
            {chartData.reduce((sum, day) => sum + day.calls, 0)}
          </div>
          <div className="metric-label">Total Calls</div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-card)",
              }}
            />
            <Line
              type="monotone"
              dataKey="calls"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
