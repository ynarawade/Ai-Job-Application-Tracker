import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getJobs({
  q,
  page,
  pageSize,
}: {
  q?: string;
  page: number;
  pageSize: number;
}) {
  const supabase = await createSupabaseServerClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("job_applications")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  //company/job_title search
  if (q && q.trim().length > 0) {
    const term = q.trim();
    query = query.or(`company_name.ilike.%${term}%,job_title.ilike.%${term}%`);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error(error.message);

  return {
    rows: data ?? [],
    count: count ?? 0,
  };
}
