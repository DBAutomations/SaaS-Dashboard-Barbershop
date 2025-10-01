import { Clock, Phone, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const summaryData = [
  {
    title: "Total Time Saved",
    value: "47h 32m",
    subtitle: "This month",
    icon: Clock,
    gradient: "dashboard-card-primary",
    delay: 0.1
  },
  {
    title: "Calls Handled",
    value: "342",
    subtitle: "+23% from last month",
    icon: Phone,
    gradient: "dashboard-card-accent",
    delay: 0.2
  },
  {
    title: "Appointments Booked",
    value: "89",
    subtitle: "26% conversion rate",
    icon: Calendar,
    gradient: "dashboard-card-success",
    delay: 0.3
  },
  {
    title: "Success Rate",
    value: "94%",
    subtitle: "Calls fully handled",
    icon: TrendingUp,
    gradient: "dashboard-card",
    delay: 0.4
  }
];

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: item.delay, duration: 0.5 }}
          className={`${item.gradient} p-6 hover-lift`}
        >
          <div className="flex items-center justify-between mb-4">
            <item.icon className={`h-6 w-6 ${
              item.gradient === "dashboard-card" 
                ? "text-primary" 
                : "text-current"
            }`} />
            <div className={`text-right ${
              item.gradient === "dashboard-card" 
                ? "text-muted-foreground" 
                : "text-current opacity-80"
            }`}>
              <div className="text-xs font-medium">{item.subtitle}</div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className={`metric-large ${
              item.gradient === "dashboard-card" 
                ? "text-card-foreground" 
                : "text-current"
            }`}>
              {item.value}
            </div>
            <div className={`metric-label ${
              item.gradient === "dashboard-card" 
                ? "text-muted-foreground" 
                : "text-current opacity-90"
            }`}>
              {item.title}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}