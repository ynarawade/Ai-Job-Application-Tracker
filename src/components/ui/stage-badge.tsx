import { Badge } from "@/components/ui/badge";
import type { Stage } from "@/lib/types/job";
import clsx from "clsx";

interface StageBadgeProps {
  stage: Stage;
}

const stageColors: Record<Stage, string> = {
  Applied: "bg-gray-400",
  OA: "bg-blue-500",
  Interview: "bg-purple-500",
  "HR Discussion": "bg-indigo-500",
  Offer: "bg-green-500",
  Rejected: "bg-red-500",
  Withdrawn: "bg-zinc-400",
};

function StageBadge({ stage }: StageBadgeProps) {
  return (
    <Badge variant="outline" className="flex items-center gap-2 ">
      <span className={clsx("h-2 w-2 rounded-full", stageColors[stage])} />
      {stage}
    </Badge>
  );
}

export default StageBadge;
