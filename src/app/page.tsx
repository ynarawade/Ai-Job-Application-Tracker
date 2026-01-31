import JobsTable from "@/components/jobs-table/JobsTable";

import Container from "@/components/ui/container";
import Header from "@/components/ui/header";

function Home() {
  return (
    <div>
      <Header />
      <Container className="mt-10 space-y-3">
        <JobsTable />
      </Container>
    </div>
  );
}

export default Home;
