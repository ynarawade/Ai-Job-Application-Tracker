import JobsTableClient2 from "@/components/jobs-table/JobsTableClient2";
import { getJobs } from "@/lib/queries/jobs";

export default async function JobsTable({
  searchParams,
}: {
  searchParams?: { q?: string; page?: string };
}) {
  const q = searchParams?.q ?? "";
  const page = Number(searchParams?.page ?? "1");
  const pageSize = 10;

  const { rows, count } = await getJobs({ q, page, pageSize });

  return (
    <JobsTableClient2
      initialRows={rows}
      totalCount={count}
      page={page}
      pageSize={pageSize}
      q={q}
    />
  );
}
