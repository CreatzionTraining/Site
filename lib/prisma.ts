/**
 * Prisma Client Singleton
 * 
 * SECURITY: This file ensures database access is:
 * 1. Server-side only (never exposed to client)
 * 2. Properly instantiated (prevents connection leaks)
 * 3. Reused across hot reloads in development
 * 
 * CRITICAL: Never import this in client components
 */

import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create Prisma Client with security best practices
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// In development, save the instance to prevent hot reload issues
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Export type-safe database client
export default prisma;
