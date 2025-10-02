import { DollarSign, Clock, Calculator, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

type CostSavingsCardProps = {
  hoursSaved: number;
  hourlyRate: number;
};

export function CostSavingsCard({ hoursSaved, hourlyRate }: CostSavingsCardProps) {
  const monthlySavings = Math.round(hoursSaved * hourlyRate);
  const yearlyProjection = Math.round(monthlySavings * 12);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="dashboard-card p-6 hover-lift"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/10">
          <DollarSign className="h-5 w-5 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-card-foreground">
          Cost Savings Analysis
        </h3>
      </div>

      <div className="space-y-6">
        {/* Primary Savings Display */}
        <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20">
          <div className="metric-large text-accent">
            ${monthlySavings.toLocaleString()}
          </div>
          <div className="metric-label">Monthly Savings</div>
          <div className="text-xs text-muted-foreground mt-1">
            Equivalent receptionist cost avoided
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="font-bold text-card-foreground">{hoursSaved}h</div>
            <div className="text-xs text-muted-foreground">Hours Saved</div>
          </div>

          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Calculator className="h-4 w-4 text-primary" />
            </div>
            <div className="font-bold text-card-foreground">${hourlyRate}/hr</div>
            <div className="text-xs text-muted-foreground">Receptionist Rate</div>
          </div>
        </div>

        {/* Yearly Projection */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-card-foreground">
                Yearly Projection
              </span>
            </div>
            <span className="font-bold text-success">
              ${yearlyProjection.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Based on current AI performance and call volume trends
          </p>
        </div>

        {/* Additional Benefits */}
        <div className="bg-primary/5 rounded-lg p-3">
          <h4 className="text-sm font-medium text-card-foreground mb-2">
            Additional Benefits
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• 24/7 availability without overtime costs</li>
            <li>• No sick days or vacation coverage needed</li>
            <li>• Consistent service quality</li>
            <li>• Scalable during busy periods</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
