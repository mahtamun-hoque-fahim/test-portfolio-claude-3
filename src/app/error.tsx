"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-xs text-ink-faint tracking-widest uppercase mb-6">
          Something went wrong
        </p>
        <h1
          className="font-display font-light text-ink mb-6"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1 }}
        >
          Error.
        </h1>
        <p className="text-ink-muted mb-10 max-w-sm mx-auto leading-relaxed">
          An unexpected error occurred. You can try refreshing or return home.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={reset} className="btn-primary">
            <RefreshCw size={15} /> Try Again
          </button>
          <Link href="/" className="btn-ghost">
            <ArrowLeft size={15} /> Home
          </Link>
        </div>
        {error.digest && (
          <p className="mt-8 font-mono text-xs text-ink-faint">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
