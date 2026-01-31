"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Pencil, Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FieldDescription as FD,
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { addJobApplication, editJobAction } from "@/lib/actions";
import { JobApplicationSchema } from "@/lib/schema/job-application";
import type { JobApplicationRow } from "@/lib/types/job";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type FormValues = z.infer<typeof JobApplicationSchema>;

interface JobApplicationProps {
  data?: JobApplicationRow;
  onBeforeOpen?: () => void;
  onOptimisticAdd?: (row: JobApplicationRow) => void;
  onOptimisticEdit?: (row: JobApplicationRow) => void;
}

function AddApplicationButton({
  data,
  onBeforeOpen,
  onOptimisticEdit,
  onOptimisticAdd,
}: JobApplicationProps) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      id: data?.id ?? undefined,
      company_name: data?.company_name ?? "",
      job_title: data?.job_title ?? "",
      salary: data?.salary ?? "",
      applied: data?.applied ? new Date(data.applied) : new Date(),
      job_type: data?.job_type ?? "Internship",
      work_mode: data?.work_mode ?? "Remote",
      platform: data?.platform ?? "LinkedIn",
      stage: data?.stage ?? "Applied",
      additional_notes: data?.additional_notes ?? "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [startTransition] = useTransition();

  const router = useRouter();

  async function onSubmit(formData: FormValues) {
    setIsSubmitting(true);

    const optimisticRow: JobApplicationRow = {
      id: formData.id ?? crypto.randomUUID(), // temp id for new
      company_name: formData.company_name,
      job_title: formData.job_title,
      salary: formData.salary,
      applied: formData.applied.toISOString().slice(0, 10),
      job_type: formData.job_type,
      work_mode: formData.work_mode,
      platform: formData.platform,
      stage: formData.stage,
      additional_notes: formData.additional_notes ?? null,
    };

    const isEdit = !!formData.id;

    // optimistic update
    if (isEdit) {
      onOptimisticEdit?.(optimisticRow);
      onBeforeOpen?.();
    } else {
      onOptimisticAdd?.(optimisticRow);
    }

    // close dialog instantly (no waiting)
    reset();
    setOpen(false);

    // server call
    startTransition(async () => {
      const res = isEdit
        ? await editJobAction(formData, formData.id!)
        : await addJobApplication(formData);

      if (!res.success) {
        toast.error(res.message);
        router.refresh(); // rollback
        return;
      }

      toast.success(res.message);

      //sync DB truth (for temp ids)
      router.refresh();
    });
  }

  const onInvalid = (errs: any) => {
    console.log("FORM INVALID ❌", errs);
    toast.error("Form invalid");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {data ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant={"ghost"}
            className="w-full flex items-center justify-start gap-4"
          >
            <Pencil className="text-blue-500" size={16} />
            <span>Edit</span>
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4" />
            <span>New Application</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-180 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {data ? "Edit Job Application" : "Add Job Application"}
          </DialogTitle>
          <DialogDescription>
            Track and manage a new job or internship application.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <FieldGroup className="space-y-6 py-4">
            {/* ================= JOB DETAILS ================= */}
            <FieldSet>
              <FieldLegend>Job Details</FieldLegend>
              <FD>Basic information about the role you applied for.</FD>

              <FieldGroup>
                <Field>
                  <FieldLabel>Company Name</FieldLabel>
                  <Input
                    {...register("company_name")}
                    placeholder="Google, Microsoft, Amazon"
                  />
                  {errors.company_name && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.company_name.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Job Title</FieldLabel>
                  <Input
                    {...register("job_title")}
                    placeholder="SDE I, Frontend Developer"
                  />
                  {errors.job_title && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.job_title.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Salary / Stipend</FieldLabel>
                  <Input
                    {...register("salary")}
                    placeholder="12 LPA / ₹25,000 per month"
                  />
                  {errors.salary && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.salary.message}
                    </p>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            {/* ================= APPLICATION DETAILS ================= */}
            <FieldSet>
              <FieldLegend>Application Details</FieldLegend>
              <FD>How and when you applied for this position.</FD>

              <FieldGroup>
                {/* Applied Date */}
                <Field>
                  <FieldLabel>Applied Date</FieldLabel>
                  <Controller
                    name="applied"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(field.value, "dd MMM yyyy")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            autoFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </Field>

                {/* Job Type */}
                <Field>
                  <FieldLabel>Job Type</FieldLabel>
                  <Controller
                    name="job_type"
                    control={control}
                    render={({ field }) => (
                      <ToggleGroup
                        type="single"
                        variant="outline"
                        spacing={2}
                        value={field.value}
                        onValueChange={(val) => {
                          if (!val) return;
                          field.onChange(val);
                        }}
                      >
                        <ToggleGroupItem value="Full-Time">
                          Full-Time
                        </ToggleGroupItem>
                        <ToggleGroupItem value="Part-Time">
                          Part-Time
                        </ToggleGroupItem>
                        <ToggleGroupItem value="Internship">
                          Internship
                        </ToggleGroupItem>
                        <ToggleGroupItem value="Contract">
                          Contract
                        </ToggleGroupItem>
                      </ToggleGroup>
                    )}
                  />
                </Field>

                {/* Work Mode */}
                <Field>
                  <FieldLabel>Work Mode</FieldLabel>
                  <Controller
                    name="work_mode"
                    control={control}
                    render={({ field }) => (
                      <ToggleGroup
                        type="single"
                        variant="outline"
                        spacing={2}
                        value={field.value}
                        onValueChange={(val) => {
                          if (!val) return;
                          field.onChange(val);
                        }}
                      >
                        <ToggleGroupItem value="Remote">Remote</ToggleGroupItem>
                        <ToggleGroupItem value="Hybrid">Hybrid</ToggleGroupItem>
                        <ToggleGroupItem value="On-Site">
                          On-Site
                        </ToggleGroupItem>
                      </ToggleGroup>
                    )}
                  />
                </Field>

                {/* Platform */}
                <Field>
                  <FieldLabel>Platform</FieldLabel>
                  <Controller
                    name="platform"
                    control={control}
                    render={({ field }) => (
                      <ToggleGroup
                        type="single"
                        variant="outline"
                        spacing={2}
                        value={field.value}
                        onValueChange={(val) => {
                          if (!val) return;
                          field.onChange(val);
                        }}
                        className="flex-wrap"
                      >
                        {[
                          "LinkedIn",
                          "Indeed",
                          "Apna",
                          "Naukri",
                          "Internshala",
                          "Career Page",
                          "Referral",
                          "Other",
                        ].map((p) => (
                          <ToggleGroupItem key={p} value={p}>
                            {p}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    )}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            {/* ================= STATUS & NOTES ================= */}
            <FieldSet>
              <FieldLegend>Status & Notes</FieldLegend>
              <FD>Track the current stage and add personal notes.</FD>

              <FieldGroup>
                {/* Stage */}
                <Field>
                  <FieldLabel>Stage</FieldLabel>
                  <Controller
                    name="stage"
                    control={control}
                    render={({ field }) => (
                      <ToggleGroup
                        type="single"
                        variant="outline"
                        spacing={2}
                        value={field.value}
                        onValueChange={(val) => {
                          if (!val) return;
                          field.onChange(val);
                        }}
                        className="flex-wrap"
                      >
                        {[
                          "Applied",
                          "OA",
                          "Interview",
                          "HR Discussion",
                          "Offer",
                          "Rejected",
                          "Withdrawn",
                        ].map((s) => (
                          <ToggleGroupItem key={s} value={s}>
                            {s}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    )}
                  />
                </Field>

                {/* Notes */}
                <Field>
                  <FieldLabel>
                    Additional Notes{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </FieldLabel>
                  <Textarea
                    {...register("additional_notes")}
                    className="min-h-22.5"
                    placeholder="Recruiter name, follow-up date, interview feedback..."
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
          {/* ================= ACTIONS ================= */}
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span> {data ? "Updating...." : "Submitting...."}</span>
                </>
              ) : (
                <span>{data ? "Update Application" : "Save Application"}</span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddApplicationButton;
