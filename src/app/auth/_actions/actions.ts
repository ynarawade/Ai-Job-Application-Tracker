"use server";
import { signInSchema } from "@/lib/schema/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type z from "zod";

type SignInValues = z.infer<typeof signInSchema>;

export async function signInWithEmail(data: SignInValues) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithOtp({
    email: data.email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      skipBrowserRedirect: false,
    },
  });

  if (error) {
    console.error("Google OAuth error:", error.message);
    throw new Error(error.message);
  }

  if (data?.url) {
    console.log("DATA URL", data.url);

    redirect(data.url);
  }
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/auth");
}
