import withAuth from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/payment/:path*",
  ],
};