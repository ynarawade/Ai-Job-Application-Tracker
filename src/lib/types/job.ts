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
  | "Refferal"
  | "Carrer Page"
  | "Naukri"
  | "Apna"
  | "Other";

export type JobType = "Full-Time" | "Part-Time" | "Contract" | "Internship";

export interface JobApplication {
  id: number;
  companyName: string;
  jobTitle: string;
  jobType: JobType;
  workMode: WorkMode;
  salary: string;
  applied: Date;
  platform: Platform;
  additionlNoted?: string;
  stage: Stage;
}
