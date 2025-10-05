import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { CallsChart } from "@/components/dashboard/CallsChart";
import { MissedCallsCard } from "@/components/dashboard/MissedCallsCard";
import { BreakdownCard } from "@/components/dashboard/BreakdownCard";
import { CostSavingsCard } from "@/components/dashboard/CostSavingsCard";

type Stats = {
  total_calls: number;
  time_saved_seconds: number;
  hours_saved: number;
  appointments_booked: number;
  ai_handled_count: number;
  forwarded_count: number;
  receptionist_hourly_rate: number;
  cost_savings: number;
  rangeDays: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "/.netlify/functions/stats?orgId=7fe8df40-eb8c-4803-8955-67c0700c49bb"
        );
        const data: Stats = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !stats) return <div>Loading dashboard...</div>;

  // --- Use aggregated stats ---
  const {
    total_calls,
    ai_handled_count,
    forwarded_count,
    appointments_booked,
    hours_saved,
    receptionist_hourly_rate,
    cost_savings,
  } = stats;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />

        <SummaryCards
          totalCalls={total_calls}
          aiHandled={ai_handled_count}
          forwarded={forwarded_count}
          appointments={appointments_booked}
          successRate={Math.round((ai_handled_count / total_calls) * 100)}
        />

        {/* CallsChart now receives empty array because we no longer fetch individual calls */}
        <CallsChart calls={[]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MissedCallsCard calls={[]} />
          <BreakdownCard calls={[]} />
          <CostSavingsCard hoursSaved={hours_saved} hourlyRate={receptionist_hourly_rate || 18} />
        </div>
      </div>
    </div>
  );
}
