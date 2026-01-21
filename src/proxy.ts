import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  // Not logged in → block protected routes
  if (!user && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Logged in → prevent going back to auth pages
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
