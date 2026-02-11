"use client";

import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "@/components/NavMain";
import { NavUser } from "@/components/NavUser";
import { APP_NAME } from "@/lib/constants";
import type { SidebarUser } from "@/lib/types/user";
import { Briefcase, FileText, LayoutDashboard, ScanSearch } from "lucide-react";

export const navigation = {
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
  ],

  tools: [
    {
      title: "AI Resume Builder",
      url: "/resume-builder",
      icon: FileText,
    },
    {
      title: "ATS Score Checker",
      url: "/ats-checker",
      icon: ScanSearch,
    },
  ],
};

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar> & {
    user: SidebarUser | null;
  }
) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* LOGO */}
      <SidebarHeader className="transition-[width] duration-200 ease-linear">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link
                href="/dashboard"
                className="flex gap-2 items-center font-semibold hover:opacity-90"
              >
                <div className="bg-sidebar-primary/90 text-sidebar-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg">
                  <Briefcase className="size-5" />
                </div>

                <span className="transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0">
                  {APP_NAME}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* MAIN */}
        <NavMain label="Main" items={navigation.main} />

        {/* TOOLS */}
        <NavMain label="Tools" items={navigation.tools} />
      </SidebarContent>
      <SidebarFooter>
        {props.user && <NavUser user={props.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
