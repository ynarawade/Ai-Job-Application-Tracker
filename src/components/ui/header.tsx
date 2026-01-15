import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import ModeToggle from "@/components/ui/mode-toggle";
import { User2 } from "lucide-react";

function Header() {
  return (
    <header className="border-b">
      <Container className="flex justify-between py-3">
        <h4 className="text-lg font-normal font-sans">Applied Jobs</h4>

        <div className="flex items-center gap-x-3">
          <ModeToggle />

          {/* Future: Supabase user avatar / menu */}
          <Button variant={"secondary"} size={"icon"}>
            <User2 size={16} />
          </Button>
        </div>
      </Container>
    </header>
  );
}

export default Header;
