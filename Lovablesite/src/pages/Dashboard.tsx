import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { CallsChart } from "@/components/dashboard/CallsChart";
import { MissedCallsCard } from "@/components/dashboard/MissedCallsCard";
import { BreakdownCard } from "@/components/dashboard/BreakdownCard";
import { CostSavingsCard } from "@/components/dashboard/CostSavingsCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        
        <SummaryCards />
        
        <CallsChart />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MissedCallsCard />
          <BreakdownCard />
          <CostSavingsCard />
        </div>
      </div>
    </div>
  );
}