import { withAuth } from "next-auth/middleware";

// Middleware function to protect routes
export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// Protect specific routes that require authentication
export const config = {
  matcher: [
    // Add your protected routes here
    // Example: "/dashboard/:path*", "/profile/:path*"
  ],
};
