import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-xs text-ink-faint tracking-widest uppercase mb-6">
          404 — Not Found
        </p>
        <h1
          className="font-display font-light text-ink mb-6"
          style={{ fontSize: "clamp(4rem, 12vw, 10rem)", lineHeight: 1 }}
        >
          Oops.
        </h1>
        <p className="text-ink-muted mb-10 max-w-sm mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
