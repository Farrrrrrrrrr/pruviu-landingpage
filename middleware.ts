import { NextRequest, NextResponse } from "next/server";

// Routes that exist in the codebase but should not be publicly reachable yet.
const DISABLED_ROUTES = ["/harga"];

export function middleware(request: NextRequest) {
  if (DISABLED_ROUTES.includes(request.nextUrl.pathname)) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/harga"],
};
