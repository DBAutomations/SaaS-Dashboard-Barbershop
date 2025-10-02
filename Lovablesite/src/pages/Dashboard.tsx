import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { CallsChart } from "@/components/dashboard/CallsChart";
import { MissedCallsCard } from "@/components/dashboard/MissedCallsCard";
import { BreakdownCard } from "@/components/dashboard/BreakdownCard";
import { CostSavingsCard } from "@/components/dashboard/CostSavingsCard";
import type { CallRecord } from "@/types/call";

export default function Dashboard() {
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "/.netlify/functions/stats?orgId=7fe8df40-eb8c-4803-8955-67c0700c49bb"
        );
        const data: CallRecord[] = await res.json();
        setCalls(data);
      } catch (err) {
        console.error("Failed to load calls", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  // --- Metrics ---
  const totalCalls = calls.length;
  const totalDuration = calls.reduce((acc, c) => acc + c.duration_seconds, 0);
  const hoursSaved = totalDuration / 3600;
  const aiHandled = calls.filter(c => c.handled_by_ai).length;
  const forwarded = calls.filter(c => c.forwarded).length;
  const appointments = calls.filter(c => c.appointment_booked).length;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />

        <SummaryCards
          totalCalls={totalCalls}
          aiHandled={aiHandled}
          forwarded={forwarded}
          appointments={appointments}
          successRate={Math.round((aiHandled / totalCalls) * 100)}
        />

        {/* CallsChart is now properly typed */}
        <CallsChart calls={calls} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MissedCallsCard calls={calls} />
          <BreakdownCard calls={calls} />
          <CostSavingsCard hoursSaved={hoursSaved} hourlyRate={18} />
        </div>
      </div>
    </div>
  );
}
