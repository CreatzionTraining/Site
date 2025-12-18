import { withAuth } from "next-auth/middleware";

// Middleware function to protect routes
export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// Protect specific routes that require authentication
// Login and signup pages are PUBLIC (not protected)
export const config = {
  matcher: [
    // Protect these routes (require authentication)
    // Example: "/dashboard/:path*", "/profile/:path*"
    // NOTE: /login and /signup are NOT in this list, so they're public
    
    // Exclude public routes from middleware
    "/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)",
  ],
};
