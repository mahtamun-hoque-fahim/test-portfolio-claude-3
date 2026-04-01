import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-paper-warm flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-display text-3xl text-ink mb-1">Mahtamun</p>
          <p className="label">Admin Access</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              card: "bg-paper border border-paper-border shadow-none rounded-none",
              headerTitle: "font-display text-xl text-ink font-normal",
              headerSubtitle: "text-ink-muted text-sm",
              formButtonPrimary:
                "bg-ink hover:bg-ink-soft text-paper font-body text-sm tracking-wide rounded-none transition-colors",
              formFieldInput:
                "border-paper-border focus:border-ink rounded-none text-sm font-body",
              footerActionLink: "text-accent hover:text-accent-dark",
            },
          }}
        />
      </div>
    </div>
  );
}
