"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ModeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant={"secondary"}
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}

export default ModeToggle;
