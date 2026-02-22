import type { Metadata } from "next";
import { Space_Grotesk, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PatchForge — Autonomous AI Software Engineer",
  description:
    "PatchForge picks up your Jira tickets and opens pull requests on GitHub. Assign a ticket, review a PR — that's it.",
  metadataBase: new URL("https://patchforge.dev"),
  openGraph: {
    title: "PatchForge — Autonomous AI Software Engineer",
    description:
      "Assign a ticket. Review a PR. That's it. PatchForge is the AI developer that turns your Jira tickets into pull requests.",
    url: "https://patchforge.dev",
    siteName: "PatchForge",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PatchForge — Autonomous AI Software Engineer",
    description: "Assign a ticket. Review a PR. That's it.",
    creator: "@patchforge",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
