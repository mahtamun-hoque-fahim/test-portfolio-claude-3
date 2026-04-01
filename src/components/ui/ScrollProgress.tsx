"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[2px] bg-accent origin-left transition-none"
      style={{ width: `${progress * 100}%` }}
      aria-hidden
    />
  );
}
