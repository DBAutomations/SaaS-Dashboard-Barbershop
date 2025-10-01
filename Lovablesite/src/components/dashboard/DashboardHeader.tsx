import { User, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardHeader() {
  return (
    <header className="dashboard-card p-6 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-card-foreground">
            Tony's Barbershop Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            AI Call Management System
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>TB</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}