import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://astolixgen.com"),
  title: {
    default: "AstolixGen — AI, Automation & Digital Solutions",
    template: "%s | AstolixGen",
  },
  description:
    "AstolixGen builds intelligent digital systems that connect AI, automation, software and the physical world. AI solutions, automation & agents, software, data, IoT, creative studio and training.",
  keywords: [
    "AI solutions",
    "AI automation",
    "AI agents",
    "software development",
    "data analytics",
    "IoT solutions",
    "Next.js development",
    "AstolixGen",
  ],
  openGraph: {
    type: "website",
    siteName: "AstolixGen",
    title: "AstolixGen — AI, Automation & Digital Solutions",
    description:
      "We build intelligent digital systems that connect AI, automation, software and the physical world.",
    url: "https://astolixgen.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "AstolixGen — AI, Automation & Digital Solutions",
    description:
      "We build intelligent digital systems that connect AI, automation, software and the physical world.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-ink text-slate-200 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
