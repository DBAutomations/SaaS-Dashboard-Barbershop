import { useEffect, useState } from "react";

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

export default function StatsCard({ orgId }: { orgId: string }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/.netlify/functions/stats?orgId=${orgId}&rangeDays=30`
        );
        const json = await res.json();
        setStats(json);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    }
    if (orgId) load();
  }, [orgId]);

  if (loading) return <div>Loading stats…</div>;
  if (!stats) return <div>No stats available</div>;

  return (
    <div className="p-4 rounded-xl shadow bg-white">
      <h2 className="text-lg font-bold">AI Receptionist Dashboard</h2>
      <p>Total calls: {stats.total_calls}</p>
      <p>Time saved: {(stats.time_saved_seconds / 60).toFixed(1)} minutes</p>
      <p>Appointments booked: {stats.appointments_booked}</p>
      <p>Handled by AI: {stats.ai_handled_count}</p>
      <p>Forwarded: {stats.forwarded_count}</p>
      <p>Estimated savings: €{stats.cost_savings}</p>
    </div>
  );
}
