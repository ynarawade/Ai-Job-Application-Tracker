"use client";

import { Ellipsis, Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import EditApplicationButton from "@/components/job-application/EditApplicationBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteJobAction } from "@/lib/actions";
import type { JobApplicationSchema } from "@/lib/schema/job-application";
import type z from "zod";
type FormValues = z.infer<typeof JobApplicationSchema>;
type ActionsRowProps = {
  data: FormValues;
};

export default function ActionsRow({ data }: ActionsRowProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteJobAction(data.id ?? "");

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("Job deleted");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-md hover:bg-muted">
          <Ellipsis size={16} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
          <EditApplicationButton data={data} />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} disabled={isPending}>
          <div className="flex items-center gap-x-2">
            <Trash className="text-red-500" />
            <span>Delete</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
