import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MAHTAMUN — Graphic Designer & Visual Identity",
    template: "%s — MAHTAMUN",
  },
  description:
    "Graphic designer specialising in brand identity, logo design, UI/UX, and social media. Based in Bangladesh, working worldwide.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MAHTAMUN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="bg-paper text-ink font-body antialiased">
          <CustomCursor />
          <ScrollReveal />
          {children}
          <Toaster position="bottom-right" richColors />
        </body>
      </html>
    </SessionProvider>
  );
}
