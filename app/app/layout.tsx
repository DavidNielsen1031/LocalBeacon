import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LocalBeacon.ai — More calls. Less work. AI handles your local marketing.",
  description:
    "LocalBeacon posts to your Google listing every week, creates local pages for every city you serve, and replies to your reviews — so you get found by more customers without lifting a finger. Start free.",
  keywords: ["local SEO", "Google Business Profile", "local marketing automation", "AI marketing", "small business marketing", "GBP posts", "local visibility"],
  openGraph: {
    title: "LocalBeacon.ai — Your phone rings more. We handle everything.",
    description: "AI-powered local marketing for small businesses. Weekly Google posts, city pages, review replies — all on autopilot. $29/mo.",
    url: "https://localbeacon.ai",
    siteName: "LocalBeacon.ai",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalBeacon.ai — More calls. Less work.",
    description: "AI-powered local marketing. Weekly Google posts, city pages, review replies — all on autopilot.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://localbeacon.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const content = (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );

  if (!publishableKey || publishableKey === "pk_test_placeholder") {
    return content;
  }

  return <ClerkProvider publishableKey={publishableKey}>{content}</ClerkProvider>;
}
