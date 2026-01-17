import { z } from "zod";

/* ENUMS */

export const JobTypeEnum = z.enum([
  "Full-Time",
  "Part-Time",
  "Contract",
  "Internship",
]);

export const WorkModeEnum = z.enum(["Remote", "Hybrid", "On-Site"]);

export const PlatformEnum = z.enum([
  "LinkedIn",
  "Indeed",
  "Apna",
  "Naukri",
  "Internshala",
  "Career Page",
  "Referral",
  "Other",
]);

export const StageEnum = z.enum([
  "Applied",
  "OA",
  "Interview",
  "HR Discussion",
  "Offer",
  "Rejected",
  "Withdrawn",
]);

/* MAIN SCHEMA */

export const JobApplicationSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),

  jobTitle: z.string().min(1, "Job title is required"),

  jobType: JobTypeEnum,

  workMode: WorkModeEnum,

  salary: z.string().min(1, "Salary or stipend is required"),

  applied: z.date(),

  platform: PlatformEnum,

  additionalNotes: z.string().optional(),

  stage: StageEnum,
});
