import { withAuth } from "next-auth/middleware";

// Middleware function to protect routes
export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// Protect specific routes that require authentication
// Public routes: /, /login, /signup, /api, /contact, /privacy, /terms, /cookies
export const config = {
  matcher: [
    // Only protect routes that NEED authentication
    // Everything else is public by default
    // Example: "/dashboard/:path*", "/profile/:path*", "/admin/:path*"
    
    // Currently NO routes are protected - all routes are public
    // Add specific protected routes here when needed
  ],
};
