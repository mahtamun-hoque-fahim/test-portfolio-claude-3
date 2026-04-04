"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-8 h-8 rounded-full bg-ink-faint flex items-center justify-center text-ink-soft hover:bg-ink hover:text-paper transition-colors text-xs font-mono"
      title="Sign out"
    >
      ↩
    </button>
  );
}
