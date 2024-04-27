import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { API_AUTH_PREFIX, AUTH_ROUTES, DEFAULT_REDIRECT } from "./routes";

export const { auth } = NextAuth(authConfig)

export default auth((request) => {

  const isLoggedIn = !!request.auth;
  const nextUrl = request.nextUrl;

  const isOnApiAuth = nextUrl.pathname.startsWith(API_AUTH_PREFIX)
  const isOnAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (isOnApiAuth) return null;

  if (isOnAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
    }
    return null;
  }

  if (!isLoggedIn && !isOnAuthRoute) {
    return Response.redirect(new URL('/', nextUrl))
  }

  return null;

})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};