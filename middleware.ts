/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { envConfig } from "./config/env-config";
import { PERMISSION_PATHS } from "./constant/nav-list";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token: any = await getToken({
    req: request,
    secret: envConfig.jwt.secret,
  });

  const isAuthenticated = !!token?.user && !token?.error;

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  // Normalize pathname
  const cleanPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const hasPermission = PERMISSION_PATHS.some((path) =>
    path === "/" ? cleanPath === "/" : cleanPath.startsWith(path),
  );

  // If user hits `/` but doesn't have it, redirect to first allowed page
  if (cleanPath === "/" && !hasPermission) {
    return NextResponse.redirect(new URL(PERMISSION_PATHS[0], request.nextUrl));
  }

  if (!hasPermission) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|_next/data|_next/server-side-rendering|_next/webpack-hmr|assets|sign-in|sign-up|reset-password|forgot-password|play-ground).*)",
  ],
};
