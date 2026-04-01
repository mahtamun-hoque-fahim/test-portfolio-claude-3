import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Cormorant, DM_Sans, DM_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

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
    <ClerkProvider>
      <html
        lang="en"
        className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
      >
        <body className="bg-paper text-ink font-body antialiased">
          <CustomCursor />
          <ScrollReveal />
          {children}
          <Toaster position="bottom-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
