import JobsTable from "@/components/jobs-table/JobsTable";

import JobStats from "@/components/JobStats/JobStats";

import Container from "@/components/ui/container";

function Home() {
  return (
    <Container className="mt-10 space-y-10">
      <JobStats />
      <JobsTable />
    </Container>
  );
}

export default Home;
