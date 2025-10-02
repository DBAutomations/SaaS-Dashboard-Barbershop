import { Clock, Phone, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

type SummaryCardsProps = {
  totalCalls: number;
  aiHandled: number;
  forwarded: number;
  appointments: number;
  successRate: number; // % of calls fully handled by AI
};

export function SummaryCards({
  totalCalls,
  aiHandled,
  forwarded,
  appointments,
  successRate,
}: SummaryCardsProps) {
  const summaryData = [
    {
      title: "Total Calls",
      value: totalCalls.toString(),
      subtitle: "This month",
      icon: Clock,
      gradient: "dashboard-card-primary",
      delay: 0.1,
    },
    {
      title: "AI Handled",
      value: aiHandled.toString(),
      subtitle: `${Math.round((aiHandled / totalCalls) * 100)}% of total`,
      icon: Phone,
      gradient: "dashboard-card-accent",
      delay: 0.2,
    },
    {
      title: "Appointments Booked",
      value: appointments.toString(),
      subtitle: `${Math.round((appointments / totalCalls) * 100)}% conversion`,
      icon: Calendar,
      gradient: "dashboard-card-success",
      delay: 0.3,
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      subtitle: "Calls fully handled",
      icon: TrendingUp,
      gradient: "dashboard-card",
      delay: 0.4,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData.map((item) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: item.delay, duration: 0.5 }}
          className={`${item.gradient} p-6 hover-lift`}
        >
          <div className="flex items-center justify-between mb-4">
            <item.icon
              className={`h-6 w-6 ${
                item.gradient === "dashboard-card"
                  ? "text-primary"
                  : "text-current"
              }`}
            />
            <div
              className={`text-right ${
                item.gradient === "dashboard-card"
                  ? "text-muted-foreground"
                  : "text-current opacity-80"
              }`}
            >
              <div className="text-xs font-medium">{item.subtitle}</div>
            </div>
          </div>

          <div className="space-y-1">
            <div
              className={`metric-large ${
                item.gradient === "dashboard-card"
                  ? "text-card-foreground"
                  : "text-current"
              }`}
            >
              {item.value}
            </div>
            <div
              className={`metric-label ${
                item.gradient === "dashboard-card"
                  ? "text-muted-foreground"
                  : "text-current opacity-90"
              }`}
            >
              {item.title}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
