import StatsCard from "../components/StatsCard";
import Dashboard from "./Dashboard";

const Index = () => {
  return (
    <div>
      {/* Stats Card at the top */}
      <StatsCard orgId="7fe8df40-eb8c-4803-8955-67c0700c49bb" />

      {/* Existing dashboard */}
      <Dashboard />
    </div>
  );
};

export default Index;
