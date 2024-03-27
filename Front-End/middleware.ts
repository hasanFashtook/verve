import NextAuth, { } from 'next-auth';
import authConfig from './auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
} from './routes';

const isDynamicPublicRoute = (pathname: string) => {
  if (pathname == '/' || pathname.startsWith('/product-details/')) {
    return true
  }
}

const publicRoutes = [
  isDynamicPublicRoute,
];

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth;
  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.some((route) => route(nextUrl.pathname)); // Use some() for multiple checks
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoutes) {
    return;
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(
      `/login?callbackUrl=${encodedCallbackUrl}`,
      nextUrl
    ));
  }

  return;
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
