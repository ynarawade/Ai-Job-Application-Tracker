"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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

import { JobApplicationSchema } from "@/lib/schema/job-application";

type FormValues = z.infer<typeof JobApplicationSchema>;

function AddApplicationButton() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      companyName: "",
      jobTitle: "",
      salary: "",
      applied: new Date(),
      jobType: "Internship",
      workMode: "Remote",
      platform: "LinkedIn",
      stage: "Applied",
      additionalNotes: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log("SUBMITTED:", data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Application</Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-180 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>
            Track and manage a new job or internship application.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-6 py-4">
            {/* ================= JOB DETAILS ================= */}
            <FieldSet>
              <FieldLegend>Job Details</FieldLegend>
              <FD>Basic information about the role you applied for.</FD>

              <FieldGroup>
                <Field>
                  <FieldLabel>Company Name</FieldLabel>
                  <Input
                    {...register("companyName")}
                    placeholder="Google, Microsoft, Amazon"
                  />
                  {errors.companyName && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.companyName.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Job Title</FieldLabel>
                  <Input
                    {...register("jobTitle")}
                    placeholder="SDE I, Frontend Developer"
                  />
                  {errors.jobTitle && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.jobTitle.message}
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
                            initialFocus
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
                    name="jobType"
                    control={control}
                    render={({ field }) => (
                      <ToggleGroup
                        type="single"
                        variant="outline"
                        spacing={2}
                        value={field.value}
                        onValueChange={field.onChange}
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
                    name="workMode"
                    control={control}
                    render={({ field }) => (
                      <ToggleGroup
                        type="single"
                        variant="outline"
                        spacing={2}
                        value={field.value}
                        onValueChange={field.onChange}
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
                        onValueChange={field.onChange}
                        className="flex-wrap"
                      >
                        {[
                          "LinkedIn",
                          "Indeed",
                          "Apna",
                          "Naukri",
                          "Internshala",
                          "Company Career Page",
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
                        onValueChange={field.onChange}
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
                    {...register("additionalNotes")}
                    className="min-h-22.5"
                    placeholder="Recruiter name, follow-up date, interview feedback..."
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            {/* ================= ACTIONS ================= */}
            <Field orientation="horizontal">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save Application</Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddApplicationButton;
