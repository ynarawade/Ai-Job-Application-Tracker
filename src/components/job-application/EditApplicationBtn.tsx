"use client";

import type { JobApplicationSchema } from "@/lib/schema/job-application";
import type z from "zod";
import AddApplicationButton from "./add-application-btn";

type FormValues = z.infer<typeof JobApplicationSchema>;

export default function EditApplicationButton({ data }: { data: FormValues }) {
  return <AddApplicationButton data={data} />;
}
