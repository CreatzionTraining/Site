// middleware.ts
// ✅ NO authentication protection
// ✅ All routes are public
// ✅ Login & Signup will work correctly

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [], // 👈 truly empty, nothing is protected
};
