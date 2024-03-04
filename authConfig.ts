import { Session } from "next-auth";
import { NextRequest } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [],
  callbacks: {
    async authorized({
      auth,
      request,
    }: {
      auth: Session | null;
      request: NextRequest;
    }) {
      const user = auth?.user;

      const isVisitingProductPage = request.nextUrl.pathname === "/product";

      const isVisitingAuthPage =
        request.nextUrl.pathname === "/sign-in" ||
        request.nextUrl.pathname === "/sign-up";

      if (!user && isVisitingProductPage) {
        return false;
      }

      if (user && isVisitingAuthPage) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
