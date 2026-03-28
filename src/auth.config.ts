import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/history");

      if (isProtected && !isLoggedIn) {
        return Response.redirect(new URL("/sign-in", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
