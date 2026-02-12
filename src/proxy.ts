import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");
  const isLanding = request.nextUrl.pathname === "/";

  // Logged in user trying to access landing → redirect to dashboard
  if (user && isLanding) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Logged in → prevent going back to auth pages
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Not logged in trying to access protected routes (not landing, not auth)
  if (!user && !isAuthRoute && !isLanding) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
