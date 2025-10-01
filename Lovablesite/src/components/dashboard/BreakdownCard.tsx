import { Bot, Users, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export function BreakdownCard() {
  const aiHandled = 234;
  const forwarded = 108;
  const total = aiHandled + forwarded;
  const successRate = Math.round((aiHandled / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="dashboard-card p-6 hover-lift"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-success/10">
          <CheckCircle className="h-5 w-5 text-success" />
        </div>
        <h3 className="text-lg font-semibold text-card-foreground">Call Handling Breakdown</h3>
      </div>
      
      <div className="space-y-6">
        {/* Success Rate */}
        <div className="text-center p-4 bg-success/5 rounded-lg">
          <div className="metric-large text-success">{successRate}%</div>
          <div className="metric-label">Success Rate</div>
          <div className="text-xs text-muted-foreground mt-1">
            Calls fully handled by AI
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">AI vs Staff Handling</span>
            <span className="font-medium">{aiHandled}/{total}</span>
          </div>
          <Progress value={successRate} className="h-2" />
        </div>
        
        {/* Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Bot className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium text-card-foreground">AI Handled</div>
                <div className="text-xs text-muted-foreground">Complete resolution</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-primary">{aiHandled}</div>
              <div className="text-xs text-muted-foreground">calls</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium text-card-foreground">Staff Forwarded</div>
                <div className="text-xs text-muted-foreground">Required human assistance</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-muted-foreground">{forwarded}</div>
              <div className="text-xs text-muted-foreground">calls</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ArrowRight className="h-3 w-3" />
          <span>Complex bookings and complaints are automatically forwarded to staff</span>
        </div>
      </div>
    </motion.div>
  );
}