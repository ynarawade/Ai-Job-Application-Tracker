import ActionsRow from "@/components/jobs-table/actions_row";
import StageBadge from "@/components/ui/stage-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function JobsTable() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("applied", { ascending: false });

  if (error) {
    console.error("Supabase error:", error.message);
    return <p className="text-destructive">Failed to load jobs.</p>;
  }

  return (
    <div className="border p-2 rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead className="w-50">Job Title</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Work Mode</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((job) => (
            <TableRow key={job.id} className="h-15">
              <TableCell>{job.company_name}</TableCell>

              <TableCell className="font-medium">{job.job_title}</TableCell>

              <TableCell className="text-muted-foreground">
                {job.job_type}
              </TableCell>

              <TableCell className="text-muted-foreground">
                {job.work_mode}
              </TableCell>

              <TableCell className="text-muted-foreground">
                {job.salary}
              </TableCell>

              <TableCell className="text-muted-foreground">
                {new Date(job.applied).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <StageBadge stage={job.stage} />
              </TableCell>
              <TableCell>
                <ActionsRow data={job} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default JobsTable;
