"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-500/20 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-10 h-10 rounded-full border-2 border-blue-400"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-[#0069c7] to-[#0082ef] rounded-full flex items-center justify-center text-white font-semibold">
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-white">
              {session.user.name}
            </p>
            <p className="text-xs text-blue-200">{session.user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-200 text-sm font-medium"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="px-4 py-2 text-white hover:text-blue-200 transition-all duration-200 text-sm font-medium"
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        className="px-4 py-2 bg-gradient-to-r from-[#0069c7] to-[#0082ef] text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-sm font-semibold"
      >
        Get Started
      </Link>
    </div>
  );
}
