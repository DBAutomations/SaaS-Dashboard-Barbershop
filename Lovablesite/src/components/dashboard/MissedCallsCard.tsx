import { PhoneOff, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { CallRecord } from "@/types/call";

type MissedCallsCardProps = {
  calls: CallRecord[];
};

export function MissedCallsCard({ calls }: MissedCallsCardProps) {
  const afterHoursCalls = calls.filter(c => !c.handled_by_ai && c.forwarded);
  const totalMissed = afterHoursCalls.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="dashboard-card p-6 hover-lift"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent/10">
          <PhoneOff className="h-5 w-5 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-card-foreground">
          Missed Calls Prevented
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="metric-large text-accent">{totalMissed}</div>
          <div className="metric-label">Calls answered outside hours</div>
        </div>
      </div>
    </motion.div>
  );
}
