import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OpenCodex | The Collaboration Hub",
    template: "%s | OpenCodex Open Source Finder",
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "",
  },
  description:
    "The directory for developers to find meaningful open-source projects. Filter by language and category to start your next contribution.",
  keywords: [
    "open source",
    "github projects",
    "coding collaboration",
    "software development",
    "contribute to open source",
    "developer community",
    "first timers only",
    "good first issue",
  ],
  authors: [{ name: "OpenCodex" }],
  creator: "OpenCodex",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "OpenCodex",
    title: "OpenCodex | Discover & Contribute to Open Source",
    description:
      "Stop searching, start coding. Find curated open-source projects tailored to your tech stack.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenCodex — Open Source Project Finder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenCodex | Find Your Next Open Source Contribution",
    description:
      "Connecting developers with amazing open-source projects. Filter by tech stack and impact.",
    images: ["/og-image.png"],
    creator: "@opencodex",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-gray-950 text-gray-100 antialiased min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1e1b4b",
              color: "#e0e7ff",
              border: "1px solid #4f46e5",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#818cf8", secondary: "#1e1b4b" } },
          }}
        />
        <Footer />
      </body>
    </html>
  );
}
