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

  // Optional: show loading if you want
  if (loading) return <div>Loading stats…</div>;
  if (!stats) return <div>No stats available</div>;

  // Remove the raw display div completely
  return null; // Stats are now just stored in state; UI handled elsewhere
}
