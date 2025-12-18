import { withAuth } from "next-auth/middleware";

// Middleware function to protect routes
export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// Protect specific routes that require authentication
// Currently: ALL routes are PUBLIC (no authentication required)
// Add routes here if you want to protect specific pages in the future
export const config = {
  matcher: [
    // Add protected routes here when needed
    // Example: "/dashboard/:path*", "/profile/:path*", "/admin/:path*"
    // 
    // Currently empty = no routes are protected
    // Users can access the entire site without logging in
  ],
};
