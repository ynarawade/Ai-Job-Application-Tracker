
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({
  total,
  byStage,
}: {
  total: number;
  byStage: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Total Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-semibold">{total}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Interviews
          </CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-semibold">
          {byStage["Interview"] ?? 0}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Offers
          </CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-semibold">
          {byStage["Offer"] ?? 0}
        </CardContent>
      </Card>
    </div>
  );
}
