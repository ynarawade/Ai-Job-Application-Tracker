import AddApplicationButton from "@/components/job-application/add-application-btn";
import JobsTable from "@/components/jobs-table/job-table";
import Container from "@/components/ui/container";
import Header from "@/components/ui/header";

function Home() {
  return (
    <div>
      <Header />
      <Container className="mt-10 space-y-3">
        <div className="text-right">
          <AddApplicationButton />
        </div>
        <JobsTable />
      </Container>
    </div>
  );
}

export default Home;
