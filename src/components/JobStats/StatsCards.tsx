import { StatCard } from "@/components/JobStats/SectionCards";
import { Award, Briefcase, TrendingUp } from "lucide-react";

export default function StatsCards({
  total,
  byStage,
}: {
  total: number;
  byStage: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        title="Total Applications"
        value={total}
        icon={TrendingUp}
        footer="All submitted applications"
      />

      <StatCard
        title="Interviews"
        value={byStage["Interview"] ?? 0}
        icon={Briefcase}
        footer="Ongoing interview processes"
      />

      <StatCard
        title="Offers"
        value={byStage["Offer"] ?? 0}
        icon={Award}
        footer="Offers received"
      />
    </div>
  );
}
