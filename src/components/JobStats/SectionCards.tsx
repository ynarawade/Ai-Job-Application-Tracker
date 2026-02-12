import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number | string;
  icon?: LucideIcon;
  badge?: string;
  footer?: string;
};

export function StatCard({
  title,
  value,
  icon: Icon,
  badge,
  footer,
}: StatCardProps) {
  return (
    <Card className="bg-linear-to-t from-primary/5 to-card shadow-sm">
      <CardHeader>
        <CardDescription>{title}</CardDescription>

        <CardTitle className="text-2xl font-semibold tabular-nums">
          {value}
        </CardTitle>

        {badge && (
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1">
              {Icon && <Icon className="h-4 w-4" />}
              {badge}
            </Badge>
          </CardAction>
        )}
      </CardHeader>

      {footer && (
        <CardFooter className="text-sm text-muted-foreground">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
