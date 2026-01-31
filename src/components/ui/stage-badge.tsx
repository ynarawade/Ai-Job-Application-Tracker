import { Badge } from "@/components/ui/badge";
import type { Stage } from "@/lib/types/job";
import clsx from "clsx";

interface StageBadgeProps {
  stage: Stage;
}

const stageStyles: Record<Stage, { dot: string; badge: string }> = {
  Applied: {
    dot: "bg-sky-500",
    badge:
      "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300",
  },
  OA: {
    dot: "bg-blue-500",
    badge:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  },
  Interview: {
    dot: "bg-purple-500",
    badge:
      "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900 dark:bg-purple-950 dark:text-purple-300",
  },
  "HR Discussion": {
    dot: "bg-indigo-500",
    badge:
      "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300",
  },
  Offer: {
    dot: "bg-green-500",
    badge:
      "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
  },
  Rejected: {
    dot: "bg-red-500",
    badge:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
  },
  Withdrawn: {
    dot: "bg-amber-500",
    badge:
      "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  },
};

export default function StageBadge({ stage }: StageBadgeProps) {
  const s = stageStyles[stage];

  return (
    <Badge
      variant="outline"
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium",
        s.badge
      )}
    >
      <span
        className={clsx("h-2 w-2 rounded-full shadow-sm", s.dot)}
        aria-hidden="true"
      />
      <span className="whitespace-nowrap">{stage}</span>
    </Badge>
  );
}
