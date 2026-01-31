"use server";

import { JobApplicationSchema } from "@/lib/schema/job-application";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type JobSchema = z.infer<typeof JobApplicationSchema>;

export async function addJobApplication(data: JobSchema) {
  const supabase = await createSupabaseServerClient();

  //validate again on server
  const parsed = JobApplicationSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid form data",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Get logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      message: "You must be logged in to add an application",
    };
  }
  console.log("User id", user.id);

  // Insert into Supabase
  const { error } = await supabase.from("job_applications").insert({
    user_id: user.id,
    company_name: parsed.data.company_name,
    job_title: parsed.data.job_title,
    job_type: parsed.data.job_type,
    work_mode: parsed.data.work_mode,
    salary: parsed.data.salary,
    applied: parsed.data.applied.toISOString().slice(0, 10),
    platform: parsed.data.platform,
    stage: parsed.data.stage,
    additional_notes: parsed.data.additionalNotes ?? null,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  revalidatePath("/");
  return {
    success: true,
    message: "Application added successfully",
  };
}

export async function deleteJobAction(id: string) {
  const supabase = await createSupabaseServerClient();
  // Get logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      message: "You must be logged in to add an application",
    };
  }

  // Delete particular job-application of particular user Supabase
  const { error } = await supabase
    .from("job_applications")
    .delete()
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  revalidatePath("/");
  return {
    success: true,
    message: "Application deleted successfully",
  };
}

export async function editJobAction(data: JobSchema, id: string) {
  const supabase = await createSupabaseServerClient();

  //validate again on server
  const parsed = JobApplicationSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid form data",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Get logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      message: "You must be logged in to add an application",
    };
  }
  console.log("User id", user.id);

  // Insert into Supabase
  const { error } = await supabase
    .from("job_applications")
    .update({
      company_name: parsed.data.company_name,
      job_title: parsed.data.job_title,
      job_type: parsed.data.job_type,
      work_mode: parsed.data.work_mode,
      salary: parsed.data.salary,
      applied: parsed.data.applied.toISOString().slice(0, 10),
      platform: parsed.data.platform,
      stage: parsed.data.stage,
      additional_notes: parsed.data.additionalNotes ?? null,
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  revalidatePath("/");
  return {
    success: true,
    message: "Application updated successfully",
  };
}
