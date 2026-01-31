export type Stage =
  | "Applied"
  | "OA"
  | "Interview"
  | "HR Discussion"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

export type WorkMode = "Remote" | "Hybrid" | "On-Site";
export type Platform =
  | "LinkedIn"
  | "Internshala"
  | "Indeed"
  | "Referral"
  | "Career Page"
  | "Naukri"
  | "Apna"
  | "Other";

export type JobType = "Full-Time" | "Part-Time" | "Contract" | "Internship";

export type JobApplicationRow = {
  id: string;
  company_name: string;
  job_title: string;
  job_type: JobType;
  work_mode: WorkMode;
  salary: string;
  applied: string | null;
  platform: Platform;
  stage: Stage;
  additional_notes?: string | null;
};
