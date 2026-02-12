"use client";

import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import AddApplicationButton from "@/components/job-application/add-application-btn";
import ActionsRow from "@/components/jobs-table/actions_row";
import StageBadge from "@/components/ui/stage-badge";
import type { JobApplicationRow } from "@/lib/types/job";

type Props = {
  initialRows: JobApplicationRow[];
  totalCount: number;
  page: number;
  pageSize: number;
  q: string;
};

export default function JobsTableClient2({
  initialRows,
  totalCount,
  page,
  pageSize,
  q,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [rows, setRows] = useOptimistic(
    initialRows,
    (
      state,
      action:
        | { type: "delete"; id: string }
        | { type: "add"; row: JobApplicationRow }
        | { type: "edit"; row: JobApplicationRow }
    ) => {
      if (action.type === "delete")
        return state.filter((r) => r.id !== action.id);
      if (action.type === "add") return [action.row, ...state];
      if (action.type === "edit")
        return state.map((r) => (r.id === action.row.id ? action.row : r));
      return state;
    }
  );

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const goToPage = (newPage: number) => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q);
      params.set("page", String(newPage));
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      {/* ───────── Toolbar ───────── */}
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          defaultValue={q}
          placeholder="Search company or job title..."
          className="max-w-sm"
        />

        <AddApplicationButton
          onOptimisticAdd={(row) =>
            startTransition(() => setRows({ type: "add", row }))
          }
        />
      </div>

      {/* ───────── Table Container ───────── */}
      <div className="overflow-hidden">
        <Table className="[&_td]:py-3 [&_th]:py-3">
          {/* Header */}
          <TableHeader className="bg-muted/50 backdrop-blur sticky top-0 z-10">
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {rows.map((job) => (
              <TableRow
                key={job.id}
                className="transition-colors hover:bg-muted/40"
              >
                <TableCell>{job.company_name}</TableCell>
                <TableCell className="font-medium">{job.job_title}</TableCell>
                <TableCell className="text-muted-foreground/80">
                  {job.job_type}
                </TableCell>
                <TableCell className="text-muted-foreground/80">
                  {job.work_mode}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {job.salary}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {job.applied
                    ? format(new Date(job.applied), "dd/MM/yyyy")
                    : "-"}
                </TableCell>
                <TableCell>
                  <StageBadge stage={job.stage} />
                </TableCell>
                <TableCell className="text-right">
                  <ActionsRow
                    row={job}
                    onOptimisticEdit={(row) =>
                      startTransition(() => setRows({ type: "edit", row }))
                    }
                    onOptimisticDelete={(id) =>
                      startTransition(() => setRows({ type: "delete", id }))
                    }
                  />
                </TableCell>
              </TableRow>
            ))}

            {/* Empty State */}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-16">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Image
                      src="/no-data.svg"
                      alt="No applications"
                      width={140}
                      height={140}
                      className="opacity-80 grayscale"
                    />
                    <div>
                      <p className="font-medium">No applications yet</p>
                      <p className="text-sm text-muted-foreground">
                        Start by adding your first job application.
                      </p>
                    </div>

                    <AddApplicationButton
                      onOptimisticAdd={(row) =>
                        startTransition(() => setRows({ type: "add", row }))
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* Footer / Pagination */}
          {rows.length > 0 && (
            <TableFooter className="bg-muted/30 border-t">
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Page {page} of {totalPages} • {totalCount} total
                    </p>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        disabled={page <= 1 || isPending}
                        onClick={() => goToPage(page - 1)}
                      >
                        Prev
                      </Button>

                      <Button
                        variant="outline"
                        disabled={page >= totalPages || isPending}
                        onClick={() => goToPage(page + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
}
