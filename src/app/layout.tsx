import type { Metadata } from "next";
import { Space_Grotesk, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#00D4FF",
          colorBackground: "#0D1425",
          colorInputBackground: "#131B33",
          colorInputText: "#E2E8F0",
          colorText: "#E2E8F0",
          colorTextSecondary: "#94A3B8",
          borderRadius: "0.5rem",
        },
        elements: {
          card: "bg-navy-900 border border-white/10 shadow-2xl",
          formButtonPrimary:
            "bg-[#00D4FF] hover:bg-[#00bfe6] text-[#0A0F1E] font-semibold",
          footerActionLink: "text-[#00D4FF] hover:text-[#00bfe6]",
          socialButtonsBlockButton:
            "bg-[#131B33] border-white/10 text-white hover:bg-[#1A2440]",
          dividerLine: "bg-white/10",
          dividerText: "text-gray-400",
          formFieldInput:
            "bg-[#131B33] border-white/10 text-white",
          identityPreview: "bg-[#131B33] border-white/10",
          identityPreviewText: "text-white",
          identityPreviewEditButton: "text-[#00D4FF]",
          userButtonPopoverCard: "bg-[#0D1425] border border-white/10",
          userButtonPopoverActionButton: "text-gray-300 hover:text-white hover:bg-white/5",
          userButtonPopoverActionButtonText: "text-gray-300",
          userButtonPopoverFooter: "hidden",
        },
      }}
    >
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
    </ClerkProvider>
  );
}
