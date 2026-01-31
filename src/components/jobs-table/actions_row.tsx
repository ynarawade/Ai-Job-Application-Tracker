"use client";

import { Ellipsis, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AddApplicationButton from "@/components/job-application/add-application-btn";
import { deleteJobAction } from "@/lib/actions";
import type { JobApplicationRow } from "@/lib/types/job";

export default function ActionsRow({
  row,
  onOptimisticDelete,
  onOptimisticEdit,
}: {
  row: JobApplicationRow;
  onOptimisticDelete: (id: string) => void;
  onOptimisticEdit: (row: JobApplicationRow) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = async () => {
    onOptimisticDelete(row.id);
    setMenuOpen(false);

    const res = await deleteJobAction(row.id);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success("Job deleted");
  };

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-md hover:bg-muted">
          <Ellipsis size={16} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          asChild
          onSelect={(e) => {
            e.preventDefault();
            setMenuOpen(false);
          }}
        >
          <AddApplicationButton
            data={row}
            onBeforeOpen={() => setMenuOpen(false)}
            onOptimisticEdit={onOptimisticEdit}
          />
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleDelete}>
          <Trash className="text-red-500 mr-2" size={16} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
