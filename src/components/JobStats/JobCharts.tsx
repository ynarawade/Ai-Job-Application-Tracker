// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// function toChartData(obj: Record<string, number>) {
//   return Object.entries(obj)
//     .map(([name, value]) => ({ name, value }))
//     .filter((x) => x.value > 0);
// }

// function totalOf(data: { value: number }[]) {
//   return data.reduce((acc, item) => acc + item.value, 0);
// }

// const STAGE_COLORS: Record<string, string> = {
//   Applied: "#0ea5e9",
//   OA: "#3b82f6",
//   Interview: "#a855f7",
//   "HR Discussion": "#6366f1",
//   Offer: "#22c55e",
//   Rejected: "#ef4444",
//   Withdrawn: "#f59e0b",
// };

// const DEFAULT_COLORS = [
//   "#3b82f6",
//   "#22c55e",
//   "#f97316",
//   "#a855f7",
//   "#ef4444",
//   "#14b8a6",
//   "#64748b",
// ];

// export default function JobCharts({
//   byStage,
//   byJobType,
// }: {
//   byStage: Record<string, number>;
//   byJobType: Record<string, number>;
// }) {
//   const stageData = toChartData(byStage);
//   const typeData = toChartData(byJobType);

//   const stageTotal = totalOf(stageData);
//   const typeTotal = totalOf(typeData);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//       {/*Stage Breakdown */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-sm text-muted-foreground">
//             Stage Breakdown
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={stageData}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={55}
//                 outerRadius={90}
//                 paddingAngle={3}
//                 cornerRadius={12}
//               >
//                 {stageData.map((entry, index) => (
//                   <Cell
//                     key={`stage-${index}`}
//                     fill={
//                       STAGE_COLORS[entry.name] ??
//                       DEFAULT_COLORS[index % DEFAULT_COLORS.length]
//                     }
//                   />
//                 ))}
//               </Pie>

//               <Tooltip content={<CustomTooltip />} />
//               {/* Center label */}
//               <text
//                 x="50%"
//                 y="50%"
//                 textAnchor="middle"
//                 dominantBaseline="middle"
//                 className="fill-foreground"
//               >
//                 <tspan x="50%" dy="-2" className="text-xl font-semibold">
//                   {stageTotal}
//                 </tspan>
//                 <tspan
//                   x="50%"
//                   dy="18"
//                   className="text-xs fill-muted-foreground"
//                 >
//                   Total
//                 </tspan>
//               </text>
//             </PieChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/*Job Type Breakdown */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-sm text-muted-foreground">
//             Job Type Breakdown
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={typeData}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={55}
//                 outerRadius={90}
//                 paddingAngle={3}
//                 cornerRadius={12}
//               >
//                 {typeData.map((_, index) => (
//                   <Cell
//                     key={`type-${index}`}
//                     fill={DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
//                   />
//                 ))}
//               </Pie>

//               <Tooltip content={<CustomTooltip />} />

//               {/* Center label */}
//               <text
//                 x="50%"
//                 y="50%"
//                 textAnchor="middle"
//                 dominantBaseline="middle"
//                 className="fill-foreground"
//               >
//                 <tspan x="50%" dy="-2" className="text-xl font-semibold">
//                   {typeTotal}
//                 </tspan>
//                 <tspan
//                   x="50%"
//                   dy="18"
//                   className="text-xs fill-muted-foreground"
//                 >
//                   Total
//                 </tspan>
//               </text>
//             </PieChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// function CustomTooltip({
//   active,
//   payload,
// }: {
//   active?: boolean;
//   payload?: any[];
// }) {
//   if (!active || !payload || payload.length === 0) return null;

//   const item = payload[0];
//   const name = item.name;
//   const value = item.value;
//   const color = item.payload?.fill || item.color;

//   return (
//     <div className="rounded-xl border bg-background px-3 py-2 shadow-lg">
//       <div className="flex items-center gap-2">
//         <span
//           className="h-2.5 w-2.5 rounded-full"
//           style={{ backgroundColor: color }}
//         />
//         <p className="text-sm font-medium">{name}</p>
//       </div>

//       <p className="text-xs text-muted-foreground mt-1">
//         Count: <span className="font-medium text-foreground">{value}</span>
//       </p>
//     </div>
//   );
// }
