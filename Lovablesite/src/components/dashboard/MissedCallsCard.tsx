import { PhoneOff, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function MissedCallsCard() {
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
        <h3 className="text-lg font-semibold text-card-foreground">Missed Calls Prevented</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="metric-large text-accent">127</div>
          <div className="metric-label">Calls answered outside hours</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">After 6 PM</span>
            </div>
            <span className="text-sm font-medium">68 calls</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Before 9 AM</span>
            </div>
            <span className="text-sm font-medium">34 calls</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Weekends</span>
            </div>
            <span className="text-sm font-medium">25 calls</span>
          </div>
        </div>
        
        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            AI handled 100% of after-hours inquiries, ensuring no customer is left waiting.
          </p>
        </div>
      </div>
    </motion.div>
  );
}