import StageBadge from "@/components/ui/stage-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { JobApplication } from "@/lib/types/job";

export const dummyJobs: JobApplication[] = [
  {
    id: 1,
    companyName: "Google",
    jobTitle: "Software Engineer Intern",
    jobType: "Internship",
    workMode: "Hybrid",
    salary: "₹80,000 / month",
    applied: new Date("2024-12-05"),
    stage: "Applied",
  },
  {
    id: 2,
    companyName: "Amazon",
    jobTitle: "Frontend Developer",
    jobType: "Full-Time",
    workMode: "On-Site",
    salary: "18 LPA",
    applied: new Date("2024-11-28"),
    stage: "Interview",
  },
  {
    id: 3,
    companyName: "Razorpay",
    jobTitle: "Backend Engineer Intern",
    jobType: "Internship",
    workMode: "Remote",
    salary: "₹35,000 / month",
    applied: new Date("2024-12-08"),
    stage: "OA",
  },
  {
    id: 4,
    companyName: "Flipkart",
    jobTitle: "Software Engineer I",
    jobType: "Full-Time",
    workMode: "Hybrid",
    salary: "14 LPA",
    applied: new Date("2024-11-20"),
    stage: "Offer",
  },
  {
    id: 5,
    companyName: "Swiggy",
    jobTitle: "SDE I",
    jobType: "Full-Time",
    workMode: "Hybrid",
    salary: "12 LPA",
    applied: new Date("2024-12-01"),
    stage: "Rejected",
  },
];

function JobsTable() {
  return (
    <div className="border p-2 rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead className="w-50">Job Title</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Work Mode</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead>Stage</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dummyJobs.map((job) => (
            <TableRow key={job.id} className="h-15">
              <TableCell>{job.companyName}</TableCell>
              <TableCell className="font-medium">{job.jobTitle}</TableCell>
              <TableCell className="text-muted-foreground">
                {job.jobType}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {job.workMode}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {job.salary}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {job.applied.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <StageBadge stage={job.stage} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default JobsTable;
