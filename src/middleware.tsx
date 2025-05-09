import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const authUser = true;

  if (!authUser)
    return NextResponse.redirect(new URL("/unauthorized", req.url), req);

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
