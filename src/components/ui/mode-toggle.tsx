"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const isDark: boolean = resolvedTheme === "dark";
  return (
    <Button
      variant={"secondary"}
      size={"icon"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}

export default ModeToggle;
