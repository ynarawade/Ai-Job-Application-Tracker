import JobsTable from "@/components/jobs-table/JobsTable";

import JobStats from "@/components/JobStats/JobStats";

import Container from "@/components/ui/container";
import Header from "@/components/ui/header";

function Home() {
  return (
    <div>
      <Header />
      <Container className="mt-10 space-y-10">
        <JobStats />
        <JobsTable />
      </Container>
    </div>
  );
}

export default Home;
