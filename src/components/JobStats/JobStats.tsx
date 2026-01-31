import JobCharts from "@/components/JobStats/JobCharts";
import StatsCards from "@/components/JobStats/StatsCard";
import { getJobStats } from "@/lib/queries/jobs";

export default async function JobStats() {
  const stats = await getJobStats();

  return (
    <div className="space-y-4">
      <StatsCards total={stats.total} byStage={stats.byStage} />
      <JobCharts byStage={stats.byStage} byJobType={stats.byJobType} />
    </div>
  );
}
