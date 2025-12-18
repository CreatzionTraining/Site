/**
 * NextAuth Configuration - MAXIMUM SECURITY
 * 
 * SECURITY PRINCIPLES:
 * 1. All secrets loaded from environment variables ONLY
 * 2. No hardcoded credentials anywhere
 * 3. Database access is server-side only via Prisma
 * 4. JWT tokens encrypted with strong secret
 * 5. Sessions expire after 30 days
 * 6. Passwords hashed with bcrypt (12 rounds)
 * 7. OAuth providers configured securely
 * 
 * CRITICAL: This file runs SERVER-SIDE ONLY
 * Never import this in client components
 */

import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";

/**
 * Auto-detect environment and use appropriate URL
 * Development: Uses NEXTAUTH_URL (localhost)
 * Production: Uses NEXTAUTH_URL_PRODUCTION (Vercel/Hostinger)
 */
const getAuthUrl = () => {
  // In production, use production URL if available
  if (process.env.NODE_ENV === "production" && process.env.NEXTAUTH_URL_PRODUCTION) {
    return process.env.NEXTAUTH_URL_PRODUCTION;
  }
  // Otherwise use default NEXTAUTH_URL (localhost for dev)
  return process.env.NEXTAUTH_URL || "http://localhost:3000";
};

// Set the URL dynamically based on environment
// This ensures NextAuth uses the correct URL automatically
if (!process.env.NEXTAUTH_URL || process.env.NODE_ENV === "production") {
  process.env.NEXTAUTH_URL = getAuthUrl();
}

/**
 * NextAuth Configuration
 * All sensitive values are loaded from environment variables
 * URL automatically switches between localhost and production
 */
export const authOptions: NextAuthOptions = {
  // Use Prisma adapter for database persistence
  // TEMPORARILY DISABLED - Using JWT-only for now
  // adapter: PrismaAdapter(prisma),

  // Authentication providers
  providers: [
    // Google OAuth - Credentials from environment variables
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // GitHub OAuth - Credentials from environment variables
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),

    // Apple OAuth - Credentials from environment variables
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID || "",
      clientSecret: process.env.APPLE_CLIENT_SECRET || "",
    }),

    // Credentials Provider (Email/Password)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Find user in database (SERVER-SIDE ONLY)
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Check if user exists and has a password
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        // Verify password (bcrypt comparison)
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // Return user object (without password)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  // Custom pages
  pages: {
    signIn: "/login",
  },

  // Session configuration - JWT strategy for scalability
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },

  // JWT configuration
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Loaded from environment
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Callbacks for session and JWT handling
  callbacks: {
    // Sign in callback - simplified for JWT-only
    async signIn({ user, account, profile }) {
      // Allow all sign-ins
      // Account linking will be handled when Prisma adapter is re-enabled
      return true;
    },

    // JWT callback - runs when JWT is created or updated
    async jwt({ token, user, account, trigger }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      // Store OAuth provider info
      if (account) {
        token.provider = account.provider;
      }

      return token;
    },

    // Session callback - runs when session is checked
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },

    // Redirect callback - handles where to redirect after login
    async redirect({ url, baseUrl }) {
      // If URL is relative, prepend baseUrl
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // If URL is on the same origin, allow it
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      // Otherwise redirect to home page
      return baseUrl;
    },
  },

  // Events for logging and tracking
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      // Track login for credentials-based auth
      // TEMPORARILY DISABLED - Using JWT-only
      // if (account?.provider === "credentials" && user.id) {
      //   try {
      //     await prisma.user.update({
      //       where: { id: user.id },
      //       data: {
      //         lastLogin: new Date(),
      //         lastLoginMethod: "credentials",
      //         loginCount: { increment: 1 },
      //       },
      //     });
      //   } catch (error) {
      //     console.error("Login tracking error:", error);
      //   }
      // }
      
      // Log successful sign-ins (server-side only)
      console.log(`User signed in: ${user.email} via ${account?.provider || "credentials"}`);
    },
    async signOut({ session, token }) {
      // Log sign-outs (optional)
      console.log(`User signed out`);
    },
  },

  // Security settings
  secret: process.env.NEXTAUTH_SECRET, // CRITICAL: From environment only
  debug: process.env.NODE_ENV === "development", // Debug logs in dev only
  
  // Use secure cookies in production
  useSecureCookies: process.env.NODE_ENV === "production",
};

/**
 * Register new user with credentials
 * SERVER-SIDE ONLY - Never call from client
 * 
 * @param name - User's full name
 * @param email - User's email address
 * @param password - User's password (will be hashed)
 * @returns Created user object (without password)
 */
export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password with bcrypt (12 rounds for security)
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user in database
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Return user without password
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
