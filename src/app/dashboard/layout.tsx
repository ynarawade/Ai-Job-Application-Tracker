import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/ui/header";
import { SidebarInset } from "@/components/ui/sidebar";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SidebarUser } from "@/lib/types/user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const sidebarUser: SidebarUser | null = user
    ? {
        name: user.user_metadata?.full_name ?? "User",
        email: user.email ?? "",
        avatar: user.user_metadata?.avatar_url ?? "",
      }
    : null;

  return (
    <>
      <AppSidebar user={sidebarUser} />

      <SidebarInset>
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </>
  );
}
