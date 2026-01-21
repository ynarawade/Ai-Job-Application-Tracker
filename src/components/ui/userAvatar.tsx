import { UserAvatarMenu } from "@/components/ui/userAvatarMenu";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function UserAvatar() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const imageUrl =
    user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture ?? null;

  const name =
    user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? null;

  return <UserAvatarMenu email={user.email!} name={name} imageUrl={imageUrl} />;
}
